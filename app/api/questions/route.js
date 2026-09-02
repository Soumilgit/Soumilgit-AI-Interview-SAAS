import { NextResponse } from "next/server"
import { db } from "@/utils/db"
import { Question } from "@/utils/schema"
import { desc, eq } from "drizzle-orm"
import { generateInterviewContent } from "@/utils/GeminiAIModal"
import { getAuthenticatedEmail } from "@/utils/server-user"
import { isRateLimited } from "@/utils/rate-limit"
import { buildPrompt } from "@/utils/prompt"
import { randomUUID } from "crypto"

const validText = (value, max) => typeof value === "string" && value.trim().length > 0 && value.trim().length <= max

export async function GET() {
  const email = await getAuthenticatedEmail()
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  return NextResponse.json(await db.select().from(Question).where(eq(Question.createdBy, email)).orderBy(desc(Question.id)))
}

export async function POST(request) {
  const email = await getAuthenticatedEmail()
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (isRateLimited(`questions:${email}`, { limit: 4, windowMs: 60_000 })) return NextResponse.json({ error: "Please wait before generating more questions." }, { status: 429 })
  const body = await request.json().catch(() => null)
  if (!body || !validText(body.jobPosition, 120) || !validText(body.jobDesc, 3000) || !validText(body.typeQuestion, 100) || !validText(body.company, 120) || !Number.isInteger(Number(body.jobExperience)) || Number(body.jobExperience) < 0 || Number(body.jobExperience) > 50) return NextResponse.json({ error: "Invalid question details." }, { status: 400 })
  const prompt = buildPrompt({ task: "Generate exactly 5 concise interview questions and answers as JSON: {questions:[{Question,Answer}]}.", jobPosition: body.jobPosition.trim(), jobDescription: body.jobDesc.trim(), yearsOfExperience: Number(body.jobExperience), questionType: body.typeQuestion.trim(), targetCompany: body.company.trim() })
  try {
    const text = (await generateInterviewContent(prompt)).replace(/```json|```/g, "").trim()
    const parsed = JSON.parse(text)
    if (!Array.isArray(parsed?.questions) || !parsed.questions.every((item) => validText(item?.Question, 1000) && validText(item?.Answer, 6000))) throw new Error("Invalid AI response")
    const [created] = await db.insert(Question).values({ mockId: randomUUID(), mockQuestionJsonResp: JSON.stringify(parsed), jobPosition: body.jobPosition.trim(), jobDesc: body.jobDesc.trim(), jobExperience: String(body.jobExperience), typeQuestion: body.typeQuestion.trim(), company: body.company.trim(), createdBy: email, createdAt: new Date().toISOString().slice(0, 10) }).returning({ mockId: Question.mockId })
    return NextResponse.json(created, { status: 201 })
  } catch { return NextResponse.json({ error: "Unable to generate questions. Please try again." }, { status: 502 }) }
}

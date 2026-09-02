import { NextResponse } from "next/server"
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { desc, eq } from "drizzle-orm"
import { generateInterviewContent } from "@/utils/GeminiAIModal"
import { getAuthenticatedEmail } from "@/utils/server-user"
import { isRateLimited } from "@/utils/rate-limit"
import { buildPrompt } from "@/utils/prompt"
import { randomUUID, randomInt } from "crypto"

const text = (value, max) => typeof value === "string" && value.trim().length > 0 && value.trim().length <= max

export async function GET() {
  const email = await getAuthenticatedEmail()
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const interviews = await db.select().from(MockInterview).where(eq(MockInterview.createdBy, email)).orderBy(desc(MockInterview.id))
  return NextResponse.json(interviews)
}

export async function POST(request) {
  const email = await getAuthenticatedEmail()
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (isRateLimited(`interview:${email}`, { limit: 4, windowMs: 60_000 })) return NextResponse.json({ error: "Please wait before generating more questions." }, { status: 429 })

  const body = await request.json().catch(() => null)
  if (!body || !text(body.jobPosition, 120) || !text(body.jobDesc, 3000) || !Number.isInteger(Number(body.jobExperience)) || Number(body.jobExperience) < 0 || Number(body.jobExperience) > 50) {
    return NextResponse.json({ error: "Invalid interview details." }, { status: 400 })
  }

  // This public setting is the interview ceiling; the adaptive flow always starts at five.
  const maxQuestionCount = Math.min(10, Math.max(5, Number(process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT) || 10))
  const initialQuestionCount = Math.min(5, maxQuestionCount)
  const prompt = buildPrompt({ task: `Generate exactly ${initialQuestionCount} interview questions and answers as a JSON array. Every item must have Question and Answer string fields. Questions must be distinct.`, jobPosition: body.jobPosition.trim(), jobDescription: body.jobDesc.trim(), yearsOfExperience: Number(body.jobExperience), variationSeed: `${randomUUID()}-${randomInt(1_000_000)}` })
  try {
    const responseText = await generateInterviewContent(prompt)
    const jsonMockResp = responseText.replace(/```json|```/g, "").trim()
    const parsed = JSON.parse(jsonMockResp)
    if (!Array.isArray(parsed) || !parsed.every((item) => text(item?.Question, 1000) && text(item?.Answer, 6000))) throw new Error("Invalid AI response")
    const [created] = await db.insert(MockInterview).values({ mockId: randomUUID(), jsonMockResp, jobPosition: body.jobPosition.trim(), jobDesc: body.jobDesc.trim(), jobExperience: String(body.jobExperience), createdBy: email, createdAt: new Date().toISOString().slice(0, 10) }).returning({ mockId: MockInterview.mockId })
    return NextResponse.json(created, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Unable to generate the interview. Please try again." }, { status: 502 })
  }
}

import { NextResponse } from "next/server"
import { and, eq } from "drizzle-orm"
import { randomInt, randomUUID } from "crypto"
import { db } from "@/utils/db"
import { MockInterview, UserAnswer } from "@/utils/schema"
import { getAuthenticatedEmail } from "@/utils/server-user"
import { generateInterviewContent } from "@/utils/GeminiAIModal"
import { buildPrompt } from "@/utils/prompt"
import { isRateLimited } from "@/utils/rate-limit"

const validItem = (item) => typeof item?.Question === "string" && item.Question.trim().length > 0 && item.Question.length <= 1000 && typeof item?.Answer === "string" && item.Answer.trim().length > 0 && item.Answer.length <= 6000

export async function POST(_request, { params }) {
  const email = await getAuthenticatedEmail()
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (isRateLimited(`follow-up:${email}`, { limit: 2, windowMs: 60_000 })) return NextResponse.json({ error: "Please wait before generating follow-up questions." }, { status: 429 })
  const { mockId } = await params
  const [interview] = await db.select().from(MockInterview).where(and(eq(MockInterview.mockId, mockId), eq(MockInterview.createdBy, email)))
  if (!interview) return NextResponse.json({ error: "Interview not found." }, { status: 404 })
  let questions; try { questions = JSON.parse(interview.jsonMockResp) } catch { return NextResponse.json({ error: "Interview questions are invalid." }, { status: 500 }) }
  const maxQuestionCount = Math.min(10, Math.max(5, Number(process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT) || 10))
  // One adaptive round is deliberate: five baseline answers, then 2–3 targeted
  // follow-ups. This keeps sessions realistic without extending past the cap.
  if (!Array.isArray(questions) || questions.length > 5 || questions.length >= maxQuestionCount) return NextResponse.json({ questions, complete: true })
  const answers = await db.select().from(UserAnswer).where(and(eq(UserAnswer.mockIdRef, mockId), eq(UserAnswer.userEmail, email)))
  if (answers.length < 5) return NextResponse.json({ error: "Complete five answers before continuing." }, { status: 400 })
  const count = Math.min(maxQuestionCount - questions.length, randomInt(2, 4))
  const prompt = buildPrompt({ task: `Generate exactly ${count} additional, distinct follow-up interview questions and answers as a JSON array. Do not repeat any existing question. Use performance feedback to target gaps. Every item must have Question and Answer string fields.`, jobPosition: interview.jobPosition, jobDescription: interview.jobDesc, yearsOfExperience: interview.jobExperience, existingQuestions: questions.map((item) => item.Question), recentPerformance: answers.slice(-5).map((item) => ({ rating: item.rating, feedback: item.feedback })), variationSeed: `${randomUUID()}-${randomInt(1_000_000)}` })
  try {
    const generated = JSON.parse((await generateInterviewContent(prompt)).replace(/```json|```/g, "").trim())
    if (!Array.isArray(generated) || generated.length !== count || !generated.every(validItem)) throw new Error("Invalid AI response")
    const existing = new Set(questions.map((item) => item.Question.trim().toLowerCase()))
    if (generated.some((item) => existing.has(item.Question.trim().toLowerCase()))) throw new Error("Repeated question")
    const updated = [...questions, ...generated]
    await db.update(MockInterview).set({ jsonMockResp: JSON.stringify(updated) }).where(and(eq(MockInterview.mockId, mockId), eq(MockInterview.createdBy, email)))
    return NextResponse.json({ questions: updated, complete: updated.length >= maxQuestionCount })
  } catch { return NextResponse.json({ error: "Unable to generate follow-up questions. Please try again." }, { status: 502 }) }
}

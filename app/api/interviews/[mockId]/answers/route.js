import { NextResponse } from "next/server"
import { and, eq } from "drizzle-orm"
import { db } from "@/utils/db"
import { MockInterview, UserAnswer } from "@/utils/schema"
import { getAuthenticatedEmail } from "@/utils/server-user"
import { generateInterviewContent, transcribeAudio } from "@/utils/GeminiAIModal"
import { isRateLimited } from "@/utils/rate-limit"
import { buildPrompt } from "@/utils/prompt"

export const maxDuration = 60

export async function GET(_request, { params }) {
  const email = await getAuthenticatedEmail()
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { mockId } = await params
  const [interview] = await db.select({ id: MockInterview.id }).from(MockInterview).where(
    and(eq(MockInterview.mockId, mockId), eq(MockInterview.createdBy, email))
  )
  if (!interview) return NextResponse.json({ error: "Interview not found" }, { status: 404 })

  const answers = await db.select().from(UserAnswer).where(
    and(eq(UserAnswer.mockIdRef, mockId), eq(UserAnswer.userEmail, email))
  ).orderBy(UserAnswer.id)
  return NextResponse.json(answers)
}

export async function POST(request, { params }) {
  const email = await getAuthenticatedEmail()
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { mockId } = await params
  if (typeof mockId !== "string" || mockId.length > 100) return NextResponse.json({ error: "Invalid interview." }, { status: 400 })
  const [interview] = await db.select({ id: MockInterview.id }).from(MockInterview).where(and(eq(MockInterview.mockId, mockId), eq(MockInterview.createdBy, email)))
  if (!interview) return NextResponse.json({ error: "Interview not found" }, { status: 404 })
  const body = await request.json().catch(() => null)
  if (!body || typeof body.action !== "string") return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  if (isRateLimited(`answer:${email}`, { limit: 6, windowMs: 60_000 })) return NextResponse.json({ error: "Please wait before submitting again." }, { status: 429 })
  if (body.action === "transcribe") {
    if (typeof body.audio !== "string" || body.audio.length > 4_000_000 || !/^audio\/webm(?:;codecs=opus)?$/.test(body.mimeType)) return NextResponse.json({ error: "Audio is too large or uses an unsupported format. Please record a shorter answer." }, { status: 400 })
    try { return NextResponse.json({ transcription: await transcribeAudio(body.audio, body.mimeType) }) } catch (error) {
      console.error("Gemini transcription failed", { message: error instanceof Error ? error.message : "Unknown error" })
      return NextResponse.json({ error: "Transcription service is unavailable. Please try again shortly." }, { status: 502 })
    }
  }
  if (body.action !== "feedback" || ![body.question, body.correctAnswer, body.userAnswer].every((value) => typeof value === "string" && value.trim() && value.length <= 6000)) return NextResponse.json({ error: "Invalid answer." }, { status: 400 })
  const prompt = buildPrompt({ task: "Evaluate the candidate answer. Return JSON only: {rating: integer 1 through 10, feedback: brief specific actionable feedback}.", question: body.question, referenceAnswer: body.correctAnswer, candidateAnswer: body.userAnswer })
  try {
    const result = JSON.parse((await generateInterviewContent(prompt)).replace(/```json|```/g, "").trim())
    if (!Number.isInteger(result.rating) || result.rating < 1 || result.rating > 10 || typeof result.feedback !== "string" || result.feedback.length > 3000) throw new Error("Invalid feedback")
    await db.insert(UserAnswer).values({ mockIdRef: mockId, question: body.question, correctAns: body.correctAnswer, userAns: body.userAnswer, feedback: result.feedback, rating: String(result.rating), userEmail: email, createdAt: new Date().toISOString().slice(0, 10) })
    return NextResponse.json(result, { status: 201 })
  } catch { return NextResponse.json({ error: "Unable to evaluate your answer." }, { status: 502 }) }
}

import { NextResponse } from "next/server"
import { and, eq } from "drizzle-orm"
import { db } from "@/utils/db"
import { MockInterview, UserAnswer } from "@/utils/schema"
import { getAuthenticatedEmail } from "@/utils/server-user"

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

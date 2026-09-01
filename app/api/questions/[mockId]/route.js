import { NextResponse } from "next/server"
import { and, eq } from "drizzle-orm"
import { db } from "@/utils/db"
import { Question } from "@/utils/schema"
import { getAuthenticatedEmail } from "@/utils/server-user"

export async function GET(_request, { params }) {
  const email = await getAuthenticatedEmail()
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { mockId } = await params
  const [questionSet] = await db.select().from(Question).where(
    and(eq(Question.mockId, mockId), eq(Question.createdBy, email))
  )
  if (!questionSet) return NextResponse.json({ error: "Question set not found" }, { status: 404 })
  return NextResponse.json(questionSet)
}

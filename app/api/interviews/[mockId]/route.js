import { NextResponse } from "next/server"
import { and, eq } from "drizzle-orm"
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { getAuthenticatedEmail } from "@/utils/server-user"

export async function GET(_request, { params }) {
  const email = await getAuthenticatedEmail()
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { mockId } = await params
  const [interview] = await db.select().from(MockInterview).where(
    and(eq(MockInterview.mockId, mockId), eq(MockInterview.createdBy, email))
  )
  if (!interview) return NextResponse.json({ error: "Interview not found" }, { status: 404 })
  return NextResponse.json(interview)
}

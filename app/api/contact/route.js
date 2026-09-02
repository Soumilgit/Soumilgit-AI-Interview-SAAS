import { NextResponse } from "next/server"
import { db } from "@/utils/db"
import { Newsletter } from "@/utils/schema"
import { isRateLimited } from "@/utils/rate-limit"

const validText = (value, max) => typeof value === "string" && value.trim().length > 0 && value.trim().length <= max

export async function POST(request) {
  const body = await request.json().catch(() => null)
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown"
  if (isRateLimited(`contact:${forwardedFor}`, { limit: 3, windowMs: 60_000 })) return NextResponse.json({ error: "Please wait before sending another message." }, { status: 429 })
  if (!body || !validText(body.name, 100) || !validText(body.message, 5000) || typeof body.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) || body.website) return NextResponse.json({ error: "Invalid contact details." }, { status: 400 })
  await db.insert(Newsletter).values({ newName: body.name.trim(), newEmail: body.email.trim().toLowerCase(), newMessage: body.message.trim(), createdAt: new Date().toISOString().slice(0, 10) })
  return NextResponse.json({ success: true }, { status: 201 })
}

import { NextResponse } from "next/server"
import { createHmac, timingSafeEqual } from "crypto"
import { db } from "@/utils/db"
import { Subscription } from "@/utils/schema"
import { ensureSubscriptionTable } from "@/utils/subscriptions"

export const runtime = "nodejs"
const verify = (payload, header, secret) => {
  const timestamp = header?.match(/(?:^|,)t=(\d+)/)?.[1]
  const signatures = header?.match(/(?:^|,)v1=([^,]+)/g)?.map((entry) => entry.split("=")[1]) ?? []
  if (!timestamp || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false
  const expected = createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex")
  return signatures.some((signature) => signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected)))
}
export async function POST(request) {
  const secret = process.env.NEXT_STRIPE_WEBHOOK_SECRET
  if (!secret) return NextResponse.json({ error: "Webhook is not configured." }, { status: 503 })
  const payload = await request.text()
  if (!verify(payload, request.headers.get("stripe-signature"), secret)) return NextResponse.json({ error: "Invalid signature." }, { status: 400 })
  let event; try { event = JSON.parse(payload) } catch { return NextResponse.json({ error: "Invalid payload." }, { status: 400 }) }
  if (!["checkout.session.completed", "checkout.session.async_payment_succeeded"].includes(event.type)) return NextResponse.json({ received: true })
  const session = event.data?.object
  if (!session?.id || session.payment_status !== "paid" || typeof session.client_reference_id !== "string") return NextResponse.json({ received: true })
  const divider = session.client_reference_id.lastIndexOf("_")
  const clerkUserId = session.client_reference_id.slice(0, divider), plan = session.client_reference_id.slice(divider + 1)
  if (!clerkUserId || !["monthly", "yearly"].includes(plan)) return NextResponse.json({ received: true })
  await ensureSubscriptionTable()
  const now = new Date().toISOString()
  await db.insert(Subscription).values({ clerkUserId, userEmail: session.customer_details?.email ?? "", plan, status: "active", stripeSessionId: session.id, amountTotal: String(session.amount_total ?? ""), currency: session.currency ?? "", createdAt: now, updatedAt: now }).onConflictDoNothing()
  return NextResponse.json({ received: true })
}

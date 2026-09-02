import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/utils/server-user"

const links = {
  monthly: process.env.NEXT_STRIPE_MONTHLY_PAYMENT_LINK,
  yearly: process.env.NEXT_STRIPE_YEARLY_PAYMENT_LINK,
}

export async function GET(request, { params }) {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { plan } = await params
  const link = links[plan]
  if (!link) return NextResponse.json({ error: "Payment link is not configured." }, { status: 503 })
  let destination
  try {
    destination = new URL(link)
    if (destination.protocol !== "https:" || destination.hostname !== "buy.stripe.com") throw new Error("Invalid payment URL")
  } catch { return NextResponse.json({ error: "Invalid payment link configuration." }, { status: 503 }) }
  destination.searchParams.set("prefilled_email", user.email)
  destination.searchParams.set("client_reference_id", `${user.id}_${plan}`)
  return NextResponse.redirect(destination)
}

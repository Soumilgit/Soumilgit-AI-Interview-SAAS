import { NextResponse } from "next/server"
import { and, desc, eq } from "drizzle-orm"
import { db } from "@/utils/db"
import { Subscription } from "@/utils/schema"
import { getAuthenticatedUser } from "@/utils/server-user"
import { ensureSubscriptionTable } from "@/utils/subscriptions"

export async function GET() {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  await ensureSubscriptionTable()
  const [subscription] = await db.select().from(Subscription).where(and(eq(Subscription.clerkUserId, user.id), eq(Subscription.status, "active"))).orderBy(desc(Subscription.id))
  return NextResponse.json(subscription ? { isSubscribed: true, plan: subscription.plan, subscribedAt: subscription.createdAt } : { isSubscribed: false })
}

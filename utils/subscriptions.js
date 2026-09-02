import "server-only"
import { sql } from "drizzle-orm"
import { db } from "@/utils/db"

let initialized
export function ensureSubscriptionTable() {
  if (!initialized) initialized = db.execute(sql.raw('CREATE TABLE IF NOT EXISTS "subscription" ("id" serial PRIMARY KEY, "clerkUserId" varchar NOT NULL, "userEmail" varchar NOT NULL, "plan" varchar NOT NULL, "status" varchar NOT NULL, "stripeSessionId" varchar NOT NULL UNIQUE, "amountTotal" varchar, "currency" varchar, "createdAt" varchar NOT NULL, "updatedAt" varchar NOT NULL)'))
  return initialized
}

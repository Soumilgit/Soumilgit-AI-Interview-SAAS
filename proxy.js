import { clerkMiddleware } from "@clerk/nextjs/server"

// Authentication is enforced by each protected API route and by the dashboard
// layout's signed-out redirect. Keep Clerk's proxy for session integration.
export default clerkMiddleware()

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}

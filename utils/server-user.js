import { currentUser } from "@clerk/nextjs/server"

export async function getAuthenticatedEmail() {
  const user = await currentUser()
  return user?.primaryEmailAddress?.emailAddress ?? null
}

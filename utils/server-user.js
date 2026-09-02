import { currentUser } from "@clerk/nextjs/server"

export async function getAuthenticatedEmail() {
  const user = await currentUser()
  return user?.primaryEmailAddress?.emailAddress ?? null
}

export async function getAuthenticatedUser() {
  const user = await currentUser()
  if (!user?.id || !user.primaryEmailAddress?.emailAddress) return null
  return { id: user.id, email: user.primaryEmailAddress.emailAddress }
}

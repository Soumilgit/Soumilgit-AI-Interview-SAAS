"use client"

import { RedirectToSignIn, Show } from "@clerk/nextjs"

export default function DashboardAuthGate({ children }) {
  return <><Show when="signed-in">{children}</Show><Show when="signed-out"><RedirectToSignIn /></Show></>
}

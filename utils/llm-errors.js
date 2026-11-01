export const isLlmRateLimitError = (error) => {
  const status = error?.status ?? error?.statusCode ?? error?.response?.status
  if (status === 429) return true

  const message = error instanceof Error ? error.message : String(error ?? "")
  return /(?:429|rate.?limit|resource.?exhausted|quota)/i.test(message)
}

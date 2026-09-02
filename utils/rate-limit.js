import "server-only"

const requests = new Map()

export function isRateLimited(key, { limit = 6, windowMs = 60_000 } = {}) {
  const now = Date.now()
  const recent = (requests.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs)
  if (recent.length >= limit) {
    requests.set(key, recent)
    return true
  }
  recent.push(now)
  requests.set(key, recent)
  return false
}

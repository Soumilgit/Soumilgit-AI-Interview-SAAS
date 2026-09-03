const asQuestionArray = (value) => {
  if (Array.isArray(value)) return value
  if (Array.isArray(value?.questions)) return value.questions
  if (Array.isArray(value?.Questions)) return value.Questions
  if (Array.isArray(value?.data)) return value.data
  return []
}

// Older interviews were saved directly from the model and may use a wrapper
// object or lower-case field names. Keep them playable without changing history.
export const normalizeInterviewQuestions = (jsonMockResp) => {
  let parsed = jsonMockResp
  if (typeof jsonMockResp === "string") {
    try {
      parsed = JSON.parse(jsonMockResp.replace(/```(?:json)?/gi, "").trim())
    } catch {
      return []
    }
  }

  return asQuestionArray(parsed)
    .map((item) => ({
      Question: item?.Question ?? item?.question,
      Answer: item?.Answer ?? item?.answer,
    }))
    .filter((item) => typeof item.Question === "string" && item.Question.trim() && typeof item.Answer === "string" && item.Answer.trim())
}

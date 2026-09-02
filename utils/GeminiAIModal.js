
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
require("server-only");

const apiKey = process.env.NEXT_GEMINI_API_KEY;
if (!apiKey) throw new Error("NEXT_GEMINI_API_KEY is not configured");
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash-lite",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

export async function generateInterviewContent(prompt) {
  const chatSession = model.startChat({ generationConfig, safetySettings });
  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}

export async function transcribeAudio(audioBase64, mimeType) {
  const result = await model.generateContent([
    "Transcribe this audio accurately. Return only the spoken words.",
    { inlineData: { data: audioBase64, mimeType } },
  ]);
  return result.response.text();
}

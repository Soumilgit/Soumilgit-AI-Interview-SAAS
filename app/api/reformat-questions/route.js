import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { chatSession } from "@/utils/GeminiAIModal";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { mockId, userEmail } = await req.json();

    if (!mockId || !userEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch the question set
    const result = await db
      .select()
      .from(Question)
      .where(eq(Question.mockId, mockId));

    if (!result || result.length === 0) {
      return NextResponse.json(
        { error: "Question set not found" },
        { status: 404 }
      );
    }

    const questionData = result[0];
    
    // Verify ownership
    if (questionData.createdBy !== userEmail) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const existingQuestions = JSON.parse(questionData.mockQuestionJsonResp);

    // Create a reformatting prompt
    const reformatPrompt = `You are an expert interview coach. I have existing interview questions with answers that need better formatting.

Reformat these questions and answers to be clean, structured, and professional:

${JSON.stringify(existingQuestions, null, 2)}

IMPORTANT FORMATTING GUIDELINES FOR ANSWERS:
1. Keep answers concise, clear, and professional (3-5 short paragraphs maximum)
2. Use proper paragraph breaks (use \\n\\n for paragraph separation)
3. Structure answers with:
   - Brief introduction/definition (if applicable)
   - Key points or steps
   - Practical example or use case (if relevant)
   - Brief conclusion or best practice
4. Avoid lengthy explanations - focus on actionable, interview-appropriate responses
5. Use clean, readable text without excessive formatting markers
6. Write in a conversational yet professional tone
7. Each answer should be interview-ready (what a candidate would say in 2-3 minutes)
8. Remove any markdown formatting, asterisks, or special characters
9. Maintain the same questions but improve answer formatting

Return output as pure JSON only with this exact structure:
{
  "questions": [
    {
      "Question": "Original question text",
      "Answer": "Reformatted, clean answer with proper paragraph breaks"
    }
  ]
}

Return only valid JSON without any code blocks or markdown.`;

    const aiResult = await chatSession.sendMessage(reformatPrompt);
    let responseText = aiResult.response.text();
    
    // Clean the response
    responseText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    let reformattedData;
    try {
      reformattedData = JSON.parse(responseText);
      
      if (!reformattedData.questions || !Array.isArray(reformattedData.questions)) {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("JSON parsing error:", error);
      return NextResponse.json(
        { error: "Failed to parse AI response", details: responseText },
        { status: 500 }
      );
    }

    // Update the database with reformatted data
    await db
      .update(Question)
      .set({
        mockQuestionJsonResp: JSON.stringify(reformattedData),
      })
      .where(eq(Question.mockId, mockId));

    return NextResponse.json({
      success: true,
      message: "Questions reformatted successfully",
      data: reformattedData,
    });
  } catch (error) {
    console.error("Error reformatting questions:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { chatSession } from "@/utils/GeminiAIModal";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userEmail } = await req.json();

    if (!userEmail) {
      return NextResponse.json(
        { error: "Missing user email" },
        { status: 400 }
      );
    }

    // Fetch all question sets for the user
    const allQuestions = await db
      .select()
      .from(Question)
      .where(eq(Question.createdBy, userEmail));

    if (!allQuestions || allQuestions.length === 0) {
      return NextResponse.json(
        { error: "No question sets found" },
        { status: 404 }
      );
    }

    let successCount = 0;
    let failCount = 0;
    const errors = [];

    // Process each question set
    for (const questionSet of allQuestions) {
      try {
        const existingQuestions = JSON.parse(questionSet.mockQuestionJsonResp);

        // Create a reformatting prompt
        const reformatPrompt = `You are an expert interview coach. Reformat these interview questions and answers to be clean, structured, and professional.

Original data:
${JSON.stringify(existingQuestions, null, 2)}

FORMATTING GUIDELINES:
1. Keep answers concise, clear, and professional (3-5 short paragraphs maximum)
2. Use proper paragraph breaks (\\n\\n for separation)
3. Structure with: introduction, key points, example, conclusion
4. Remove markdown, asterisks, or special formatting
5. Write in conversational yet professional tone
6. Make answers interview-ready (2-3 minutes spoken)

Return ONLY valid JSON:
{
  "questions": [
    {
      "Question": "Original question",
      "Answer": "Reformatted clean answer"
    }
  ]
}`;

        const aiResult = await chatSession.sendMessage(reformatPrompt);
        let responseText = aiResult.response.text();
        
        // Clean the response
        responseText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        
        const reformattedData = JSON.parse(responseText);
        
        if (!reformattedData.questions || !Array.isArray(reformattedData.questions)) {
          throw new Error("Invalid response format");
        }

        // Update the database
        await db
          .update(Question)
          .set({
            mockQuestionJsonResp: JSON.stringify(reformattedData),
          })
          .where(eq(Question.mockId, questionSet.mockId));

        successCount++;
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`Error reformatting question set ${questionSet.mockId}:`, error);
        failCount++;
        errors.push({
          mockId: questionSet.mockId,
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Reformatted ${successCount} question sets. ${failCount} failed.`,
      successCount,
      failCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Error in bulk reformat:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

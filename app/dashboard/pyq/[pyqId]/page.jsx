"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { chatSession } from "@/utils/GeminiAIModal";

const page = ({ params }) => {
  const [questionData, setQuestionData] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log(params.pyqId);
    getQuestionDetails();
  }, []);

  const getQuestionDetails = async () => {
    try {
      const result = await db
        .select()
        .from(Question)
        .where(eq(Question.mockId, params.pyqId));
      
      const parsed = JSON.parse(result[0].mockQuestionJsonResp);
      const questions = parsed.questions;
      
      // Check if answers need reformatting (simple heuristic: check for poor formatting)
      const needsReformatting = questions.some(q => {
        const answer = q.Answer || "";
        // Check for signs of poor formatting: very long paragraphs, no line breaks, etc.
        return (
          answer.length > 500 && !answer.includes('\n\n') || // Long text without paragraph breaks
          answer.includes('**') || // Markdown formatting
          answer.includes('```') || // Code blocks
          answer.match(/\*\s/g)?.length > 3 // Multiple bullet points with asterisks
        );
      });

      if (needsReformatting && user?.primaryEmailAddress?.emailAddress) {
        // Auto-reformat in background
        autoReformat(result[0].mockId, questions);
      }
      
      setQuestionData(questions);
    } catch (error) {
      console.error("Error loading questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const autoReformat = async (mockId, currentQuestions) => {
    try {
      const reformatPrompt = `You are an expert interview coach. Reformat these interview questions and answers to be clean, structured, and professional.

Original data:
${JSON.stringify({ questions: currentQuestions }, null, 2)}

FORMATTING GUIDELINES:
1. Keep answers concise, clear, and professional (3-5 short paragraphs maximum)
2. Use proper paragraph breaks (use \\n\\n for paragraph separation)
3. Structure with: brief intro, key points, example (if relevant), brief conclusion
4. Remove ALL markdown formatting (**, *, _, \`\`\`, etc.)
5. Remove bullet point markers (*, -, •) - write in flowing paragraphs
6. Write in conversational yet professional tone
7. Each answer should be interview-ready (2-3 minutes spoken)
8. Use simple, clean text without any special characters

Return ONLY valid JSON:
{
  "questions": [
    {
      "Question": "Original question text",
      "Answer": "Clean, well-structured answer with paragraph breaks using \\n\\n"
    }
  ]
}`;

      const aiResult = await chatSession.sendMessage(reformatPrompt);
      let responseText = aiResult.response.text();
      
      // Clean the response
      responseText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      
      const reformattedData = JSON.parse(responseText);
      
      if (reformattedData.questions && Array.isArray(reformattedData.questions)) {
        // Update the database silently
        await db
          .update(Question)
          .set({
            mockQuestionJsonResp: JSON.stringify(reformattedData),
          })
          .where(eq(Question.mockId, mockId));
        
        // Update UI with reformatted data
        setQuestionData(reformattedData.questions);
      }
    } catch (error) {
      console.error("Auto-reformat failed:", error);
      // Silently fail - don't disrupt user experience
    }
  };




  return (
    <div className="p-10 my-5">
      <div className="mb-6">
        <Button
          onClick={() => router.push("/dashboard/question")}
          variant="ghost"
          className="gap-2 mb-4 hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Questions
        </Button>
        
        <h2 className="text-3xl font-bold text-primary">Practice Questions</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Expand each question to view the detailed answer
        </p>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading questions...</p>
          </div>
        </div>
      ) : questionData ? (
      <Accordion type="single" collapsible className="space-y-4">
        {questionData &&
          questionData.map((item, index) => (
            <AccordionItem 
              value={`item-${index + 1}`} 
              key={index} 
              className="border rounded-lg px-4 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left hover:no-underline py-4">
                <span className="font-semibold text-base">
                  {index + 1}. {item?.Question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-lg">
                  <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                    {item?.Answer}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No questions found</p>
        </div>
      )}
    </div>
  );
};

export default page;

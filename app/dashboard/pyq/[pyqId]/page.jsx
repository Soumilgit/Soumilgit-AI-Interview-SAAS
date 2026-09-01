"use client";

import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const QuestionPracticePage = ({ params }) => {
  const [questionData, setQuestionData] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadQuestionSet = async () => {
      try {
        const response = await fetch(`/api/questions/${params.pyqId}`);
        if (!response.ok) return;
        const questionSet = await response.json();
        setQuestionData(JSON.parse(questionSet.mockQuestionJsonResp).questions);
      } catch (error) {
        console.error("Error loading questions:", error);
      } finally {
        setLoading(false);
      }
    };
    loadQuestionSet();
  }, [params.pyqId]);

  return <div className="p-10 my-5">
    <div className="mb-6">
      <Button onClick={() => router.push("/dashboard/question")} variant="ghost" className="gap-2 mb-4 hover:bg-secondary"><ArrowLeft className="h-4 w-4" />Back to Questions</Button>
      <h2 className="text-3xl font-bold text-primary">Practice Questions</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2">Expand each question to view the detailed answer</p>
    </div>
    {loading ? <div className="flex items-center justify-center py-20"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" /><p className="mt-4 text-gray-600">Loading questions...</p></div></div>
      : questionData ? <Accordion type="single" collapsible className="space-y-4">{questionData.map((item, index) => <AccordionItem value={`item-${index + 1}`} key={index} className="border rounded-lg px-4 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow"><AccordionTrigger className="text-left hover:no-underline py-4"><span className="font-semibold text-base">{index + 1}. {item?.Question}</span></AccordionTrigger><AccordionContent className="pt-2 pb-4"><div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-lg"><div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">{item?.Answer}</div></div></AccordionContent></AccordionItem>)}</Accordion>
      : <div className="text-center py-10"><p className="text-gray-500">No questions found or you do not have access to this question set.</p></div>}
  </div>;
};

export default QuestionPracticePage;

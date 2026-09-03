"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { normalizeInterviewQuestions } from "@/utils/interview-questions";

const StartInterview = () => {
  const { interviewId } = useParams();
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loadingFollowUp, setLoadingFollowUp] = useState(false);
  const [loadError, setLoadError] = useState("");
  useEffect(() => {
    if (interviewId) GetInterviewDetails();
  }, [interviewId]);

  const GetInterviewDetails = async () => {
    const response = await fetch(`/api/interviews/${interviewId}`);
    if (!response.ok) return;
    const interview = await response.json();
    const questions = normalizeInterviewQuestions(interview.jsonMockResp);
    if (!questions.length) setLoadError("This interview's saved questions could not be read.");
    setMockInterviewQuestion(questions);
    setInterviewData(interview);
  };

  const continueAdaptiveInterview = async () => {
    setLoadingFollowUp(true);
    try {
      const response = await fetch(`/api/interviews/${interviewData?.mockId}/follow-up`, { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to generate follow-up questions");
      setMockInterviewQuestion(normalizeInterviewQuestions(data.questions));
      if (data.questions.length > activeQuestionIndex + 1) setActiveQuestionIndex(activeQuestionIndex + 1);
    } catch (error) {
      alert(error.message || "Unable to continue the interview.");
    } finally { setLoadingFollowUp(false); }
  };

  return (
    <div>
      {loadError && <p className="mx-5 mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{loadError}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 my-10">
        {/* Questin Section */}
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video/audio Recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex gap-3 my-5 md:my-0 md:justify-end md:gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && mockInterviewQuestion?.length === 5 && (Number(process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT) || 10) > 5 && (
          <Button onClick={continueAdaptiveInterview} disabled={loadingFollowUp}>{loadingFollowUp ? "Preparing follow-up questions..." : "Continue adaptive interview"}</Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button variant="outline">End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;

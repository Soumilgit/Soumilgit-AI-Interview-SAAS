"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loadingFollowUp, setLoadingFollowUp] = useState(false);
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const response = await fetch(`/api/interviews/${params.interviewId}`);
    if (!response.ok) return;
    const interview = await response.json();
    const jsonMockResp = JSON.parse(interview.jsonMockResp);
    console.log(jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(interview);
  };

  const continueAdaptiveInterview = async () => {
    setLoadingFollowUp(true);
    try {
      const response = await fetch(`/api/interviews/${interviewData?.mockId}/follow-up`, { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to generate follow-up questions");
      setMockInterviewQuestion(data.questions);
      if (data.questions.length > activeQuestionIndex + 1) setActiveQuestionIndex(activeQuestionIndex + 1);
    } catch (error) {
      alert(error.message || "Unable to continue the interview.");
    } finally { setLoadingFollowUp(false); }
  };

  return (
    <div>
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
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && mockInterviewQuestion?.length < (Number(process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT) || 10) && (
          <Button onClick={continueAdaptiveInterview} disabled={loadingFollowUp}>{loadingFollowUp ? "Preparing follow-up questions..." : "Continue adaptive interview"}</Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && mockInterviewQuestion?.length >= (Number(process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT) || 10) && (
          <Link
            href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;

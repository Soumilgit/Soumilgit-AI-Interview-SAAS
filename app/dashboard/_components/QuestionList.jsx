"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import QuestionItemCard from "./QuestionItemCard";
import { Skeleton } from "@/components/ui/skeleton";

const QuestionList = () => {
  const { user, isLoaded } = useUser();
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) GetQuestionList();
    if (isLoaded && !user) setLoading(false);
  }, [user, isLoaded]);

  const GetQuestionList = async () => {
    try {
      const response = await fetch("/api/questions", { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load question sets");
      setQuestionList(await response.json());
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[180px] rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8">
      {questionList.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold mb-6">Your Question Sets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {questionList.map((question) => (
              <QuestionItemCard key={question.mockId} question={question} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            No question sets yet. Create your first one!
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionList;

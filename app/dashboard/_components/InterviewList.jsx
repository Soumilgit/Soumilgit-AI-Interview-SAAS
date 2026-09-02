"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { Skeleton } from "@/components/ui/skeleton";

const InterviewList = () => {
  const { user, isLoaded } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) GetInterviewList();
    if (isLoaded && !user) setLoading(false);
  }, [user, isLoaded]);

  const GetInterviewList = async () => {
    try {
      const response = await fetch("/api/interviews", { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load interviews");
      setInterviewList(await response.json());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="font-medium text-2xl mb-6 border-b pb-2 text-foreground">
        Previous Mock Interviews
      </h2>
  
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[180px] rounded-xl" />
          ))}
        </div>
      ) : interviewList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {interviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            No interviews yet. Create your first one!
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewList;

"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

const Feedback = () => {
  const { interviewId } = useParams();
  const router = useRouter(); const [feedbackList, setFeedbackList] = useState([]);
  useEffect(() => { if (interviewId) fetch(`/api/interviews/${interviewId}/answers`).then((response) => response.ok ? response.json() : []).then(setFeedbackList); }, [interviewId]);
  const attempts = useMemo(() => { const newest = [...feedbackList].reverse(); return Array.from({ length: Math.ceil(newest.length / 5) }, (_, index) => newest.slice(index * 5, index * 5 + 5)); }, [feedbackList]);
  const score = (attempt) => (attempt.reduce((sum, item) => sum + Math.min(10, Math.max(1, Number(item.rating) || 1)), 0) / attempt.length).toFixed(1);
  if (!feedbackList.length) return <div className="p-10"><h2 className="my-5 text-xl font-bold text-gray-500">No interview feedback record found.</h2><Button onClick={() => router.replace("/dashboard")}>Go Home</Button></div>;
  return <div className="p-10"><h2 className="text-3xl font-bold text-green-500">Interview feedback</h2><p className="mt-2 text-sm text-gray-500">Your latest attempt is first. Feedback is retained and grouped in sets of five answers.</p>{attempts.map((attempt, attemptIndex) => <section key={attemptIndex} className="mt-7 rounded-xl border p-5"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-xl font-bold">Attempt {attempts.length - attemptIndex}</h3><strong className={Number(score(attempt)) >= 5 ? "text-green-600" : "text-red-600"}>{score(attempt)}/10</strong></div>{attempt.map((item) => <Collapsible key={item.id} className="mt-4"><CollapsibleTrigger className="flex w-full justify-between gap-7 rounded-lg bg-secondary p-3 text-left">{item.question}<ChevronDown className="h-5 w-5 shrink-0" /></CollapsibleTrigger><CollapsibleContent className="space-y-2 pt-2"><p className="rounded-lg border p-2 text-red-600"><strong>Rating:</strong> {Math.min(10, Math.max(1, Number(item.rating) || 1))}/10</p><p className="rounded-lg border bg-red-50 p-2 text-sm text-red-900"><strong>Your answer:</strong> {item.userAns}</p><p className="rounded-lg border bg-green-50 p-2 text-sm text-green-900"><strong>Reference answer:</strong> {item.correctAns}</p><p className="rounded-lg border bg-blue-50 p-2 text-sm text-black"><strong>Feedback:</strong> {item.feedback}</p></CollapsibleContent></Collapsible>)}</section>)}<Button className="mt-8" onClick={() => router.replace("/dashboard")}>Go Home</Button></div>;
};
export default Feedback;

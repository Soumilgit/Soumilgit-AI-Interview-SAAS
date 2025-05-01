import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddQuestions from "../_components/AddQuestions";
import QuestionList from "../_components/QuestionList";

const Questions = () => {
  return (
    <div className="min-h-screen p-6 md:p-10 bg-background text-foreground">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Interview Question Bank
          </h2>
          <p className="text-muted-foreground mt-2">
            Prepare with AI-generated questions tailored to your target role
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <AddQuestions />
      </div>

      <QuestionList />
    </div>
  );
};

export default Questions;
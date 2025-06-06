import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6 md:p-10 bg-background text-foreground transition-colors duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-bold text-3xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            SimulateRecruitAI
          </h2>
          <h2 className="text-muted-foreground">
            Create and start your AI Mock Interview
          </h2>
        </div>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-5">
        <AddNewInterview />
      </div>

      <InterviewList />
    </div>
  );
};

export default Dashboard;

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Briefcase, Clock, CalendarDays } from "lucide-react";

const QuestionItemCard = ({ question }) => {
  const router = useRouter();
  
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-card text-card-foreground">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <Briefcase className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-lg">{question.jobPosition}</h2>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Clock className="w-4 h-4" />
          <span>{question.jobExperience} years experience</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="w-4 h-4" />
          <span>Created: {question.createdAt}</span>
        </div>
      </div>
      
      <div className="bg-muted/50 px-5 py-3 border-t">
        <Button 
          onClick={() => router.push(`/dashboard/pyq/${question.mockId}`)}
          className="w-full"
        >
          Practice Now
        </Button>
      </div>
    </div>
  );
};

export default QuestionItemCard;
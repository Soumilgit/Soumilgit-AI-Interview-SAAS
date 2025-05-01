import React from 'react'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { CalendarDays, Briefcase, Clock } from 'lucide-react';

const InterviewItemCard = ({interview}) => {
    const router = useRouter()
    
    const onStart = () => {
        router.push("/dashboard/interview/"+interview?.mockId)
    }
    
    const onFeedback = () => {
        router.push("/dashboard/interview/"+interview?.mockId+"/feedback")
    }

  return (
    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-card text-card-foreground">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <Briefcase className="w-5 h-5 text-primary" />
          <h2 className='font-semibold text-lg'>{interview?.jobPosition}</h2>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Clock className="w-4 h-4" />
          <span>{interview?.jobExperience} years experience</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="w-4 h-4" />
          <span>Created: {interview.createdAt}</span>
        </div>
      </div>
      
      <div className='bg-muted/50 px-5 py-3 flex gap-3 border-t'>
        <Button 
          onClick={onFeedback} 
          variant="outline" 
          className="w-full hover:bg-primary/10 hover:text-primary"
        >
          Feedback
        </Button>
        <Button 
          onClick={onStart} 
          className="w-full"
        >
          Start
        </Button>
      </div>
    </div>
  )
}

export default InterviewItemCard
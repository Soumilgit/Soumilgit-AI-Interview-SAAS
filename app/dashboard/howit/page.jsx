import Head from "next/head";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Rocket, ListChecks, Mic2, Star, ClipboardCheck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Create Your Interview",
      description: "Select your job position, tech stack, and experience level to generate customized interview questions.",
      icon: <ClipboardCheck className="w-6 h-6" />,
      value: "item-1"
    },
    {
      title: "Start Your AI Interview",
      description: "Our AI interviewer will ask you realistic questions just like a human interviewer would.",
      icon: <Mic2 className="w-6 h-6" />,
      value: "item-2"
    },
    {
      title: "Record Your Answers",
      description: "Respond naturally - our system analyzes both your verbal content and delivery.",
      icon: <ListChecks className="w-6 h-6" />,
      value: "item-3"
    },
    {
      title: "Get Detailed Feedback",
      description: "Receive comprehensive analysis on your answers, communication skills, and areas for improvement.",
      icon: <Star className="w-6 h-6" />,
      value: "item-4"
    },
    {
      title: "Improve & Repeat",
      description: "Practice makes perfect! Track your progress over time with our performance analytics.",
      icon: <Rocket className="w-6 h-6" />,
      value: "item-5"
    }
  ];

  return (
    <>
      <Head>
        <title>How It Works - AI Mock Interview</title>
        <meta
          name="description"
          content="Learn how our AI Mock Interview platform helps you prepare for your dream job."
        />
      </Head>
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              How It Works
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Master your interview skills with our AI-powered platform in just a few simple steps
            </p>
          </div>

          <div className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              {steps.map((step, index) => (
                <AccordionItem 
                  key={step.value} 
                  value={step.value}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="p-6 hover:no-underline">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                        {step.icon}
                      </div>
                      <div className="text-left">
                        <h2 className="text-xl font-semibold">
                          {step.title}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          Step {index + 1} of {steps.length}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-muted-foreground">
                    {step.description}
                    {index === 0 && (
                      <div className="mt-4 p-4 rounded-lg bg-muted">
                        <h3 className="font-medium text-foreground mb-2">Pro Tip:</h3>
                        <p>Be specific about your tech stack for the most relevant questions.</p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
                Ready to get started?
              </div>
              <p className="mt-4 text-muted-foreground">
                Create your first mock interview in just 2 minutes
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HowItWorks;
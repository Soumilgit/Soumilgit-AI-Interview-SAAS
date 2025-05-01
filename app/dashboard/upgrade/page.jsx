"use client";
import React from "react";
import PricingPlan from "../_components/PricingPlan";
import { useUser } from "@clerk/nextjs";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const Upgrade = () => {
  const { user } = useUser();
  const { theme } = useTheme();

  const features = [
    "Unlimited mock interviews",
    "AI-powered feedback",
    "Interview analytics",
    "Priority support",
    "Custom question sets",
    "Export interview reports"
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Upgrade Your Interview Prep
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Unlock premium features to supercharge your interview preparation
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PricingPlan.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl border overflow-hidden transition-all hover:shadow-lg ${
                plan.popular
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border"
              } ${
                theme === "dark"
                  ? "bg-card/50"
                  : "bg-background"
              }`}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{plan.duration}</h2>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-4xl font-bold">{plan.price}$</span>
                  <span className="text-muted-foreground">
                    {" "}
                    / {plan.duration.split(" ")[0].toLowerCase()}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  <a
                    href={
                      plan.link +
                      "?prefilled_email=" +
                      user?.primaryEmailAddress?.emailAddress
                    }
                    target="_blank"
                  >
                    Get Started
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="M12 2v4" />
              <path d="m16 6-4-4-4 4" />
              <path d="M8 12H4a2 2 0 0 1-2-2V6" />
            </svg>
            Enterprise plans available
          </div>
          <p className="mt-4 text-muted-foreground">
            Need custom solutions for your team?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact sales
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
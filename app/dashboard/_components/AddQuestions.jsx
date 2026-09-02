"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddQuestions = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    jobPosition: "",
    jobDesc: "",
    typeQuestion: "",
    company: "",
    jobExperience: ""
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("/api/questions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const resp = await response.json();
      if (!response.ok) throw new Error(resp.error || "Unable to generate questions");

      toast.success("Questions generated successfully!");
      router.push(`/dashboard/pyq/${resp.mockId}`);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "There was an error processing your request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-8 rounded-xl border-2 border-dashed border-primary/30 hover:border-primary/60 bg-gradient-to-br from-background to-muted/50 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center justify-center h-full min-h-[180px] group"
        onClick={() => setOpenDialog(true)}
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary w-6 h-6"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </div>
        <h2 className="text-lg font-medium text-center text-primary">
          + Add New Questions
        </h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Generate Practice Questions</DialogTitle>
            <DialogDescription>
              Provide details to get customized interview questions
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Role/Position*
                </label>
                <Input
                  name="jobPosition"
                  value={formData.jobPosition}
                  placeholder="e.g. Full Stack Developer"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Years of Experience*
                </label>
                <Input
                  name="jobExperience"
                  type="number"
                  min="0"
                  max="50"
                  value={formData.jobExperience}
                  placeholder="e.g. 3"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Job Description/Tech Stack*
              </label>
              <Textarea
                name="jobDesc"
                value={formData.jobDesc}
                placeholder="e.g. React, Node.js, PostgreSQL, AWS"
                required
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Question Type*
                </label>
                <Input
                  name="typeQuestion"
                  value={formData.typeQuestion}
                  placeholder="e.g. DSA, System Design, Behavioral"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Target Company*
                </label>
                <Input
                  name="company"
                  value={formData.company}
                  placeholder="e.g. Google, Amazon, Microsoft"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2" />
                    Generating Questions
                  </>
                ) : (
                  "Generate Questions"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddQuestions;

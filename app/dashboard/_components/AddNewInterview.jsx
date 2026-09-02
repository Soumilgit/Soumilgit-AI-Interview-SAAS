"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/interviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ jobPosition, jobDesc, jobExperience }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to create interview");
      setOpenDialog(false);
      router.push("/dashboard/interview/" + data.mockId);
    } catch (error) {
      toast.error(error.message || "Unable to create interview");
    } finally { setLoading(false); }
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
          Create New Interview
        </h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Create New Mock Interview
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Provide details about the position you're preparing for
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Job Role / Position
              </label>
              <Input
                className="mt-1"
                placeholder="e.g. Full Stack Developer"
                required
                onChange={(e) => setJobPosition(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Job Description / Tech Stack
              </label>
              <Textarea
                className="min-h-[120px]"
                placeholder="e.g. React, Node.js, PostgreSQL, AWS"
                required
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Years of Experience
              </label>
              <Input
                type="number"
                min="0"
                max="50"
                placeholder="e.g. 3"
                required
                onChange={(e) => setJobExperience(e.target.value)}
              />
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
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;

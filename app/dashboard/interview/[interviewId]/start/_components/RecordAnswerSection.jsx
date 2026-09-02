"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { WebCamContext } from "@/app/dashboard/layout";

const RecordAnswerSection = ({ mockInterviewQuestion, activeQuestionIndex, interviewData }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const submittedRef = useRef(false);
  const endpoint = `/api/interviews/${interviewData?.mockId}/answers`;

  useEffect(() => { if (!isRecording && userAnswer.length > 10 && !submittedRef.current) updateUserAnswer(); }, [userAnswer, isRecording]);
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream); chunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => { if (event.data.size > 0) chunksRef.current.push(event.data); };
      mediaRecorderRef.current.onstop = async () => { stream.getTracks().forEach((track) => track.stop()); await transcribeAudio(new Blob(chunksRef.current, { type: "audio/webm" })); };
      mediaRecorderRef.current.start(); setIsRecording(true);
    } catch { toast.error("Please allow microphone access to record an answer."); }
  };
  const stopRecording = () => { if (mediaRecorderRef.current && isRecording) { mediaRecorderRef.current.stop(); setIsRecording(false); } };
  const transcribeAudio = async (audioBlob) => {
    setLoading(true);
    try {
      const audio = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onloadend = () => resolve(String(reader.result).split(",")[1]); reader.onerror = reject; reader.readAsDataURL(audioBlob); });
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "transcribe", audio, mimeType: "audio/webm" }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      setUserAnswer(data.transcription.trim());
    } catch (error) { toast.error(error.message || "Unable to transcribe audio."); setLoading(false); }
  };
  const updateUserAnswer = async () => {
    submittedRef.current = true; setLoading(true);
    try {
      const question = mockInterviewQuestion[activeQuestionIndex];
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "feedback", question: question?.Question, correctAnswer: question?.Answer, userAnswer }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      toast.success("Answer and feedback saved."); setUserAnswer("");
    } catch (error) { toast.error(error.message || "Unable to evaluate your answer."); } finally { submittedRef.current = false; setLoading(false); }
  };
  return <div className="flex flex-col items-center justify-center overflow-hidden"><div className="mt-4 flex w-[30rem] max-w-full flex-col items-center justify-center rounded-lg bg-black p-5">{webCamEnabled ? <Webcam mirrored style={{ height: 250, width: "100%", zIndex: 10 }} /> : <Image src="/camera.jpg" width={200} height={200} alt="Camera placeholder" />}</div><div className="mt-4 md:mt-8 md:flex md:gap-5"><div className="my-4 md:my-0"><Button onClick={() => setWebCamEnabled((value) => !value)}>{webCamEnabled ? "Close WebCam" : "Enable WebCam"}</Button></div><Button variant="outline" onClick={isRecording ? stopRecording : startRecording} disabled={loading}>{isRecording ? <span className="flex gap-2 text-red-400"><Mic /> Stop Recording...</span> : "Record Answer"}</Button></div></div>;
};
export default RecordAnswerSection;

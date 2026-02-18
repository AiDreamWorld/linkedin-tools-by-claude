import InterviewQuestionsGeneratorTool from "@/components/tools/InterviewQuestionsGeneratorTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Interview Questions Generator | Practice Questions",
  description: "Generate practice interview questions for any role. Behavioral, technical, and situational questions.",
  keywords: "interview questions generator, practice interview questions, job interview prep",
};

export default function InterviewQuestionsGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#7c3aed] to-[#db2777] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Interview Questions Generator</h1>
          <p className="text-purple-100">Generate practice interview questions for any role</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <InterviewQuestionsGeneratorTool />
      </div>
    </div>
  );
}

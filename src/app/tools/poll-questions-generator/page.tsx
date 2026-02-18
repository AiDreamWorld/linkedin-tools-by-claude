import PollQuestionsGenerator from "@/components/tools/PollQuestionsGenerator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Poll Questions Generator | Engagement",
  description: "Create engaging poll questions for LinkedIn to boost engagement and start conversations.",
  keywords: "linkedin poll questions, engagement generator, linkedin polls",
};

export default function PollQuestionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#0A66C2] to-[#057642] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Poll Questions Generator</h1>
          <p className="text-blue-100">Create engaging polls for your audience</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PollQuestionsGenerator />
      </div>
    </div>
  );
}

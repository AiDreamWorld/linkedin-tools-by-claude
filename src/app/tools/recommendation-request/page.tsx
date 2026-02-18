import RecommendationRequestTool from "@/components/tools/RecommendationRequestTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Recommendation Request Generator",
  description: "Create professional requests for LinkedIn recommendations from colleagues, managers, and clients.",
  keywords: "linkedin recommendation request, request recommendation, linkedin endorsements",
};

export default function RecommendationRequestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#7c3aed] to-[#db2777] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Recommendation Request</h1>
          <p className="text-purple-100">Request recommendations professionally</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <RecommendationRequestTool />
      </div>
    </div>
  );
}

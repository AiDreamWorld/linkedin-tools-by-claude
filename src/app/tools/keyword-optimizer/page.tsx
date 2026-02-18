import KeywordOptimizerTool from "@/components/tools/KeywordOptimizerTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Keyword Optimizer | Profile SEO",
  description: "Find the best keywords to optimize your LinkedIn profile for better visibility and search ranking.",
  keywords: "linkedin keyword optimizer, profile seo, linkedin search optimization",
};

export default function KeywordOptimizerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#db2777] to-[#ea580c] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Profile Keyword Optimizer</h1>
          <p className="text-pink-100">Find keywords to improve your LinkedIn profile visibility</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <KeywordOptimizerTool />
      </div>
    </div>
  );
}

import HeadlineOptimizerTool from "@/components/tools/HeadlineOptimizerTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Headline Optimizer | Improve Your Profile Headline",
  description: "Optimize your LinkedIn headline for better visibility and engagement.",
  keywords: "linkedin headline optimizer, headline improvement, profile optimization",
};

export default function HeadlineOptimizerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#057642] to-[#0A66C2] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn Headline Optimizer</h1>
          <p className="text-xl text-green-100 mb-6">Improve your headline for better visibility</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <HeadlineOptimizerTool />
      </div>
    </div>
  );
}

import CustomURLOptimizer from "@/components/tools/CustomURLOptimizer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Custom URL Optimizer | Profile Link",
  description: "Create and optimize your LinkedIn profile URL for better visibility and easier sharing.",
  keywords: "linkedin custom url, profile url optimizer, linkedin link",
};

export default function CustomURLOptimizerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#057642] to-[#0A66C2] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Custom URL Optimizer</h1>
          <p className="text-green-100">Optimize your LinkedIn profile URL</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CustomURLOptimizer />
      </div>
    </div>
  );
}

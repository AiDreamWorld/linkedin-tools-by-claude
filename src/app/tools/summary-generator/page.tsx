import SummaryGeneratorTool from "@/components/tools/SummaryGeneratorTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Summary Generator | AI-Powered About Section",
  description: "Generate a compelling LinkedIn summary (About section) with AI.",
  keywords: "linkedin summary generator, about section generator, bio writer",
};

export default function SummaryGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#7c3aed] to-[#db2777] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn Summary Generator</h1>
          <p className="text-xl text-purple-100 mb-6">Create a compelling About section</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <SummaryGeneratorTool />
      </div>
    </div>
  );
}

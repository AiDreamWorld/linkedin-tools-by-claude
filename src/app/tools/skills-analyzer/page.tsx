import SkillsAnalyzerTool from "@/components/tools/SkillsAnalyzerTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Skills Analyzer | Analyze Your Skills",
  description: "Analyze your LinkedIn skills and get recommendations.",
  keywords: "linkedin skills analyzer, skills analysis, endorsement tips",
};

export default function SkillsAnalyzerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn Skills Analyzer</h1>
          <p className="text-xl text-blue-100 mb-6">Analyze and improve your skills section</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <SkillsAnalyzerTool />
      </div>
    </div>
  );
}

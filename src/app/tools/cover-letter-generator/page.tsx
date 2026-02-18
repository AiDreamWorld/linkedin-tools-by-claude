import CoverLetterGeneratorTool from "@/components/tools/CoverLetterGeneratorTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cover Letter Generator | LinkedIn Based",
  description: "Generate a professional cover letter based on your LinkedIn profile.",
  keywords: "cover letter generator, linkedin cover letter, job application",
};

export default function CoverLetterGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#7c3aed] to-[#057642] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cover Letter Generator</h1>
          <p className="text-xl text-purple-100 mb-6">Create a cover letter from your LinkedIn profile</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CoverLetterGeneratorTool />
      </div>
    </div>
  );
}

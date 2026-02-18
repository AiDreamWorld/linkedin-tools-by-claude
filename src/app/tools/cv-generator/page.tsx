import CvGeneratorTool from "@/components/tools/CvGeneratorTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn CV Generator | Create Professional Resume",
  description: "Generate a professional CV/resume from your LinkedIn profile data. Export to PDF.",
  keywords: "linkedin cv generator, resume builder, linkedin to resume, cv maker",
};

export default function CvGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#0A66C2] to-[#057642] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn CV Generator</h1>
          <p className="text-xl text-blue-100 mb-6">Create a professional resume from your LinkedIn</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CvGeneratorTool />
      </div>
    </div>
  );
}

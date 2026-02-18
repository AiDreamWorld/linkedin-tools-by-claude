import ConnectionRequestGeneratorTool from "@/components/tools/ConnectionRequestGeneratorTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Connection Request Generator | Personalized Messages",
  description: "Generate personalized LinkedIn connection request messages for students and professionals. Free tool.",
  keywords: "linkedin connection request generator, linkedin message generator, networking messages",
};

export default function ConnectionRequestGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">LinkedIn Connection Request Generator</h1>
          <p className="text-blue-100">Create personalized outreach messages for networking</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ConnectionRequestGeneratorTool />
      </div>
    </div>
  );
}

import InMailGeneratorTool from "@/components/tools/InMailGeneratorTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn InMail Generator | Premium Messaging",
  description: "Create professional InMail messages to reach out to potential connections, recruiters, and business partners.",
  keywords: "linkedin inmail generator, premium message, linkedin outreach",
};

export default function InMailGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">LinkedIn InMail Generator</h1>
          <p className="text-blue-100">Create compelling InMail messages to reach out</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <InMailGeneratorTool />
      </div>
    </div>
  );
}

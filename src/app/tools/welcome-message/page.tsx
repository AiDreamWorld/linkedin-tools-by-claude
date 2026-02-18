import ConnectionWelcomeTool from "@/components/tools/ConnectionWelcomeTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Welcome Message Generator | New Connection",
  description: "Create warm, professional welcome messages for your new LinkedIn connections.",
  keywords: "linkedin welcome message, connection message, linkedin greeting",
};

export default function ConnectionWelcomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#ea580c] to-[#db2777] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome Message Generator</h1>
          <p className="text-orange-100">Create warm messages for new connections</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ConnectionWelcomeTool />
      </div>
    </div>
  );
}

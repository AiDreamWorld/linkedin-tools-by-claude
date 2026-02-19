import CompanyResearchTool from "@/components/tools/CompanyResearchTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Company Research Tool | Before Your Next Interview",
  description: "Instantly research any company — culture, size, growth, and interview tips. Prepare smarter for interviews and job applications. Free, no sign-up required.",
  keywords: "company research tool, company insights, interview preparation, company culture, company background check",
};

export default function CompanyResearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#ea580c] to-[#db2777] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Company Research Tool</h1>
          <p className="text-orange-100">Get quick insights about companies you're interested in</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CompanyResearchTool />
      </div>
    </div>
  );
}

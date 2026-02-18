import EndorsementTrackerTool from "@/components/tools/EndorsementTrackerTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Endorsement Tracker | Track Your Endorsements",
  description: "Track and manage your LinkedIn skill endorsements.",
  keywords: "linkedin endorsement tracker, skills endorsement, linkedin tips",
};

export default function EndorsementTrackerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#057642] to-[#db2777] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn Endorsement Tracker</h1>
          <p className="text-xl text-green-100 mb-6">Track your skill endorsements</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <EndorsementTrackerTool />
      </div>
    </div>
  );
}

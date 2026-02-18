import ProfileToPdfTool from "@/components/tools/ProfileToPdfTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Profile to PDF | Export Your Profile",
  description: "Export your LinkedIn profile to PDF document.",
  keywords: "linkedin profile to pdf, export linkedin, download profile",
};

export default function ProfileToPdfPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#ea580c] to-[#0A66C2] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn Profile to PDF</h1>
          <p className="text-xl text-orange-100 mb-6">Export your profile as a PDF document</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ProfileToPdfTool />
      </div>
    </div>
  );
}

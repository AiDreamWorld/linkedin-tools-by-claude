import SalaryResearchTool from "@/components/tools/SalaryResearchTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Salary Research Tool | Know Your Market Value",
  description: "Research salary ranges for any role, experience level, and location. Stop underselling yourself — know your market value before your next negotiation. Free, no sign-up.",
  keywords: "salary research tool, salary calculator, job salary data, market salary, pay negotiation, salary by role",
};

export default function SalaryResearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#057642] to-[#0A66C2] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Salary Research Tool</h1>
          <p className="text-green-100">Research salary ranges for different roles and locations</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <SalaryResearchTool />
      </div>
    </div>
  );
}

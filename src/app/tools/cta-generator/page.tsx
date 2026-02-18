import CTAGenerator from "@/components/tools/CTAGenerator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn CTA Generator | Call to Action",
  description: "Generate compelling call-to-action phrases for your LinkedIn posts to drive engagement.",
  keywords: "linkedin cta generator, call to action, linkedin engagement",
};

export default function CTAGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#ea580c] to-[#db2777] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">CTA Generator</h1>
          <p className="text-orange-100">Create compelling call-to-actions</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CTAGenerator />
      </div>
    </div>
  );
}

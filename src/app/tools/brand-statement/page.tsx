import BrandStatementGeneratorTool from "@/components/tools/BrandStatementGeneratorTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Brand Statement Generator | Personal Brand",
  description: "Create a compelling personal brand statement for your LinkedIn profile. Stand out with a unique value proposition.",
  keywords: "linkedin brand statement, personal brand, value proposition, personal branding",
};

export default function BrandStatementPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#db2777] to-[#7c3aed] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Brand Statement Generator</h1>
          <p className="text-pink-100">Create your personal brand statement</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BrandStatementGeneratorTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What Makes a Great Brand Statement?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Be Specific</h3>
            <p className="text-gray-600 text-sm">Clearly state who you help and what results you deliver. Avoid generic statements.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Show Your Unique Value</h3>
            <p className="text-gray-600 text-sm">What makes you different from others in your field? Highlight your unique approach.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Keep It Concise</h3>
            <p className="text-gray-600 text-sm">Your brand statement should be 1-2 sentences. Memorable and punchy.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Include a CTA</h3>
            <p className="text-gray-600 text-sm">End with an invitation to connect or engage. Make it easy for others to take action.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Brand Statement Examples</h2>
        <div className="space-y-4">
          <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
            <p className="text-gray-800">"I help startups build scalable products through lean methodology. 10+ years in tech, 50+ products launched."</p>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
            <p className="text-gray-800">"Marketing leader specializing in B2B SaaS growth. Helped 3 startups scale from $0 to $10M ARR."</p>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
            <p className="text-gray-800">"Career coach helping professionals transition into tech. Former FAANG recruiter with 100+ placements."</p>
          </div>
        </div>
      </section>
    </div>
  );
}

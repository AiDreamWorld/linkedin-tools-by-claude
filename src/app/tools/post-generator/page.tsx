import PostGeneratorTool from "@/components/tools/PostGeneratorTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Post Generator | AI-Powered Content Creation",
  description: "Generate engaging LinkedIn posts for your content. Create professional posts that get more engagement.",
  keywords: "linkedin post generator, ai post writer, linkedin content, viral post",
};

export default function PostGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#0A66C2] to-[#db2777] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn Post Generator</h1>
          <p className="text-xl text-blue-100 mb-6">Create engaging posts in seconds</p>
          <div className="flex items-center justify-center gap-2 text-sm text-blue-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free to use - No signup required
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <PostGeneratorTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips for Viral LinkedIn Posts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">✅ What Works</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Personal stories & experiences
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> actionable tips & insights
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Controversial takes (respectful)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Data & statistics
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Questions to engage readers
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">❌ What to Avoid</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span> Too promotional content
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span> Long paragraphs (use line breaks)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span> No clear value proposition
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span> Missing call-to-action
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span> Typos & grammar mistakes
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

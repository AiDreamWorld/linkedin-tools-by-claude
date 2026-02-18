import ReadabilityCheckerTool from "@/components/tools/ReadabilityCheckerTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Post Readability Checker | Improve Your Writing",
  description: "Check your LinkedIn post readability score. Get suggestions to improve clarity and engagement.",
  keywords: "linkedin readability checker, post readability, writing score, engagement tips",
};

export default function ReadabilityCheckerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#db2777] to-[#0A66C2] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Post Readability Checker</h1>
          <p className="text-xl text-pink-100 mb-6">Check and improve your post readability</p>
          <div className="flex items-center justify-center gap-2 text-sm text-pink-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free to use - Instant Results
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <ReadabilityCheckerTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Readability Tips</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="-gray-900 mb-3">✅ Best Practices</h3>
            <ul className="spacefont-semibold text-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Use short sentences (under 20 words)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Add line breaks between paragraphs
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Use bullet points for lists
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Use simple, common words
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Add emojis for visual breaks
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">📊 Score Guide</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span> 80-100: Excellent
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span> 60-79: Good
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span> 40-59: Fair
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span> 0-39: Needs Work
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

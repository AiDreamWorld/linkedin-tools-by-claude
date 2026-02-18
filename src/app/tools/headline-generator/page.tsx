import HeadlineGeneratorTool from "@/components/tools/HeadlineGeneratorTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Headline Generator | Create Professional Headlines",
  description: "Generate catchy, professional LinkedIn headlines that attract recruiters. Free tool with 50+ customizable templates.",
  keywords: "linkedin headline generator, linkedin headline examples, professional headline, career tools",
};

export default function HeadlineGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#057642] to-[#065f46] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn Headline Generator</h1>
          <p className="text-xl text-green-100 mb-6">Create attention-grabbing headlines that make you stand out</p>
          <div className="flex items-center justify-center gap-2 text-sm text-green-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            50+ Templates - Free to use
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <HeadlineGeneratorTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">LinkedIn Headline Best Practices</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">✅ Do's</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Include your job title
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Add value you bring
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Use relevant keywords
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Keep it under 100 characters
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Show your unique value
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">❌ Don'ts</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span> Use generic phrases
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span> Say "looking for opportunities"
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span> Overstuff with keywords
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span> Use all caps
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span> Leave it blank
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 bg-white rounded-2xl mx-4 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Headline Examples</h2>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <p className="font-medium text-gray-900">"Helping companies scale through data-driven marketing | 10+ years exp"</p>
            <p className="text-sm text-gray-500 mt-1">✓ Shows value + experience</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <p className="font-medium text-gray-900">"CS Student @ Stanford | AI & ML Enthusiast | Open to internships"</p>
            <p className="text-sm text-gray-500 mt-1">✓ Shows school + interest + goal</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <p className="font-medium text-gray-900">"Building products users love | Former PM at Spotify"</p>
            <p className="text-sm text-gray-500 mt-1">✓ Shows achievement + credibility</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
            <p className="font-medium text-gray-900">"Looking for job opportunities"</p>
            <p className="text-sm text-gray-500 mt-1">✗ Too generic, no value</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">What makes a good LinkedIn headline?</h3>
            <p className="text-gray-600">A great headline clearly states what you do, who you help, or what makes you unique. It should be specific and professional.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">How long should my headline be?</h3>
            <p className="text-gray-600">LinkedIn headlines are limited to 220 characters, but the most effective ones are under 100 characters for optimal display on mobile.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Should I include emojis in my headline?</h3>
            <p className="text-gray-600">Emojis can help your profile stand out in some industries (tech, creative), but avoid overusing them in conservative industries like finance or law.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

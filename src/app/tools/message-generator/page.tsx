import MessageGeneratorTool from "@/components/tools/MessageGeneratorTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Message Generator | Personalized Outreach",
  description: "Generate professional LinkedIn messages for networking, informational interviews, and follow-ups. Free templates and examples.",
  keywords: "linkedin message generator, connection request message, linkedin outreach, networking message template",
};

export default function MessageGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn Message Generator</h1>
          <p className="text-xl text-orange-100 mb-6">Create personalized outreach messages that get responses</p>
          <div className="flex items-center justify-center gap-2 text-sm text-orange-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free Templates - Instant Results
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <MessageGeneratorTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of LinkedIn Messages</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Connection Request</h3>
            <p className="text-gray-600 text-sm">A short, professional message to connect with someone you don't know. Mention why you want to connect.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Informational Interview</h3>
            <p className="text-gray-600 text-sm">A request to learn more about someone's career path or industry. Be specific about what you'd like to ask.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Follow Up</h3>
            <p className="text-gray-600 text-sm">A polite reminder after an initial conversation or interview. Keep it brief and professional.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Thank You</h3>
            <p className="text-gray-600 text-sm">Express gratitude after a meeting, interview, or when someone provides help or advice.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 bg-white rounded-2xl mx-4 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">LinkedIn Message Best Practices</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 text-sm">1</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Keep it Short</h3>
              <p className="text-gray-600 text-sm">LinkedIn messages should be concise. Get to the point quickly - busy professionals appreciate brevity.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 text-sm">2</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Personalize</h3>
              <p className="text-gray-600 text-sm">Mention something specific about the person or their work. Generic messages get ignored.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 text-sm">3</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Provide Value</h3>
              <p className="text-gray-600 text-sm">Explain why you're reaching out and what value you can offer or what you hope to learn.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 text-sm">4</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Include a CTA</h3>
              <p className="text-gray-600 text-sm">End with a clear call to action - whether it's accepting a connection or scheduling a call.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">How long should my LinkedIn message be?</h3>
            <p className="text-gray-600">Keep it under 300 characters for connection requests. For informational interviews, 2-3 short paragraphs work well.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Should I mention how I found them?</h3>
            <p className="text-gray-600">Yes! Mentioning a mutual connection, their content, or how you found their profile increases response rates.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

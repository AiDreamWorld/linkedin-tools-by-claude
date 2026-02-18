import FollowUpMessageGeneratorTool from "@/components/tools/FollowUpMessageGeneratorTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Follow-up Message Generator | Professional Messages",
  description: "Generate professional follow-up messages for after interviews, applications, and networking. Increase your response rate.",
  keywords: "linkedin follow up message, interview follow up, thank you message, professional messaging",
};

export default function FollowUpMessagePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#ea580c] to-[#db2777] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Follow-up Message Generator</h1>
          <p className="text-orange-100">Generate professional follow-up messages</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <FollowUpMessageGeneratorTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">When to Send Follow-up Messages</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">After Interview (24-48 hours)</h3>
            <p className="text-gray-600 text-sm">Send within 24-48 hours after your interview. Reiterate your interest and highlight relevant skills.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">After Job Application (1-2 weeks)</h3>
            <p className="text-gray-600 text-sm">Follow up if you haven't heard back after 1-2 weeks. Shows initiative and continued interest.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">After Networking (24 hours)</h3>
            <p className="text-gray-600 text-sm">Send within 24 hours while the connection is fresh. Reference specific topics you discussed.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Cold Outreach (Anytime)</h3>
            <p className="text-gray-600 text-sm">Personalized messages to people you want to connect with. Keep it brief and value-driven.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Follow-up Message Tips</h2>
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
          <ul className="space-y-2 text-gray-700">
            <li>• Keep it short - 3-4 paragraphs maximum</li>
            <li>• Personalize with specific details from your conversation</li>
            <li>• Reiterate your interest in the role or company</li>
            <li>• Include a specific skill or achievement relevant to the role</li>
            <li>• End with a clear call to action</li>
            <li>• Proofread before sending</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

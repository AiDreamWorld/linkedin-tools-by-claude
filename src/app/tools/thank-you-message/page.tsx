import ThankYouMessageGeneratorTool from "@/components/tools/ThankYouMessageGeneratorTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Thank You Message Generator | Post-Interview Thanks",
  description: "Generate professional thank you messages for interviews, networking, and mentorship. Send within 24 hours.",
  keywords: "linkedin thank you message, interview thank you, networking thanks, professional gratitude",
};

export default function ThankYouMessagePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#7c3aed] to-[#db2777] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Thank You Message Generator</h1>
          <p className="text-purple-100">Generate professional thank you messages</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ThankYouMessageGeneratorTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Send Thank You Messages?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Stand Out</h3>
            <p className="text-gray-600 text-sm">Only 20% of candidates send thank you messages. You'll instantly differentiate yourself.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Reinforce Your Interest</h3>
            <p className="text-gray-600 text-sm">A thank you message shows you're genuinely interested in the role and company.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Address Weaknesses</h3>
            <p className="text-gray-600 text-sm">Use the message to address any concerns or fill gaps from the interview.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Build Relationships</h3>
            <p className="text-gray-600 text-sm">Thank you messages help build rapport with interviewers and expand your network.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Thank You Message Best Practices</h2>
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
          <ul className="space-y-2 text-gray-700">
            <li>• Send within 24 hours of your interview/meeting</li>
            <li>• Personalize each message to the specific person</li>
            <li>• Reference specific topics from your conversation</li>
            <li>• Reiterate your interest and relevant qualifications</li>
            <li>• Keep it concise - 3-4 sentences is ideal</li>
            <li>• Proofread carefully before sending</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

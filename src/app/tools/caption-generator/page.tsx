import CaptionGeneratorTool from "@/components/tools/CaptionGeneratorTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Caption Generator | Create Engaging Captions",
  description: "Generate engaging LinkedIn captions for your posts. Choose from professional, personal, educational, and engagement styles.",
  keywords: "linkedin caption generator, linkedin post caption, caption ideas, social media captions",
};

export default function CaptionGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">LinkedIn Caption Generator</h1>
          <p className="text-blue-100">Create engaging captions for your LinkedIn posts</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CaptionGeneratorTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Write Great LinkedIn Captions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Keep It Concise</h3>
            <p className="text-gray-600 text-sm">Your first 210 characters are most important. Hook readers immediately and save details for later.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Add a Call to Action</h3>
            <p className="text-gray-600 text-sm">End with a question or CTA like "What's your take?" or "Share below" to boost engagement.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Use Emojis Wisely</h3>
            <p className="text-gray-600 text-sm">Emojis make captions scannable but don't overdo it. 1-3 emojis per caption is ideal.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Include Hashtags</h3>
            <p className="text-gray-600 text-sm">Add 3-5 relevant hashtags at the end for discoverability.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Caption Best Practices</h2>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <ul className="space-y-2 text-gray-700">
            <li>• Start with a hook - question, bold statement, or curiosity</li>
            <li>• Tell a story or share a lesson learned</li>
            <li>• Use line breaks for readability</li>
            <li>• Add relevant hashtags at the end</li>
            <li>• Always include a call to action</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

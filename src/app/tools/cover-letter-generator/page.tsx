import CoverLetterGeneratorTool from "@/components/tools/CoverLetterGeneratorTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Cover Letter Generator | 5 Templates, PDF Download",
  description: "Generate a professional cover letter in seconds — 5 templates (Professional, Confident, Creative, Entry-Level, Executive), PDF & TXT download. Free, no sign-up required.",
  keywords: "free cover letter generator, cover letter template, professional cover letter, linkedin cover letter, job application cover letter, cover letter pdf",
};

export default function CoverLetterGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#7c3aed] to-[#057642] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Cover Letter Generator</h1>
          <p className="text-xl text-purple-100 mb-4">
            5 professional templates · PDF download · No sign-up required
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-purple-200">
            <span>💼 Professional</span>
            <span>⚡ Confident</span>
            <span>🎨 Creative</span>
            <span>🌱 Entry Level</span>
            <span>👔 Executive</span>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CoverLetterGeneratorTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Write a Great Cover Letter</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: "1", title: "Pick Your Tone", desc: "Choose from Professional, Confident, Creative, Entry-Level, or Executive to match the company culture and your experience level." },
            { step: "2", title: "Add Real Achievements", desc: "The more specific your achievements (numbers, results, impact), the more compelling your letter will be. Vague letters get ignored." },
            { step: "3", title: "Personalize for the Company", desc: "Use the 'Why This Company' field to add something genuine. Hiring managers can tell when a letter is truly tailored vs. copy-pasted." },
          ].map((item) => (
            <div key={item.step} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-purple-600 font-bold">{item.step}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Is this cover letter generator really free?", a: "Yes — 100% free, no account needed, no watermarks, no hidden fees. You can generate and download as many cover letters as you need." },
            { q: "Can I download as PDF?", a: "Yes! Use the PDF button in the output section to download a formatted PDF ready to attach to job applications." },
            { q: "Which template should I choose?", a: "Use Professional for corporate/formal roles, Confident for competitive fields like sales and startups, Creative for design/marketing, Entry-Level if you're a fresh graduate, and Executive for senior leadership positions." },
            { q: "Can I edit the generated letter?", a: "Absolutely. The output is fully editable — click directly on the text to make changes before downloading." },
          ].map((faq) => (
            <div key={faq.q} className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

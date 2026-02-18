import TextFormatterTool from "@/components/tools/TextFormatterTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Text Formatter | Bold, Italic, Strikethrough",
  description: "Format your LinkedIn text with bold, italic, strikethrough and more. Make your posts stand out.",
  keywords: "linkedin text formatter, bold text linkedin, italic linkedin, text formatting",
};

export default function TextFormatterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#7c3aed] to-[#db2777] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn Text Formatter</h1>
          <p className="text-xl text-purple-100 mb-6">Format your text with bold, italic, and more</p>
          <div className="flex items-center justify-center gap-2 text-sm text-purple-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Works on LinkedIn, Twitter & More
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <TextFormatterTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Supported Formatting</h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Style</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Input</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700 font-bold">Bold</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">*text*</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-bold">text</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700 italic">Italic</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">_text_</td>
                <td className="px-6 py-4 text-sm text-gray-900 italic">text</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700 line-through">Strikethrough</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">~text~</td>
                <td className="px-6 py-4 text-sm text-gray-900 line-through">text</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">Bullet List</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">• text</td>
                <td className="px-6 py-4 text-sm text-gray-900">• text</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

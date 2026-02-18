"use client";

import { useState } from "react";

export default function HeadlineGeneratorTool() {
  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [company, setCompany] = useState("");
  const [major, setMajor] = useState("");
  const [skill, setSkill] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);

  const generateHeadlines = () => {
    setGenerating(true);

    setTimeout(() => {
      const newHeadlines = [
        `${role || "Professional"} | ${industry || "Industry"} Expert`,
        `${role || "Aspiring Professional"} | ${skill || "Building Skills"} | ${major || "Student"}`,
        `${role || "Role"} @ ${company || "Company"} | Driving Results`,
        `Helping others with ${skill || "expertise"} | ${role || "Professional"}`,
        `${major || "Student"} | ${role || "Aspiring"} | ${industry || "Tech"} Enthusiast`,
        `${role || "Professional"} | ${industry || "Tech"} | ${skill || "Innovation"}`,
        `Building the future of ${industry || "technology"} | ${role || "Developer"}`,
        `${role || "Professional"} | ${company || "Company"} | ${skill || "Leader"}`,
        `${role || "Creator"} | ${skill || "Innovation"} | ${industry || "Tech"}`,
        `Passionate ${role || "Professional"} | ${major || "Student"} | ${industry || "Tech"}`,
      ];
      setResults(newHeadlines);
      setGenerating(false);
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#057642] to-[#065f46] rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Generate Your Headline</h2>
          <p className="text-gray-500 text-sm">Fill in your details to generate personalized headlines</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
          <input
            type="text"
            placeholder="e.g., Software Engineer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
          <input
            type="text"
            placeholder="e.g., Technology"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company (Optional)</label>
          <input
            type="text"
            placeholder="e.g., Google"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Major/Field of Study</label>
          <input
            type="text"
            placeholder="e.g., Computer Science"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Key Skill</label>
          <input
            type="text"
            placeholder="e.g., Machine Learning"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        onClick={generateHeadlines}
        disabled={generating}
        className="w-full bg-gradient-to-r from-[#057642] to-[#065f46] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#065f46] hover:to-[#057642] transition-all disabled:opacity-50"
      >
        {generating ? "Generating..." : "Generate Headlines"}
      </button>

      {results.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-sm font-semibold text-gray-700">Generated Headlines:</p>
          {results.map((headline, i) => (
            <div 
              key={i} 
              className="p-4 bg-gray-50 rounded-lg flex items-center justify-between group hover:bg-green-50 transition-colors"
            >
              <span className="text-gray-700 font-medium">{headline}</span>
              <button
                onClick={() => copyToClipboard(headline)}
                className="text-gray-400 hover:text-green-600 p-2 rounded-lg hover:bg-white transition-colors"
                title="Copy to clipboard"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

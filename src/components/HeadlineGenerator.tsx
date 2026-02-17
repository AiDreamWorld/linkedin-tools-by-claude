"use client";

import { useState } from "react";

const headlineTemplates = [
  "{Role} | {Industry} | {Specialization}",
  "{Degree} {Major} | Aspiring {Role} | {Skill}",
  "{Role} @ {Company} | {Industry} Expert",
  "Helping {Audience} with {Skill} | {Role}",
  "{Role} | Building {Goal} | {Achievement}",
];

export default function HeadlineGenerator() {
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
      ];
      setResults(newHeadlines);
      setGenerating(false);
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Headline Generator</h3>
      <p className="text-gray-600 text-sm mb-4">Create attention-grabbing headlines</p>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Your Role (e.g., Software Engineer)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
        />
        <input
          type="text"
          placeholder="Industry (e.g., Technology)"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
        />
        <input
          type="text"
          placeholder="Major/Field of Study"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
        />
        <input
          type="text"
          placeholder="Key Skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
        />

        <button
          onClick={generateHeadlines}
          disabled={generating}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {generating ? "Generating..." : "Generate Headlines"}
        </button>

        {results.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-gray-700">Generated Headlines:</p>
            {results.map((headline, i) => (
              <div 
                key={i} 
                className="p-3 bg-gray-50 rounded-lg flex items-center justify-between group"
              >
                <span className="text-sm text-gray-700">{headline}</span>
                <button
                  onClick={() => copyToClipboard(headline)}
                  className="text-gray-400 hover:text-green-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

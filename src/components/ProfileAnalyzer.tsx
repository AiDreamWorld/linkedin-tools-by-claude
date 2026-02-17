"use client";

import { useState } from "react";

export default function ProfileAnalyzer() {
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [about, setAbout] = useState("");
  const [experience, setExperience] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [tips, setTips] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);

  const analyzeProfile = () => {
    setAnalyzing(true);
    
    setTimeout(() => {
      let newScore = 50;
      const newTips: string[] = [];

      if (name.length > 0) newScore += 10;
      if (headline.length > 20) {
        newScore += 15;
      } else {
        newTips.push("Write a longer, more descriptive headline");
      }
      if (about.length > 100) {
        newScore += 15;
      } else {
        newTips.push("Expand your About section with more details");
      }
      if (experience.length > 50) {
        newScore += 10;
      } else {
        newTips.push("Add more details about your work experience");
      }

      if (headline.toLowerCase().includes("student") || headline.toLowerCase().includes("fresh graduate")) {
        newTips.push("Consider adding your major or career goal to your headline");
      }

      if (about.toLowerCase().includes("passion") || about.toLowerCase().includes("experience")) {
        newScore += 5;
      }

      if (newTips.length === 0) {
        newTips.push("Great profile! Keep it updated with recent achievements");
      }

      setScore(Math.min(newScore, 100));
      setTips(newTips);
      setAnalyzing(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Analyzer</h3>
      <p className="text-gray-600 text-sm mb-4">Analyze and score your LinkedIn profile</p>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <input
          type="text"
          placeholder="Current Headline"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <textarea
          placeholder="About Section"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <textarea
          placeholder="Work Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          rows={2}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />

        <button
          onClick={analyzeProfile}
          disabled={analyzing}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {analyzing ? "Analyzing..." : "Analyze Profile"}
        </button>

        {score !== null && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Profile Score</span>
              <span className={`text-2xl font-bold ${score >= 80 ? "text-green-600" : score >= 60 ? "text-yellow-600" : "text-red-600"}`}>
                {score}/100
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                style={{ width: `${score}%` }}
              />
            </div>
            <ul className="mt-3 space-y-1">
              {tips.map((tip, i) => (
                <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

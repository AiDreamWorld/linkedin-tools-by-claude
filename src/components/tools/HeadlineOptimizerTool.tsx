"use client";

import { useState } from "react";

export default function HeadlineOptimizerTool() {
  const [headline, setHeadline] = useState("");
  const [optimized, setOptimized] = useState<{ score: number; suggestions: string[]; improved: string } | null>(null);

  const analyzeHeadline = () => {
    if (!headline.trim()) return;

    let score = 50;
    const suggestions: string[] = [];

    if (headline.length < 50) {
      suggestions.push("Your headline is too short. Add more details about what you do.");
    } else if (headline.length >= 50 && headline.length <= 100) {
      score += 20;
    } else {
      score += 10;
      suggestions.push("Consider shortening your headline for better mobile display.");
    }

    if (headline.includes("|") || headline.includes("•") || headline.includes("-")) {
      score += 15;
    } else {
      suggestions.push("Use separators like | or • to structure your headline.");
    }

    const keywords = ["helping", "building", "creating", "driving", "expert", "specialized", "passionate"];
    if (keywords.some(k => headline.toLowerCase().includes(k))) {
      score += 15;
    } else {
      suggestions.push("Add action words like 'helping', 'building', 'creating'.");
    }

    const hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(headline);
    if (hasEmoji) {
      score += 5;
    }

    score = Math.min(100, score);

    const improved = `${headline} | Helping companies achieve goals | ${headline.split(" ")[0]} expert`;

    setOptimized({ score, suggestions: suggestions.slice(0, 4), improved: headline });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Optimize Your Headline</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Current Headline</label>
        <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="e.g., Software Engineer at Google" />
      </div>

      <button onClick={analyzeHeadline} disabled={!headline.trim()} className="w-full bg-gradient-to-r from-[#057642] to-[#0A66C2] text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50">
        Analyze Headline
      </button>

      {optimized && (
        <div className="mt-6 p-6 bg-gray-50 rounded-xl">
          <div className="text-center mb-4">
            <div className={`text-4xl font-bold ${getScoreColor(optimized.score)}`}>{optimized.score}/100</div>
            <p className="text-gray-600">Optimization Score</p>
          </div>

          {optimized.suggestions.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Suggestions:</h4>
              <ul className="space-y-1">
                {optimized.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-green-500">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Improved Version:</h4>
            <p className="text-gray-700">{optimized.improved}</p>
          </div>
        </div>
      )}
    </div>
  );
}

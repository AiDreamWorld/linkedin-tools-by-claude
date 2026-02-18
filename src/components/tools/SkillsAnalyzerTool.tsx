"use client";

import { useState } from "react";

export default function SkillsAnalyzerTool() {
  const [skills, setSkills] = useState("");
  const [role, setRole] = useState("");
  const [analysis, setAnalysis] = useState<{ score: number; missing: string[]; suggestions: string[] } | null>(null);

  const analyzeSkills = () => {
    if (!skills.trim()) return;

    const skillList = skills.split(",").map(s => s.trim().toLowerCase()).filter(s => s);
    let score = 50;

    if (skillList.length >= 5) score += 20;
    else if (skillList.length >= 3) score += 10;

    const techSkills = ["python", "javascript", "react", "node", "java", "aws", "sql", "machine learning"];
    const softSkills = ["leadership", "communication", "teamwork", "problem solving"];
    const businessSkills = ["marketing", "sales", "analytics", "strategy"];

    const hasTech = skillList.some(s => techSkills.some(t => s.includes(t)));
    const hasSoft = skillList.some(s => softSkills.some(t => s.includes(t)));
    const hasBusiness = skillList.some(s => businessSkills.some(t => s.includes(t)));

    if (hasTech) score += 15;
    if (hasSoft) score += 10;
    if (hasBusiness) score += 10;

    score = Math.min(100, score);

    const missing: string[] = [];
    if (!hasTech) missing.push("Technical skills (e.g., Python, JavaScript, React)");
    if (!hasSoft) missing.push("Soft skills (e.g., Leadership, Communication)");
    if (!hasBusiness) missing.push("Business skills (e.g., Marketing, Analytics)");

    const suggestions = [
      "Add skills relevant to your target role",
      "Include both technical and soft skills",
      "Ask colleagues for endorsements",
      "Add skills that are trending in your industry",
    ];

    setAnalysis({ score, missing, suggestions });
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Analyze Your Skills</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Skills (comma separated)</label>
        <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="JavaScript, Python, Leadership, Marketing" />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Target Role (optional)</label>
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Product Manager" />
      </div>

      <button onClick={analyzeSkills} className="w-full bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white py-3 rounded-lg font-semibold hover:opacity-90">
        Analyze Skills
      </button>

      {analysis && (
        <div className="mt-6 p-6 bg-gray-50 rounded-xl">
          <div className="text-center mb-4">
            <div className={`text-4xl font-bold ${analysis.score >= 80 ? "text-green-600" : analysis.score >= 60 ? "text-blue-600" : "text-yellow-600"}`}>
              {analysis.score}/100
            </div>
            <p className="text-gray-600">Skills Score</p>
          </div>

          {analysis.missing.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Missing Skill Categories:</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.missing.map((m, i) => (
                  <span key={i} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">{m}</span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Suggestions:</h4>
            <ul className="space-y-1">
              {analysis.suggestions.map((s, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-blue-500">•</span> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

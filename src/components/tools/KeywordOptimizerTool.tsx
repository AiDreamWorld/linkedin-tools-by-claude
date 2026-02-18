"use client";

import { useState } from "react";
import { Key, Copy, Check, Sparkles, TrendingUp, AlertCircle } from "lucide-react";

const industryKeywords: Record<string, string[]> = {
  "software": ["JavaScript", "Python", "React", "Node.js", "AWS", "Docker", "Kubernetes", "TypeScript", "SQL", "Git", "Agile", "REST API", "Microservices", "Cloud Computing", "DevOps"],
  "data": ["Python", "SQL", "Machine Learning", "Data Analysis", "Tableau", "Power BI", "Statistics", "R", "TensorFlow", "Pandas", "Data Visualization", "Big Data", "A/B Testing", "Excel"],
  "marketing": ["Digital Marketing", "SEO", "Content Marketing", "Social Media", "Google Analytics", "PPC", "Email Marketing", "Brand Strategy", "Market Research", "CRM", "Copywriting", "HubSpot"],
  "design": ["UI/UX", "Figma", "Sketch", "Adobe XD", "User Research", "Prototyping", "Wireframing", "Design Systems", "HTML/CSS", "Interaction Design", "Visual Design"],
  "product": ["Product Management", "Agile", "User Stories", "Roadmapping", "A/B Testing", "Product Strategy", "Stakeholder Management", "Jira", "Data Analysis", "SQL"],
  "finance": ["Financial Analysis", "Excel", "Financial Modeling", "SQL", "Budgeting", "Forecasting", "Risk Analysis", "Valuation", "Bloomberg", "SAP"],
  "hr": ["Recruiting", "Employee Relations", "HRIS", "Compensation", "Benefits", "Training", "Performance Management", "Onboarding", "HR Analytics", "Workday"],
};

export default function KeywordOptimizerTool() {
  const [currentRole, setCurrentRole] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [industry, setIndustry] = useState("software");
  const [profileText, setProfileText] = useState("");
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);
  const [analyzed, setAnalyzed] = useState(false);
  const [copied, setCopied] = useState(false);

  const analyzeProfile = () => {
    const industryKeys = industryKeywords[industry] || [];
    const missing: string[] = [];
    
    if (profileText) {
      industryKeys.forEach((keyword) => {
        if (!profileText.toLowerCase().includes(keyword.toLowerCase())) {
          missing.push(keyword);
        }
      });
    }
    
    setSuggestedKeywords(missing.length > 0 ? missing.slice(0, 15) : industryKeys.slice(0, 10));
    setAnalyzed(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(suggestedKeywords.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#db2777] to-[#ea580c] rounded-xl flex items-center justify-center">
          <Key className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Profile Keyword Optimizer</h2>
          <p className="text-gray-500 text-sm">Find keywords to optimize your LinkedIn profile for better visibility</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Role</label>
          <input
            type="text"
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
            placeholder="e.g., Junior Developer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
            placeholder="e.g., Senior Software Engineer"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
        >
          <option value="software">Software & Tech</option>
          <option value="data">Data & Analytics</option>
          <option value="marketing">Marketing</option>
          <option value="design">Design</option>
          <option value="product">Product Management</option>
          <option value="finance">Finance</option>
          <option value="hr">Human Resources</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Profile Text (Headline + About)
        </label>
        <textarea
          value={profileText}
          onChange={(e) => setProfileText(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
          placeholder="Paste your current headline and About section here..."
        />
        <p className="text-xs text-gray-500 mt-1">
          Leave empty to get all recommended keywords for your industry
        </p>
      </div>

      <button
        onClick={analyzeProfile}
        className="w-full bg-gradient-to-r from-[#db2777] to-[#ea580c] text-white py-3 rounded-lg font-semibold hover:opacity-90 flex items-center justify-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        Optimize Keywords
      </button>

      {analyzed && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-700">Recommended Keywords</p>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-sm text-[#db2777] font-medium"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy All"}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-white border border-pink-200 text-gray-700 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-800 text-sm">Tips for Using Keywords</p>
                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                  <li>• Include keywords in your headline, About section, and experience</li>
                  <li>• Use keywords naturally - don't just list them</li>
                  <li>• Add skills that match your target role</li>
                  <li>• Include both technical and soft skill keywords</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

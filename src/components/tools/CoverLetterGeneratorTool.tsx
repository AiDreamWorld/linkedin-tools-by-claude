"use client";

import { useState } from "react";

export default function CoverLetterGeneratorTool() {
  const [data, setData] = useState({
    name: "",
    role: "",
    company: "",
    hiringManager: "",
    relevantSkills: "",
    experience: "",
  });
  const [generated, setGenerated] = useState("");

  const generate = () => {
    const { name, role, company, hiringManager, relevantSkills, experience } = data;
    
    const letter = `Dear ${hiringManager || "Hiring Manager"},

I am writing to express my strong interest in the ${role || "position"} at ${company || "your company"}. With my background in ${relevantSkills || "the relevant field"} and my passion for ${experience || "driving results"}, I believe I would be a valuable addition to your team.

Throughout my career, I have developed a strong skill set in ${relevantSkills || "various areas"}. My experience has taught me the importance of ${experience || "continuous learning and improvement"}, and I am excited to bring these skills to ${company || "your company"}.

What draws me to ${company || "your organization"} is your commitment to innovation and excellence. I am particularly impressed by ${company || "your company's"} reputation for ${experience || "professional growth and development"}, and I am eager to contribute to your continued success.

I would welcome the opportunity to discuss how my background and skills would benefit ${company || "your team"}. Thank you for considering my application, and I look forward to hearing from you.

Best regards,
${name || "Your Name"}`;

    setGenerated(letter);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Generate Cover Letter</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input type="text" value={data.name} onChange={(e) => setData({...data, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
          <input type="text" value={data.role} onChange={(e) => setData({...data, role: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input type="text" value={data.company} onChange={(e) => setData({...data, company: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Manager (optional)</label>
          <input type="text" value={data.hiringManager} onChange={(e) => setData({...data, hiringManager: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Relevant Skills</label>
        <input type="text" value={data.relevantSkills} onChange={(e) => setData({...data, relevantSkills: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="e.g., project management, data analysis" />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Key Experience</label>
        <input type="text" value={data.experience} onChange={(e) => setData({...data, experience: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="e.g., leading teams, driving growth" />
      </div>

      <button onClick={generate} className="w-full bg-gradient-to-r from-[#7c3aed] to-[#057642] text-white py-3 rounded-lg font-semibold hover:opacity-90">
        Generate Cover Letter
      </button>

      {generated && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-900">Generated Cover Letter:</h4>
            <button onClick={copyToClipboard} className="text-purple-600 text-sm font-medium">Copy</button>
          </div>
          <p className="text-gray-700 whitespace-pre-line text-sm">{generated}</p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

export default function SummaryGeneratorTool() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [goals, setGoals] = useState("");
  const [tone, setTone] = useState("professional");
  const [generated, setGenerated] = useState("");

  const generateSummary = () => {
    const n = name || "A dedicated professional";
    const r = role || "professional";
    const exp = experience || "several years of professional experience";
    const goal = goals || "driving meaningful impact and career growth";

    const templates: Record<string, string> = {
      professional: `I am ${n}, a ${r} with ${exp}.

My career has been defined by a commitment to excellence, continuous learning, and delivering measurable results. I specialize in leveraging my expertise to tackle complex challenges and drive meaningful outcomes for the teams and organizations I work with.

Professional focus: ${goal}.

I thrive in collaborative environments where I can contribute strategic thinking and hands-on execution. I'm always open to connecting with forward-thinking professionals, exploring new opportunities, and building relationships that create lasting value.

Let's connect and explore how we can work together.`,

      casual: `Hey! I'm ${n} 👋 — a ${r} who genuinely loves what I do.

I've built my career around ${exp}, and every day I'm grateful for the journey. The best part? The people I've met and the problems I've helped solve along the way.

What I'm working toward: ${goal}.

I'm the kind of person who'll geek out over a good challenge, celebrate your wins, and always show up ready to learn something new. If that sounds like your kind of colleague, let's chat! 😄`,

      executive: `${n} is an accomplished ${r} with ${exp} and a track record of delivering exceptional results at scale.

Recognized for strategic leadership, cross-functional collaboration, and a relentless focus on ${goal}, ${n} brings a unique combination of vision and operational discipline to every initiative.

Core strengths: driving organizational transformation, building high-performance teams, and translating complex challenges into clear, actionable strategies.

Available for executive conversations, board-level engagements, and strategic advisory roles with organizations committed to long-term value creation.`,
    };

    setGenerated(templates[tone] || templates.professional);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Generate Your Summary</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="John Smith" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Product Manager" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Experience</label>
        <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="e.g., 5 years in tech" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Goals</label>
        <input type="text" value={goals} onChange={(e) => setGoals(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="e.g., Helping businesses grow" />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
        <div className="flex gap-2">
          {["professional", "casual", "executive"].map((t) => (
            <button key={t} onClick={() => setTone(t)} className={`flex-1 py-2 rounded-lg font-medium ${tone === t ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600"}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <button onClick={generateSummary} className="w-full bg-gradient-to-r from-[#7c3aed] to-[#db2777] text-white py-3 rounded-lg font-semibold hover:opacity-90">
        Generate Summary
      </button>

      {generated && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-900">Generated Summary:</h4>
            <button onClick={copyToClipboard} className="text-purple-600 text-sm font-medium">Copy</button>
          </div>
          <p className="text-gray-700 whitespace-pre-line text-sm">{generated}</p>
        </div>
      )}
    </div>
  );
}

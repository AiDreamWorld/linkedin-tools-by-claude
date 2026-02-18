"use client";

import { useState } from "react";

export default function AboutWriterTool() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [goals, setGoals] = useState("");
  const [tone, setTone] = useState("professional");
  const [generated, setGenerated] = useState("");
  const [generating, setGenerating] = useState(false);

  const generateAbout = () => {
    setGenerating(true);

    setTimeout(() => {
      const skillList = skills.split(",").map(s => s.trim()).filter(s => s);
      const goalList = goals.split(",").map(g => g.trim()).filter(g => g);
      const n = name || "a professional";
      const r = role || "dedicated professional";
      const s1 = skillList[0] || "problem-solving";
      const s2 = skillList[1] || "collaboration";
      const s3 = skillList[2] || "innovation";
      const allSkills = skillList.length > 0 ? skillList.join(", ") : "various professional skills";
      const g1 = goalList[0] || "continuous growth";
      const g2 = goalList[1] || "making a meaningful impact";

      let content = "";

      if (tone === "professional") {
        content = `I am ${n}, a ${r} with a proven track record in ${s1} and ${s2}.

Throughout my career, I have been focused on ${g1} — delivering measurable results and consistently raising the bar in everything I do.

Core competencies:
• ${s1} — applying expertise to solve complex challenges
• ${s2} — building strong cross-functional relationships
• ${s3} — staying ahead of industry trends and best practices

I am driven by ${g2} and bring a results-oriented mindset to every project and collaboration.

Open to connecting with professionals in my field. Let's explore opportunities to create value together.`;
      } else if (tone === "casual") {
        content = `Hey! I'm ${n} — a ${r} who genuinely loves ${s1} and ${s2} 😊

I got into ${r.toLowerCase()} because I'm passionate about ${g1}, and honestly? I haven't looked back since.

What makes me tick:
✨ ${s1} — it's where I do my best work
🤝 ${s2} — I thrive when I'm working with great people
💡 ${s3} — always curious, always learning

Right now I'm focused on ${g2}, and I love connecting with people who share the same energy.

Drop me a message anytime — always happy to chat! 👋`;
      } else {
        // executive tone
        content = `${n} is a strategic ${r} with deep expertise in ${allSkills}.

Known for ${g1} and a leadership approach built on clarity, accountability, and results, ${n} brings executive-level perspective to every initiative.

Areas of focus:
${skillList.slice(0, 4).map(s => `• ${s}`).join("\n") || `• ${s1}\n• ${s2}\n• ${s3}`}

Committed to ${g2} through disciplined execution and forward-thinking strategy.

Available for senior-level conversations, strategic partnerships, and high-impact collaborations.`;
      }

      setGenerated(content);
      setGenerating(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Generate Your About Section</h2>
          <p className="text-gray-500 text-sm">Fill in your details and select your preferred tone</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            placeholder="e.g., Sarah Johnson"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
          <input
            type="text"
            placeholder="e.g., Product Manager"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
          <input
            type="text"
            placeholder="e.g., Python, Machine Learning, Data Analysis"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Goals (comma separated)</label>
          <input
            type="text"
            placeholder="e.g., Building innovative products, Leadership"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
          <div className="flex gap-3">
            {["professional", "casual", "executive"].map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  tone === t 
                    ? "bg-purple-600 text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={generateAbout}
        disabled={generating}
        className="w-full bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#5b21b6] hover:to-[#7c3aed] transition-all disabled:opacity-50"
      >
        {generating ? "Generating..." : "Generate About Section"}
      </button>

      {generated && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-700">Generated About Section:</p>
            <button
              onClick={copyToClipboard}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-700 whitespace-pre-line text-sm">{generated}</p>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

export default function AboutWriter() {
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

      let content = "";

      if (tone === "professional") {
        content = `Hi, I'm ${name || "a professional"}! 

I'm a ${role || "dedicated professional"} passionate about ${skillList.slice(0, 3).join(", ") || "driving results"}. 

Throughout my journey, I've focused on ${goalList[0] || "continuous growth and development"}. I believe in the power of ${skillList[0] || "collaboration"} and ${skillList[1] || "innovation"} to create meaningful impact.

My background includes hands-on experience in ${skillList.slice(0, 2).join(" and ") || "various domains"}, and I'm always eager to learn and take on new challenges.

Let's connect! I'm always open to discussing new opportunities, collaborations, or simply networking with like-minded professionals.`;
      } else if (tone === "casual") {
        content = `Hey there! I'm ${name || "someone"} - a ${role || "tech enthusiast"} who loves ${skills || "building cool things"}!

I'm all about ${goals || "making an impact"} and meeting awesome people along the way. 

What gets me excited? ${skillList[0] || "Solving problems"}, ${skillList[1] || "learning new things"}, and ${skillList[2] || "connecting with others"}.

Drop me a message if you want to chat about ${skillList[0] || "tech"}, collaboration opportunities, or just to say hi!`;
      } else {
        content = `${name || "A results-driven professional"} seeking to leverage ${skills || "expertise"} in pursuit of ${goals || "excellence"}.

With a strong foundation in ${skillList.slice(0, 2).join(", ") || "professional domains"}, I am committed to delivering exceptional results and continuous improvement.

My expertise spans ${skillList.join(", ") || "various areas"}, with a focus on achieving measurable outcomes and driving organizational success.

I welcome connections with professionals who share similar interests and career aspirations.`;
      }

      setGenerated(content);
      setGenerating(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">About Section Writer</h3>
      <p className="text-gray-600 text-sm mb-4">AI-powered about section generator</p>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        />
        <input
          type="text"
          placeholder="Your Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        />
        <input
          type="text"
          placeholder="Goals (comma separated)"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        />
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        >
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="executive">Executive</option>
        </select>

        <button
          onClick={generateAbout}
          disabled={generating}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {generating ? "Generating..." : "Generate About Section"}
        </button>

        {generated && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">Generated:</p>
              <button
                onClick={copyToClipboard}
                className="text-xs text-purple-600 hover:text-purple-700 font-medium"
              >
                Copy
              </button>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 whitespace-pre-line">{generated}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

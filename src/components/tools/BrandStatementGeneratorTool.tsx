"use client";

import { useState } from "react";
import { Copy, Check, Sparkles, User, Target, Award } from "lucide-react";

const templates = {
  professional: [
    "I help [target audience] achieve [specific result] through [your methodology/approach]. With [X years] of experience in [your field], I'm passionate about [what drives you].",
    "Helping [target audience] overcome [common challenge]. [Your credential] | [Your specialty] | [Your achievement]",
    "[Your role] helping [target audience] achieve [result]. [Key differentiator]. Let's connect!",
  ],
  personal: [
    "I'm [your name], a [your role] who believes in [your value proposition]. My mission is to [your mission]. Always excited to connect with like-minded professionals!",
    "Transforming how [industry] approaches [problem]. [Your credentials]. Passionate about [your passion]. Let's build something great together!",
    "[Your role] | [Your company] | Helping [audience] achieve [goal]. When I'm not [work], you can find me [hobby].",
  ],
  student: [
    "Aspiring [profession] at [university] | Passionate about [interests] | Looking for [opportunities] in [field]",
    "Recent [degree] graduate specializing in [major] | Eager to contribute to [industry] | Open to [type of opportunities]",
    "Future [profession] | Learning [skills] | Seeking opportunities to [goal] | Let's connect!",
  ],
  career: [
    "[X]+ years in [industry] | Helped [number] clients/companies achieve [result] | Now helping [audience] with [expertise]",
    "Leadership & [specialty] expert | Speaker | Author | Helping leaders [outcome] through [approach]",
    "Tech leader focused on [area] | Building [type of solutions] | Mentor | Always learning, always sharing",
  ],
  creative: [
    "Design & [creative field] | Transforming ideas into [deliverables] | [Your unique angle] | Let's create something amazing!",
    "[Creative role] telling stories through [medium] | [Your style/approach] | Open for collaborations | 🎨✨",
    "Visual storyteller | [Specialization] | Bringing brands to life through [your craft] | DM for projects!",
  ],
};

export default function BrandStatementGeneratorTool() {
  const [role, setRole] = useState("");
  const [audience, setAudience] = useState("");
  const [result, setResult] = useState("");
  const [experience, setExperience] = useState("");
  const [style, setStyle] = useState("professional");
  const [generated, setGenerated] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const generateStatements = () => {
    setGenerating(true);
    setTimeout(() => {
      const styleTemplates = templates[style as keyof typeof templates];
      const statements = styleTemplates.map(template => {
        return template
          .replace("[your name]", role.split(" ")[0] || "I")
          .replace("[your role]", role || "professional")
          .replace("[target audience]", audience || "professionals")
          .replace("[specific result]", result || "their goals")
          .replace("[X years]", experience || "5")
          .replace("[Your methodology/approach]", "proven strategies")
          .replace("[what drives you]", "helping others succeed")
          .replace("[Your credential]", experience ? `${experience} years experience` : "Experience")
          .replace("[Your specialty]", "expertise")
          .replace("[Your achievement]", "proven results")
          .replace("[common challenge]", audience ? `challenges with ${audience}` : "common challenges")
          .replace("[industry]", "my industry")
          .replace("[problem]", "important problems")
          .replace("[university]", "your university")
          .replace("[interests]", "your interests")
          .replace("[opportunities]", "networking opportunities")
          .replace("[field]", "your field")
          .replace("[degree]", "your degree")
          .replace("[major]", "your major")
          .replace("[type of opportunities]", "opportunities")
          .replace("[profession]", role || "professional")
          .replace("[number]", "100+")
          .replace("[clients/companies]", "organizations")
          .replace("[expertise]", "my expertise");
      });
      setGenerated(statements);
      setGenerating(false);
    }, 800);
  };

  const copyStatement = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-[#db2777] to-[#7c3aed] rounded-xl flex items-center justify-center">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Brand Statement Generator</h2>
          <p className="text-gray-500 text-sm">Create your personal brand statement</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Role/Title</label>
            <input
              type="text"
              placeholder="e.g., Software Engineer, Marketing Manager"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Who do you help?</label>
            <input
              type="text"
              placeholder="e.g., startups, students, small businesses"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What result do you deliver?</label>
            <input
              type="text"
              placeholder="e.g., build careers, grow businesses"
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
            <input
              type="text"
              placeholder="e.g., 5+ years"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {Object.keys(templates).map((key) => (
              <button
                key={key}
                onClick={() => setStyle(key)}
                className={`py-2 px-3 rounded-lg text-sm font-medium capitalize transition ${
                  style === key
                    ? "bg-gradient-to-r from-[#db2777] to-[#7c3aed] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generateStatements}
          disabled={generating}
          className="w-full bg-gradient-to-r from-[#db2777] to-[#7c3aed] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50"
        >
          {generating ? "Generating..." : "Generate Brand Statements"}
        </button>
      </div>

      {generated.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">Generated Brand Statements:</p>
          {generated.map((statement, i) => (
            <div 
              key={i} 
              className="p-4 bg-pink-50 rounded-lg flex items-start justify-between group hover:bg-pink-100 transition-colors"
            >
              <p className="text-gray-800 text-sm flex-1">{statement}</p>
              <button
                onClick={() => copyStatement(statement, i)}
                className="ml-2 p-2 text-pink-600 hover:text-pink-700 rounded-lg hover:bg-white transition-colors"
              >
                {copied === i ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

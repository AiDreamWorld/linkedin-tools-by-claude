"use client";

import { useState } from "react";
import { Image, Copy, Check, Sparkles, Palette, Briefcase, User, Zap } from "lucide-react";

const bannerStyles = [
  {
    style: "Minimal",
    description: "Clean, modern, lots of white space",
    colors: ["#FFFFFF", "#1E293B", "#0A66C2"],
    icon: "✨",
  },
  {
    style: "Bold",
    description: "Strong colors, impactful text",
    colors: ["#0A66C2", "#FF6B00", "#FFFFFF"],
    icon: "🔥",
  },
  {
    style: "Gradient",
    description: "Smooth color transitions",
    colors: ["#7C3AED", "#DB2777", "#0A66C2"],
    icon: "🌈",
  },
  {
    style: "Professional",
    description: "Corporate, trustworthy feel",
    colors: ["#0F172A", "#334155", "#057642"],
    icon: "💼",
  },
  {
    style: "Creative",
    description: "Artistic, unique, eye-catching",
    colors: ["#F59E0B", "#EC4899", "#8B5CF6"],
    icon: "🎨",
  },
  {
    style: "Tech",
    description: "Modern tech aesthetic",
    colors: ["#06B6D4", "#8B5CF6", "#1E293B"],
    icon: "💻",
  },
];

const bannerElements = [
  "Your photo (center or side)",
  "Your name in large text",
  "Job title / headline",
  "Company logo",
  "Industry icons",
  "Skill tags",
  "Contact info",
  "QR code to portfolio",
  "Background pattern/gradient",
  "Quote or tagline",
];

const layoutIdeas = [
  "Split screen: Photo left, text right",
  "Centered: Photo and text in middle",
  "Overlay: Text over gradient background",
  "Minimal: Photo with small text corner",
  "Banner: Full-width with bottom text",
  "Card: Bordered design with rounded corners",
];

export default function BannerIdeasTool() {
  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(bannerStyles[0]);
  const [generated, setGenerated] = useState<{title: string, subtitle: string, elements: string[]}[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generateIdeas = () => {
    const elements = bannerElements.sort(() => Math.random() - 0.5).slice(0, 5);
    const ideas = [
      {
        title: role || "Your Name",
        subtitle: `${industry || "Professional"} | Expert | Thought Leader`,
        elements,
      },
      {
        title: `Helping ${industry || "Professionals"} Succeed`,
        subtitle: "Your tagline or mission statement here",
        elements: bannerElements.slice(2, 7),
      },
      {
        title: role ? `${role} & Advisor` : "Business Coach | Consultant",
        subtitle: "Helping teams achieve their goals",
        elements: bannerElements.slice(1, 6),
      },
    ];
    setGenerated(ideas);
  };

  const copyIdea = (idea: typeof generated[0], index: number) => {
    const text = `${idea.title}\n${idea.subtitle}\n\nElements: ${idea.elements.join(", ")}`;
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="tool-section">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#db2777] to-[#7c3aed] rounded-xl flex items-center justify-center">
          <Image className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Banner Ideas Generator</h2>
          <p className="text-gray-500 text-sm">Get creative banner designs for your LinkedIn</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Your role (e.g., Software Engineer)"
          className="tool-input"
        />
        <input
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="Industry (e.g., Tech, Finance)"
          className="tool-input"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Style</label>
        <div className="grid grid-cols-3 gap-2">
          {bannerStyles.map((style) => (
            <button
              key={style.style}
              onClick={() => setSelectedStyle(style)}
              className={`p-2 rounded-lg text-xs font-medium transition ${
                selectedStyle.style === style.style
                  ? "bg-gradient-to-r from-[#db2777] to-[#7c3aed] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {style.icon} {style.style}
            </button>
          ))}
        </div>
      </div>

      <button onClick={generateIdeas} className="tool-button-primary w-full mb-4">
        <Sparkles className="w-4 h-4" /> Generate Banner Ideas
      </button>

      {generated.length > 0 && (
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Palette className="w-4 h-4 text-[#db2777]" />
              <span className="font-medium text-gray-800">Color Palette</span>
            </div>
            <div className="flex gap-2">
              {selectedStyle.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-lg border border-gray-200"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">{selectedStyle.description}</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#ea580c]" />
              <span className="font-medium text-gray-800">Recommended Layouts</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {layoutIdeas.map((layout, i) => (
                <span key={i} className="px-2 py-1 bg-white rounded text-xs text-gray-600 border">
                  {layout}
                </span>
              ))}
            </div>
          </div>

          {generated.map((idea, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{idea.title}</h3>
                  <p className="text-sm text-gray-600">{idea.subtitle}</p>
                </div>
                <button
                  onClick={() => copyIdea(idea, index)}
                  className="p-1 text-gray-500 hover:text-[#db2777]"
                >
                  {copied === index ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {idea.elements.map((el, i) => (
                  <span key={i} className="px-2 py-0.5 bg-[#db2777]/10 text-[#db2777] rounded text-xs">
                    {el}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

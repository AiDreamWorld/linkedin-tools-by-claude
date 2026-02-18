"use client";

import { useState } from "react";
import { MousePointerClick, Copy, Check, Sparkles, Link, MessageSquare, Heart, Share2 } from "lucide-react";

const ctaTemplates = {
  "Engagement": [
    { cta: "Drop a emoji below 👇", engagement: "High", icon: "👍" },
    { cta: "What's your take? Share below 👇", engagement: "High", icon: "💬" },
    { cta: "Agree or disagree? Let me know 👇", engagement: "High", icon: "🤔" },
    { cta: "Tag someone who needs to see this!", engagement: "Very High", icon: "🏷️" },
    { cta: "Save this for later! 📌", engagement: "Medium", icon: "🔖" },
    { cta: "Double tap if you agree! 👏", engagement: "High", icon: "👏" },
    { cta: "Share this with your network!", engagement: "Very High", icon: "📤" },
    { cta: "What's your experience? Comment below 👇", engagement: "High", icon: "💭" },
  ],
  "Content": [
    { cta: "Follow for more tips!", engagement: "High", icon: "👤" },
    { cta: "Turn on notifications! 🔔", engagement: "Medium", icon: "🔔" },
    { cta: "Check my profile for more content →", engagement: "High", icon: "➡️" },
    { cta: "Subscribe to my newsletter for weekly insights →", engagement: "Medium", icon: "📧" },
    { cta: "Read the full article on my blog →", engagement: "High", icon: "📄" },
    { cta: "Watch the video for the full breakdown 🎥", engagement: "High", icon: "🎬" },
  ],
  "Professional": [
    { cta: "Book a call with me →", engagement: "Medium", icon: "📅" },
    { cta: "DM me for collaborations!", engagement: "Medium", icon: "💬" },
    { cta: "Send me a message - let's connect!", engagement: "Medium", icon: "✉️" },
    { cta: "Visit my website for more →", engagement: "Medium", icon: "🌐" },
    { cta: "Download my free guide →", engagement: "High", icon: "📥" },
    { cta: "Join my community →", engagement: "High", icon: "👥" },
  ],
  "Learning": [
    { cta: "Save this post! You'll thank me later 📌", engagement: "High", icon: "🔖" },
    { cta: "Share this with someone who needs it!", engagement: "Very High", icon: "🤝" },
    { cta: "Follow for daily tips!", engagement: "High", icon: "🔥" },
    { cta: "What would you add? Comment below 👇", engagement: "High", icon: "➕" },
    { cta: "Need help? Drop a DM!", engagement: "Medium", icon: "🆘" },
    { cta: "What's your favorite tip? Tell me below 👇", engagement: "High", icon: "❤️" },
  ],
};

export default function CTAGenerator() {
  const [category, setCategory] = useState("Engagement");
  const [customInput, setCustomInput] = useState("");
  const [generated, setGenerated] = useState<{cta: string, engagement: string, icon: string}[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generateCTAs = () => {
    const templates = ctaTemplates[category as keyof typeof ctaTemplates];
    const shuffled = [...templates].sort(() => Math.random() - 0.5);
    setGenerated(shuffled.slice(0, 6));
  };

  const generateCustom = () => {
    if (!customInput.trim()) return;
    const ctAs = [
      { cta: customInput, engagement: "Custom", icon: "✨" },
      { cta: `${customInput} - share your thoughts below 👇`, engagement: "Custom", icon: "💬" },
      { cta: `Need help with ${customInput}? DM me!`, engagement: "Custom", icon: "🆘" },
    ];
    setGenerated(ctAs);
  };

  const copyCTA = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const getEngagementColor = (engagement: string) => {
    if (engagement === "Very High") return "bg-green-100 text-green-700";
    if (engagement === "High") return "bg-blue-100 text-blue-700";
    if (engagement === "Medium") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="tool-section">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#ea580c] to-[#db2777] rounded-xl flex items-center justify-center">
          <MousePointerClick className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">CTA Generator</h2>
          <p className="text-gray-500 text-sm">Generate compelling call-to-actions</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select CTA Type</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(ctaTemplates).map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setGenerated([]); }}
              className={`p-2 rounded-lg text-sm font-medium transition ${
                category === cat 
                  ? "bg-gradient-to-r from-[#ea580c] to-[#db2777] text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <button onClick={generateCTAs} className="tool-button-primary w-full mb-4">
        <Sparkles className="w-4 h-4" /> Generate CTAs
      </button>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Or create custom CTA</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Enter your CTA goal..."
            className="tool-input flex-1"
          />
          <button onClick={generateCustom} className="tool-button-secondary">
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>

      {generated.length > 0 && (
        <div className="space-y-2">
          {generated.map((item, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-800">{item.icon} {item.cta}</span>
                <button
                  onClick={() => copyCTA(item.cta, index)}
                  className="ml-2 p-1 text-gray-500 hover:text-[#ea580c]"
                >
                  {copied === index ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${getEngagementColor(item.engagement)}`}>
                {item.engagement} Engagement
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

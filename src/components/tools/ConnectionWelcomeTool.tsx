"use client";

import { useState } from "react";
import { Handshake, Copy, Check, Sparkles, User, Star } from "lucide-react";

const welcomeTemplates = {
  friendly: {
    short: "Hi {name}! Thanks for connecting. Feel free to reach out anytime!",
    medium: "Hi {name}, thank you so much for connecting! I'm excited to be part of your network. If there's anything I can help with, don't hesitate to reach out. Looking forward to learning from your posts!",
    long: "Hi {name}, thank you so much for connecting with me! I'm truly honored to be part of your network. I genuinely enjoy following your content and insights. If there's ever anything I can help you with - whether it's networking, sharing ideas, or just a friendly chat - please don't hesitate to reach out. Looking forward to connecting further!",
  },
  professional: {
    short: "Thank you for connecting, {name}. I look forward to engaging with your content.",
    medium: "Hi {name}, thank you for connecting. I'm looking forward to your updates and would be happy to engage with your content. Please feel free to reach out if there's anything I can assist with.",
    long: "Dear {name}, thank you for connecting with me. I have been following your professional journey with interest and am grateful to be part of your network. I look forward to your valuable insights and content. Should there be any way I can be of assistance, please do not hesitate to reach out. Best regards.",
  },
  casual: {
    short: "Hey {name}! 🎉 Thanks for connecting!",
    medium: "Hey {name}! Thanks for the connect! Really enjoyed going through your profile. Would love to stay in touch and see what you're working on!",
    long: "Hey {name}! 🎉 Thanks so much for connecting! I was really impressed by your profile and your work. Would love to keep up with what you're building and share ideas. Always great to meet new people in the space! Let's stay connected!",
  },
};

export default function ConnectionWelcomeTool() {
  const [formData, setFormData] = useState({ name: "", yourName: "", yourRole: "" });
  const [selectedTone, setSelectedTone] = useState<"friendly" | "professional" | "casual">("friendly");
  const [selectedLength, setSelectedLength] = useState<"short" | "medium" | "long">("short");
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);

  const generateMessage = () => {
    let template = welcomeTemplates[selectedTone][selectedLength];
    template = template.replace(/{name}/g, formData.name || "there");
    template = template.replace(/{yourName}/g, formData.yourName || "I");
    template = template.replace(/{yourRole}/g, formData.yourRole || "");
    setGenerated(template);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tool-section">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#057642] to-[#0A66C2] rounded-xl flex items-center justify-center">
          <Handshake className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Welcome Message Generator</h2>
          <p className="text-gray-500 text-sm">Auto-generate welcome messages for new connections</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="tool-label">Tone</label>
        <div className="grid grid-cols-3 gap-2">
          {([
            { key: "friendly", label: "Friendly" },
            { key: "professional", label: "Professional" },
            { key: "casual", label: "Casual" },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSelectedTone(key)}
              className={`p-3 rounded-lg text-sm font-medium transition-all ${
                selectedTone === key ? "bg-[#057642] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="tool-label">Length</label>
        <div className="grid grid-cols-3 gap-2">
          {(["short", "medium", "long"] as const).map((len) => (
            <button
              key={len}
              onClick={() => setSelectedLength(len)}
              className={`p-2 rounded-lg text-sm font-medium capitalize transition-all ${
                selectedLength === len ? "bg-[#0A66C2] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {len}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="tool-label">Connection Name</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="tool-input" placeholder="John" />
        </div>
        <div>
          <label className="tool-label">Your Name</label>
          <input type="text" value={formData.yourName} onChange={(e) => setFormData({...formData, yourName: e.target.value})} className="tool-input" placeholder="Your name" />
        </div>
      </div>

      <button onClick={generateMessage} className="tool-button-primary w-full mb-4">
        <Sparkles className="w-4 h-4" /> Generate Message
      </button>

      {generated && (
        <div className="tool-result">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-gray-800">Generated Message:</p>
            <button onClick={copyToClipboard} className="text-[#057642] text-sm font-medium flex items-center gap-1">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-gray-700 whitespace-pre-line">{generated}</p>
        </div>
      )}
    </div>
  );
}

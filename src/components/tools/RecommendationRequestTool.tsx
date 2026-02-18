"use client";

import { useState } from "react";
import { Award, Copy, Check, Sparkles, User, Star } from "lucide-react";

const requestTemplates = {
  colleague: {
    short: "Hi {name}, I'd really appreciate it if you could write me a recommendation. Happy to return the favor!",
    medium: "Hi {name}, I hope you're doing well! We worked together at {company}, and I was wondering if you could write me a LinkedIn recommendation. It would really help boost my profile. Of course, happy to write one for you too!",
    long: "Hi {name}, I hope this message finds you well! I was thinking about our time working together at {company} and how much I learned from you. I'd be incredibly grateful if you could write me a LinkedIn recommendation highlighting our collaboration and my work. It would make a significant difference for my profile. I'd be more than happy to return the favor!",
  },
  manager: {
    short: "Hi {name}, would you be willing to write me a LinkedIn recommendation?",
    medium: "Hi {name}, I hope you're doing well! As my manager at {company}, you saw my work firsthand. I'd really appreciate a LinkedIn recommendation if you have time. It would mean a lot!",
    long: "Dear {name}, I hope this message finds you well! Working under your leadership at {company} was a transformative experience for me. I truly appreciate the guidance and mentorship you provided during my time there. If you have a few minutes, I'd be incredibly grateful if you could write me a LinkedIn recommendation. Your endorsement would carry significant weight and help advance my career. Thank you for considering!",
  },
  peer: {
    short: "Hey {name}! Could you write me a quick recommendation on LinkedIn?",
    medium: "Hey {name}, it's been great working with you! Would you mind writing me a LinkedIn recommendation? Happy to write one for you too!",
    long: "Hey {name}! It's been awesome collaborating with you on various projects. I really value your perspective and would be honored if you could write me a LinkedIn recommendation. It doesn't have to be long - just a few lines about our work together would be amazing. Of course, I'd be more than happy to return the favor whenever you need!",
  },
};

export default function RecommendationRequestTool() {
  const [formData, setFormData] = useState({ name: "", company: "", yourName: "" });
  const [selectedType, setSelectedType] = useState<"colleague" | "manager" | "peer">("colleague");
  const [selectedLength, setSelectedLength] = useState<"short" | "medium" | "long">("short");
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);

  const generateRequest = () => {
    let template = requestTemplates[selectedType][selectedLength];
    template = template.replace(/{name}/g, formData.name || "there");
    template = template.replace(/{company}/g, formData.company || "our company");
    template = template.replace(/{yourName}/g, formData.yourName || "I");
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
        <div className="w-12 h-12 bg-gradient-to-br from-[#ea580c] to-[#db2777] rounded-xl flex items-center justify-center">
          <Award className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Recommendation Request</h2>
          <p className="text-gray-500 text-sm">Ask for LinkedIn recommendations professionally</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="tool-label">Relationship</label>
        <div className="grid grid-cols-3 gap-2">
          {([
            { key: "colleague", label: "Colleague", icon: User },
            { key: "manager", label: "Manager", icon: Star },
            { key: "peer", label: "Peer", icon: User },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSelectedType(key)}
              className={`p-3 rounded-lg text-sm font-medium transition-all ${
                selectedType === key ? "bg-[#ea580c] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                selectedLength === len ? "bg-[#db2777] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {len}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="tool-label">Person's Name</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="tool-input" placeholder="John" />
        </div>
        <div>
          <label className="tool-label">Company</label>
          <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="tool-input" placeholder="Company name" />
        </div>
      </div>

      <button onClick={generateRequest} className="tool-button-primary w-full mb-4">
        <Sparkles className="w-4 h-4" /> Generate Request
      </button>

      {generated && (
        <div className="tool-result">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-gray-800">Generated Message:</p>
            <button onClick={copyToClipboard} className="text-[#ea580c] text-sm font-medium flex items-center gap-1">
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

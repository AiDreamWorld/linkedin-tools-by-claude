"use client";

import { useState } from "react";
import { Mail, Copy, Check, Sparkles, User, Briefcase, Building } from "lucide-react";

const inmailTemplates = {
  jobInquiry: {
    short: "Hi {name}, I came across your profile and noticed you're working at {company}. I'm interested in {role} opportunities. Would you have time for a quick chat?",
    medium: "Hi {name}, I hope you're doing well. I noticed your work at {company} and I'm very interested in learning more about {role} opportunities within your team or network. Could we connect for a brief call?",
    long: "Hi {name}, I hope this message finds you well. I've been following your career journey at {company} with great interest, particularly your work in {role}. I'm currently exploring opportunities in this space and would greatly appreciate the chance to learn from your experience. Would you be open to a 15-minute call?",
  },
  networking: {
    short: "Hi {name}, I'd love to connect and learn more about your journey in {industry}. Any advice for someone looking to break into this field?",
    medium: "Hi {name}, I'm a {role} professional looking to expand my network in the {industry} space. Your profile caught my attention and I'd love to connect. Would you be open to a brief conversation?",
    long: "Hi {name}, I'm reaching out because I'm genuinely impressed by your career trajectory in {industry}. As someone who's passionate about breaking into this field, I'd love to learn from your journey. I understand you're busy, but even a quick 15-minute call would mean a lot. Would you be open to connecting?",
  },
  informational: {
    short: "Hi {name}, I'm researching {topic} and your profile came up. Would you be open to a quick call to learn more about your experience?",
    medium: "Hi {name}, I'm currently doing research on {topic} and came across your profile. Your experience in this area is exactly what I'm looking to learn more about. Would you have 20 minutes for an informational interview?",
    long: "Hi {name}, I'm reaching out because I'm conducting research on {topic} and your profile stood out as someone with valuable expertise in this area. I'd love to learn more about your journey and insights. Would you be willing to schedule a brief 20-30 minute call? I promise to be respectful of your time.",
  },
};

export default function InMailGeneratorTool() {
  const [formData, setFormData] = useState({
    recipientName: "",
    yourName: "",
    company: "",
    role: "",
    industry: "",
    topic: "",
  });
  const [selectedType, setSelectedType] = useState<"jobInquiry" | "networking" | "informational">("jobInquiry");
  const [selectedLength, setSelectedLength] = useState<"short" | "medium" | "long">("short");
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);

  const generateInMail = () => {
    let template = inmailTemplates[selectedType][selectedLength];
    template = template.replace(/{name}/g, formData.recipientName || "there");
    template = template.replace(/{company}/g, formData.company || "your company");
    template = template.replace(/{role}/g, formData.role || "your field");
    template = template.replace(/{industry}/g, formData.industry || "tech");
    template = template.replace(/{topic}/g, formData.topic || "this topic");
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
        <div className="w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded-xl flex items-center justify-center">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">LinkedIn InMail Generator</h2>
          <p className="text-gray-500 text-sm">Generate professional messages for recruiters</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="tool-label">Purpose</label>
        <div className="grid grid-cols-3 gap-2">
          {([
            { key: "jobInquiry", label: "Job Inquiry", icon: Briefcase },
            { key: "networking", label: "Networking", icon: User },
            { key: "informational", label: "Informational", icon: Building },
          ] as const).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSelectedType(key)}
              className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
                selectedType === key ? "bg-[#0A66C2] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Icon className="w-4 h-4" />
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
                selectedLength === len ? "bg-[#057642] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {len}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="tool-label">Recipient Name</label>
          <input type="text" value={formData.recipientName} onChange={(e) => setFormData({...formData, recipientName: e.target.value})} className="tool-input" placeholder="John" />
        </div>
        <div>
          <label className="tool-label">Your Name</label>
          <input type="text" value={formData.yourName} onChange={(e) => setFormData({...formData, yourName: e.target.value})} className="tool-input" placeholder="Your name" />
        </div>
        <div>
          <label className="tool-label">Company</label>
          <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="tool-input" placeholder="Google" />
        </div>
        <div>
          <label className="tool-label">Role/Industry</label>
          <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="tool-input" placeholder="Software Engineer" />
        </div>
      </div>

      <button onClick={generateInMail} className="tool-button-primary w-full mb-4">
        <Sparkles className="w-4 h-4" /> Generate InMail
      </button>

      {generated && (
        <div className="tool-result">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-gray-800">Generated Message:</p>
            <button onClick={copyToClipboard} className="text-[#0A66C2] text-sm font-medium flex items-center gap-1">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-gray-700 whitespace-pre-line text-sm">{generated}</p>
        </div>
      )}
    </div>
  );
}

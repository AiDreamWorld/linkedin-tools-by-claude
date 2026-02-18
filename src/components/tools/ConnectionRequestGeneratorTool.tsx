"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Copy, RefreshCw, Sparkles, Check } from "lucide-react";

const connectionTemplates = {
  student: {
    short: "Hi {name}, I'm a {major} student at {university} and I'm interested in learning more about your journey in {industry}. Would love to connect!",
    medium: "Hi {name}, I'm a {year} {major} student at {university} who's passionate about {industry}. Your experience in {role} at {company} is inspiring. Would love to connect and learn from your journey!",
    long: "Hi {name}, I'm currently a {year} {major} student at {university} and I've been following your career journey with great interest. Your work at {company} as {role} aligns with my career goals in {industry}. I'd love to connect and potentially learn from your experiences. Looking forward to connecting!",
  },
  professional: {
    short: "Hi {name}, came across your profile and impressed by your work at {company}. Would love to connect and stay updated on your insights.",
    medium: "Hi {name}, I'm a {role} with {years} years experience in {industry}. Your background at {company} caught my attention - would love to connect and explore potential synergies.",
    long: "Hi {name}, I've been following your professional journey and find your experience as {role} at {company} very inspiring. With my background in {industry}, I believe there's potential for us to connect and share insights. Would you be open to connecting?",
  },
  recruiter: {
    short: "Hi {name}, I'm looking for {role} candidates for {companyType} opportunities. Your profile looks like a great fit. Let's connect!",
    medium: "Hi {name}, I'm a recruiter at {company} looking for talented {role} professionals. Your experience in {industry} caught my attention. Would love to connect about potential opportunities!",
    long: "Hi {name}, I'm reaching out on behalf of my client, a leading {companyType} company, seeking experienced {role} professionals. Your background in {industry} at {company} seems like a great match. Would you be open to a brief conversation about this opportunity?",
  },
};

export default function ConnectionRequestGeneratorTool() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    industry: "",
    university: "",
    major: "",
    year: "",
    years: "",
    companyType: "",
  });
  const [selectedType, setSelectedType] = useState<"student" | "professional" | "recruiter">("student");
  const [selectedLength, setSelectedLength] = useState<"short" | "medium" | "long">("short");
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);

  const generateMessage = () => {
    let template = connectionTemplates[selectedType][selectedLength];
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        template = template.replace(new RegExp(`{${key}}`, "g"), value);
      }
    });
    
    template = template.replace(/{(\w+)}/g, "[specific]");
    setGenerated(template);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded-xl flex items-center justify-center">
          <UserPlus className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Connection Request Generator</h2>
          <p className="text-gray-500 text-sm">Create personalized LinkedIn connection requests</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Who are you reaching out to?</label>
        <div className="grid grid-cols-3 gap-2">
          {(["student", "professional", "recruiter"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`p-3 rounded-lg text-sm font-medium capitalize transition-all ${
                selectedType === type
                  ? "bg-[#0A66C2] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Message Length</label>
        <div className="grid grid-cols-3 gap-2">
          {(["short", "medium", "long"] as const).map((length) => (
            <button
              key={length}
              onClick={() => setSelectedLength(length)}
              className={`p-3 rounded-lg text-sm font-medium capitalize transition-all ${
                selectedLength === length
                  ? "bg-[#057642] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {length}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Their Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Their Role</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => updateField("role", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Software Engineer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => updateField("company", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Google"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
          <input
            type="text"
            value={formData.industry}
            onChange={(e) => updateField("industry", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Tech"
          />
        </div>
        {selectedType === "student" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
              <input
                type="text"
                value={formData.university}
                onChange={(e) => updateField("university", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="MIT"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
              <input
                type="text"
                value={formData.major}
                onChange={(e) => updateField("major", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => updateField("year", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Junior/Senior"
              />
            </div>
          </>
        )}
        {selectedType === "professional" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
            <input
              type="text"
              value={formData.years}
              onChange={(e) => updateField("years", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="5+ years"
            />
          </div>
        )}
        {selectedType === "recruiter" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Type</label>
            <input
              type="text"
              value={formData.companyType}
              onChange={(e) => updateField("companyType", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Tech Startup"
            />
          </div>
        )}
      </div>

      <button
        onClick={generateMessage}
        className="w-full bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white py-3 rounded-lg font-semibold hover:opacity-90 flex items-center justify-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        Generate Message
      </button>

      {generated && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700">Generated Message:</p>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-sm text-[#0A66C2] font-medium"
            >
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

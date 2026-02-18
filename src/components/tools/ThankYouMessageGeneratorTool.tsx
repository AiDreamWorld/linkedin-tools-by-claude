"use client";

import { useState } from "react";
import { Copy, Check, Sparkles, Heart, User, Briefcase, GraduationCap, Award } from "lucide-react";

const thankYouTemplates = {
  interview: [
    "Dear [Name],\n\nThank you so much for taking the time to meet with me today to discuss the [Position] role at [Company]. I truly enjoyed learning more about the position and your team.\n\nOur conversation reinforced my enthusiasm for the opportunity. I'm excited about the possibility of bringing my [relevant skill] to [Company] and contributing to your team's success.\n\nPlease don't hesitate to reach out if you need any additional information. I look forward to hearing from you.\n\nBest regards,\n[Your Name]",
    
    "Hi [Name],\n\nI wanted to express my sincere gratitude for the opportunity to interview for the [Position] position. It was a pleasure meeting you and learning more about [Company]'s vision.\n\nI'm very excited about the possibility of joining the team and believe my experience in [relevant area] would allow me to make meaningful contributions.\n\nThank you again for your time and consideration.\n\nWarm regards,\n[Your Name]",
  ],
  informational: [
    "Dear [Name],\n\nThank you so much for taking the time to speak with me today. I really appreciate your insights on [topic] and learning about your career journey at [Company].\n\nYour advice about [specific advice] was incredibly valuable. I'm excited to apply these learnings as I continue in my career.\n\nI'd love to stay in touch and continue learning from your experience. Thank you again for your generosity with your time.\n\nBest regards,\n[Your Name]",
    
    "Hi [Name],\n\nI wanted to drop a quick note to say thank you for our conversation today. It was truly inspiring to hear about your work at [Company] and your career path.\n\nI particularly appreciated your thoughts on [topic]. As I move forward, I'll definitely keep your advice in mind.\n\nThank you again for making the time - it means a lot!\n\nBest,\n[Your Name]",
  ],
  mentorship: [
    "Dear [Name],\n\nThank you for agreeing to be my mentor. I'm honored by your willingness to guide me in my career journey.\n\nOur first conversation was incredibly valuable. I'm excited to learn from your experience and apply your insights to my professional development.\n\nI look forward to our future conversations and learning from your wisdom.\n\nWith gratitude,\n[Your Name]",
  ],
  networking: [
    "Hi [Name],\n\nThank you for connecting with me at [event]. I really enjoyed our conversation about [topic].\n\nYour perspective on [insight] was really valuable. I'd love to continue our conversation and learn more about your work.\n\nWould you be open to a coffee chat or virtual meeting sometime?\n\nBest regards,\n[Your Name]",
  ],
};

export default function ThankYouMessageGeneratorTool() {
  const [recipientName, setRecipientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [relevantSkill, setRelevantSkill] = useState("");
  const [topic, setTopic] = useState("");
  const [specificAdvice, setSpecificAdvice] = useState("");
  const [messageType, setMessageType] = useState("interview");
  const [generated, setGenerated] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generateMessages = () => {
    const templates = thankYouTemplates[messageType as keyof typeof thankYouTemplates];
    const messages = templates.map(template => {
      return template
        .replace(/\[Name\]/g, recipientName || "you")
        .replace(/\[Company\]/g, companyName || "your company")
        .replace(/\[Position\]/g, position || "the position")
        .replace(/\[relevant skill\]/g, relevantSkill || "my skills")
        .replace(/\[relevant area\]/g, relevantSkill || "this area")
        .replace(/\[topic\]/g, topic || "your work")
        .replace(/\[specific advice\]/g, specificAdvice || "your advice")
        .replace(/\[event\]/g, "the event")
        .replace(/\[insight\]/g, topic || "your insights");
    });
    setGenerated(messages);
  };

  const copyMessage = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-[#7c3aed] to-[#db2777] rounded-xl flex items-center justify-center">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Thank You Message Generator</h2>
          <p className="text-gray-500 text-sm">Generate professional thank you messages</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
            <input
              type="text"
              placeholder="e.g., John, Ms. Smith"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              placeholder="e.g., Google"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position/Role</label>
            <input
              type="text"
              placeholder="e.g., Product Manager"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relevant Skill</label>
            <input
              type="text"
              placeholder="e.g., leadership"
              value={relevantSkill}
              onChange={(e) => setRelevantSkill(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Topic Discussed</label>
            <input
              type="text"
              placeholder="e.g., product development"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specific Advice Given</label>
            <input
              type="text"
              placeholder="e.g., networking strategies"
              value={specificAdvice}
              onChange={(e) => setSpecificAdvice(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button onClick={() => setMessageType("interview")} className={`py-2 px-3 rounded-lg text-sm font-medium transition ${messageType === "interview" ? "bg-gradient-to-r from-[#7c3aed] to-[#db2777] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              After Interview
            </button>
            <button onClick={() => setMessageType("informational")} className={`py-2 px-3 rounded-lg text-sm font-medium transition ${messageType === "informational" ? "bg-gradient-to-r from-[#7c3aed] to-[#db2777] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              Informational
            </button>
            <button onClick={() => setMessageType("mentorship")} className={`py-2 px-3 rounded-lg text-sm font-medium transition ${messageType === "mentorship" ? "bg-gradient-to-r from-[#7c3aed] to-[#db2777] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              Mentorship
            </button>
            <button onClick={() => setMessageType("networking")} className={`py-2 px-3 rounded-lg text-sm font-medium transition ${messageType === "networking" ? "bg-gradient-to-r from-[#7c3aed] to-[#db2777] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              Networking
            </button>
          </div>
        </div>

        <button
          onClick={generateMessages}
          className="w-full bg-gradient-to-r from-[#7c3aed] to-[#db2777] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all"
        >
          Generate Thank You Messages
        </button>
      </div>

      {generated.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">Generated Messages:</p>
          {generated.map((message, i) => (
            <div 
              key={i} 
              className="p-4 bg-purple-50 rounded-lg flex items-start justify-between group hover:bg-purple-100 transition-colors"
            >
              <p className="text-gray-800 whitespace-pre-wrap text-sm flex-1">{message}</p>
              <button
                onClick={() => copyMessage(message, i)}
                className="ml-2 p-2 text-purple-600 hover:text-purple-700 rounded-lg hover:bg-white transition-colors"
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

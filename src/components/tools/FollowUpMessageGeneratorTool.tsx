"use client";

import { useState } from "react";
import { Copy, Check, MessageCircle, Send, Clock, Calendar, User } from "lucide-react";

const followUpTemplates = {
  postInterview: [
    "Hi [Name],\n\nThank you so much for taking the time to meet with me today. I really enjoyed learning about the [position] role and your team's goals.\n\nI'm excited about the opportunity to bring my [relevant skill] to [Company]. Please don't hesitate to reach out if you need any additional information.\n\nLooking forward to hearing from you!\n\nBest regards,\n[Your Name]",
    
    "Dear [Name],\n\nIt was a pleasure speaking with you about the [Position] position at [Company]. I wanted to reiterate my enthusiasm for the role and the team.\n\nOur conversation reinforced my interest in joining [Company]. I'm confident that my experience in [relevant area] would be a great fit.\n\nPlease let me know if there's anything else you need from my end.\n\nBest,\n[Your Name]",
    
    "Hi [Name],\n\nThank you for the opportunity to discuss the [Position] role. I enjoyed learning more about your team and the exciting projects at [Company].\n\nI'm very interested in bringing my skills in [relevant skill] to contribute to [Company]'s mission. Would be happy to provide any additional information.\n\nBest regards,\n[Your Name]",
  ],
  postApplication: [
    "Hi [Name],\n\nI recently applied for the [Position] role at [Company] and wanted to follow up on my application. I'm very enthusiastic about the opportunity to join your team.\n\nWith my background in [relevant experience], I'm confident I can contribute to [Company]'s goals. I'd love to discuss how I can add value to your team.\n\nPlease let me know if there's any additional information I can provide.\n\nBest regards,\n[Your Name]",
    
    "Dear [Hiring Manager],\n\nI wanted to check in on my application for the [Position] role. I'm very interested in joining [Company] and believe my skills in [relevant area] would be valuable.\n\nI'd welcome the opportunity to discuss how my experience aligns with your needs.\n\nThank you for your time and consideration.\n\nBest,\n[Your Name]",
  ],
  networking: [
    "Hi [Name],\n\nGreat connecting with you at [event]. I enjoyed our conversation about [topic].\n\nAs promised, here's a link to [resource] that I mentioned. Hope you find it useful!\n\nWould love to stay in touch and continue our conversation. Perhaps we could grab coffee sometime?\n\nBest,\n[Your Name]",
    
    "Dear [Name],\n\nThank you for connecting with me. I really enjoyed our conversation about [topic].\n\nI'd love to learn more about your work at [Company] and explore how we might be able to help each other.\n\nWould you be open to a quick call sometime?\n\nBest regards,\n[Your Name]",
  ],
  coldOutreach: [
    "Hi [Name],\n\nI came across your profile and was impressed by your work in [industry/field]. I'm currently [what you're doing] and would love to connect.\n\nI have some thoughts on [relevant topic] that might interest you. Would you be open to a brief conversation?\n\nNo pressure at all - just thought it might be valuable to connect.\n\nBest,\n[Your Name]",
  ],
};

export default function FollowUpMessageGeneratorTool() {
  const [recipientName, setRecipientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [relevantSkill, setRelevantSkill] = useState("");
  const [messageType, setMessageType] = useState("postInterview");
  const [generated, setGenerated] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generateMessages = () => {
    const templates = followUpTemplates[messageType as keyof typeof followUpTemplates];
    const messages = templates.map(template => {
      return template
        .replace(/\[Name\]/g, recipientName || "there")
        .replace(/\[Company\]/g, companyName || "your company")
        .replace(/\[Position\]/g, position || "the position")
        .replace(/\[relevant skill\]/g, relevantSkill || "my skills")
        .replace(/\[relevant experience\]/g, relevantSkill || "my experience")
        .replace(/\[relevant area\]/g, relevantSkill || "this area")
        .replace(/\[event\]/g, "the recent event")
        .replace(/\[topic\]/g, "your work")
        .replace(/\[resource\]/g, "the resource")
        .replace(/\[industry\/field\]/g, "your industry");
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
        <div className="w-12 h-12 bg-gradient-to-r from-[#ea580c] to-[#db2777] rounded-xl flex items-center justify-center">
          <Send className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Follow-up Message Generator</h2>
          <p className="text-gray-500 text-sm">Generate professional follow-up messages</p>
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
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              placeholder="e.g., Google, Acme Inc."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position/Role</label>
            <input
              type="text"
              placeholder="e.g., Software Engineer"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relevant Skill/Experience</label>
            <input
              type="text"
              placeholder="e.g., Python, project management"
              value={relevantSkill}
              onChange={(e) => setRelevantSkill(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button onClick={() => setMessageType("postInterview")} className={`py-2 px-3 rounded-lg text-sm font-medium transition ${messageType === "postInterview" ? "bg-gradient-to-r from-[#ea580c] to-[#db2777] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              <Clock className="w-4 h-4 inline mr-1" /> Post-Interview
            </button>
            <button onClick={() => setMessageType("postApplication")} className={`py-2 px-3 rounded-lg text-sm font-medium transition ${messageType === "postApplication" ? "bg-gradient-to-r from-[#ea580c] to-[#db2777] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              <Calendar className="w-4 h-4 inline mr-1" /> Post-Application
            </button>
            <button onClick={() => setMessageType("networking")} className={`py-2 px-3 rounded-lg text-sm font-medium transition ${messageType === "networking" ? "bg-gradient-to-r from-[#ea580c] to-[#db2777] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              <User className="w-4 h-4 inline mr-1" /> Networking
            </button>
            <button onClick={() => setMessageType("coldOutreach")} className={`py-2 px-3 rounded-lg text-sm font-medium transition ${messageType === "coldOutreach" ? "bg-gradient-to-r from-[#ea580c] to-[#db2777] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              <Send className="w-4 h-4 inline mr-1" /> Cold Outreach
            </button>
          </div>
        </div>

        <button
          onClick={generateMessages}
          className="w-full bg-gradient-to-r from-[#ea580c] to-[#db2777] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all"
        >
          Generate Messages
        </button>
      </div>

      {generated.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">Generated Messages:</p>
          {generated.map((message, i) => (
            <div 
              key={i} 
              className="p-4 bg-orange-50 rounded-lg flex items-start justify-between group hover:bg-orange-100 transition-colors"
            >
              <p className="text-gray-800 whitespace-pre-wrap text-sm flex-1">{message}</p>
              <button
                onClick={() => copyMessage(message, i)}
                className="ml-2 p-2 text-orange-600 hover:text-orange-700 rounded-lg hover:bg-white transition-colors"
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

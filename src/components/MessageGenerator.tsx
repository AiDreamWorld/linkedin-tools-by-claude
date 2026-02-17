"use client";

import { useState } from "react";

export default function MessageGenerator() {
  const [recipientName, setRecipientName] = useState("");
  const [theirRole, setTheirRole] = useState("");
  const [company, setCompany] = useState("");
  const [reason, setReason] = useState("");
  const [messageType, setMessageType] = useState("connection");
  const [generated, setGenerated] = useState("");
  const [generating, setGenerating] = useState(false);

  const generateMessage = () => {
    setGenerating(true);

    setTimeout(() => {
      let content = "";

      if (messageType === "connection") {
        content = `Hi ${recipientName || "there"},

I came across your profile and was impressed by your work as ${theirRole || "a professional"} at ${company || "your company"}. 

${reason || "I'd love to connect and learn more about your career journey."}

Would you be open to connecting? I'm always looking to expand my network with professionals in the ${theirRole || "tech"} space.

Best regards`;
      } else if (messageType === "informational") {
        content = `Hi ${recipientName},

I hope this message finds you well. I'm currently exploring career paths in ${theirRole || "the industry"} and noticed your impressive background.

I would greatly appreciate the opportunity to ask you a few questions about your experience as ${theirRole} at ${company || "your organization"}. Any insights you could share would be incredibly valuable.

Would you be available for a brief 15-20 minute call or would you prefer to exchange emails?

Thank you for considering my request.

Best regards`;
      } else if (messageType === "followup") {
        content = `Hi ${recipientName},

I wanted to follow up on our recent conversation about ${reason || "the opportunity we discussed"}.

I remain very interested in ${company || "your company"} and would love to continue exploring how I might be able to contribute to the team.

Please let me know if you need any additional information from my end.

Looking forward to hearing from you.

Best`;
      } else if (messageType === "thankyou") {
        content = `Hi ${recipientName},

Thank you so much for taking the time to connect with me today. I really appreciate your insights about ${theirRole || "your experience"} at ${company || "your company"}.

I learned a lot from our conversation, particularly about ${reason || "the topics we discussed"}.

I look forward to staying in touch and would love to connect again in the future.

Best regards`;
      }

      setGenerated(content);
      setGenerating(false);
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Message Generator</h3>
      <p className="text-gray-600 text-sm mb-4">Create personalized outreach messages</p>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Recipient's Name"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
        />
        <input
          type="text"
          placeholder="Their Role"
          value={theirRole}
          onChange={(e) => setTheirRole(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
        />
        <input
          type="text"
          placeholder="Reason / Context"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
        />
        <select
          value={messageType}
          onChange={(e) => setMessageType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
        >
          <option value="connection">Connection Request</option>
          <option value="informational">Informational Interview</option>
          <option value="followup">Follow Up</option>
          <option value="thankyou">Thank You</option>
        </select>

        <button
          onClick={generateMessage}
          disabled={generating}
          className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50"
        >
          {generating ? "Generating..." : "Generate Message"}
        </button>

        {generated && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">Generated:</p>
              <button
                onClick={copyToClipboard}
                className="text-xs text-orange-600 hover:text-orange-700 font-medium"
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

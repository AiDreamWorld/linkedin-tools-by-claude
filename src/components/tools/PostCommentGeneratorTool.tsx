"use client";

import { useState } from "react";
import { MessageCircle, Copy, Check, Sparkles, ThumbsUp, Heart, Star, Lightbulb } from "lucide-react";

const commentTemplates = {
  compliment: {
    short: "Great insight! 👏",
    medium: "This is such valuable information. Thanks for sharing! Really appreciate your perspective on this.",
    long: "I completely agree with this! Your insights are always so valuable. This is exactly what I needed to read today. Thank you for taking the time to share your knowledge!",
  },
  question: {
    short: "Interesting! How did you get started?",
    medium: "This is fascinating! I'd love to hear more about your journey. What was the biggest challenge you faced?",
    long: "What an inspiring post! I have a few questions: 1) How did you get started in this field? 2) What was the biggest challenge you faced? 3) What advice would you give to someone just starting?",
  },
  share: {
    short: "Saving this for later! 📌",
    medium: "This is gold! Saving this post to refer back to. Thanks for sharing such valuable content!",
    long: "Bookmarked! 🔖 This is incredibly valuable content that I know I'll refer back to many times. Thank you for taking the time to put this together and share your expertise with the community!",
  },
  inspiration: {
    short: "This is so motivating! 💪",
    medium: "Your journey is truly inspiring! Posts like this remind me why I love what I do. Thank you!",
    long: "I needed to see this today! Your story is a powerful reminder that success is a journey. Thank you for being so open and sharing your experiences. It truly makes a difference to people like me who are on a similar path!",
  },
};

export default function PostCommentGeneratorTool() {
  const [postContent, setPostContent] = useState("");
  const [selectedType, setSelectedType] = useState<"compliment" | "question" | "share" | "inspiration">("compliment");
  const [selectedLength, setSelectedLength] = useState<"short" | "medium" | "long">("short");
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);

  const generateComment = () => {
    const template = commentTemplates[selectedType][selectedLength];
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
        <div className="w-12 h-12 bg-gradient-to-br from-[#7c3aed] to-[#db2777] rounded-xl flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Post Comment Generator</h2>
          <p className="text-gray-500 text-sm">Generate engaging comments to increase visibility</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="tool-label">Comment Type</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {([
            { key: "compliment", label: "Compliment", icon: ThumbsUp },
            { key: "question", label: "Question", icon: Lightbulb },
            { key: "share", label: "Save/Share", icon: Star },
            { key: "inspiration", label: "Inspiration", icon: Heart },
          ] as const).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSelectedType(key)}
              className={`p-3 rounded-lg text-sm font-medium flex items-center gap-1 transition-all ${
                selectedType === key ? "bg-[#7c3aed] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                selectedLength === len ? "bg-[#db2777] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {len}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="tool-label">Post Content (optional - for context)</label>
        <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} className="tool-textarea" rows={3} placeholder="Paste the post content you're commenting on..." />
      </div>

      <button onClick={generateComment} className="tool-button-primary w-full mb-4">
        <Sparkles className="w-4 h-4" /> Generate Comment
      </button>

      {generated && (
        <div className="tool-result">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-gray-800">Generated Comment:</p>
            <button onClick={copyToClipboard} className="text-[#7c3aed] text-sm font-medium flex items-center gap-1">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-gray-700">{generated}</p>
        </div>
      )}
    </div>
  );
}

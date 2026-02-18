"use client";

import { useState } from "react";
import { Copy, Check, Sparkles, MessageSquare, Heart, Share2, Send, Star } from "lucide-react";

const captionStyles = {
  professional: {
    name: "Professional",
    templates: [
      "Excited to share insights on {topic}. Here's what I've learned:\n\n[Your key point]\n\nWhat's your experience? Drop a comment 👇",
      "{topic} is changing the industry. Here's what you need to know:\n\n[Key insight]\n\n#LinkedIn #Professional #Industry",
      "Quick thought on {topic}:\n\n[Your take]\n\nLet's discuss in the comments!",
    ]
  },
  personal: {
    name: "Personal Story",
    templates: [
      "My journey with {topic} hasn't been easy, but it's been worth it. Here's what I learned:\n\n[Your story]\n\nHave you been through something similar? Share below 👇",
      "I used to struggle with {topic} until I tried this:\n\n[Your solution]\n\nHope this helps anyone going through the same! 💪",
      "A year ago, I decided to focus on {topic}. Here's what happened:\n\n[Your results]\n\nWhat would you add? 🤔",
    ]
  },
  educational: {
    name: "Educational",
    templates: [
      "🧵 Thread: Everything you need to know about {topic}\n\nLet's break it down:\n\n1. [Point 1]\n2. [Point 2]\n3. [Point 3]\n\nSave this for later! 📌",
      "📚 Learning about {topic}? Here's your complete guide:\n\n[Key concepts]\n\nWhat questions do you have? I'll answer in the comments!",
      "The ultimate guide to {topic}:\n\n[Step 1]: [Description]\n[Step 2]: [Description]\n[Step 3]: [Description]\n\n👇 Drop a comment if you want more details!",
    ]
  },
  engagement: {
    name: "Engagement",
    templates: [
      "Hot take: {topic}\n\nDon't agree? Let me know why in the comments!\n\nI'm open to being proven wrong 🙏",
      "Poll: How much time do you spend on {topic}?\n\nA) [Option A]\nB) [Option B]\nC) [Option C]\n\nVote and share your thoughts! 👇",
      "What's your biggest challenge with {topic}?\n\nI've been thinking about this lately and want to hear your perspective.\n\nDrop your thoughts below 👇",
    ]
  },
  announcement: {
    name: "Announcement",
    templates: [
      "Big news! 🎉\n\nI'm excited to share that {topic}!\n\n[Details about your announcement]\n\nThank you to everyone who supported me along the way. Couldn't have done it without you! 🙏",
      "Thrilled to announce {topic}!\n\n[Your announcement details]\n\nThis has been months in the making. Here's what I've learned...\n\n👇 Comment below if you want to know more!",
      "After months of work, {topic} is finally here!\n\n[Announcement details]\n\nThank you to the amazing community that's been supporting me. Let's go! 🚀",
    ]
  },
  short: {
    name: "Short & Simple",
    templates: [
      "{topic} - here's the truth:\n\n[Your insight]\n\n👇 Agree or disagree?",
      "Unpopular opinion: {topic}\n\n[Your take]\n\nLet's debate 👇",
      "{topic} tip that changed everything:\n\n[Your tip]\n\nSave this! 📌",
    ]
  },
};

export default function CaptionGeneratorTool() {
  const [topic, setTopic] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("professional");
  const [generated, setGenerated] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const generateCaptions = () => {
    setGenerating(true);
    setTimeout(() => {
      const style = captionStyles[selectedStyle as keyof typeof captionStyles];
      const captions = style.templates.map(template => 
        template.replace(/{topic}/g, topic || "this topic")
      );
      setGenerated(captions);
      setGenerating(false);
    }, 800);
  };

  const generateAllStyles = () => {
    setGenerating(true);
    setTimeout(() => {
      const allCaptions: string[] = [];
      Object.values(captionStyles).forEach(style => {
        style.templates.slice(0, 1).forEach(template => {
          allCaptions.push(template.replace(/{topic}/g, topic || "this topic"));
        });
      });
      setGenerated(allCaptions);
      setGenerating(false);
    }, 1200);
  };

  const copyCaption = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] rounded-xl flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Caption Generator</h2>
          <p className="text-gray-500 text-sm">Create engaging LinkedIn captions</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">What is your post about?</label>
          <input
            type="text"
            placeholder="e.g., career growth, leadership, productivity"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Caption Style</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Object.entries(captionStyles).map(([key, style]) => (
              <button
                key={key}
                onClick={() => setSelectedStyle(key)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                  selectedStyle === key
                    ? "bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {style.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={generateCaptions}
            disabled={generating}
            className="flex-1 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50"
          >
            {generating ? "Generating..." : "Generate Captions"}
          </button>
          <button
            onClick={generateAllStyles}
            disabled={generating}
            className="px-4 bg-gray-100 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all"
          >
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </div>

      {generated.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">Generated Captions:</p>
          {generated.map((caption, i) => (
            <div 
              key={i} 
              className="p-4 bg-gray-50 rounded-lg flex items-start justify-between group hover:bg-blue-50 transition-colors"
            >
              <p className="text-gray-800 whitespace-pre-wrap text-sm flex-1">{caption}</p>
              <button
                onClick={() => copyCaption(caption, i)}
                className="ml-2 p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-white transition-colors"
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

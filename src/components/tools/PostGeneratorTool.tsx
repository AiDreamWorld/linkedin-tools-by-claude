"use client";

import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";

const postTemplates = {
  story: {
    name: "📖 Story",
    templates: [
      "5 years ago, I made this mistake: {topic}. Here's what I learned...",
      "I almost gave up on my career until {topic}. Here's what changed everything...",
      "The best career advice I received was about {topic}. Let me share...",
      "I spent 3 years struggling with {topic}. Here's how I finally cracked it...",
      "A stranger on LinkedIn changed my life with one tip about {topic}...",
      "My biggest failure was {topic}. Here's what it taught me...",
      "I tried {topic} for 30 days. The results shocked me...",
      "From {topic} beginner to expert - here's my journey...",
      "The day I realized I was wrong about {topic}...",
      "I asked 50 experts about {topic}. Here's what they said...",
    ]
  },
  tips: {
    name: "💡 Tips",
    templates: [
      "3 lessons about {topic} that changed my career:\n\n1. First lesson\n2. Second lesson\n3. Third lesson\n\nWhat's your experience?",
      "Want to master {topic}? Here's what worked for me:\n\n• Tip 1\n• Tip 2\n• Tip 3\n\nWould love to hear your thoughts!",
      "The ultimate guide to {topic}:\n\nLet's break it down...🧵",
      "10 {topic} tips that actually work:\n\n1. Start small\n2. Be consistent\n3. Learn from failures\n...and more 👇",
      "5 {topic} mistakes you're probably making:\n\nDon't worry, I made all of them too 😅",
      "The {topic} framework I use every day:\n\nStep 1: Plan\nStep 2: Execute\nStep 3: Review\n\n👇 Drop a comment if you want more details!",
      "8 things I wish I knew about {topic} earlier:\n\nSave this for later! 📌",
      "3 {topic} strategies for maximum results:\n\nThread 🧵👇",
    ]
  },
  question: {
    name: "❓ Question",
    templates: [
      "What's your take on {topic}?\n\nI've been thinking about this lately and would love different perspectives.\n\nDrop your thoughts below 👇",
      "Hot take: {topic}\n\nDon't agree? Let me know why in the comments.\n\nI'm open to being proven wrong!",
      "What's the biggest challenge you face with {topic}?\n\nLet me help in the comments!",
      "Poll: How much time do you spend on {topic}?\n\nA) 0-1 hours\nB) 1-3 hours\nC) 3-5 hours\nD) 5+ hours",
      "Who else is struggling with {topic}?\n\nComment below 👇",
      "What's your #1 tip for {topic}?\n\nI'll go first: [Your tip]\n\nLet's build a thread of advice!",
    ]
  },
  announcement: {
    name: "📢 Announcement",
    templates: [
      "Excited to share that {topic}!\n\nIt's been a journey, and I'm grateful for everyone who's supported me along the way.\n\nMore details coming soon...",
      "Big news: {topic}!\n\nThis has been months in the making. Here's what I've been working on...",
      "Thrilled to announce {topic}!\n\nThank you to everyone who helped make this happen. Couldn't have done it without you! 🙏",
      "After 2 years of work, {topic} is finally here!\n\nHere's the story behind it...👇",
    ]
  },
  opinion: {
    name: "🎯 Opinion",
    templates: [
      "Unpopular opinion: {topic}\n\nHere's why I believe this...",
      "Why {topic} is overrated:\n\nLet me explain...",
      "I used to think {topic} was important. I was wrong.\n\nHere's what actually matters...",
      "The truth about {topic} that nobody talks about...",
      "Why your {topic} strategy is failing:\n\nHere's what you need to know...",
    ]
  },
  educational: {
    name: "📚 Educational",
    templates: [
      "Let's talk about {topic}:\n\nHere's everything you need to know (🧵)",
      "What is {topic}? A complete guide:\n\nDefinition, examples, and how to apply it...",
      "The science behind {topic}:\n\nHere's what research says...",
      "{topic} 101:\n\nA beginner's guide...",
    ]
  },
  celebration: {
    name: "🎉 Celebration",
    templates: [
      "Huge milestone: {topic}!\n\nThank you to everyone who believed in me...",
      "Celebrating {topic}! 🎉\n\nThis means so much to me because...",
      "I did it! {topic}\n\nHere's what I learned along the way...",
      "Grateful for {topic}\n\nHere's why this matters to me...",
    ]
  },
  behind: {
    name: "👀 Behind the Scenes",
    templates: [
      "Ever wonder what {topic} looks like behind the scenes? 🧵\n\nLet me show you...",
      "The reality of {topic}:\n\nWhat nobody tells you...",
      "Here's how {topic} actually works:\n\n(Not the polished version) 😅",
      "Raw truth about {topic}:\n\nNo filters, no editing...",
    ]
  },
};

export default function PostGeneratorTool() {
  const [topic, setTopic] = useState("");
  const [postType, setPostType] = useState<string>("story");
  const [generated, setGenerated] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const generatePosts = () => {
    setGenerating(true);
    setTimeout(() => {
      const templates = postTemplates[postType as keyof typeof postTemplates].templates;
      const posts = templates.map((template) => template.replace(/{topic}/g, topic || "this exciting topic"));
      setGenerated(posts);
      setGenerating(false);
    }, 800);
  };

  const generateAllTypes = () => {
    setGenerating(true);
    setTimeout(() => {
      const allPosts: string[] = [];
      Object.values(postTemplates).forEach(category => {
        category.templates.slice(0, 2).forEach(template => {
          allPosts.push(template.replace(/{topic}/g, topic || "this"));
        });
      });
      setGenerated(allPosts);
      setGenerating(false);
    }, 1200);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#db2777] rounded-xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Post Generator</h2>
          <p className="text-gray-500 text-sm">Create engaging LinkedIn posts</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Post Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(postTemplates).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setPostType(key)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  postType === key 
                    ? "bg-gradient-to-r from-[#0A66C2] to-[#db2777] text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">What is your post about?</label>
          <input
            type="text"
            placeholder="e.g., building a startup, learning to code, career growth"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={generatePosts}
            disabled={generating}
            className="flex-1 bg-gradient-to-r from-[#0A66C2] to-[#db2777] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50"
          >
            {generating ? "Generating..." : "Generate Posts"}
          </button>
          <button
            onClick={generateAllTypes}
            disabled={generating}
            className="px-4 bg-gray-100 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all"
            title="Generate from all types"
          >
            <Sparkles className="w-5 h-5" />
          </button>
        </div>

        {generated.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold text-gray-700">Generated Posts:</p>
            {generated.map((post, i) => (
              <div 
                key={i} 
                className="p-4 bg-gray-50 rounded-lg flex items-start justify-between group hover:bg-pink-50 transition-colors"
              >
                <p className="text-gray-800 whitespace-pre-wrap text-sm flex-1">{post}</p>
                <button
                  onClick={() => copyToClipboard(post, i)}
                  className="text-gray-400 hover:text-pink-600 p-2 rounded-lg hover:bg-white transition-colors ml-2"
                >
                  {copied === i ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

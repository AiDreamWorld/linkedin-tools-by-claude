"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, Zap } from "lucide-react";

const hookCategories = {
  curiosity: {
    name: "Curiosity",
    hooks: [
      "Think you know the secret to {topic}? You might be surprised...",
      "This one mistake could be costing you more than just {topic}...",
      "What if everything you knew about {topic} was wrong?",
      "The truth about {topic} that nobody talks about...",
      "I spent 5 years learning this about {topic}. Here's what I wish I knew...",
      "Stop scrolling if you've ever struggled with {topic}...",
      "Most people don't know this about {topic}...",
      "The uncomfortable truth about {topic}...",
      "I was wrong about {topic} until this happened...",
      "What nobody tells you about {topic}...",
    ]
  },
  number: {
    name: "Numbered List",
    hooks: [
      "7 lessons about {topic} that changed my career...",
      "5 {topic} mistakes that cost me years of progress...",
      "3 things I wish I knew about {topic} earlier...",
      "10 {topic} tips that actually work...",
      "4 surprising facts about {topic}...",
      "6 {topic} strategies for maximum results...",
      "8 {topic} myths debunked...",
      "3 {topic} changes that transformed my life...",
      "5 {topic} secrets industry experts don't share...",
      "9 {topic} mistakes you're probably making...",
    ]
  },
  question: {
    name: "Questions",
    hooks: [
      "Want to master {topic}? Start with these...",
      "Are you still making this {topic} mistake?",
      "How well do you really understand {topic}?",
      "What's the biggest challenge you face with {topic}?",
      "Have you tried this {topic} approach yet?",
      "Ready to transform your {topic} strategy?",
      "Struggling with {topic}? Here's the answer...",
      "Which {topic} type are you? A, B, or C?",
      "What's your take on {topic}?",
      "Can you guess the #1 {topic} mistake?",
    ]
  },
  story: {
    name: "Story",
    hooks: [
      "I almost lost everything because of {topic}. Here's what I learned...",
      "My {topic} journey - from failure to success...",
      "The day I realized I was wrong about {topic}...",
      "How a stranger changed my perspective on {topic}...",
      "I tried {topic} for 30 days. Here's what happened...",
      "The {topic} mistake that cost me $10K...",
      "From {topic} beginner to expert - my journey...",
      "What {topic} looked like 5 years ago vs now...",
      "I asked 100 people about {topic}. Here's what they said...",
      "The {topic} breakthrough that changed everything...",
    ]
  },
  controversial: {
    name: "Contrarian",
    hooks: [
      "{topic} - here's what most people get wrong",
      "Stop doing {topic} the old way. Here's why...",
      "Why {topic} advice is actually hurting you...",
      "The {topic} industry doesn't want you to know this...",
      "Most {topic} experts are wrong about this...",
      "Forget everything you know about {topic}...",
      "Why your {topic} strategy is failing...",
      "The {topic} trend everyone is wrong about...",
      "Why I stopped listening to {topic} gurus...",
      "Hot take: {topic} is overrated. Here's why...",
    ]
  },
};

export default function HookGeneratorTool() {
  const [topic, setTopic] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("curiosity");
  const [generated, setGenerated] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const generateHooks = () => {
    setGenerating(true);
    setTimeout(() => {
      const category = hookCategories[selectedCategory as keyof typeof hookCategories];
      const hooks = category.hooks.slice(0, 10).map(template => 
        template.replace("{topic}", topic || "this")
      );
      setGenerated(hooks);
      setGenerating(false);
    }, 800);
  };

  const generateAllCategories = () => {
    setGenerating(true);
    setTimeout(() => {
      const allHooks: string[] = [];
      Object.values(hookCategories).forEach(category => {
        category.hooks.slice(0, 2).forEach(template => {
          allHooks.push(template.replace("{topic}", topic || "this"));
        });
      });
      setGenerated(allHooks);
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
        <div className="w-12 h-12 bg-gradient-to-br from-[#ea580c] to-[#7c3aed] rounded-xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Hook Generator</h2>
          <p className="text-gray-500 text-sm">Create attention-grabbing opening lines</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">What is your post about?</label>
          <input
            type="text"
            placeholder="e.g., career growth, networking, leadership, remote work"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Hook Type</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {Object.entries(hookCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                  selectedCategory === key
                    ? "bg-gradient-to-r from-[#ea580c] to-[#7c3aed] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={generateHooks}
            disabled={generating}
            className="flex-1 bg-gradient-to-r from-[#ea580c] to-[#7c3aed] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50"
          >
            {generating ? "Generating..." : "Generate Hooks"}
          </button>
          <button
            onClick={generateAllCategories}
            disabled={generating}
            className="px-4 bg-gray-100 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all"
            title="Generate from all categories"
          >
            <Zap className="w-5 h-5" />
          </button>
        </div>
      </div>

      {generated.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">Generated Hooks:</p>
          {generated.map((hook, i) => (
            <div 
              key={i} 
              className="p-4 bg-orange-50 rounded-lg flex items-center justify-between group hover:bg-orange-100 transition-colors"
            >
              <span className="text-gray-800 font-medium">{hook}</span>
              <button
                onClick={() => copyToClipboard(hook, i)}
                className="text-orange-600 hover:text-orange-700 p-2 rounded-lg hover:bg-white transition-colors"
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

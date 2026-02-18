"use client";

import { useState } from "react";
import { MessageCircle, Copy, Check, Sparkles, RefreshCw } from "lucide-react";

const pollTemplates = {
  "Career": [
    "What's the biggest challenge you're facing in your career right now?",
    "How many years of experience do you have in your field?",
    "What's the best career advice you've ever received?",
    "Do you prefer remote work or office work?",
    "What's your top priority for professional development this year?",
  ],
  "Industry": [
    "What's your take on AI's impact on your industry?",
    "Which skill do you think will be most in demand in 2025?",
    "What's the biggest trend shaping your industry?",
    "How is your industry changing in the next 5 years?",
    "What's one thing you'd change about your industry?",
  ],
  "Tech": [
    "What's your preferred programming language and why?",
    "Which tech stack are you most excited about?",
    "What's your biggest technical challenge lately?",
    "How do you stay updated with tech trends?",
    "What's your take on no-code/low-code tools?",
  ],
  "Leadership": [
    "What's the most important quality in a leader?",
    "How do you handle difficult team members?",
    "What's your approach to giving feedback?",
    "How do you motivate your team?",
    "What's the biggest mistake new managers make?",
  ],
  "Productivity": [
    "What's your best productivity tip?",
    "How many hours do you actually work per day?",
    "What's your favorite tool for staying organized?",
    "How do you deal with meetings that could be emails?",
    "What's your morning routine like?",
  ],
};

export default function PollQuestionsGenerator() {
  const [category, setCategory] = useState("Career");
  const [questions, setQuestions] = useState<string[]>([]);
  const [customTopic, setCustomTopic] = useState("");
  const [copied, setCopied] = useState<number | null>(null);

  const generateQuestions = () => {
    const template = pollTemplates[category as keyof typeof pollTemplates];
    const shuffled = [...template].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 5));
  };

  const generateCustomQuestions = () => {
    if (!customTopic.trim()) return;
    const starters = [
      `What's your take on ${customTopic}?`,
      `How do you approach ${customTopic}?`,
      `What's the biggest challenge with ${customTopic}?`,
      `Best resources for learning about ${customTopic}?`,
      `How has ${customTopic} changed your work?`,
    ];
    setQuestions(starters);
  };

  const copyQuestion = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="tool-section">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#057642] rounded-xl flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Poll Questions Generator</h2>
          <p className="text-gray-500 text-sm">Create engaging poll questions for LinkedIn</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Category</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(pollTemplates).map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setQuestions([]); }}
              className={`p-2 rounded-lg text-sm font-medium transition ${
                category === cat 
                  ? "bg-gradient-to-r from-[#0A66C2] to-[#057642] text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <button onClick={generateQuestions} className="tool-button-primary w-full mb-4">
        <Sparkles className="w-4 h-4" /> Generate Poll Questions
      </button>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Or create custom questions</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="Enter a topic (e.g., remote work)"
            className="tool-input flex-1"
          />
          <button onClick={generateCustomQuestions} className="tool-button-secondary">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {questions.length > 0 && (
        <div className="space-y-2">
          {questions.map((question, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
              <span className="text-gray-800 text-sm">{question}</span>
              <button
                onClick={() => copyQuestion(question, index)}
                className="ml-2 p-1 text-gray-500 hover:text-[#0A66C2]"
              >
                {copied === index ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

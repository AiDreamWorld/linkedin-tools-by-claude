"use client";

import { useState } from "react";
import { MessageSquare, Copy, Check, Sparkles } from "lucide-react";

const interviewQuestionsByCategory = {
  behavioral: [
    "Tell me about yourself and why you're interested in this role.",
    "Describe a time when you had to work with a difficult team member. How did you handle it?",
    "Tell me about a time you failed and what you learned from it.",
    "Describe a situation where you had to meet a tight deadline. How did you manage?",
    "Tell me about a time you went above and beyond for a customer or colleague.",
    "Describe a time when you had to make a difficult decision.",
    "Tell me about a time you received constructive feedback. How did you respond?",
    "Describe a project you're most proud of and why.",
  ],
  technical: [
    "Walk me through a project you've built from scratch.",
    "Explain a complex technical concept to someone without a technical background.",
    "Describe your problem-solving process when debugging code.",
    "What programming languages are you most comfortable with and why?",
    "How do you stay updated with the latest industry trends and technologies?",
    "Describe a time when you had to learn a new technology quickly.",
    "What tools and frameworks have you used for version control?",
    "How would you design a system to handle 1 million concurrent users?",
  ],
  situational: [
    "If you were assigned a project with an impossible deadline, what would you do?",
    "How would you handle a disagreement with your manager about a technical approach?",
    "What would you do if a team member wasn't pulling their weight?",
    "If you had to choose between shipping a feature on time vs. making it perfect, what would you do?",
    "How would you prioritize if you had multiple urgent tasks due the same day?",
    "What would you do if you noticed a serious bug in production after hours?",
    "If you could change one thing about our product, what would it be?",
  ],
  cultural: [
    "What type of work environment helps you do your best work?",
    "How do you prefer to receive feedback?",
    "What are you most passionate about in your field?",
    "Where do you see yourself in 5 years?",
    "What motivates you to come to work every day?",
    "How do you handle work-life balance?",
    "What skills would you like to develop in the next year?",
    "Who are your role models and why?",
  ],
};

export default function InterviewQuestionsGeneratorTool() {
  const [role, setRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("entry");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["behavioral", "situational"]);
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateQuestions = () => {
    let questions: string[] = [];
    
    selectedCategories.forEach((category) => {
      const categoryQuestions = interviewQuestionsByCategory[category as keyof typeof interviewQuestionsByCategory];
      const shuffled = [...categoryQuestions].sort(() => 0.5 - Math.random());
      questions = [...questions, ...shuffled.slice(0, 3)];
    });
    
    if (role) {
      questions = questions.map((q) => 
        q.replace(/this role/gi, role).replace(/our product/gi, "products like this")
      );
    }
    
    setGeneratedQuestions(questions.sort(() => 0.5 - Math.random()));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#7c3aed] to-[#db2777] rounded-xl flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Interview Questions Generator</h2>
          <p className="text-gray-500 text-sm">Generate practice interview questions for any role</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="e.g., Software Engineer, Data Analyst"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="entry">Entry Level (0-2 years)</option>
            <option value="mid">Mid Level (2-5 years)</option>
            <option value="senior">Senior Level (5+ years)</option>
            <option value="manager">Manager/Director</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Question Categories</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.keys(interviewQuestionsByCategory).map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`p-3 rounded-lg text-sm font-medium capitalize transition-all ${
                selectedCategories.includes(category)
                  ? "bg-[#7c3aed] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={generateQuestions}
        disabled={selectedCategories.length === 0}
        className="w-full bg-gradient-to-r from-[#7c3aed] to-[#db2777] text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        Generate Questions
      </button>

      {generatedQuestions.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700">{generatedQuestions.length} Questions Generated</p>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-sm text-[#7c3aed] font-medium"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy All"}
            </button>
          </div>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {generatedQuestions.map((question, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-[#7c3aed] mr-2">{index + 1}.</span>
                <span className="text-gray-700">{question}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

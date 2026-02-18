"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, Lightbulb, Target, TrendingUp } from "lucide-react";

interface Article {
  title: string;
  content: string;
  icon: React.ReactNode;
}

interface SEOArticlesProps {
  toolName: string;
  articles: Article[];
}

export default function SEOArticles({ toolName, articles }: SEOArticlesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-12 bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-[#0A66C2]" />
        <h2 className="text-xl font-bold text-gray-900">Tips & Articles about {toolName}</h2>
      </div>

      <div className="space-y-3">
        {articles.map((article, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-[#0A66C2]">{article.icon}</span>
                <span className="font-medium text-gray-800 text-left">{article.title}</span>
              </div>
              {openIndex === index ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-600 text-sm leading-relaxed">
                {article.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Pro Tips</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Consistency is key - use the tool regularly for best results</li>
          <li>• Combine multiple tools for maximum impact</li>
          <li>• Track your progress over time to measure improvement</li>
        </ul>
      </div>
    </div>
  );
}

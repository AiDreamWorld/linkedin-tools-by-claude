"use client";

import { useState } from "react";

export default function ReadabilityCheckerTool() {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<{
    score: number;
    grade: string;
    gradeColor: string;
    words: number;
    sentences: number;
    paragraphs: number;
    avgWordsPerSentence: number;
    tips: string[];
  } | null>(null);

  const analyzeText = (text: string) => {
    if (!text.trim()) return null;

    const words = text.trim().split(/\s+/).filter(Boolean);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 3);
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const avgWordsPerSentence = sentences.length > 0 ? words.length / sentences.length : words.length;
    const avgWordLength = words.reduce((sum, w) => sum + w.replace(/[^a-zA-Z]/g, "").length, 0) / Math.max(words.length, 1);
    const hasLineBreaks = paragraphs.length > 1;

    // Score components (0-100)
    let score = 70; // start at 70

    // Sentence length (optimal: 10-18 words/sentence)
    if (avgWordsPerSentence <= 10) score += 10;
    else if (avgWordsPerSentence <= 18) score += 15;
    else if (avgWordsPerSentence <= 25) score += 5;
    else score -= 10; // too long

    // Word complexity (optimal: avg 4-6 chars)
    if (avgWordLength <= 6) score += 10;
    else if (avgWordLength <= 8) score += 5;
    else score -= 5;

    // Paragraph breaks (bonus for good structure)
    if (hasLineBreaks && paragraphs.length >= 2) score += 5;
    if (paragraphs.length >= 3) score += 5;

    // Post length bonus (150-500 words is LinkedIn-optimal)
    if (words.length >= 150 && words.length <= 500) score += 5;
    else if (words.length < 50) score -= 10;

    score = Math.max(0, Math.min(100, Math.round(score)));

    const grade =
      score >= 80 ? "Excellent" :
      score >= 65 ? "Good" :
      score >= 50 ? "Fair" :
      "Needs Work";

    const gradeColor =
      score >= 80 ? "text-green-600" :
      score >= 65 ? "text-blue-600" :
      score >= 50 ? "text-yellow-600" :
      "text-red-600";

    const tips: string[] = [];
    if (avgWordsPerSentence > 20) tips.push("Try shorter sentences (aim for 10-18 words each)");
    if (!hasLineBreaks) tips.push("Add paragraph breaks to improve readability");
    if (words.length < 100) tips.push("Consider expanding your post — LinkedIn favors 150-300+ word posts");
    if (words.length > 1500) tips.push("Your post is very long — consider breaking it into a series");
    if (avgWordLength > 7) tips.push("Use simpler, shorter words where possible");
    if (tips.length === 0) tips.push("Great readability! Your post looks well-structured.");

    return { score, grade, gradeColor, words: words.length, sentences: sentences.length, paragraphs: paragraphs.length, avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10, tips };
  };


  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#db2777] to-[#0A66C2] rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Check Readability</h2>
          <p className="text-gray-500 text-sm">Analyze your LinkedIn post</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Post</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your LinkedIn post here..."
            rows={8}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
          />
        </div>

        <button
          onClick={() => setAnalysis(analyzeText(text))}
          disabled={!text.trim()}
          className="w-full bg-gradient-to-r from-[#db2777] to-[#0A66C2] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50"
        >
          Analyze Readability
        </button>

        {analysis && (
          <div className="mt-6 p-6 bg-gray-50 rounded-xl">
            {/* Score Display */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <svg className="w-32 h-32" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle 
                    cx="50" cy="50" r="45" fill="none" 
                    stroke="currentColor" 
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${analysis.score * 2.83} 283`}
                    transform="rotate(-90 50 50)"
                    className={analysis.gradeColor}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-3xl font-bold ${analysis.gradeColor}`}>
                    {analysis.score}
                  </span>
                </div>
              </div>
              <p className={`mt-2 text-lg font-semibold ${analysis.gradeColor}`}>
                {analysis.grade}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{analysis.words}</p>
                <p className="text-xs text-gray-500">Words</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{analysis.sentences}</p>
                <p className="text-xs text-gray-500">Sentences</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{analysis.avgWordsPerSentence}</p>
                <p className="text-xs text-gray-500">Avg Words/Sentence</p>
              </div>
            </div>

            {/* Tips */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Tips to Improve:</h4>
              <ul className="space-y-2">
                {analysis.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-pink-500">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

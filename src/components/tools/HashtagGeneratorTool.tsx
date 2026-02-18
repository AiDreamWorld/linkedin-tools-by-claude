"use client";

import { useState } from "react";

const hashtagPools: Record<string, string[]> = {
  career: ["#CareerAdvice", "#CareerGrowth", "#CareerTips", "#JobSearch", "#Jobs", "#Hiring", "#Recruitment", "#ProfessionalDevelopment"],
  tech: ["#Tech", "#Technology", "#Coding", "#Programming", "#SoftwareEngineering", "#Dev", "#AI", "#MachineLearning", "#DataScience"],
  marketing: ["#Marketing", "#DigitalMarketing", "#SocialMedia", "#ContentMarketing", "#Branding", "#Growth", "#MarketingTips"],
  business: ["#Business", "#Entrepreneur", "#Startup", "#Leadership", "#Management", "#BusinessGrowth", "#SMB"],
  personal: ["#PersonalBranding", "#LinkedInTips", "#Networking", "#CareerDevelopment", "#Success", "#Motivation", "#Learning"],
  default: ["#LinkedIn", "#Professional", "#Career", "#Growth", "#Success", "#Motivation", "#Business", "#Networking"],
};

export default function HashtagGeneratorTool() {
  const [topic, setTopic] = useState("");
  const [generated, setGenerated] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);

  const generateHashtags = () => {
    setGenerating(true);

    setTimeout(() => {
      const topicLower = topic.toLowerCase();
      let pool: string[] = [];

      if (topicLower.includes("tech") || topicLower.includes("code") || topicLower.includes("dev") || topicLower.includes("software")) {
        pool = [...hashtagPools.tech, ...hashtagPools.default];
      } else if (topicLower.includes("market") || topicLower.includes("brand") || topicLower.includes("social")) {
        pool = [...hashtagPools.marketing, ...hashtagPools.default];
      } else if (topicLower.includes("business") || topicLower.includes("startup") || topicLower.includes("entrepreneur")) {
        pool = [...hashtagPools.business, ...hashtagPools.default];
      } else if (topicLower.includes("career") || topicLower.includes("job") || topicLower.includes("hire")) {
        pool = [...hashtagPools.career, ...hashtagPools.default];
      } else {
        pool = hashtagPools.default;
      }

      const shuffled = pool.sort(() => 0.5 - Math.random());
      setGenerated(shuffled.slice(0, 5));
      setGenerating(false);
    }, 800);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(generated.join(" "));
  };

  const copyOne = (tag: string) => {
    navigator.clipboard.writeText(tag);
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#057642] to-[#7c3aed] rounded-xl flex items-center justify-center">
          <span className="text-white font-bold">#</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Generate Hashtags</h2>
          <p className="text-gray-500 text-sm">Enter what your post is about</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">What is your LinkedIn post about?</label>
          <input
            type="text"
            placeholder="e.g., career tips, tech news, marketing strategies"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={generateHashtags}
          disabled={generating}
          className="w-full bg-gradient-to-r from-[#057642] to-[#7c3aed] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50"
        >
          {generating ? "Generating..." : "Generate Hashtags"}
        </button>

        {generated.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-700">Generated Hashtags:</p>
              <button
                onClick={copyAll}
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Copy All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {generated.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => copyOne(tag)}
                  className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-full text-sm font-medium transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Pro tip: Use 3-5 hashtags per post for best engagement
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

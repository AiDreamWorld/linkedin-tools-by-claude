"use client";

import { useState } from "react";
import { Link2, Copy, Check, Sparkles, AlertCircle, CheckCircle, XCircle } from "lucide-react";

export default function CustomURLOptimizer() {
  const [name, setName] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generateSuggestions = () => {
    if (!name.trim()) return;
    
    const baseUrl = "linkedin.com/in/";
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    
    const sugs = [
      `${baseUrl}${cleanName}`,
      `${baseUrl}${cleanName}-profile`,
      `${baseUrl}${cleanName}-official`,
      `${baseUrl}the-${cleanName}`,
      `${baseUrl}${cleanName.replace(/ /g, "-")}`,
    ];
    setSuggestions(sugs);
  };

  const copyUrl = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const analyzeUrl = (url: string) => {
    const issues: string[] = [];
    const urlPart = url.split("/").pop() || "";
    const checks = {
      length: url.length <= 30,
      noNumbers: !/\d/.test(urlPart),
      noSpecial: !/[^a-z0-9-]/.test(urlPart),
      readable: urlPart.includes("-") || urlPart.length < 15,
    };

    if (!checks.length) issues.push("URL is too long");
    if (!checks.readable) issues.push("URL is hard to read");
    if (!checks.noSpecial) issues.push("Contains special characters");

    return { checks, issues };
  };

  const getStatusIcon = (check: boolean) => {
    return check 
      ? <CheckCircle className="w-4 h-4 text-green-600" /> 
      : <XCircle className="w-4 h-4 text-red-500" />;
  };

  const urlAnalysis = currentUrl ? analyzeUrl(currentUrl) : null;

  return (
    <div className="tool-section">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#057642] to-[#0A66C2] rounded-xl flex items-center justify-center">
          <Link2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Custom URL Optimizer</h2>
          <p className="text-gray-500 text-sm">Create the perfect LinkedIn profile URL</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Name or Desired URL</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., john-doe, sarah-smith"
          className="tool-input"
        />
        <button onClick={generateSuggestions} className="tool-button-primary w-full mt-2">
          <Sparkles className="w-4 h-4" /> Generate URL Suggestions
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-2 mb-4">
          <label className="block text-sm font-medium text-gray-700">Suggested URLs</label>
          {suggestions.map((url, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
              <span className="text-gray-800 text-sm font-mono">{url}</span>
              <button
                onClick={() => copyUrl(url, index)}
                className="ml-2 p-1 text-gray-500 hover:text-[#057642]"
              >
                {copied === index ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="border-t pt-4 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Or analyze your current URL</label>
        <input
          type="text"
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          placeholder="linkedin.com/in/yourname"
          className="tool-input"
        />
      </div>

      {urlAnalysis && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-2">URL Analysis</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              {getStatusIcon(urlAnalysis.checks.length)}
              <span className={urlAnalysis.checks.length ? "text-gray-700" : "text-red-500"}>
                Length {urlAnalysis.checks.length ? "✓ Good" : "✗ Too long (aim for under 30 chars)"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {getStatusIcon(urlAnalysis.checks.readable)}
              <span className={urlAnalysis.checks.readable ? "text-gray-700" : "text-red-500"}>
                Readability {urlAnalysis.checks.readable ? "✓ Easy to read" : "✗ Use hyphens"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {getStatusIcon(urlAnalysis.checks.noSpecial)}
              <span className={urlAnalysis.checks.noSpecial ? "text-gray-700" : "text-red-500"}>
                Characters {urlAnalysis.checks.noSpecial ? "✓ Clean" : "✗ Use only letters, numbers, hyphens"}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-[#0A66C2] mt-0.5" />
          <p className="text-sm text-[#0A66C2]">
            <strong>Pro tip:</strong> You can change your LinkedIn URL once every 30 days. 
            Choose a memorable, professional URL that's easy to share.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function CharacterCounterTool() {
  const [postText, setPostText] = useState("");
  const [connectionText, setConnectionText] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [headlineText, setHeadlineText] = useState("");

  const limits = {
    post: 3000,
    connection: 300,
    about: 2600,
    headline: 220,
  };

  const getRemaining = (current: number, limit: number) => limit - current;
  const getPercentage = (current: number, limit: number) => (current / limit) * 100;

  const getColorClass = (current: number, limit: number) => {
    const percentage = getPercentage(current, limit);
    if (percentage >= 100) return "text-red-600";
    if (percentage >= 90) return "text-yellow-600";
    return "text-green-600";
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* LinkedIn Post */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">LinkedIn Post</h3>
          <div className="flex items-center gap-2">
            <span className={`font-bold ${getColorClass(postText.length, limits.post)}`}>
              {postText.length}
            </span>
            <span className="text-gray-400">/ {limits.post}</span>
          </div>
        </div>
        <div className="relative">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Write your LinkedIn post here..."
            rows={5}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="absolute bottom-3 right-3 flex gap-2">
            <button
              onClick={() => copyToClipboard(postText)}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600"
            >
              Copy
            </button>
            <button
              onClick={() => setPostText("")}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                postText.length >= limits.post ? "bg-red-500" : 
                postText.length >= limits.post * 0.9 ? "bg-yellow-500" : "bg-blue-500"
              }`}
              style={{ width: `${Math.min(getPercentage(postText.length, limits.post), 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {getRemaining(postText.length, limits.post)} characters remaining • ~{Math.ceil(postText.length / 40)} words
          </p>
        </div>
      </div>

      {/* Connection Message */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Connection Message</h3>
          <div className="flex items-center gap-2">
            <span className={`font-bold ${getColorClass(connectionText.length, limits.connection)}`}>
              {connectionText.length}
            </span>
            <span className="text-gray-400">/ {limits.connection}</span>
          </div>
        </div>
        <textarea
          value={connectionText}
          onChange={(e) => setConnectionText(e.target.value)}
          placeholder="Write your connection request message..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                connectionText.length >= limits.connection ? "bg-red-500" : 
                connectionText.length >= limits.connection * 0.9 ? "bg-yellow-500" : "bg-blue-500"
              }`}
              style={{ width: `${Math.min(getPercentage(connectionText.length, limits.connection), 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">About Section</h3>
          <div className="flex items-center gap-2">
            <span className={`font-bold ${getColorClass(aboutText.length, limits.about)}`}>
              {aboutText.length}
            </span>
            <span className="text-gray-400">/ {limits.about}</span>
          </div>
        </div>
        <textarea
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
          placeholder="Write your About section..."
          rows={6}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                aboutText.length >= limits.about ? "bg-red-500" : 
                aboutText.length >= limits.about * 0.9 ? "bg-yellow-500" : "bg-blue-500"
              }`}
              style={{ width: `${Math.min(getPercentage(aboutText.length, limits.about), 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Headline */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Headline</h3>
          <div className="flex items-center gap-2">
            <span className={`font-bold ${getColorClass(headlineText.length, limits.headline)}`}>
              {headlineText.length}
            </span>
            <span className="text-gray-400">/ {limits.headline}</span>
          </div>
        </div>
        <input
          type="text"
          value={headlineText}
          onChange={(e) => setHeadlineText(e.target.value)}
          placeholder="Write your headline..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                headlineText.length >= limits.headline ? "bg-red-500" : 
                headlineText.length >= limits.headline * 0.9 ? "bg-yellow-500" : "bg-blue-500"
              }`}
              style={{ width: `${Math.min(getPercentage(headlineText.length, limits.headline), 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

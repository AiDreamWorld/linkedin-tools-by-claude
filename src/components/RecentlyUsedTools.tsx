"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { getLocalStorage } from "@/lib/localStorage";
import { ALL_TOOLS } from "@/lib/tools";

const STORAGE_KEY = "recently_used_tools";

export default function RecentlyUsedTools() {
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);

  useEffect(() => {
    const stored = getLocalStorage<string[]>(STORAGE_KEY, []);
    setRecentSlugs(stored);
  }, []);

  if (recentSlugs.length === 0) return null;

  const recentTools = recentSlugs
    .map((slug) => ALL_TOOLS.find((t) => t.slug === slug))
    .filter(Boolean);

  if (recentTools.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-[#0A66C2]" />
        <h2 className="text-xl font-bold text-gray-900">Recently Used</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {recentTools.map((tool) => {
          if (!tool) return null;
          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl hover:border-[#0A66C2] hover:shadow-md transition-all group text-center"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform`}>
                {tool.emoji}
              </div>
              <span className="text-xs font-medium text-gray-700 group-hover:text-[#0A66C2] line-clamp-2">{tool.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { ALL_TOOLS, TOOL_CATEGORIES } from "@/lib/tools";

export default function ToolsDirectory() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
      const matchesSearch =
        search === "" ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: ALL_TOOLS.length };
    ALL_TOOLS.forEach((t) => {
      result[t.category] = (result[t.category] || 0) + 1;
    });
    return result;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All LinkedIn Tools</h1>
          <p className="text-xl text-gray-600">
            {ALL_TOOLS.length}+ free tools to optimize your LinkedIn presence
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools by name or description..."
              className="w-full pl-12 pr-10 py-4 border border-gray-200 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent outline-none transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TOOL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                activeCategory === cat.id
                  ? "bg-[#0A66C2] text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#0A66C2] hover:text-[#0A66C2]"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${activeCategory === cat.id ? "bg-white/20" : "bg-gray-100"}`}>
                {counts[cat.id] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6 text-center">
          {filtered.length === ALL_TOOLS.length
            ? `Showing all ${ALL_TOOLS.length} tools`
            : `Showing ${filtered.length} of ${ALL_TOOLS.length} tools`}
          {search && ` matching "${search}"`}
        </p>

        {/* Tools Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No tools found</h3>
            <p className="text-gray-500">Try a different search term or category</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("all"); }}
              className="mt-4 px-6 py-2 bg-[#0A66C2] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.04 } }, hidden: {} }}
          >
            {filtered.map((tool) => (
              <motion.div
                key={tool.slug}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <Link
                  href={`/tools/${tool.slug}`}
                  className="flex flex-col p-5 bg-white border border-gray-200 rounded-2xl hover:border-[#0A66C2] hover:shadow-lg transition-all group h-full"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                    {tool.emoji}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#0A66C2] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-500 flex-1">{tool.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full capitalize">{tool.category}</span>
                    <span className="text-xs text-[#0A66C2] font-medium group-hover:translate-x-1 transition-transform inline-block">Use →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

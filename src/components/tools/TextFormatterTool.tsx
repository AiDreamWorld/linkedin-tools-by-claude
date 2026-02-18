"use client";

import { useState } from "react";
import { Copy, Check, Trash2, Type, AlignLeft, List, ListOrdered, Quote, Code, ArrowRight } from "lucide-react";

export default function TextFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const formatFunctions: Record<string, (text: string) => string> = {
    bold: (text) => text.split("\n").map(line => line ? `*${line}*` : line).join("\n"),
    italic: (text) => text.split("\n").map(line => line ? `_${line}_` : line).join("\n"),
    strike: (text) => text.split("\n").map(line => line ? `~${line}~` : line).join("\n"),
    bullet: (text) => text.split("\n").map(line => line ? `• ${line}` : line).join("\n"),
    numbered: (text) => text.split("\n").map((line, i) => line ? `${i + 1}. ${line}` : line).join("\n"),
    header: (text) => text.split("\n").map(line => line ? `▶ ${line}` : line).join("\n"),
    quote: (text) => text.split("\n").map(line => line ? `> ${line}` : line).join("\n"),
    code: (text) => text.split("\n").map(line => line ? `\`${line}\`` : line).join("\n"),
    section: (text) => `\n━━━━━━━━━━━━━━━━━━━━━━━━━\n${text}\n━━━━━━━━━━━━━━━━━━━━━━━━━\n`,
    spacer: (text) => text ? `${text}\n\n` : text,
    emoji: (text) => {
      const emojis: Record<string, string> = {
        "tip": "⚡", "idea": "💡", "note": "📝", "warning": "⚠️", "check": "✅",
        "info": "ℹ️", "star": "⭐", "fire": "🔥", "rocket": "🚀", "target": "🎯"
      };
      let result = text;
      Object.entries(emojis).forEach(([key, emoji]) => {
        result = result.replace(new RegExp(`\\[${key}\\]`, 'g'), emoji);
      });
      return result;
    },
    caps: (text) => text.toUpperCase(),
    title: (text) => text.split("\n").map(line => line ? line.charAt(0).toUpperCase() + line.slice(1) : line).join("\n"),
    compact: (text) => text.replace(/\n\s*\n/g, "\n").trim(),
    dots: (text) => text.split("\n").map(line => line ? `⬡ ${line}` : line).join("\n"),
    arrows: (text) => text.split("\n").map(line => line ? `➜ ${line}` : line).join("\n"),
  };

  const applyFormat = (type: string) => {
    const formatFn = formatFunctions[type];
    if (formatFn) {
      setOutput(formatFn(input));
    }
  };

  const applyMultiple = (types: string[]) => {
    let result = input;
    types.forEach(type => {
      const formatFn = formatFunctions[type];
      if (formatFn) result = formatFn(result);
    });
    setOutput(result);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const swapText = () => {
    setInput(output);
    setOutput("");
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#7c3aed] to-[#db2777] rounded-xl flex items-center justify-center">
          <Type className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Text Formatter</h2>
          <p className="text-gray-500 text-sm">Format your LinkedIn text with multiple styles</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Quick Formats</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button onClick={() => applyFormat("bold")} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-bold text-gray-700">Bold *text*</button>
            <button onClick={() => applyFormat("italic")} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm italic text-gray-700">Italic _text_</button>
            <button onClick={() => applyFormat("strike")} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm line-through text-gray-700">Strike ~text~</button>
            <button onClick={() => applyFormat("bullet")} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700">• Bullet</button>
            <button onClick={() => applyFormat("numbered")} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700">1. Numbered</button>
            <button onClick={() => applyFormat("header")} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700">▶ Header</button>
            <button onClick={() => applyFormat("quote")} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700">&gt; Quote</button>
            <button onClick={() => applyFormat("code")} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700">` Code</button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Advanced Formats</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button onClick={() => applyFormat("section")} className="px-3 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg text-sm text-purple-700">━ Section</button>
            <button onClick={() => applyFormat("spacer")} className="px-3 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg text-sm text-purple-700">↵ Spacer</button>
            <button onClick={() => applyFormat("emoji")} className="px-3 py-2 bg-pink-100 hover:bg-pink-200 rounded-lg text-sm text-pink-700">[emoji]</button>
            <button onClick={() => applyFormat("caps")} className="px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-sm text-blue-700">CAPS</button>
            <button onClick={() => applyFormat("title")} className="px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-sm text-blue-700">Title Case</button>
            <button onClick={() => applyFormat("compact")} className="px-3 py-2 bg-green-100 hover:bg-green-200 rounded-lg text-sm text-green-700">Compact</button>
            <button onClick={() => applyFormat("dots")} className="px-3 py-2 bg-orange-100 hover:bg-orange-200 rounded-lg text-sm text-orange-700">⬡ Dots</button>
            <button onClick={() => applyFormat("arrows")} className="px-3 py-2 bg-orange-100 hover:bg-orange-200 rounded-lg text-sm text-orange-700">➜ Arrows</button>
          </div>
        </div>

        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <label className="block text-sm font-medium text-blue-700 mb-2">Combo Formats</label>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => applyMultiple(["bullet", "spacer"])} className="px-3 py-1.5 bg-white hover:bg-blue-50 rounded-lg text-sm text-blue-600">Bullet + Spacer</button>
            <button onClick={() => applyMultiple(["header", "bold"])} className="px-3 py-1.5 bg-white hover:bg-blue-50 rounded-lg text-sm text-blue-600">Header + Bold</button>
            <button onClick={() => applyMultiple(["section", "compact"])} className="px-3 py-1.5 bg-white hover:bg-blue-50 rounded-lg text-sm text-blue-600">Section + Compact</button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here... Use [tip], [idea], [note], [warning], [check], [info], [star], [fire], [rocket], [target] for emojis"
            rows={5}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        {output && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Formatted Output</label>
              <div className="flex gap-2">
                <button onClick={swapText} className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1">
                  <ArrowRight className="w-4 h-4" /> Swap
                </button>
                <button onClick={copyOutput} className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              rows={5}
              className="w-full px-4 py-3 border border-purple-200 rounded-lg bg-purple-50 text-gray-800 resize-none"
            />
          </div>
        )}

        {(input || output) && (
          <button onClick={clearAll} className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
            <Trash2 className="w-4 h-4" /> Clear all
          </button>
        )}
      </div>
    </div>
  );
}

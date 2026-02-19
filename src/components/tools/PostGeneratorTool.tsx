"use client";

import { useState } from "react";
import { Copy, Check, Sparkles, RefreshCw } from "lucide-react";

// ── Post Templates by Type ─────────────────────────────────────────────────────
const POST_TEMPLATES = {
  story: {
    name: "📖 Story",
    professional: [
      "5 years ago, I made a critical mistake with {topic}.\n\nHere's what I learned — and how it changed my entire approach:\n\n1. [First lesson]\n2. [Second lesson]\n3. [Third lesson]\n\nThe key insight? [Your key takeaway here]\n\nWhat's your experience with {topic}?",
      "I almost quit over {topic}.\n\nHere's what happened — and why I'm grateful I didn't:\n\n[Your story here...]\n\nThe turning point was [key moment].\n\nIf you're struggling with {topic} right now, here's what I'd tell you:\n\n→ [Advice 1]\n→ [Advice 2]\n→ [Advice 3]\n\nYou've got this.",
      "The best career advice I ever received was about {topic}.\n\nA mentor told me something I've never forgotten:\n\n\"[Quote or insight]\"\n\nAt the time, I didn't fully understand it. But after [X years/experience], here's what it really means:\n\n[Your interpretation and application]\n\nWhat's the best career advice you've received?",
    ],
    casual: [
      "Real talk: {topic} humbled me completely.\n\nI thought I had it figured out. I really, really didn't 😅\n\nHere's the thing nobody tells you about {topic}:\n\n[Your experience, raw and honest]\n\nAnybody else been through this? Drop a comment 👇",
      "I tried {topic} for 30 days straight. Zero days off.\n\nHere's what actually happened (spoiler: not what I expected):\n\nWeek 1: [What happened]\nWeek 2: [What shifted]\nWeek 3: [The breakthrough]\nWeek 4: [The result]\n\nWorth it? [Your verdict]\n\nHave you ever committed to something for 30 days? What happened?",
    ],
    bold: [
      "Nobody talks about the dark side of {topic}.\n\nSo I will.\n\n[Your raw, honest experience]\n\nThis cost me [time/money/energy]. Was it worth it?\n\nHere's my honest answer: [Bold take]\n\nChange my mind.",
      "I wasted 2 years chasing the wrong version of {topic}.\n\nHere's what I wish someone had told me:\n\n❌ What I thought mattered: [Misconception]\n✅ What actually matters: [Truth]\n\nStop making the same mistake I did.",
    ],
  },
  tips: {
    name: "💡 Tips",
    professional: [
      "3 lessons about {topic} that every professional should know:\n\n1️⃣ [First lesson — be specific, add context]\n\n2️⃣ [Second lesson — add a real example]\n\n3️⃣ [Third lesson — make it actionable]\n\nThe common thread? [Unifying insight]\n\nWhich one resonates most with you?",
      "The {topic} framework I use every single week:\n\nStep 1: [What you do first]\nStep 2: [What comes next]\nStep 3: [How you follow through]\nStep 4: [How you measure results]\n\nThis alone has [specific benefit].\n\nSave this for later. 📌",
      "8 things I wish I knew about {topic} earlier:\n\n1. [Tip 1]\n2. [Tip 2]\n3. [Tip 3]\n4. [Tip 4]\n5. [Tip 5]\n6. [Tip 6]\n7. [Tip 7]\n8. [Tip 8]\n\nNumber [X] changed everything for me.\n\nWhich one was new to you?",
    ],
    casual: [
      "Quick {topic} wins that actually work (tested, not theorized):\n\n• [Win 1] — [why it works]\n• [Win 2] — [why it works]\n• [Win 3] — [why it works]\n\nBonus: [Extra tip]\n\nTrying any of these? Tell me in the comments!",
      "If I had to restart my {topic} journey, here's what I'd do differently:\n\n✅ Do this: [Positive action]\n✅ Do this: [Positive action]\n❌ Skip this: [Common mistake]\n❌ Skip this: [Time-waster]\n\nSave yourself the learning curve 😊",
    ],
    bold: [
      "Stop overcomplicating {topic}.\n\nThe formula is simple:\n\n[Simple framework or rule]\n\nThat's it. Every \"expert\" who tells you otherwise is selling something.\n\nProve me wrong 👇",
      "Your {topic} strategy is probably wrong.\n\nHere's the brutal truth:\n\n❌ What most people do: [Common approach]\n✅ What actually works: [Better approach]\n\nThe difference? [Key insight]\n\nI'm not sorry for saying it.",
    ],
  },
  question: {
    name: "❓ Question",
    professional: [
      "A question that's been on my mind about {topic}:\n\n[Your thoughtful question]\n\nI've been researching this and found [interesting data/perspective]. But I'd love to hear from professionals who've navigated this firsthand.\n\nWhat's your experience? Drop your thoughts below 👇",
      "I'd love to hear different perspectives on {topic}.\n\nHere's my current thinking:\n[Your view — 2-3 sentences]\n\nBut I know I'm operating from my own experience. What am I missing?\n\nEspecially interested in hearing from [specific group of people].",
    ],
    casual: [
      "Hot take: {topic} is [your opinion]\n\nFight me in the comments 😂\n\n(Or actually agree? That's fine too)\n\n#HotTake",
      "Genuine question for my network:\n\n{topic} — where do you stand?\n\nA) [Option 1]\nB) [Option 2]\nC) [Option 3]\nD) Something else (explain below!)\n\nI'll share my answer after 10 responses.",
    ],
    bold: [
      "Everyone is wrong about {topic}.\n\nChange my mind.\n\nHere's my position: [Your bold opinion]\n\nI'm genuinely open to being convinced otherwise. Give me your best argument 👇",
      "Let's have an honest conversation about {topic}.\n\nWhy does everyone pretend [common belief] when [reality]?\n\nI'll start: [Your honest take]\n\nWho else is willing to be honest here?",
    ],
  },
  opinion: {
    name: "🎯 Opinion",
    professional: [
      "Unpopular opinion: {topic} is not the problem.\n\nHere's what actually is:\n\n[Your analysis — data-driven if possible]\n\nMost people focus on [surface issue]. But the real challenge is [deeper issue].\n\nSolving [deeper issue] first makes everything else easier.\n\nDo you agree?",
      "I've changed my mind about {topic}.\n\nHere's what I used to believe: [Old belief]\n\nHere's what I believe now: [New belief]\n\nWhat changed my mind: [Data, experience, or conversation]\n\nI think this matters because [why it's relevant to others].\n\nHave you updated your views on anything significant recently?",
    ],
    casual: [
      "Okay, hot take time: {topic} is overrated.\n\nHere's why:\n\n[3-4 short, punchy reasons]\n\nSomeone had to say it 🤷\n\nDo you agree? Or am I completely off base?",
      "Can we stop pretending {topic} is complicated?\n\nIt's not. Here's the truth:\n\n[Simple truth]\n\nAll the complexity is manufactured. Keep it simple.",
    ],
    bold: [
      "The {topic} industry is broken.\n\nHere's the proof:\n\n[Evidence 1]\n[Evidence 2]\n[Evidence 3]\n\nAnd here's what needs to change:\n\n[Your solution]\n\nToo harsh? Maybe. But someone needs to say it.",
      "I don't care what anyone says — {topic} is [your strong opinion].\n\nI've been in this industry for [X] years. I've seen every argument. And I keep coming back to the same conclusion:\n\n[Your conclusion]\n\nThis isn't popular. But it's true.",
    ],
  },
  announcement: {
    name: "📢 Announcement",
    professional: [
      "Excited to share a major update: {topic}!\n\nThis has been [X months/years] in the making, and I couldn't have reached this milestone without [team/mentors/supporters].\n\nHere's what this means:\n→ [Implication 1]\n→ [Implication 2]\n→ [What's next]\n\nThank you to everyone who believed in this vision. The journey continues. 🙏",
      "Big news: {topic}\n\nI'm thrilled to announce that [specific detail about the announcement].\n\nA quick behind-the-scenes look at how we got here:\n\n[Your story in 3-4 sentences]\n\nTo everyone who supported this journey — thank you.\n\nMore details coming soon!",
    ],
    casual: [
      "It's official: {topic} 🎉\n\nHonestly? I wasn't sure this was going to happen.\n\n[Your honest journey in 2-3 sentences]\n\nBut here we are! And I'm SO ready.\n\nTag someone who should know about this!",
      "GUESS WHAT: {topic}!!!\n\nI've been sitting on this news for weeks and I'm about to explode from excitement 😄\n\n[What it is and why it matters to you]\n\nThank you to [people] for making this happen. You know who you are 💙",
    ],
    bold: [
      "Today, {topic}.\n\nNo fluff. No corporate speak. Just: we did the thing.\n\n[What it is]\n[Why it matters]\n[What's next]\n\nLet's go.",
    ],
  },
  educational: {
    name: "📚 Educational",
    professional: [
      "Everything you need to know about {topic} (the version nobody actually explains):\n\n📌 What it is: [Clear definition]\n\n📌 Why it matters: [Real-world impact]\n\n📌 How to apply it:\n   Step 1: [Action]\n   Step 2: [Action]\n   Step 3: [Action]\n\n📌 Common mistake: [What most people get wrong]\n\n📌 Pro tip: [Your insider knowledge]\n\nSave this. You'll need it. 📌",
      "The truth about {topic} that textbooks don't teach:\n\nAcademic definition: [Standard definition]\n\nReal-world reality: [What it actually looks like]\n\nWhy the gap matters: [Practical implications]\n\nHow to bridge it: [Your approach]\n\nThis took me [X] years to fully understand. Sharing so it takes you less.",
    ],
    casual: [
      "Quick explainer on {topic} for anyone who needs it:\n\nImagine it like this: [Simple analogy]\n\nIn practice, it means: [Plain English explanation]\n\nWhy should you care? [Simple answer]\n\nQuestions? Drop them below and I'll answer every one 👇",
      "{topic} 101:\n\nBasics: [Fundamental concept]\nIntermediate: [Next level]\nAdvanced: [Expert knowledge]\n\nWhere are you in this journey? 🙋",
    ],
    bold: [
      "The {topic} guide nobody asked for but everyone needs:\n\n[Unconventional take or insight 1]\n[Unconventional take or insight 2]\n[Unconventional take or insight 3]\n\nThis isn't in any textbook. It's in the scars.\n\nLearn from mine.",
    ],
  },
};

// ── Tone Descriptions ──────────────────────────────────────────────────────────
const TONES = [
  { value: "professional", label: "Professional", emoji: "💼", desc: "Formal, data-driven, authoritative" },
  { value: "casual", label: "Casual", emoji: "😊", desc: "Friendly, conversational, relatable" },
  { value: "bold", label: "Bold", emoji: "⚡", desc: "Opinionated, direct, controversial" },
];

const POST_TYPES = Object.entries(POST_TEMPLATES).map(([key, val]) => ({
  key,
  name: val.name,
}));

// ── Component ──────────────────────────────────────────────────────────────────
export default function PostGeneratorTool() {
  const [topic, setTopic] = useState("");
  const [postType, setPostType] = useState("story");
  const [tone, setTone] = useState<"professional" | "casual" | "bold">("professional");
  const [generated, setGenerated] = useState<{ text: string; index: number }[]>([]);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const generatePosts = () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      const category = POST_TEMPLATES[postType as keyof typeof POST_TEMPLATES];
      const templates = category[tone] || category.professional;
      const posts = templates.map((t, i) => ({
        text: t.replace(/{topic}/g, topic.trim()),
        index: i,
      }));
      setGenerated(posts);
      setGenerating(false);
    }, 700);
  };

  const generateAll = () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      const all: { text: string; index: number }[] = [];
      let idx = 0;
      Object.values(POST_TEMPLATES).forEach((cat) => {
        const templates: string[] = (cat[tone as keyof typeof cat] as string[] | undefined) ?? (cat.professional as string[]) ?? [];
        templates.slice(0, 1).forEach((t) => {
          all.push({ text: t.replace(/{topic}/g, topic.trim()), index: idx++ });
        });
      });
      setGenerated(all);
      setGenerating(false);
    }, 1000);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0A66C2, #db2777)" }}>
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Post Generator</h2>
          <p className="text-gray-500 text-sm">Create viral LinkedIn posts with the right tone</p>
        </div>
      </div>

      {/* Topic Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          What is your post about? *
        </label>
        <input
          type="text"
          placeholder="e.g., building a startup, learning to code, career transitions, remote work"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generatePosts()}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/30 focus:border-[#0A66C2] transition-all"
        />
      </div>

      {/* Tone Selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Tone</label>
        <div className="grid grid-cols-3 gap-2">
          {TONES.map((t) => (
            <button
              key={t.value}
              onClick={() => setTone(t.value as "professional" | "casual" | "bold")}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-center transition-all ${
                tone === t.value
                  ? "border-[#0A66C2] bg-blue-50"
                  : "border-gray-100 hover:border-gray-300 bg-white"
              }`}
            >
              <span className="text-xl">{t.emoji}</span>
              <span className={`text-xs font-bold ${tone === t.value ? "text-[#0A66C2]" : "text-gray-700"}`}>
                {t.label}
              </span>
              <span className="text-xs text-gray-500 leading-tight">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Post Type Selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Post Type</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {POST_TYPES.map((pt) => (
            <button
              key={pt.key}
              onClick={() => setPostType(pt.key)}
              className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all text-left ${
                postType === pt.key
                  ? "text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={postType === pt.key ? { background: "linear-gradient(135deg, #0A66C2, #db2777)" } : {}}
            >
              {pt.name}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Buttons */}
      <div className="flex gap-2">
        <button
          onClick={generatePosts}
          disabled={generating || !topic.trim()}
          className="flex-1 py-3 px-6 rounded-xl font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ background: "linear-gradient(135deg, #0A66C2, #db2777)" }}
        >
          {generating ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Posts
            </>
          )}
        </button>
        <button
          onClick={generateAll}
          disabled={generating || !topic.trim()}
          title="Generate one post from every type"
          className="px-4 bg-gray-100 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          All Types
        </button>
      </div>

      {/* Output */}
      {generated.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-gray-800">
              {generated.length} Post{generated.length > 1 ? "s" : ""} Generated
              <span className="ml-2 text-xs font-normal text-gray-500 capitalize">
                ({tone} tone · {POST_TEMPLATES[postType as keyof typeof POST_TEMPLATES]?.name})
              </span>
            </p>
          </div>
          {generated.map((post) => (
            <div
              key={post.index}
              className="group relative p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#0A66C2]/30 hover:bg-blue-50/30 transition-all"
            >
              <p className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed pr-10">
                {post.text}
              </p>
              <button
                onClick={() => copyToClipboard(post.text, post.index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-[#0A66C2] p-1.5 rounded-lg hover:bg-white transition-all"
                title="Copy to clipboard"
              >
                {copied === post.index
                  ? <Check className="w-4 h-4 text-green-500" />
                  : <Copy className="w-4 h-4" />
                }
              </button>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  {post.text.length} chars
                  {post.text.length > 3000 && <span className="text-orange-500 ml-1">· over LinkedIn limit</span>}
                </span>
              </div>
            </div>
          ))}
          <p className="text-xs text-gray-400 text-center pt-1">
            💡 Replace [bracketed placeholders] with your own content before posting
          </p>
        </div>
      )}
    </div>
  );
}

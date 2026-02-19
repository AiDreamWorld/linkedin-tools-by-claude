"use client";

import { useState } from "react";
import { Copy, Check, Download, FileText, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  role: string;
  company: string;
  hiringManager: string;
  industry: string;
  yearsExperience: string;
  keySkills: string;
  achievement1: string;
  achievement2: string;
  whyCompany: string;
  jobSource: string;
  tone: "professional" | "confident" | "creative" | "entry-level" | "executive";
}

// ── Template Generators ────────────────────────────────────────────────────────
const TEMPLATES: Record<string, (d: FormData) => string> = {
  professional: (d) => `${d.hiringManager ? `Dear ${d.hiringManager},` : "Dear Hiring Manager,"}

I am writing to express my enthusiastic interest in the ${d.role || "open position"} at ${d.company || "your company"}. With ${d.yearsExperience || "several"} years of experience in ${d.industry || "the industry"} and a proven track record in ${d.keySkills || "my field"}, I am confident in my ability to make an immediate and lasting contribution to your team.

${d.achievement1 ? `Throughout my career, I have demonstrated the ability to deliver results that matter. ${d.achievement1}. This experience has sharpened my ${d.keySkills || "professional skills"} and prepared me to take on complex challenges in fast-paced environments.` : `My background in ${d.keySkills || "the relevant areas"} has equipped me with a diverse skill set that I am eager to apply in a new and challenging role.`}

${d.achievement2 ? `Additionally, ${d.achievement2}. I bring not only technical expertise but also the leadership and communication skills needed to collaborate effectively across teams and drive projects to completion.` : `I am a quick learner, a strong communicator, and a team player who thrives under pressure. I consistently seek opportunities to improve processes and deliver value beyond expectations.`}

${d.whyCompany ? `What excites me most about ${d.company || "your organization"} is ${d.whyCompany}. I am drawn to your culture of innovation and your commitment to excellence — values I share deeply.` : `What draws me to ${d.company || "your organization"} is your reputation for excellence and your commitment to innovation. I am eager to contribute my skills to your mission.`}

I would welcome the opportunity to discuss how my experience and vision align with the goals of ${d.company || "your company"}. Thank you for your time and consideration — I look forward to the possibility of contributing to your team.

Sincerely,
${d.name || "Your Name"}${d.email ? `\n${d.email}` : ""}${d.phone ? ` | ${d.phone}` : ""}${d.linkedin ? `\n${d.linkedin}` : ""}`,

  confident: (d) => `${d.hiringManager ? `Dear ${d.hiringManager},` : "Dear Hiring Team,"}

The ${d.role || "position"} at ${d.company || "your company"} is exactly the role I've been working toward — and I'm ready to hit the ground running.

In my ${d.yearsExperience || "several"} years working in ${d.industry || "the field"}, I have built deep expertise in ${d.keySkills || "key areas that directly apply to this role"}. I don't just talk about results — I create them.

${d.achievement1 ? `Here's what I've delivered: ${d.achievement1}.` : `I have a track record of delivering results in demanding environments, consistently exceeding expectations while mentoring others and improving systems.`}

${d.achievement2 ? `And that's not all: ${d.achievement2}. I bring the same drive and focus to everything I do.` : `I am direct, accountable, and motivated by challenges. I thrive in environments where high performance is expected and rewarded.`}

${d.whyCompany ? `Why ${d.company || "you"}? ${d.whyCompany}. I have done my research, and I believe this is the right match — for both of us.` : `I have researched ${d.company || "your company"} extensively. The work you do, your culture, and your trajectory all point to a place where I can do my best work.`}

Let's talk. I am available for a call or interview at your earliest convenience.

Best,
${d.name || "Your Name"}${d.email ? `\n${d.email}` : ""}${d.phone ? ` | ${d.phone}` : ""}`,

  creative: (d) => `${d.hiringManager ? `Dear ${d.hiringManager},` : "To Whom It May Concern,"}

What if I told you that your search for the perfect ${d.role || "candidate"} might be over?

I'm ${d.name || "a passionate professional"}, a ${d.industry || "industry"} specialist with ${d.yearsExperience || "several"} years of experience turning challenges into opportunities. My work in ${d.keySkills || "my area of expertise"} isn't just about checking boxes — it's about creating real impact.

${d.achievement1 ? `Here's a snapshot of what that impact looks like: ${d.achievement1}. But numbers only tell part of the story.` : `I approach every project with curiosity, creativity, and a relentless focus on outcomes. I believe great work happens when people are empowered, ideas are bold, and execution is precise.`}

${d.achievement2 ? `The bigger picture: ${d.achievement2}. And I'm just getting started.` : `I am always learning, always evolving, and always looking for the next challenge that will push me to grow.`}

${d.whyCompany ? `${d.company || "Your company"} caught my attention because ${d.whyCompany}. That's not a generic line — I genuinely believe we're aligned on what great work looks like.` : `I'm drawn to ${d.company || "your company"} because of your creative energy and your willingness to challenge conventions. That resonates with how I work.`}

I'd love to show you what I can bring to ${d.company || "your team"}. Let's start a conversation.

With enthusiasm,
${d.name || "Your Name"}${d.email ? `\n${d.email}` : ""}${d.phone ? ` | ${d.phone}` : ""}`,

  "entry-level": (d) => `${d.hiringManager ? `Dear ${d.hiringManager},` : "Dear Hiring Manager,"}

I am a motivated ${d.industry || "professional"} graduate excited to begin my career with the ${d.role || "position"} at ${d.company || "your company"}. While I am early in my career, I bring fresh energy, a strong academic foundation in ${d.keySkills || "relevant skills"}, and a genuine eagerness to learn and contribute.

${d.achievement1 ? `During my studies and internship experience, I have had the opportunity to: ${d.achievement1}. These experiences gave me hands-on insight into the realities of the industry and confirmed my passion for this field.` : `Through academic projects, internships, and self-driven learning, I have built skills in ${d.keySkills || "key areas"} that I am eager to apply in a real-world environment.`}

${d.achievement2 ? `I have also taken initiative outside the classroom: ${d.achievement2}. I believe this demonstrates my commitment to going beyond what is expected.` : `I am a fast learner who is not afraid to ask questions, take feedback, and put in the work to grow quickly. I am looking for a role where I can contribute while developing professionally.`}

${d.whyCompany ? `I chose ${d.company || "your company"} specifically because ${d.whyCompany}. I am excited by the prospect of growing with a company that values ${d.industry || "excellence"}.` : `${d.company || "Your company"} is where I want to start my career. Your reputation and values align closely with my own, and I am excited by the growth opportunities you offer.`}

Thank you for considering my application. I would love the opportunity to discuss how I can contribute to your team and grow with ${d.company || "your organization"}.

Warmly,
${d.name || "Your Name"}${d.email ? `\n${d.email}` : ""}${d.phone ? ` | ${d.phone}` : ""}`,

  executive: (d) => `${d.hiringManager ? `Dear ${d.hiringManager},` : "Dear Search Committee,"}

I am reaching out to express my strong interest in the ${d.role || "executive position"} at ${d.company || "your organization"}. As a senior leader with ${d.yearsExperience || "extensive"} years of progressive experience in ${d.industry || "the industry"}, I have a demonstrated history of building high-performing teams, driving strategic growth, and delivering measurable results at scale.

${d.achievement1 ? `Among my most significant accomplishments: ${d.achievement1}. This initiative is representative of my approach to leadership — data-driven, people-focused, and outcome-oriented.` : `My leadership philosophy centers on aligning talent with strategy, building cultures of accountability, and accelerating growth through disciplined execution.`}

${d.achievement2 ? `At the board and C-suite level, I have also: ${d.achievement2}. I bring a broad perspective and deep operational expertise that I believe translates directly to the challenges facing ${d.company || "your organization"} today.` : `I have managed P&L responsibilities, led M&A integrations, and navigated complex stakeholder environments. I understand both the strategic and operational dimensions of executive leadership.`}

${d.whyCompany ? `My interest in ${d.company || "your organization"} is genuine and specific: ${d.whyCompany}. I have followed your trajectory closely and believe the timing is right for the kind of leadership transformation I can offer.` : `${d.company || "Your organization"} is at an inflection point, and I believe my experience in scaling businesses and leading transformation aligns well with the opportunities ahead.`}

I welcome the opportunity to explore how my background and vision can support your strategic objectives. I am happy to make myself available for a confidential conversation at your convenience.

Respectfully,
${d.name || "Your Name"}${d.email ? `\n${d.email}` : ""}${d.phone ? ` | ${d.phone}` : ""}${d.linkedin ? `\nLinkedIn: ${d.linkedin}` : ""}`,
};

const TONE_OPTIONS = [
  { value: "professional", label: "Professional", desc: "Formal & polished", emoji: "💼" },
  { value: "confident", label: "Confident", desc: "Bold & direct", emoji: "⚡" },
  { value: "creative", label: "Creative", desc: "Unique & engaging", emoji: "🎨" },
  { value: "entry-level", label: "Entry Level", desc: "Fresh grad tone", emoji: "🌱" },
  { value: "executive", label: "Executive", desc: "C-suite language", emoji: "👔" },
];

const INDUSTRIES = [
  "Technology", "Marketing", "Finance", "Healthcare", "Education",
  "Engineering", "Design", "Sales", "Operations", "Legal",
  "Consulting", "HR & Recruiting", "Product Management", "Data & Analytics",
  "Media & Communications", "Non-profit", "Real Estate", "Hospitality", "Other",
];

// ── Component ──────────────────────────────────────────────────────────────────
export default function CoverLetterGeneratorTool() {
  const [data, setData] = useState<FormData>({
    name: "", email: "", phone: "", linkedin: "",
    role: "", company: "", hiringManager: "", industry: "",
    yearsExperience: "", keySkills: "",
    achievement1: "", achievement2: "",
    whyCompany: "", jobSource: "",
    tone: "professional",
  });
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [generating, setGenerating] = useState(false);

  const update = (field: keyof FormData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      const letter = TEMPLATES[data.tone](data);
      setGenerated(letter);
      setGenerating(false);
      setTimeout(() => {
        document.getElementById("cover-letter-output")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 600);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsTxt = () => {
    const blob = new Blob([generated], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cover-letter-${data.company || "linkforge"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAsPdf = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageW = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const maxW = pageW - margin * 2;

      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");

      const lines = pdf.splitTextToSize(generated, maxW);
      let y = margin;
      lines.forEach((line: string) => {
        if (y > 275) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, margin, y);
        y += 7;
      });

      pdf.save(`cover-letter-${data.company || "linkforge"}.pdf`);
    } catch {
      downloadAsTxt();
    }
  };

  const inputCls =
    "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/30 focus:border-[#7c3aed] transition-all bg-white";
  const labelCls = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="space-y-6">

      {/* ── Tone Selector ── */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#7c3aed]" /> Choose Your Tone
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {TONE_OPTIONS.map((t) => (
            <button
              key={t.value}
              onClick={() => update("tone", t.value)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-center transition-all ${
                data.tone === t.value
                  ? "border-[#7c3aed] bg-purple-50"
                  : "border-gray-100 hover:border-gray-300 bg-white"
              }`}
            >
              <span className="text-2xl">{t.emoji}</span>
              <span className={`text-xs font-bold ${data.tone === t.value ? "text-[#7c3aed]" : "text-gray-700"}`}>
                {t.label}
              </span>
              <span className="text-xs text-gray-500 leading-tight">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Your Details ── */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-4">Your Details</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Full Name *</label>
            <input type="text" placeholder="e.g., Sarah Johnson" value={data.name} onChange={(e) => update("name", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input type="email" placeholder="you@example.com" value={data.email} onChange={(e) => update("email", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input type="text" placeholder="+1 (555) 000-0000" value={data.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>LinkedIn URL</label>
            <input type="text" placeholder="linkedin.com/in/yourprofile" value={data.linkedin} onChange={(e) => update("linkedin", e.target.value)} className={inputCls} />
          </div>
        </div>
      </div>

      {/* ── Job Details ── */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-4">Job Details</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Target Role *</label>
            <input type="text" placeholder="e.g., Senior Marketing Manager" value={data.role} onChange={(e) => update("role", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Company Name *</label>
            <input type="text" placeholder="e.g., Google" value={data.company} onChange={(e) => update("company", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Hiring Manager's Name</label>
            <input type="text" placeholder="e.g., John Smith (optional)" value={data.hiringManager} onChange={(e) => update("hiringManager", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Industry</label>
            <select value={data.industry} onChange={(e) => update("industry", e.target.value)} className={inputCls}>
              <option value="">Select industry...</option>
              {INDUSTRIES.map((ind) => <option key={ind}>{ind}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ── Your Experience ── */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-4">Your Experience & Skills</h2>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Years of Experience</label>
              <select value={data.yearsExperience} onChange={(e) => update("yearsExperience", e.target.value)} className={inputCls}>
                <option value="">Select...</option>
                <option>less than 1 year</option>
                <option>1-2 years</option>
                <option>3-5 years</option>
                <option>5-8 years</option>
                <option>8-12 years</option>
                <option>12+ years</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Key Skills (comma-separated) *</label>
              <input type="text" placeholder="e.g., data analysis, team leadership, Python" value={data.keySkills} onChange={(e) => update("keySkills", e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Key Achievement #1 <span className="text-gray-400 font-normal">(optional but recommended)</span></label>
            <textarea
              rows={2}
              placeholder="e.g., Led a team of 8 engineers to launch a product used by 50,000+ users within 3 months"
              value={data.achievement1}
              onChange={(e) => update("achievement1", e.target.value)}
              className={`${inputCls} resize-none`}
            />
          </div>
          <div>
            <label className={labelCls}>Key Achievement #2 <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea
              rows={2}
              placeholder="e.g., Increased department revenue by 35% through a new client acquisition strategy"
              value={data.achievement2}
              onChange={(e) => update("achievement2", e.target.value)}
              className={`${inputCls} resize-none`}
            />
          </div>
        </div>
      </div>

      {/* ── Advanced Options ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between p-5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span>Advanced Options (Why This Company, Job Source)</span>
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {showAdvanced && (
          <div className="px-5 pb-5 space-y-4">
            <div>
              <label className={labelCls}>Why This Company? <span className="text-gray-400 font-normal">(makes it personal)</span></label>
              <textarea
                rows={2}
                placeholder="e.g., your mission-driven culture, recent Series B expansion, the open-source projects you support"
                value={data.whyCompany}
                onChange={(e) => update("whyCompany", e.target.value)}
                className={`${inputCls} resize-none`}
              />
            </div>
            <div>
              <label className={labelCls}>How did you find this job?</label>
              <input type="text" placeholder="e.g., LinkedIn, your company blog, referral from Jane Doe" value={data.jobSource} onChange={(e) => update("jobSource", e.target.value)} className={inputCls} />
            </div>
          </div>
        )}
      </div>

      {/* ── Generate Button ── */}
      <button
        onClick={generate}
        disabled={generating || !data.name || !data.role || !data.company}
        className="w-full py-4 rounded-xl font-bold text-white text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{ background: "linear-gradient(135deg, #7c3aed, #057642)" }}
      >
        {generating ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating...
          </>
        ) : (
          <>
            <FileText className="w-5 h-5" />
            Generate Cover Letter
          </>
        )}
      </button>
      {(!data.name || !data.role || !data.company) && (
        <p className="text-center text-xs text-gray-400">* Please fill in Name, Target Role and Company Name</p>
      )}

      {/* ── Output ── */}
      {generated && (
        <div id="cover-letter-output" className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#7c3aed]" />
              <span className="font-bold text-gray-800 text-sm">Your Cover Letter</span>
              <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium capitalize">
                {data.tone}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-[#7c3aed] bg-white border border-gray-200 rounded-lg hover:border-[#7c3aed] transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={downloadAsTxt}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-blue-600 bg-white border border-gray-200 rounded-lg hover:border-blue-400 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                TXT
              </button>
              <button
                onClick={downloadAsPdf}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white rounded-lg transition-all"
                style={{ background: "linear-gradient(135deg, #7c3aed, #057642)" }}
              >
                <Download className="w-3.5 h-3.5" />
                PDF
              </button>
            </div>
          </div>
          <div className="p-6">
            <textarea
              value={generated}
              onChange={(e) => setGenerated(e.target.value)}
              rows={20}
              className="w-full text-sm text-gray-800 leading-7 font-mono bg-transparent resize-none focus:outline-none"
              style={{ fontFamily: "Georgia, serif", lineHeight: "1.8" }}
            />
          </div>
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              💡 <strong>Tip:</strong> You can edit the letter directly above. Use the PDF button to download a formatted version.
              Personalize your achievements and company-specific details for best results.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

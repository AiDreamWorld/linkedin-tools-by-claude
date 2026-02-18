"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download, Plus, Trash2, FileText, Briefcase, GraduationCap,
  Award, Languages, Sparkles, Eye, EyeOff, Check, Copy,
  ChevronDown, ChevronUp, Palette, Type, Globe, Mail, Phone,
  MapPin, Linkedin, Star, Heart, Code
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Experience { id: string; company: string; role: string; startDate: string; endDate: string; current: boolean; description: string; }
interface Education  { id: string; institution: string; degree: string; field: string; startYear: string; endYear: string; gpa: string; description: string; }
interface Project    { id: string; name: string; description: string; link: string; tech: string; }
interface Award      { id: string; title: string; issuer: string; year: string; description: string; }
interface Volunteer  { id: string; org: string; role: string; duration: string; description: string; }
interface Reference  { id: string; name: string; title: string; company: string; email: string; phone: string; }

// ─── Template definitions ─────────────────────────────────────────────────────

const TEMPLATES = [
  { id: "executive",  name: "Executive",   tag: "🏆 Most Popular",  desc: "Bold two-column layout used by C-suite professionals" },
  { id: "modern",     name: "Modern",      tag: "⚡ Clean",         desc: "Clean sidebar with accent color — tech & startup favorite" },
  { id: "classic",    name: "Classic",     tag: "📄 Traditional",   desc: "ATS-friendly, classic typographic layout" },
  { id: "elegant",    name: "Elegant",     tag: "✨ Premium",        desc: "Sophisticated serif style for finance & law" },
  { id: "creative",   name: "Creative",    tag: "🎨 Bold",           desc: "Stand-out design for designers & marketers" },
  { id: "minimal",    name: "Minimal",     tag: "💎 Simple",         desc: "Less is more — ultra-clean whitespace design" },
  { id: "corporate",  name: "Corporate",   tag: "🏢 Professional",  desc: "Structured blue-accent for business & consulting" },
  { id: "tech",       name: "Tech",        tag: "💻 Developer",      desc: "Dark header, code-inspired for engineers & devs" },
];

const ACCENT_COLORS = [
  { name: "LinkedIn Blue",  value: "#0A66C2" },
  { name: "Executive Navy", value: "#1e3a5f" },
  { name: "Forest Green",   value: "#057642" },
  { name: "Deep Purple",    value: "#6d28d9" },
  { name: "Crimson Red",    value: "#b91c1c" },
  { name: "Charcoal",       value: "#374151" },
  { name: "Teal",           value: "#0d9488" },
  { name: "Rose Gold",      value: "#be185d" },
];

const FONT_FAMILIES = [
  { name: "Inter",       value: "'Inter', sans-serif" },
  { name: "Georgia",     value: "Georgia, serif" },
  { name: "Garamond",    value: "'EB Garamond', Georgia, serif" },
  { name: "Helvetica",   value: "Helvetica, Arial, sans-serif" },
  { name: "Palatino",    value: "Palatino, 'Palatino Linotype', serif" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const mk = (overrides = {}): Experience => ({ id: Date.now().toString(), company: "", role: "", startDate: "", endDate: "", current: false, description: "", ...overrides });
const mkEdu = (): Education => ({ id: Date.now().toString(), institution: "", degree: "", field: "", startYear: "", endYear: "", gpa: "", description: "" });
const mkProj = (): Project  => ({ id: Date.now().toString(), name: "", description: "", link: "", tech: "" });
const mkAward = (): Award   => ({ id: Date.now().toString(), title: "", issuer: "", year: "", description: "" });
const mkVol = (): Volunteer => ({ id: Date.now().toString(), org: "", role: "", duration: "", description: "" });
const mkRef = (): Reference => ({ id: Date.now().toString(), name: "", title: "", company: "", email: "", phone: "" });

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CvGeneratorTool() {
  const cvRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "", title: "", email: "", phone: "", location: "",
    website: "", linkedin: "", github: "", summary: "",
    skills: [] as string[], languages: [] as string[], certifications: "",
  });
  const [experience, setExperience]   = useState<Experience[]>([mk()]);
  const [education,  setEducation]    = useState<Education[]>([mkEdu()]);
  const [projects,   setProjects]     = useState<Project[]>([mkProj()]);
  const [awards,     setAwards]       = useState<Award[]>([mkAward()]);
  const [volunteer,  setVolunteer]    = useState<Volunteer[]>([mkVol()]);
  const [references, setReferences]   = useState<Reference[]>([mkRef()]);

  // UI state
  const [selectedTemplate, setSelectedTemplate] = useState("executive");
  const [accentColor,      setAccentColor]       = useState("#0A66C2");
  const [fontFamily,       setFontFamily]        = useState("'Inter', sans-serif");
  const [activeSection,    setActiveSection]      = useState<string | null>("basic");
  const [showPreview,      setShowPreview]        = useState(false);
  const [copied,           setCopied]             = useState(false);
  const [pdfLoading,       setPdfLoading]         = useState(false);
  const [pdfError,         setPdfError]           = useState("");
  const [skillInput,       setSkillInput]         = useState("");
  const [langInput,        setLangInput]          = useState("");

  const [sections, setSections] = useState({
    summary: true, experience: true, education: true, skills: true,
    projects: false, languages: false, certifications: false,
    awards: false, volunteer: false, references: false,
  });

  const fd = formData;
  const setFd = (k: string, v: string) => setFormData(p => ({ ...p, [k]: v }));

  // ─── Skills / Languages ──────────────────────────────────────────────────

  const addSkill = (s: string) => { if (s.trim() && !fd.skills.includes(s.trim())) { setFormData(p => ({ ...p, skills: [...p.skills, s.trim()] })); setSkillInput(""); } };
  const removeSkill = (s: string) => setFormData(p => ({ ...p, skills: p.skills.filter(x => x !== s) }));
  const addLang = (l: string) => { if (l.trim() && !fd.languages.includes(l.trim())) { setFormData(p => ({ ...p, languages: [...p.languages, l.trim()] })); setLangInput(""); } };
  const removeLang = (l: string) => setFormData(p => ({ ...p, languages: p.languages.filter(x => x !== l) }));

  // ─── PDF Download ─────────────────────────────────────────────────────────

  const downloadPDF = async () => {
    if (!cvRef.current) return;
    setPdfLoading(true);
    setPdfError("");
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(cvRef.current, {
        scale: 2, useCORS: true, allowTaint: true, logging: false,
        backgroundColor: "#ffffff", imageTimeout: 0,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const imgH = (canvas.height * pdfW) / canvas.width;

      let yOff = 0, rem = imgH, page = 0;
      while (rem > 0) {
        if (page > 0) pdf.addPage();
        const slice = Math.min(rem, pdfH);
        const srcY = (yOff / imgH) * canvas.height;
        const srcH = (slice / imgH) * canvas.height;
        const sc = document.createElement("canvas");
        sc.width = canvas.width; sc.height = srcH;
        sc.getContext("2d")!.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH);
        pdf.addImage(sc.toDataURL("image/png", 1.0), "PNG", 0, 0, pdfW, slice);
        yOff += slice; rem -= slice; page++;
      }

      pdf.save(`${(fd.name || "cv").replace(/\s+/g, "-").toLowerCase()}-resume.pdf`);
    } catch (err) {
      console.error(err);
      setPdfError("PDF export failed. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  };

  const copyText = () => {
    const txt = [
      fd.name, fd.title, fd.email, fd.phone, fd.location,
      "\nSUMMARY\n" + fd.summary,
      "\nEXPERIENCE\n" + experience.map(e => `${e.role} at ${e.company} (${e.startDate}–${e.current ? "Present" : e.endDate})\n${e.description}`).join("\n\n"),
      "\nEDUCATION\n" + education.map(e => `${e.degree} ${e.field} – ${e.institution} (${e.startYear}–${e.endYear})`).join("\n"),
      "\nSKILLS\n" + fd.skills.join(", "),
    ].join("\n");
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // ─── Section accordion ───────────────────────────────────────────────────

  const Section = ({ id, title, icon, children }: { id: string; title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setActiveSection(activeSection === id ? null : id)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-[#0A66C2]">{icon}</span>
          <span className="font-bold text-gray-900">{title}</span>
        </div>
        {activeSection === id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {activeSection === id && <div className="px-6 pb-6 border-t border-gray-100">{children}</div>}
    </div>
  );

  // ─── CV TEMPLATES ─────────────────────────────────────────────────────────

  const accent = accentColor;
  const font   = fontFamily;

  const sectionHeading = (label: string, style?: React.CSSProperties) => (
    <div style={{ borderBottom: `2px solid ${accent}`, marginBottom: 12, paddingBottom: 4, ...style }}>
      <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, margin: 0 }}>{label}</h2>
    </div>
  );

  const expBlock = (exp: Experience) => (
    <div key={exp.id} style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#111827" }}>{exp.role || "Job Title"}</div>
          <div style={{ fontSize: 12, color: "#4b5563" }}>{exp.company || "Company"}</div>
        </div>
        <div style={{ fontSize: 11, color: "#6b7280", whiteSpace: "nowrap", marginLeft: 8 }}>
          {exp.startDate}{exp.startDate && " – "}{exp.current ? "Present" : exp.endDate}
        </div>
      </div>
      {exp.description && <div style={{ fontSize: 12, color: "#374151", marginTop: 5, whiteSpace: "pre-line", lineHeight: 1.6 }}>{exp.description}</div>}
    </div>
  );

  const eduBlock = (edu: Education) => (
    <div key={edu.id} style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#111827" }}>{edu.degree}{edu.field ? ` – ${edu.field}` : ""}</div>
          <div style={{ fontSize: 12, color: "#4b5563" }}>{edu.institution}</div>
          {edu.gpa && <div style={{ fontSize: 11, color: "#6b7280" }}>GPA: {edu.gpa}</div>}
        </div>
        <div style={{ fontSize: 11, color: "#6b7280", whiteSpace: "nowrap", marginLeft: 8 }}>
          {edu.startYear}{edu.startYear && edu.endYear && " – "}{edu.endYear}
        </div>
      </div>
      {edu.description && <div style={{ fontSize: 12, color: "#374151", marginTop: 4 }}>{edu.description}</div>}
    </div>
  );

  const skillChip = (s: string, bg = "#e0f2fe", color = "#0369a1") => (
    <span key={s} style={{ background: bg, color, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 500 }}>{s}</span>
  );

  const contactItem = (icon: string, val: string) => val ? (
    <div key={val} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#374151" }}>
      <span style={{ fontSize: 11 }}>{icon}</span> {val}
    </div>
  ) : null;

  const renderCV = () => {
    const base: React.CSSProperties = { fontFamily: font, background: "#fff", color: "#111827", lineHeight: 1.5 };

    // ── EXECUTIVE ──────────────────────────────────────────────────────────
    if (selectedTemplate === "executive") return (
      <div ref={cvRef} style={{ ...base, display: "flex", minHeight: "297mm" }}>
        {/* Sidebar */}
        <div style={{ width: "32%", background: accent, padding: "36px 24px", color: "#fff", minHeight: "100%" }}>
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2, marginBottom: 4 }}>{fd.name || "Your Name"}</div>
            <div style={{ fontSize: 13, opacity: 0.85, fontWeight: 500 }}>{fd.title || "Professional Title"}</div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.7, marginBottom: 10 }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {contactItem("✉", fd.email)}
              {contactItem("📞", fd.phone)}
              {contactItem("📍", fd.location)}
              {contactItem("🌐", fd.website)}
              {contactItem("in", fd.linkedin)}
              {contactItem("⌥", fd.github)}
            </div>
          </div>
          {sections.skills && fd.skills.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.7, marginBottom: 10 }}>Skills</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {fd.skills.map(s => <span key={s} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderRadius: 4, padding: "2px 8px", fontSize: 11 }}>{s}</span>)}
              </div>
            </div>
          )}
          {sections.languages && fd.languages.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.7, marginBottom: 10 }}>Languages</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {fd.languages.map(l => <span key={l} style={{ fontSize: 12, opacity: 0.9 }}>{l}</span>)}
              </div>
            </div>
          )}
          {sections.certifications && fd.certifications && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.7, marginBottom: 10 }}>Certifications</div>
              <div style={{ fontSize: 11, opacity: 0.9, whiteSpace: "pre-line" }}>{fd.certifications}</div>
            </div>
          )}
        </div>
        {/* Main */}
        <div style={{ flex: 1, padding: "36px 32px" }}>
          {sections.summary && fd.summary && (
            <div style={{ marginBottom: 24 }}>
              {sectionHeading("Professional Summary")}
              <p style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, margin: 0 }}>{fd.summary}</p>
            </div>
          )}
          {sections.experience && experience.some(e => e.company || e.role) && (
            <div style={{ marginBottom: 24 }}>
              {sectionHeading("Work Experience")}
              {experience.filter(e => e.company || e.role).map(expBlock)}
            </div>
          )}
          {sections.education && education.some(e => e.institution || e.degree) && (
            <div style={{ marginBottom: 24 }}>
              {sectionHeading("Education")}
              {education.filter(e => e.institution || e.degree).map(eduBlock)}
            </div>
          )}
          {sections.projects && projects.some(p => p.name) && (
            <div style={{ marginBottom: 24 }}>
              {sectionHeading("Projects")}
              {projects.filter(p => p.name).map(p => (
                <div key={p.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#111827" }}>{p.name}</div>
                  {p.tech && <div style={{ fontSize: 11, color: accent, marginBottom: 3 }}>{p.tech}</div>}
                  {p.description && <div style={{ fontSize: 12, color: "#374151" }}>{p.description}</div>}
                  {p.link && <div style={{ fontSize: 11, color: accent }}>{p.link}</div>}
                </div>
              ))}
            </div>
          )}
          {sections.awards && awards.some(a => a.title) && (
            <div style={{ marginBottom: 24 }}>
              {sectionHeading("Awards & Honors")}
              {awards.filter(a => a.title).map(a => (
                <div key={a.id} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>{a.year}</div>
                  </div>
                  {a.issuer && <div style={{ fontSize: 12, color: "#4b5563" }}>{a.issuer}</div>}
                  {a.description && <div style={{ fontSize: 12, color: "#374151" }}>{a.description}</div>}
                </div>
              ))}
            </div>
          )}
          {sections.volunteer && volunteer.some(v => v.org) && (
            <div style={{ marginBottom: 24 }}>
              {sectionHeading("Volunteer Experience")}
              {volunteer.filter(v => v.org).map(v => (
                <div key={v.id} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{v.role}</div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>{v.duration}</div>
                  </div>
                  <div style={{ fontSize: 12, color: "#4b5563" }}>{v.org}</div>
                  {v.description && <div style={{ fontSize: 12, color: "#374151", marginTop: 3 }}>{v.description}</div>}
                </div>
              ))}
            </div>
          )}
          {sections.references && references.some(r => r.name) && (
            <div>
              {sectionHeading("References")}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {references.filter(r => r.name).map(r => (
                  <div key={r.id} style={{ background: "#f9fafb", borderRadius: 6, padding: 10 }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: "#4b5563" }}>{r.title}{r.company ? `, ${r.company}` : ""}</div>
                    {r.email && <div style={{ fontSize: 11, color: accent }}>{r.email}</div>}
                    {r.phone && <div style={{ fontSize: 11, color: "#6b7280" }}>{r.phone}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );

    // ── MODERN ─────────────────────────────────────────────────────────────
    if (selectedTemplate === "modern") return (
      <div ref={cvRef} style={{ ...base, display: "flex", minHeight: "297mm" }}>
        <div style={{ width: "30%", background: "#1f2937", padding: "36px 22px", color: "#fff" }}>
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{fd.name || "Your Name"}</div>
            <div style={{ fontSize: 12, color: accent, fontWeight: 600 }}>{fd.title || "Professional Title"}</div>
          </div>
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", color: accent, textTransform: "uppercase", marginBottom: 10 }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {[["✉", fd.email], ["📞", fd.phone], ["📍", fd.location], ["🌐", fd.website], ["in", fd.linkedin]].filter(([, v]) => v).map(([i, v]) => (
                <div key={String(v)} style={{ display: "flex", gap: 6, fontSize: 11, color: "#d1d5db" }}><span>{i}</span><span>{v}</span></div>
              ))}
            </div>
          </div>
          {sections.skills && fd.skills.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", color: accent, textTransform: "uppercase", marginBottom: 10 }}>Skills</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {fd.skills.map(s => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: accent, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: "#d1d5db" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {sections.languages && fd.languages.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", color: accent, textTransform: "uppercase", marginBottom: 10 }}>Languages</div>
              {fd.languages.map(l => <div key={l} style={{ fontSize: 11, color: "#d1d5db", marginBottom: 4 }}>{l}</div>)}
            </div>
          )}
          {sections.certifications && fd.certifications && (
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", color: accent, textTransform: "uppercase", marginBottom: 10 }}>Certifications</div>
              <div style={{ fontSize: 11, color: "#d1d5db", whiteSpace: "pre-line" }}>{fd.certifications}</div>
            </div>
          )}
        </div>
        <div style={{ flex: 1, padding: "36px 28px" }}>
          {sections.summary && fd.summary && (<div style={{ marginBottom: 22 }}>{sectionHeading("About Me")}<p style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, margin: 0 }}>{fd.summary}</p></div>)}
          {sections.experience && experience.some(e => e.company || e.role) && (<div style={{ marginBottom: 22 }}>{sectionHeading("Experience")}{experience.filter(e => e.company || e.role).map(expBlock)}</div>)}
          {sections.education && education.some(e => e.institution) && (<div style={{ marginBottom: 22 }}>{sectionHeading("Education")}{education.filter(e => e.institution).map(eduBlock)}</div>)}
          {sections.projects && projects.some(p => p.name) && (<div style={{ marginBottom: 22 }}>{sectionHeading("Projects")}{projects.filter(p => p.name).map(p => (<div key={p.id} style={{ marginBottom: 12 }}><div style={{ fontWeight: 700, fontSize: 13 }}>{p.name}</div>{p.tech && <div style={{ fontSize: 11, color: accent }}>{p.tech}</div>}{p.description && <div style={{ fontSize: 12, color: "#374151" }}>{p.description}</div>}</div>))}</div>)}
          {sections.awards && awards.some(a => a.title) && (<div style={{ marginBottom: 22 }}>{sectionHeading("Awards")}{awards.filter(a => a.title).map(a => (<div key={a.id} style={{ marginBottom: 10 }}><div style={{ fontWeight: 700, fontSize: 13 }}>{a.title} {a.year && <span style={{ fontWeight: 400, color: "#6b7280", fontSize: 11 }}>({a.year})</span>}</div>{a.issuer && <div style={{ fontSize: 12, color: "#4b5563" }}>{a.issuer}</div>}{a.description && <div style={{ fontSize: 12, color: "#374151" }}>{a.description}</div>}</div>))}</div>)}
        </div>
      </div>
    );

    // ── CLASSIC ────────────────────────────────────────────────────────────
    if (selectedTemplate === "classic") return (
      <div ref={cvRef} style={{ ...base, padding: "48px 56px", minHeight: "297mm" }}>
        <div style={{ textAlign: "center", marginBottom: 28, borderBottom: `1px solid #e5e7eb`, paddingBottom: 20 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", margin: 0, letterSpacing: "-0.5px" }}>{fd.name || "Your Name"}</h1>
          {fd.title && <div style={{ fontSize: 14, color: "#4b5563", marginTop: 6, fontWeight: 500 }}>{fd.title}</div>}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 16px", marginTop: 10, fontSize: 12, color: "#6b7280" }}>
            {fd.email && <span>{fd.email}</span>}
            {fd.phone && <span>{fd.phone}</span>}
            {fd.location && <span>{fd.location}</span>}
            {fd.linkedin && <span>{fd.linkedin}</span>}
            {fd.website && <span>{fd.website}</span>}
          </div>
        </div>
        {sections.summary && fd.summary && (<div style={{ marginBottom: 22 }}>{sectionHeading("Professional Summary")}<p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, margin: 0 }}>{fd.summary}</p></div>)}
        {sections.experience && experience.some(e => e.company || e.role) && (<div style={{ marginBottom: 22 }}>{sectionHeading("Experience")}{experience.filter(e => e.company || e.role).map(expBlock)}</div>)}
        {sections.education && education.some(e => e.institution) && (<div style={{ marginBottom: 22 }}>{sectionHeading("Education")}{education.filter(e => e.institution).map(eduBlock)}</div>)}
        {sections.skills && fd.skills.length > 0 && (<div style={{ marginBottom: 22 }}>{sectionHeading("Skills")}<div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{fd.skills.map(s => skillChip(s))}</div></div>)}
        {sections.projects && projects.some(p => p.name) && (<div style={{ marginBottom: 22 }}>{sectionHeading("Projects")}{projects.filter(p => p.name).map(p => (<div key={p.id} style={{ marginBottom: 12 }}><div style={{ fontWeight: 700, fontSize: 13 }}>{p.name} {p.link && <span style={{ fontWeight: 400, color: accent, fontSize: 11 }}>— {p.link}</span>}</div>{p.tech && <div style={{ fontSize: 11, color: "#6b7280" }}>{p.tech}</div>}{p.description && <div style={{ fontSize: 12, color: "#374151" }}>{p.description}</div>}</div>))}</div>)}
        {sections.languages && fd.languages.length > 0 && (<div style={{ marginBottom: 22 }}>{sectionHeading("Languages")}<div style={{ display: "flex", flexWrap: "wrap", gap: "0 24px" }}>{fd.languages.map(l => <span key={l} style={{ fontSize: 12, color: "#374151" }}>{l}</span>)}</div></div>)}
        {sections.certifications && fd.certifications && (<div style={{ marginBottom: 22 }}>{sectionHeading("Certifications")}<div style={{ fontSize: 12, color: "#374151", whiteSpace: "pre-line" }}>{fd.certifications}</div></div>)}
        {sections.awards && awards.some(a => a.title) && (<div style={{ marginBottom: 22 }}>{sectionHeading("Awards")}{awards.filter(a => a.title).map(a => (<div key={a.id} style={{ marginBottom: 8 }}><div style={{ fontWeight: 700, fontSize: 13 }}>{a.title} {a.year && <span style={{ fontWeight: 400, color: "#6b7280", fontSize: 11 }}>({a.year})</span>}</div>{a.issuer && <div style={{ fontSize: 12, color: "#4b5563" }}>{a.issuer}</div>}</div>))}</div>)}
        {sections.volunteer && volunteer.some(v => v.org) && (<div style={{ marginBottom: 22 }}>{sectionHeading("Volunteer")}{volunteer.filter(v => v.org).map(v => (<div key={v.id} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><div style={{ fontWeight: 700, fontSize: 13 }}>{v.role} — {v.org}</div><div style={{ fontSize: 11, color: "#6b7280" }}>{v.duration}</div></div>{v.description && <div style={{ fontSize: 12, color: "#374151" }}>{v.description}</div>}</div>))}</div>)}
        {sections.references && references.some(r => r.name) && (<div>{sectionHeading("References")}<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>{references.filter(r => r.name).map(r => (<div key={r.id}><div style={{ fontWeight: 700, fontSize: 13 }}>{r.name}</div><div style={{ fontSize: 11, color: "#4b5563" }}>{r.title}{r.company ? `, ${r.company}` : ""}</div>{r.email && <div style={{ fontSize: 11, color: accent }}>{r.email}</div>}</div>))}</div></div>)}
      </div>
    );

    // ── ELEGANT ────────────────────────────────────────────────────────────
    if (selectedTemplate === "elegant") return (
      <div ref={cvRef} style={{ ...base, fontFamily: "Georgia, serif", padding: "48px 56px", minHeight: "297mm", background: "#fdfcfb" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 400, color: "#111827", margin: 0, letterSpacing: "2px", textTransform: "uppercase" }}>{fd.name || "Your Name"}</h1>
          <div style={{ width: 60, height: 1, background: accent, margin: "12px auto" }} />
          {fd.title && <div style={{ fontSize: 13, color: "#6b7280", letterSpacing: "1px", textTransform: "uppercase" }}>{fd.title}</div>}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 18px", marginTop: 12, fontSize: 12, color: "#6b7280", fontStyle: "italic" }}>
            {fd.email && <span>{fd.email}</span>}
            {fd.phone && <span>{fd.phone}</span>}
            {fd.location && <span>{fd.location}</span>}
          </div>
        </div>
        {sections.summary && fd.summary && (<div style={{ marginBottom: 24 }}><h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: accent, textAlign: "center", marginBottom: 10 }}>Profile</h2><p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, textAlign: "center", fontStyle: "italic", margin: 0 }}>{fd.summary}</p></div>)}
        {sections.experience && experience.some(e => e.company || e.role) && (<div style={{ marginBottom: 24 }}><h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: accent, borderBottom: `1px solid ${accent}`, paddingBottom: 6, marginBottom: 14 }}>Experience</h2>{experience.filter(e => e.company || e.role).map(expBlock)}</div>)}
        {sections.education && education.some(e => e.institution) && (<div style={{ marginBottom: 24 }}><h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: accent, borderBottom: `1px solid ${accent}`, paddingBottom: 6, marginBottom: 14 }}>Education</h2>{education.filter(e => e.institution).map(eduBlock)}</div>)}
        {sections.skills && fd.skills.length > 0 && (<div style={{ marginBottom: 24 }}><h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: accent, borderBottom: `1px solid ${accent}`, paddingBottom: 6, marginBottom: 14 }}>Expertise</h2><div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{fd.skills.map(s => <span key={s} style={{ fontSize: 12, color: "#374151", borderBottom: `1px solid ${accent}`, paddingBottom: 1 }}>{s}</span>)}</div></div>)}
        {sections.languages && fd.languages.length > 0 && (<div style={{ marginBottom: 24 }}><h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: accent, borderBottom: `1px solid ${accent}`, paddingBottom: 6, marginBottom: 14 }}>Languages</h2><div style={{ display: "flex", gap: 24 }}>{fd.languages.map(l => <span key={l} style={{ fontSize: 12, color: "#374151", fontStyle: "italic" }}>{l}</span>)}</div></div>)}
      </div>
    );

    // ── CREATIVE ───────────────────────────────────────────────────────────
    if (selectedTemplate === "creative") return (
      <div ref={cvRef} style={{ ...base, minHeight: "297mm" }}>
        <div style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)`, padding: "36px 40px", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div style={{ position: "absolute", bottom: -30, left: 40, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 30, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>{fd.name || "Your Name"}</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 500, marginTop: 6 }}>{fd.title || "Professional Title"}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0 20px", marginTop: 12, fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
              {fd.email && <span>✉ {fd.email}</span>}
              {fd.phone && <span>📞 {fd.phone}</span>}
              {fd.location && <span>📍 {fd.location}</span>}
              {fd.linkedin && <span>in {fd.linkedin}</span>}
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 0, padding: "28px 40px", alignItems: "start" }}>
          <div style={{ paddingRight: 32 }}>
            {sections.summary && fd.summary && (<div style={{ marginBottom: 22 }}><div style={{ fontWeight: 800, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 8 }}>About Me</div><p style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, margin: 0 }}>{fd.summary}</p></div>)}
            {sections.experience && experience.some(e => e.company || e.role) && (<div style={{ marginBottom: 22 }}><div style={{ fontWeight: 800, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 8 }}>Experience</div>{experience.filter(e => e.company || e.role).map(expBlock)}</div>)}
            {sections.projects && projects.some(p => p.name) && (<div style={{ marginBottom: 22 }}><div style={{ fontWeight: 800, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 8 }}>Projects</div>{projects.filter(p => p.name).map(p => (<div key={p.id} style={{ marginBottom: 12, padding: "10px 12px", background: "#f9fafb", borderLeft: `3px solid ${accent}`, borderRadius: "0 6px 6px 0" }}><div style={{ fontWeight: 700, fontSize: 13 }}>{p.name}</div>{p.tech && <div style={{ fontSize: 11, color: accent, marginBottom: 2 }}>{p.tech}</div>}{p.description && <div style={{ fontSize: 12, color: "#374151" }}>{p.description}</div>}</div>))}</div>)}
          </div>
          <div style={{ borderLeft: `1px solid #e5e7eb`, paddingLeft: 24 }}>
            {sections.education && education.some(e => e.institution) && (<div style={{ marginBottom: 20 }}><div style={{ fontWeight: 800, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>Education</div>{education.filter(e => e.institution).map(e => (<div key={e.id} style={{ marginBottom: 12 }}><div style={{ fontWeight: 700, fontSize: 12 }}>{e.degree}</div><div style={{ fontSize: 11, color: "#4b5563" }}>{e.institution}</div><div style={{ fontSize: 11, color: "#6b7280" }}>{e.startYear}{e.endYear ? `–${e.endYear}` : ""}</div></div>))}</div>)}
            {sections.skills && fd.skills.length > 0 && (<div style={{ marginBottom: 20 }}><div style={{ fontWeight: 800, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>Skills</div><div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{fd.skills.map(s => <span key={s} style={{ background: `${accent}18`, color: accent, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{s}</span>)}</div></div>)}
            {sections.languages && fd.languages.length > 0 && (<div style={{ marginBottom: 20 }}><div style={{ fontWeight: 800, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>Languages</div>{fd.languages.map(l => <div key={l} style={{ fontSize: 12, color: "#374151", marginBottom: 4 }}>{l}</div>)}</div>)}
            {sections.certifications && fd.certifications && (<div><div style={{ fontWeight: 800, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>Certifications</div><div style={{ fontSize: 11, color: "#374151", whiteSpace: "pre-line" }}>{fd.certifications}</div></div>)}
          </div>
        </div>
      </div>
    );

    // ── MINIMAL ────────────────────────────────────────────────────────────
    if (selectedTemplate === "minimal") return (
      <div ref={cvRef} style={{ ...base, padding: "52px 64px", minHeight: "297mm" }}>
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontSize: 36, fontWeight: 300, color: "#111827", margin: 0, letterSpacing: "-1px" }}>{fd.name || "Your Name"}</h1>
          {fd.title && <div style={{ fontSize: 14, color: accent, fontWeight: 500, marginTop: 4 }}>{fd.title}</div>}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0 20px", marginTop: 10, fontSize: 12, color: "#6b7280" }}>
            {fd.email && <span>{fd.email}</span>}
            {fd.phone && <span>{fd.phone}</span>}
            {fd.location && <span>{fd.location}</span>}
            {fd.linkedin && <span>{fd.linkedin}</span>}
          </div>
        </div>
        {sections.summary && fd.summary && (<div style={{ marginBottom: 28 }}><p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, margin: 0, borderLeft: `2px solid ${accent}`, paddingLeft: 16 }}>{fd.summary}</p></div>)}
        {sections.experience && experience.some(e => e.company || e.role) && (<div style={{ marginBottom: 28 }}><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 16 }}>Experience</div>{experience.filter(e => e.company || e.role).map(expBlock)}</div>)}
        {sections.education && education.some(e => e.institution) && (<div style={{ marginBottom: 28 }}><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 16 }}>Education</div>{education.filter(e => e.institution).map(eduBlock)}</div>)}
        {sections.skills && fd.skills.length > 0 && (<div style={{ marginBottom: 28 }}><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 16 }}>Skills</div><div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{fd.skills.map(s => <span key={s} style={{ fontSize: 12, color: "#374151", padding: "3px 10px", border: "1px solid #e5e7eb", borderRadius: 4 }}>{s}</span>)}</div></div>)}
        {sections.languages && fd.languages.length > 0 && (<div style={{ marginBottom: 28 }}><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 16 }}>Languages</div><div style={{ display: "flex", gap: 24 }}>{fd.languages.map(l => <span key={l} style={{ fontSize: 12, color: "#374151" }}>{l}</span>)}</div></div>)}
        {sections.certifications && fd.certifications && (<div style={{ marginBottom: 28 }}><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 16 }}>Certifications</div><div style={{ fontSize: 12, color: "#374151", whiteSpace: "pre-line" }}>{fd.certifications}</div></div>)}
      </div>
    );

    // ── CORPORATE ──────────────────────────────────────────────────────────
    if (selectedTemplate === "corporate") return (
      <div ref={cvRef} style={{ ...base, minHeight: "297mm" }}>
        <div style={{ background: accent, padding: "28px 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: 0 }}>{fd.name || "Your Name"}</h1>
              {fd.title && <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>{fd.title}</div>}
            </div>
            <div style={{ textAlign: "right", fontSize: 11, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              {fd.email && <div>{fd.email}</div>}
              {fd.phone && <div>{fd.phone}</div>}
              {fd.location && <div>{fd.location}</div>}
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", minHeight: "calc(297mm - 100px)" }}>
          <div style={{ padding: "28px 32px", borderRight: "1px solid #e5e7eb" }}>
            {sections.summary && fd.summary && (<div style={{ marginBottom: 22 }}>{sectionHeading("Executive Summary")}<p style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, margin: 0 }}>{fd.summary}</p></div>)}
            {sections.experience && experience.some(e => e.company || e.role) && (<div style={{ marginBottom: 22 }}>{sectionHeading("Professional Experience")}{experience.filter(e => e.company || e.role).map(expBlock)}</div>)}
            {sections.education && education.some(e => e.institution) && (<div style={{ marginBottom: 22 }}>{sectionHeading("Education")}{education.filter(e => e.institution).map(eduBlock)}</div>)}
            {sections.projects && projects.some(p => p.name) && (<div style={{ marginBottom: 22 }}>{sectionHeading("Key Projects")}{projects.filter(p => p.name).map(p => (<div key={p.id} style={{ marginBottom: 12 }}><div style={{ fontWeight: 700, fontSize: 13 }}>{p.name}</div>{p.description && <div style={{ fontSize: 12, color: "#374151" }}>{p.description}</div>}</div>))}</div>)}
          </div>
          <div style={{ padding: "28px 20px", background: "#f9fafb" }}>
            {sections.skills && fd.skills.length > 0 && (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>Core Skills</div><div style={{ display: "flex", flexDirection: "column", gap: 5 }}>{fd.skills.map(s => (<div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 5, height: 5, background: accent, borderRadius: "50%" }} /><span style={{ fontSize: 11, color: "#374151" }}>{s}</span></div>))}</div></div>)}
            {sections.languages && fd.languages.length > 0 && (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>Languages</div>{fd.languages.map(l => <div key={l} style={{ fontSize: 11, color: "#374151", marginBottom: 4 }}>{l}</div>)}</div>)}
            {sections.certifications && fd.certifications && (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>Certifications</div><div style={{ fontSize: 11, color: "#374151", whiteSpace: "pre-line" }}>{fd.certifications}</div></div>)}
            {sections.awards && awards.some(a => a.title) && (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>Awards</div>{awards.filter(a => a.title).map(a => (<div key={a.id} style={{ marginBottom: 8 }}><div style={{ fontSize: 12, fontWeight: 700 }}>{a.title}</div>{a.year && <div style={{ fontSize: 11, color: "#6b7280" }}>{a.year}</div>}</div>))}</div>)}
          </div>
        </div>
      </div>
    );

    // ── TECH ───────────────────────────────────────────────────────────────
    if (selectedTemplate === "tech") return (
      <div ref={cvRef} style={{ ...base, fontFamily: "'Courier New', monospace", minHeight: "297mm" }}>
        <div style={{ background: "#0f172a", padding: "32px 40px" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: accent, marginBottom: 2 }}>{fd.name || "Your Name"}</div>
          <div style={{ fontSize: 13, color: "#94a3b8" }}>{fd.title || "Software Engineer"}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0 20px", marginTop: 10, fontSize: 11, color: "#64748b" }}>
            {fd.email && <span>$ mail: {fd.email}</span>}
            {fd.phone && <span>$ tel: {fd.phone}</span>}
            {fd.location && <span>$ loc: {fd.location}</span>}
            {fd.github && <span>$ gh: {fd.github}</span>}
            {fd.linkedin && <span>$ li: {fd.linkedin}</span>}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 250px", minHeight: "calc(297mm - 120px)" }}>
          <div style={{ padding: "28px 32px" }}>
            {sections.summary && fd.summary && (<div style={{ marginBottom: 22 }}><div style={{ fontSize: 11, fontWeight: 700, color: accent, marginBottom: 8, letterSpacing: "0.1em" }}>// ABOUT</div><p style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, margin: 0 }}>{fd.summary}</p></div>)}
            {sections.experience && experience.some(e => e.company || e.role) && (<div style={{ marginBottom: 22 }}><div style={{ fontSize: 11, fontWeight: 700, color: accent, marginBottom: 12, letterSpacing: "0.1em" }}>// EXPERIENCE</div>{experience.filter(e => e.company || e.role).map(e => (<div key={e.id} style={{ marginBottom: 16, borderLeft: `2px solid ${accent}`, paddingLeft: 14 }}><div style={{ fontWeight: 700, fontSize: 13 }}>{e.role}</div><div style={{ fontSize: 12, color: "#6b7280" }}>{e.company} · {e.startDate}{e.current ? "–Present" : e.endDate ? `–${e.endDate}` : ""}</div>{e.description && <div style={{ fontSize: 12, color: "#374151", marginTop: 5, whiteSpace: "pre-line" }}>{e.description}</div>}</div>))}</div>)}
            {sections.education && education.some(e => e.institution) && (<div style={{ marginBottom: 22 }}><div style={{ fontSize: 11, fontWeight: 700, color: accent, marginBottom: 12, letterSpacing: "0.1em" }}>// EDUCATION</div>{education.filter(e => e.institution).map(eduBlock)}</div>)}
            {sections.projects && projects.some(p => p.name) && (<div style={{ marginBottom: 22 }}><div style={{ fontSize: 11, fontWeight: 700, color: accent, marginBottom: 12, letterSpacing: "0.1em" }}>// PROJECTS</div>{projects.filter(p => p.name).map(p => (<div key={p.id} style={{ marginBottom: 14 }}><div style={{ fontWeight: 700, fontSize: 13 }}>{p.name} {p.link && <span style={{ fontSize: 11, color: accent, fontWeight: 400 }}>→ {p.link}</span>}</div>{p.tech && <div style={{ fontSize: 11, color: "#6b7280", fontStyle: "italic" }}>Stack: {p.tech}</div>}{p.description && <div style={{ fontSize: 12, color: "#374151" }}>{p.description}</div>}</div>))}</div>)}
          </div>
          <div style={{ background: "#f8fafc", borderLeft: "1px solid #e2e8f0", padding: "28px 20px" }}>
            {sections.skills && fd.skills.length > 0 && (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Tech Stack</div><div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{fd.skills.map(s => <span key={s} style={{ fontSize: 10, background: `${accent}18`, color: accent, padding: "2px 7px", borderRadius: 3, fontFamily: "monospace" }}>{s}</span>)}</div></div>)}
            {sections.languages && fd.languages.length > 0 && (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Languages</div>{fd.languages.map(l => <div key={l} style={{ fontSize: 11, color: "#374151", marginBottom: 4 }}>{l}</div>)}</div>)}
            {sections.certifications && fd.certifications && (<div style={{ marginBottom: 20 }}><div style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Certifications</div><div style={{ fontSize: 11, color: "#374151", whiteSpace: "pre-line" }}>{fd.certifications}</div></div>)}
            {sections.awards && awards.some(a => a.title) && (<div><div style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Awards</div>{awards.filter(a => a.title).map(a => (<div key={a.id} style={{ marginBottom: 8 }}><div style={{ fontSize: 12, fontWeight: 700 }}>{a.title}</div>{a.year && <div style={{ fontSize: 11, color: "#6b7280" }}>{a.issuer} ({a.year})</div>}</div>))}</div>)}
          </div>
        </div>
      </div>
    );

    return <div ref={cvRef} />;
  };

  // ─── EDITOR UI ────────────────────────────────────────────────────────────

  const inp = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const inp2 = "px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="space-y-0">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#0A66C2] to-[#057642] rounded-2xl p-8 mb-6 text-white">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black mb-2">Free CV Generator</h1>
            <p className="text-blue-100 text-sm max-w-lg">8 professional templates · PDF download · All free, no signup · Better than paid services</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["✓ 100% Free", "✓ No Watermark", "✓ No Signup", "✓ ATS-Friendly", "✓ PDF Download"].map(b => (
                <span key={b} className="text-xs bg-white/20 px-2 py-1 rounded-full">{b}</span>
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-[#0A66C2] font-semibold rounded-lg hover:bg-blue-50 text-sm"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? "Hide Preview" : "Live Preview"}
          </button>
        </div>
      </div>

      <div className={`grid gap-6 ${showPreview ? "lg:grid-cols-2" : "grid-cols-1 max-w-3xl mx-auto"}`}>
        {/* ── LEFT: Editor ── */}
        <div className="space-y-3">

          {/* Template Picker */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-[#0A66C2]" /> Choose Template</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {TEMPLATES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${selectedTemplate === t.id ? "border-[#0A66C2] bg-blue-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
                >
                  <div className="text-xs text-[#0A66C2] font-semibold mb-1">{t.tag}</div>
                  <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500 mt-1 leading-tight">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Style Controls */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Palette className="w-5 h-5 text-[#0A66C2]" /> Style & Colors</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Accent Color</label>
                <div className="flex flex-wrap gap-2">
                  {ACCENT_COLORS.map(c => (
                    <button
                      key={c.value}
                      onClick={() => setAccentColor(c.value)}
                      title={c.name}
                      className={`w-8 h-8 rounded-full border-4 transition-all ${accentColor === c.value ? "border-gray-800 scale-110" : "border-transparent"}`}
                      style={{ background: c.value }}
                    />
                  ))}
                  <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} title="Custom color" className="w-8 h-8 rounded-full border-4 border-transparent cursor-pointer" style={{ padding: 0, background: "transparent" }} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Font Family</label>
                <select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className={inp}>
                  {FONT_FAMILIES.map(f => <option key={f.value} value={f.value}>{f.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Sections Toggle */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">CV Sections</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {(Object.entries(sections) as [keyof typeof sections, boolean][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setSections(p => ({ ...p, [key]: !p[key] }))}
                  className={`py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-between gap-1 transition-all ${val ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200 text-gray-400 hover:border-gray-300"}`}
                >
                  <span className="capitalize">{key}</span>
                  {val ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>

          {/* Basic Info */}
          <Section id="basic" title="Personal Information" icon={<Globe className="w-5 h-5" />}>
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Full Name *</label><input className={inp} placeholder="John Doe" value={fd.name} onChange={e => setFd("name", e.target.value)} /></div>
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Job Title</label><input className={inp} placeholder="Senior Software Engineer" value={fd.title} onChange={e => setFd("title", e.target.value)} /></div>
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Email</label><input className={inp} type="email" placeholder="john@example.com" value={fd.email} onChange={e => setFd("email", e.target.value)} /></div>
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Phone</label><input className={inp} placeholder="+1 234 567 8900" value={fd.phone} onChange={e => setFd("phone", e.target.value)} /></div>
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Location</label><input className={inp} placeholder="New York, USA" value={fd.location} onChange={e => setFd("location", e.target.value)} /></div>
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Website / Portfolio</label><input className={inp} placeholder="https://yoursite.com" value={fd.website} onChange={e => setFd("website", e.target.value)} /></div>
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">LinkedIn URL</label><input className={inp} placeholder="linkedin.com/in/yourprofile" value={fd.linkedin} onChange={e => setFd("linkedin", e.target.value)} /></div>
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">GitHub</label><input className={inp} placeholder="github.com/yourusername" value={fd.github} onChange={e => setFd("github", e.target.value)} /></div>
            </div>
          </Section>

          {/* Summary */}
          {sections.summary && (
            <Section id="summary" title="Professional Summary" icon={<FileText className="w-5 h-5" />}>
              <div className="pt-4">
                <textarea className={inp + " h-28 resize-none"} placeholder="Write 2-4 sentences about your professional background, key strengths, and what you bring to employers..." value={fd.summary} onChange={e => setFd("summary", e.target.value)} />
                <p className="text-xs text-gray-400 mt-1">{fd.summary.length}/500 chars — Keep it concise and impactful</p>
              </div>
            </Section>
          )}

          {/* Experience */}
          {sections.experience && (
            <Section id="experience" title="Work Experience" icon={<Briefcase className="w-5 h-5" />}>
              <div className="pt-4 space-y-4">
                {experience.map((exp, idx) => (
                  <div key={exp.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold text-gray-500">Position {idx + 1}{exp.current && <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Current</span>}</span>
                      {experience.length > 1 && <button onClick={() => setExperience(p => p.filter(e => e.id !== exp.id))} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <input className={inp2} placeholder="Job Title" value={exp.role} onChange={e => setExperience(p => p.map(x => x.id === exp.id ? { ...x, role: e.target.value } : x))} />
                      <input className={inp2} placeholder="Company Name" value={exp.company} onChange={e => setExperience(p => p.map(x => x.id === exp.id ? { ...x, company: e.target.value } : x))} />
                      <input className={inp2} placeholder="Start Date (Jan 2020)" value={exp.startDate} onChange={e => setExperience(p => p.map(x => x.id === exp.id ? { ...x, startDate: e.target.value } : x))} />
                      <div className="flex gap-2 items-center">
                        <input className={inp2 + " flex-1"} placeholder="End Date" value={exp.endDate} disabled={exp.current} onChange={e => setExperience(p => p.map(x => x.id === exp.id ? { ...x, endDate: e.target.value } : x))} />
                        <label className="flex items-center gap-1 text-xs text-gray-600 whitespace-nowrap">
                          <input type="checkbox" checked={exp.current} onChange={e => setExperience(p => p.map(x => x.id === exp.id ? { ...x, current: e.target.checked } : x))} /> Present
                        </label>
                      </div>
                    </div>
                    <textarea className={inp + " h-24 resize-none"} placeholder="• Describe your key responsibilities&#10;• Quantify achievements (e.g., 'Increased revenue by 30%')&#10;• Use action verbs (Led, Built, Designed, Managed...)" value={exp.description} onChange={e => setExperience(p => p.map(x => x.id === exp.id ? { ...x, description: e.target.value } : x))} />
                  </div>
                ))}
                <button onClick={() => setExperience(p => [...p, mk()])} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-[#0A66C2] hover:text-[#0A66C2] flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Add Experience
                </button>
              </div>
            </Section>
          )}

          {/* Education */}
          {sections.education && (
            <Section id="education" title="Education" icon={<GraduationCap className="w-5 h-5" />}>
              <div className="pt-4 space-y-4">
                {education.map((edu, idx) => (
                  <div key={edu.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold text-gray-500">Education {idx + 1}</span>
                      {education.length > 1 && <button onClick={() => setEducation(p => p.filter(e => e.id !== edu.id))} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <input className={inp2} placeholder="Degree (e.g., Bachelor of Science)" value={edu.degree} onChange={e => setEducation(p => p.map(x => x.id === edu.id ? { ...x, degree: e.target.value } : x))} />
                      <input className={inp2} placeholder="Field of Study" value={edu.field} onChange={e => setEducation(p => p.map(x => x.id === edu.id ? { ...x, field: e.target.value } : x))} />
                      <input className={inp2} placeholder="Institution Name" value={edu.institution} onChange={e => setEducation(p => p.map(x => x.id === edu.id ? { ...x, institution: e.target.value } : x))} />
                      <input className={inp2} placeholder="GPA (optional)" value={edu.gpa} onChange={e => setEducation(p => p.map(x => x.id === edu.id ? { ...x, gpa: e.target.value } : x))} />
                      <input className={inp2} placeholder="Start Year" value={edu.startYear} onChange={e => setEducation(p => p.map(x => x.id === edu.id ? { ...x, startYear: e.target.value } : x))} />
                      <input className={inp2} placeholder="End Year / Expected" value={edu.endYear} onChange={e => setEducation(p => p.map(x => x.id === edu.id ? { ...x, endYear: e.target.value } : x))} />
                      <div className="md:col-span-2"><input className={inp} placeholder="Honors, achievements, relevant coursework (optional)" value={edu.description} onChange={e => setEducation(p => p.map(x => x.id === edu.id ? { ...x, description: e.target.value } : x))} /></div>
                    </div>
                  </div>
                ))}
                <button onClick={() => setEducation(p => [...p, mkEdu()])} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-[#0A66C2] hover:text-[#0A66C2] flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Add Education
                </button>
              </div>
            </Section>
          )}

          {/* Skills */}
          {sections.skills && (
            <Section id="skills" title="Skills" icon={<Star className="w-5 h-5" />}>
              <div className="pt-4">
                <div className="flex flex-wrap gap-2 mb-3 min-h-[40px]">
                  {fd.skills.map(s => (
                    <span key={s} className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1 font-medium">
                      {s}<button onClick={() => removeSkill(s)} className="ml-1 hover:text-blue-600 text-blue-400">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input className={inp} placeholder="Type a skill and press Enter (e.g., React, Project Management...)" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addSkill(skillInput); }} />
                  <button onClick={() => addSkill(skillInput)} className="px-4 py-2 bg-[#0A66C2] text-white rounded-lg text-sm font-semibold hover:opacity-90"><Plus className="w-4 h-4" /></button>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-gray-400 mb-2">Quick add popular skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {["Python","JavaScript","TypeScript","React","Node.js","SQL","Excel","PowerPoint","Photoshop","Leadership","Communication","Project Management","Data Analysis","Machine Learning"].map(s => (
                      <button key={s} onClick={() => addSkill(s)} disabled={fd.skills.includes(s)} className="text-xs px-2 py-1 border border-gray-200 rounded-full hover:border-[#0A66C2] hover:text-[#0A66C2] disabled:opacity-30 disabled:cursor-not-allowed">{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            </Section>
          )}

          {/* Projects */}
          {sections.projects && (
            <Section id="projects" title="Projects" icon={<Code className="w-5 h-5" />}>
              <div className="pt-4 space-y-4">
                {projects.map(proj => (
                  <div key={proj.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex justify-end mb-2"><button onClick={() => setProjects(p => p.filter(x => x.id !== proj.id))} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button></div>
                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <input className={inp2} placeholder="Project Name" value={proj.name} onChange={e => setProjects(p => p.map(x => x.id === proj.id ? { ...x, name: e.target.value } : x))} />
                      <input className={inp2} placeholder="Project URL (optional)" value={proj.link} onChange={e => setProjects(p => p.map(x => x.id === proj.id ? { ...x, link: e.target.value } : x))} />
                      <div className="md:col-span-2"><input className={inp} placeholder="Technologies used (React, Python, AWS...)" value={proj.tech} onChange={e => setProjects(p => p.map(x => x.id === proj.id ? { ...x, tech: e.target.value } : x))} /></div>
                    </div>
                    <textarea className={inp + " h-20 resize-none"} placeholder="What problem did this solve? What was your role? What was the impact?" value={proj.description} onChange={e => setProjects(p => p.map(x => x.id === proj.id ? { ...x, description: e.target.value } : x))} />
                  </div>
                ))}
                <button onClick={() => setProjects(p => [...p, mkProj()])} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-[#0A66C2] hover:text-[#0A66C2] flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>
            </Section>
          )}

          {/* Languages */}
          {sections.languages && (
            <Section id="languages" title="Languages" icon={<Languages className="w-5 h-5" />}>
              <div className="pt-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {fd.languages.map(l => (
                    <span key={l} className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-1">
                      {l}<button onClick={() => removeLang(l)} className="ml-1 hover:text-purple-600">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input className={inp} placeholder="Language + level (e.g., Spanish – Fluent)" value={langInput} onChange={e => setLangInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addLang(langInput); }} />
                  <button onClick={() => addLang(langInput)} className="px-4 py-2 bg-[#0A66C2] text-white rounded-lg text-sm font-semibold hover:opacity-90"><Plus className="w-4 h-4" /></button>
                </div>
              </div>
            </Section>
          )}

          {/* Certifications */}
          {sections.certifications && (
            <Section id="certifications" title="Certifications & Licenses" icon={<Award className="w-5 h-5" />}>
              <div className="pt-4">
                <textarea className={inp + " h-24 resize-none"} placeholder="List certifications one per line:&#10;AWS Certified Solutions Architect (2024)&#10;Google Analytics Certified&#10;PMP – Project Management Professional" value={fd.certifications} onChange={e => setFd("certifications", e.target.value)} />
              </div>
            </Section>
          )}

          {/* Awards */}
          {sections.awards && (
            <Section id="awards" title="Awards & Honors" icon={<Star className="w-5 h-5" />}>
              <div className="pt-4 space-y-4">
                {awards.map((a, idx) => (
                  <div key={a.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold text-gray-500">Award {idx + 1}</span>
                      {awards.length > 1 && <button onClick={() => setAwards(p => p.filter(x => x.id !== a.id))} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <input className={inp2} placeholder="Award Title" value={a.title} onChange={e => setAwards(p => p.map(x => x.id === a.id ? { ...x, title: e.target.value } : x))} />
                      <input className={inp2} placeholder="Issuing Organization" value={a.issuer} onChange={e => setAwards(p => p.map(x => x.id === a.id ? { ...x, issuer: e.target.value } : x))} />
                      <input className={inp2} placeholder="Year" value={a.year} onChange={e => setAwards(p => p.map(x => x.id === a.id ? { ...x, year: e.target.value } : x))} />
                      <input className={inp2} placeholder="Brief description (optional)" value={a.description} onChange={e => setAwards(p => p.map(x => x.id === a.id ? { ...x, description: e.target.value } : x))} />
                    </div>
                  </div>
                ))}
                <button onClick={() => setAwards(p => [...p, mkAward()])} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-[#0A66C2] hover:text-[#0A66C2] flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Add Award
                </button>
              </div>
            </Section>
          )}

          {/* Volunteer */}
          {sections.volunteer && (
            <Section id="volunteer" title="Volunteer Experience" icon={<Heart className="w-5 h-5" />}>
              <div className="pt-4 space-y-4">
                {volunteer.map((v, idx) => (
                  <div key={v.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold text-gray-500">Volunteer {idx + 1}</span>
                      {volunteer.length > 1 && <button onClick={() => setVolunteer(p => p.filter(x => x.id !== v.id))} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <input className={inp2} placeholder="Role / Position" value={v.role} onChange={e => setVolunteer(p => p.map(x => x.id === v.id ? { ...x, role: e.target.value } : x))} />
                      <input className={inp2} placeholder="Organization" value={v.org} onChange={e => setVolunteer(p => p.map(x => x.id === v.id ? { ...x, org: e.target.value } : x))} />
                      <input className={inp2} placeholder="Duration (e.g., 2022 – 2023)" value={v.duration} onChange={e => setVolunteer(p => p.map(x => x.id === v.id ? { ...x, duration: e.target.value } : x))} />
                    </div>
                    <textarea className={inp + " h-16 resize-none"} placeholder="Describe your contribution..." value={v.description} onChange={e => setVolunteer(p => p.map(x => x.id === v.id ? { ...x, description: e.target.value } : x))} />
                  </div>
                ))}
                <button onClick={() => setVolunteer(p => [...p, mkVol()])} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-[#0A66C2] hover:text-[#0A66C2] flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Add Volunteer
                </button>
              </div>
            </Section>
          )}

          {/* References */}
          {sections.references && (
            <Section id="references" title="References" icon={<Sparkles className="w-5 h-5" />}>
              <div className="pt-4 space-y-4">
                {references.map((r, idx) => (
                  <div key={r.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold text-gray-500">Reference {idx + 1}</span>
                      {references.length > 1 && <button onClick={() => setReferences(p => p.filter(x => x.id !== r.id))} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <input className={inp2} placeholder="Full Name" value={r.name} onChange={e => setReferences(p => p.map(x => x.id === r.id ? { ...x, name: e.target.value } : x))} />
                      <input className={inp2} placeholder="Job Title" value={r.title} onChange={e => setReferences(p => p.map(x => x.id === r.id ? { ...x, title: e.target.value } : x))} />
                      <input className={inp2} placeholder="Company" value={r.company} onChange={e => setReferences(p => p.map(x => x.id === r.id ? { ...x, company: e.target.value } : x))} />
                      <input className={inp2} placeholder="Email" value={r.email} onChange={e => setReferences(p => p.map(x => x.id === r.id ? { ...x, email: e.target.value } : x))} />
                      <input className={inp2} placeholder="Phone (optional)" value={r.phone} onChange={e => setReferences(p => p.map(x => x.id === r.id ? { ...x, phone: e.target.value } : x))} />
                    </div>
                  </div>
                ))}
                <button onClick={() => setReferences(p => [...p, mkRef()])} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-[#0A66C2] hover:text-[#0A66C2] flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Add Reference
                </button>
              </div>
            </Section>
          )}

          {/* Download Actions */}
          {pdfError && <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">{pdfError}</p>}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Download Your CV</h3>
            <div className="flex gap-3">
              <button
                onClick={downloadPDF}
                disabled={pdfLoading}
                className="flex-1 py-4 bg-gradient-to-r from-[#0A66C2] to-[#057642] text-white rounded-xl font-bold hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-70 text-sm"
              >
                {pdfLoading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating PDF...</>
                ) : (
                  <><Download className="w-5 h-5" /> Download PDF — Free</>
                )}
              </button>
              <button
                onClick={copyText}
                className="px-5 py-4 border border-gray-200 rounded-xl font-medium flex items-center gap-2 hover:bg-gray-50 text-sm"
              >
                {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                {copied ? "Copied!" : "Copy Text"}
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">✓ No watermark · ✓ No account needed · ✓ Unlimited downloads</p>
          </div>
        </div>

        {/* ── RIGHT: Live Preview ── */}
        {showPreview && (
          <div className="sticky top-4 h-fit">
            <div className="bg-gray-100 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-sm">Live Preview</h3>
                <span className="text-xs text-gray-500">A4 · Scroll to see full CV</span>
              </div>
              <div className="overflow-auto max-h-[80vh] rounded-xl shadow-2xl bg-white">
                {renderCV()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Always-visible preview below on mobile */}
      {!showPreview && (
        <div className="mt-6 bg-gray-100 rounded-2xl p-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-sm">CV Preview</h3>
            <span className="text-xs text-gray-500">A4 size</span>
          </div>
          <div className="overflow-auto max-h-[600px] rounded-xl shadow-2xl">
            {renderCV()}
          </div>
        </div>
      )}
    </div>
  );
}

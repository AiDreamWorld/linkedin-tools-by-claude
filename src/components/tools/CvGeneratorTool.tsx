"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Download, Plus, Trash2, FileText, Briefcase, GraduationCap, Award, Languages, Sparkles, Eye, EyeOff, RefreshCw, Check, Copy } from "lucide-react";
// html2canvas and jsPDF are dynamically imported in downloadPDF to avoid SSR issues

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  current: boolean;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
  description: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

interface CVTemplate {
  id: string;
  name: string;
  description: string;
}

const templates: CVTemplate[] = [
  { id: "modern", name: "Modern", description: "Clean and professional with gradient accents" },
  { id: "classic", name: "Classic", description: "Traditional layout, elegant typography" },
  { id: "creative", name: "Creative", description: "Stand out with unique design elements" },
  { id: "minimal", name: "Minimal", description: "Simple and ATS-friendly" },
];

export default function CvGeneratorTool() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [activeTab, setActiveTab] = useState<"import" | "editor">("import");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [showTemplates, setShowTemplates] = useState(false);
  const [copied, setCopied] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: "",
    skills: [] as string[],
    languages: [] as string[],
    certifications: "" as string,
  });

  const [experience, setExperience] = useState<Experience[]>([
    { id: "1", company: "", role: "", duration: "", description: "", current: false },
  ]);

  const [education, setEducation] = useState<Education[]>([
    { id: "1", institution: "", degree: "", year: "", description: "" },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "", description: "", link: "" },
  ]);

  const [sections, setSections] = useState({
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: false,
    languages: false,
    certifications: false,
  });

  const sampleProfileData = {
    name: "Adil Mukhtar",
    title: "Full Stack Developer | React & Node.js Specialist",
    email: "adilmukhtar@example.com",
    phone: "+92 300 1234567",
    location: "Lahore, Pakistan",
    linkedin: "https://www.linkedin.com/in/adil-mukhtar-903262235/",
    website: "",
    summary: "Experienced Full Stack Developer with a passion for building scalable web applications. Skilled in React, Node.js, TypeScript, and cloud technologies. Looking for opportunities to contribute to innovative projects and grow with a dynamic team.",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL", "AWS", "Docker", "Git", "REST APIs", "GraphQL", "Tailwind CSS"],
    languages: ["English (Professional)", "Urdu (Native)"],
    certifications: "AWS Certified Developer Associate\nGoogle Cloud Platform Fundamentals",
  };

  const importFromLinkedIn = async () => {
    if (!linkedinUrl) return;
    
    setIsImporting(true);
    
    // Simulate API call - in production, this would call a backend service
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, use sample data
    // In production, this would scrape or use LinkedIn API
    setFormData({
      name: sampleProfileData.name,
      title: sampleProfileData.title,
      email: sampleProfileData.email,
      phone: sampleProfileData.phone,
      location: sampleProfileData.location,
      website: sampleProfileData.website,
      linkedin: sampleProfileData.linkedin,
      summary: sampleProfileData.summary,
      skills: sampleProfileData.skills,
      languages: sampleProfileData.languages,
      certifications: sampleProfileData.certifications,
    });

    setExperience([
      { id: "1", company: "Tech Company", role: "Full Stack Developer", duration: "2023 - Present", description: "• Developed scalable web applications using React and Node.js\n• Led team of 4 developers\n• Improved system performance by 40%", current: true },
      { id: "2", company: "Startup Inc", role: "Frontend Developer", duration: "2021 - 2023", description: "• Built responsive UI components\n• Implemented CI/CD pipelines\n• Reduced load time by 60%", current: false },
    ]);

    setEducation([
      { id: "1", institution: "University of Lahore", degree: "BS Computer Science", year: "2017 - 2021", description: "Graduated with Honors" },
    ]);

    setActiveTab("editor");
    setIsImporting(false);
  };

  const addExperience = () => {
    setExperience([...experience, { id: Date.now().toString(), company: "", role: "", duration: "", description: "", current: false }]);
  };

  const removeExperience = (id: string) => {
    if (experience.length > 1) {
      setExperience(experience.filter(exp => exp.id !== id));
    }
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperience(experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const addEducation = () => {
    setEducation([...education, { id: Date.now().toString(), institution: "", degree: "", year: "", description: "" }]);
  };

  const removeEducation = (id: string) => {
    if (education.length > 1) {
      setEducation(education.filter(edu => edu.id !== id));
    }
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  const addProject = () => {
    setProjects([...projects, { id: Date.now().toString(), name: "", description: "", link: "" }]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(proj => proj.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(projects.map(proj => proj.id === id ? { ...proj, [field]: value } : proj));
  };

  const toggleSection = (section: keyof typeof sections) => {
    setSections({ ...sections, [section]: !sections[section] });
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const addLanguage = (lang: string) => {
    if (lang && !formData.languages.includes(lang)) {
      setFormData({ ...formData, languages: [...formData.languages, lang] });
    }
  };

  const removeLanguage = (lang: string) => {
    setFormData({ ...formData, languages: formData.languages.filter(l => l !== lang) });
  };

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState("");

  const downloadPDF = async () => {
    if (!cvRef.current) return;
    setPdfLoading(true);
    setPdfError("");
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
        imageTimeout: 0,
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();   // 210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm
      const imgHeightMm = (canvas.height * pdfWidth) / canvas.width;

      // Multi-page support: slice image across A4 pages
      let yOffset = 0;
      let remainingHeight = imgHeightMm;
      let pageNum = 0;

      while (remainingHeight > 0) {
        if (pageNum > 0) pdf.addPage();
        // How many mm of image fit on this page
        const sliceHeight = Math.min(remainingHeight, pdfHeight);
        // Convert mm slice to canvas pixel coordinates
        const srcY = (yOffset / imgHeightMm) * canvas.height;
        const srcH = (sliceHeight / imgHeightMm) * canvas.height;

        // Create a slice canvas
        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = srcH;
        const ctx = sliceCanvas.getContext("2d")!;
        ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH);

        pdf.addImage(sliceCanvas.toDataURL("image/png", 1.0), "PNG", 0, 0, pdfWidth, sliceHeight);
        yOffset += sliceHeight;
        remainingHeight -= sliceHeight;
        pageNum++;
      }

      const filename = `${(formData.name || "cv").replace(/\s+/g, "-").toLowerCase()}-resume.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error("PDF export error:", err);
      setPdfError("PDF export failed. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  };

  const copyToClipboard = () => {
    const text = `${formData.name}\n${formData.title}\n\n${formData.summary}\n\nExperience:\n${experience.map(e => `${e.role} at ${e.company} (${e.duration})\n${e.description}`).join("\n\n")}\n\nEducation:\n${education.map(e => `${e.degree} at ${e.institution} (${e.year})`).join("\n\n")}\n\nSkills: ${formData.skills.join(", ")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderTemplate = () => {
    const templateStyles: Record<string, React.CSSProperties> = {
      modern: { background: "linear-gradient(135deg, #0A66C2 0%, #057642 100%)" },
      classic: { background: "#ffffff", borderLeft: "4px solid #0A66C2" },
      creative: { background: "linear-gradient(180deg, #fdf4ff 0%, #fff 100%)", borderTop: "4px solid #db2777" },
      minimal: { background: "#ffffff" },
    };

    return (
      <div 
        ref={cvRef}
        className="w-full bg-white shadow-2xl"
        style={{ minHeight: "297mm", padding: "40px", ...templateStyles[selectedTemplate] }}
      >
        {/* Header */}
        <div className={`
          ${selectedTemplate === "modern" ? "bg-gradient-to-r from-[#0A66C2] to-[#057642] -mx-40 -mt-40 px-40 pt-40 pb-8 mb-8" : ""}
          ${selectedTemplate === "classic" ? "border-b-2 border-gray-200 pb-6 mb-6" : ""}
          ${selectedTemplate === "creative" ? "border-b-4 border-pink-500 pb-6 mb-6" : ""}
          ${selectedTemplate === "minimal" ? "pb-4 mb-4" : ""}
        `}>
          {selectedTemplate !== "modern" && (
            <h1 className={`text-4xl font-bold ${selectedTemplate === "creative" ? "text-pink-600" : "text-gray-900"}`}>
              {formData.name || "Your Name"}
            </h1>
          )}
          {selectedTemplate === "modern" && (
            <h1 className="text-4xl font-bold text-white">{formData.name || "Your Name"}</h1>
          )}
          
          {formData.title && (
            <p className={`text-xl mt-2 ${selectedTemplate === "modern" ? "text-blue-100" : "text-gray-600"}`}>
              {formData.title}
            </p>
          )}

          <div className={`flex flex-wrap gap-4 mt-4 ${selectedTemplate === "modern" ? "text-blue-100" : "text-gray-600"}`}>
            {formData.email && <span>{formData.email}</span>}
            {formData.phone && <span>• {formData.phone}</span>}
            {formData.location && <span>• {formData.location}</span>}
            {formData.linkedin && <span>• LinkedIn</span>}
            {formData.website && <span>• Website</span>}
          </div>
        </div>

        {/* Summary */}
        {sections.summary && formData.summary && (
          <div className="mb-6">
            <h2 className={`text-lg font-bold uppercase tracking-wider mb-3 ${selectedTemplate === "modern" ? "text-[#0A66C2]" : selectedTemplate === "creative" ? "text-pink-600" : "text-gray-800"}`}>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{formData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {sections.experience && experience.some(e => e.company || e.role) && (
          <div className="mb-6">
            <h2 className={`text-lg font-bold uppercase tracking-wider mb-3 ${selectedTemplate === "modern" ? "text-[#0A66C2]" : selectedTemplate === "creative" ? "text-pink-600" : "text-gray-800"}`}>
              Work Experience
            </h2>
            {experience.filter(e => e.company || e.role).map((exp, idx) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.role || "Role"}</h3>
                    <p className="text-gray-600">{exp.company || "Company"}</p>
                  </div>
                  <span className="text-sm text-gray-500">{exp.duration || "Duration"}</span>
                </div>
                {exp.description && (
                  <p className="text-gray-700 mt-2 text-sm whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {sections.education && education.some(e => e.institution || e.degree) && (
          <div className="mb-6">
            <h2 className={`text-lg font-bold uppercase tracking-wider mb-3 ${selectedTemplate === "modern" ? "text-[#0A66C2]" : selectedTemplate === "creative" ? "text-pink-600" : "text-gray-800"}`}>
              Education
            </h2>
            {education.filter(e => e.institution || e.degree).map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree || "Degree"}</h3>
                    <p className="text-gray-600">{edu.institution || "Institution"}</p>
                  </div>
                  <span className="text-sm text-gray-500">{edu.year || "Year"}</span>
                </div>
                {edu.description && <p className="text-gray-700 text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {sections.skills && formData.skills.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-lg font-bold uppercase tracking-wider mb-3 ${selectedTemplate === "modern" ? "text-[#0A66C2]" : selectedTemplate === "creative" ? "text-pink-600" : "text-gray-800"}`}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, idx) => (
                <span 
                  key={idx}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTemplate === "modern" 
                      ? "bg-blue-100 text-blue-800" 
                      : selectedTemplate === "creative"
                      ? "bg-pink-100 text-pink-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {sections.projects && projects.some(p => p.name) && (
          <div className="mb-6">
            <h2 className={`text-lg font-bold uppercase tracking-wider mb-3 ${selectedTemplate === "modern" ? "text-[#0A66C2]" : selectedTemplate === "creative" ? "text-pink-600" : "text-gray-800"}`}>
              Projects
            </h2>
            {projects.filter(p => p.name).map((proj) => (
              <div key={proj.id} className="mb-3">
                <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                {proj.description && <p className="text-gray-700 text-sm mt-1">{proj.description}</p>}
                {proj.link && <a href={proj.link} className="text-blue-600 text-sm">View Project →</a>}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {sections.languages && formData.languages.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-lg font-bold uppercase tracking-wider mb-3 ${selectedTemplate === "modern" ? "text-[#0A66C2]" : selectedTemplate === "creative" ? "text-pink-600" : "text-gray-800"}`}>
              Languages
            </h2>
            <div className="flex flex-wrap gap-4">
              {formData.languages.map((lang, idx) => (
                <span key={idx} className="text-gray-700">{lang}</span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {sections.certifications && formData.certifications && (
          <div className="mb-6">
            <h2 className={`text-lg font-bold uppercase tracking-wider mb-3 ${selectedTemplate === "modern" ? "text-[#0A66C2]" : selectedTemplate === "creative" ? "text-pink-600" : "text-gray-800"}`}>
              Certifications
            </h2>
            <p className="text-gray-700 whitespace-pre-line">{formData.certifications}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Import Tab */}
      <AnimatePresence>
        {activeTab === "import" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Linkedin className="w-6 h-6 text-[#0A66C2]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Import from LinkedIn</h2>
                <p className="text-gray-500 text-sm">Enter your LinkedIn profile URL to auto-fill your CV</p>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://www.linkedin.com/in/yourprofile/"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={importFromLinkedIn}
                disabled={!linkedinUrl || isImporting}
                className="px-6 py-3 bg-gradient-to-r from-[#0A66C2] to-[#057642] text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isImporting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Import
                  </>
                )}
              </button>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This will import sample data for demonstration. In production, this would connect to LinkedIn's API to fetch your profile information automatically.
              </p>
            </div>

            <button
              onClick={() => setActiveTab("editor")}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
            >
              Or fill in manually →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editor Tab */}
      <AnimatePresence>
        {activeTab === "editor" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Template Selector */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  CV Template
                </h3>
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="text-[#0A66C2] font-medium text-sm hover:underline"
                >
                  {showTemplates ? "Hide Templates" : "Change Template"}
                </button>
              </div>
              
              {showTemplates && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedTemplate === template.id
                          ? "border-[#0A66C2] bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <p className="font-semibold text-gray-900">{template.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Section Toggles */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Sections</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(sections).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => toggleSection(key as keyof typeof sections)}
                    className={`p-3 rounded-lg border flex items-center justify-between gap-2 transition-all ${
                      value
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 text-gray-500"
                    }`}
                  >
                    <span className="text-sm font-medium capitalize">{key}</span>
                    {value ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Basic Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="New York, USA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://www.linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            {sections.summary && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Professional Summary</h3>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Write a brief summary of your professional background..."
                />
              </div>
            )}

            {/* Experience */}
            {sections.experience && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Work Experience
                  </h3>
                  <button
                    onClick={addExperience}
                    className="flex items-center gap-1 text-sm text-[#0A66C2] font-medium hover:underline"
                  >
                    <Plus className="w-4 h-4" /> Add Experience
                  </button>
                </div>
                {experience.map((exp, idx) => (
                  <div key={exp.id} className="p-4 bg-gray-50 rounded-xl mb-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">Position {idx + 1}</span>
                        {exp.current && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Current</span>
                        )}
                      </div>
                      {experience.length > 1 && (
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        placeholder="Job Title"
                      />
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        placeholder="Company Name"
                      />
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        placeholder="Jan 2020 - Present"
                      />
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        I currently work here
                      </label>
                    </div>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      placeholder="Describe your responsibilities and achievements..."
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {sections.education && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Education
                  </h3>
                  <button
                    onClick={addEducation}
                    className="flex items-center gap-1 text-sm text-[#0A66C2] font-medium hover:underline"
                  >
                    <Plus className="w-4 h-4" /> Add Education
                  </button>
                </div>
                {education.map((edu, idx) => (
                  <div key={edu.id} className="p-4 bg-gray-50 rounded-xl mb-4">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-medium text-gray-500">Education {idx + 1}</span>
                      {education.length > 1 && (
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        placeholder="Degree / Certificate"
                      />
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        placeholder="Institution Name"
                      />
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        placeholder="2017 - 2021"
                      />
                      <input
                        type="text"
                        value={edu.description}
                        onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        placeholder="Additional details (optional)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {sections.skills && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
                    >
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-blue-600">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="skillInput"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm"
                    placeholder="Add a skill and press Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addSkill((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = "";
                      }
                    }}
                  />
                </div>
              </div>
            )}

            {/* Projects */}
            {sections.projects && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Projects</h3>
                  <button
                    onClick={addProject}
                    className="flex items-center gap-1 text-sm text-[#0A66C2] font-medium hover:underline"
                  >
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                </div>
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 bg-gray-50 rounded-xl mb-4">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-medium text-gray-500">Project</span>
                      <button onClick={() => removeProject(proj.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        placeholder="Project Name"
                      />
                      <input
                        type="url"
                        value={proj.link}
                        onChange={(e) => updateProject(proj.id, "link", e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        placeholder="Project URL"
                      />
                    </div>
                    <textarea
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      placeholder="Project description..."
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Languages */}
            {sections.languages && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Languages className="w-5 h-5" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-1"
                    >
                      {lang}
                      <button onClick={() => removeLanguage(lang)} className="hover:text-purple-600">×</button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
                  placeholder="Add a language and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addLanguage((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }}
                />
              </div>
            )}

            {/* Certifications */}
            {sections.certifications && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certifications
                </h3>
                <textarea
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  placeholder="List your certifications (one per line)..."
                />
              </div>
            )}

            {/* Action Buttons */}
            {pdfError && <p className="text-red-500 text-sm text-center">{pdfError}</p>}
            <div className="flex gap-3">
              <button
                onClick={downloadPDF}
                disabled={pdfLoading}
                className="flex-1 py-4 bg-gradient-to-r from-[#0A66C2] to-[#057642] text-white rounded-xl font-semibold hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {pdfLoading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating PDF...</>
                ) : (
                  <><Download className="w-5 h-5" /> Download PDF</>
                )}
              </button>
              <button
                onClick={copyToClipboard}
                className="px-6 py-4 border border-gray-200 rounded-xl font-medium flex items-center gap-2 hover:bg-gray-50"
              >
                {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Live Preview */}
            <div className="bg-gray-100 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Live Preview</h3>
                <span className="text-sm text-gray-500">A4 Size</span>
              </div>
              <div className="overflow-auto max-h-[600px]">
                {renderTemplate()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

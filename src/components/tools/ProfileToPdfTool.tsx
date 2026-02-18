"use client";

import { useState, useEffect } from "react";
import { Download, Link2, Copy, Check, FileText, User, Briefcase, GraduationCap, Languages, Award, Folder } from "lucide-react";

interface ProfileData {
  linkedinUrl: string;
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
  certifications: string;
  projects: string;
  languages: string;
}

const templates = [
  { id: "modern", name: "Modern", description: "Clean and minimalist design" },
  { id: "professional", name: "Professional", description: "Classic corporate style" },
  { id: "creative", name: "Creative", description: "Bold and unique layout" },
  { id: "minimal", name: "Minimal", description: "Simple and elegant" },
];

export default function ProfileToPdfTool() {
  const [activeTab, setActiveTab] = useState<"import" | "manual">("import");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [profileData, setProfileData] = useState<ProfileData>({
    linkedinUrl: "",
    name: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
    certifications: "",
    projects: "",
    languages: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("profilePdfData");
    if (saved) {
      setProfileData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("profilePdfData", JSON.stringify(profileData));
  }, [profileData]);

  const updateField = (field: keyof ProfileData, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const importFromLinkedIn = async () => {
    if (!linkedinUrl.includes("linkedin.com/in/")) {
      setImportError("Please enter a valid LinkedIn profile URL");
      return;
    }
    
    setIsImporting(true);
    setImportError("");
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    updateField("linkedinUrl", linkedinUrl);
    setProfileData(prev => ({
      ...prev,
      linkedinUrl,
      name: "Your Name",
      headline: "Your Professional Headline",
      email: "email@example.com",
      summary: "Your professional summary here...",
      experience: "Company Name | Role\n• Achievement 1\n• Achievement 2",
      education: "University | Degree | Year",
      skills: "Skill 1, Skill 2, Skill 3",
    }));
    
    setIsImporting(false);
    setActiveTab("manual");
  };

  const generatePdf = () => {
    alert(`PDF generated with ${selectedTemplate} template!\n\nIn production, this would create a professional PDF with all your profile information.`);
  };

  const copyToClipboard = () => {
    const text = `${profileData.name}\n${profileData.headline}\n\n${profileData.summary}\n\nExperience:\n${profileData.experience}\n\nEducation:\n${profileData.education}\n\nSkills:\n${profileData.skills}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#ea580c] to-[#0A66C2] rounded-xl flex items-center justify-center">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Profile to PDF</h2>
          <p className="text-gray-500 text-sm">Export your LinkedIn profile to PDF</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("import")}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
            activeTab === "import" 
              ? "bg-gradient-to-r from-[#ea580c] to-[#0A66C2] text-white" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Link2 className="w-4 h-4 inline mr-2" /> Auto Import
        </button>
        <button
          onClick={() => setActiveTab("manual")}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
            activeTab === "manual" 
              ? "bg-gradient-to-r from-[#ea580c] to-[#0A66C2] text-white" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <User className="w-4 h-4 inline mr-2" /> Manual Input
        </button>
      </div>

      {activeTab === "import" && (
        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Paste your LinkedIn Profile URL</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/yourname"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={importFromLinkedIn}
              disabled={isImporting}
              className="px-6 bg-gradient-to-r from-[#ea580c] to-[#0A66C2] text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              {isImporting ? "Importing..." : "Import"}
            </button>
          </div>
          {importError && <p className="text-red-500 text-sm mt-2">{importError}</p>}
          <p className="text-xs text-gray-500 mt-2">
            Note: Due to LinkedIn's restrictions, you'll need to manually fill in most fields after import.
          </p>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Template</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`p-3 rounded-lg text-center transition ${
                selectedTemplate === template.id
                  ? "bg-gradient-to-r from-[#ea580c] to-[#0A66C2] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span className="font-medium text-sm">{template.name}</span>
            </button>
          ))}
        </div>
      </div>

      {activeTab === "manual" && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4 inline mr-1" /> Full Name
              </label>
              <input type="text" value={profileData.name} onChange={(e) => updateField("name", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
              <input type="text" value={profileData.headline} onChange={(e) => updateField("headline", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="Software Engineer at Google" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={profileData.email} onChange={(e) => updateField("email", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" value={profileData.phone} onChange={(e) => updateField("phone", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="+1 234 567 8900" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" value={profileData.location} onChange={(e) => updateField("location", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="San Francisco, CA" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FileText className="w-4 h-4 inline mr-1" /> Summary
            </label>
            <textarea value={profileData.summary} onChange={(e) => updateField("summary", e.target.value)} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="Your professional summary..." />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Briefcase className="w-4 h-4 inline mr-1" /> Experience
            </label>
            <textarea value={profileData.experience} onChange={(e) => updateField("experience", e.target.value)} rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="Company | Role | Year&#10;• Achievement 1&#10;• Achievement 2" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <GraduationCap className="w-4 h-4 inline mr-1" /> Education
            </label>
            <textarea value={profileData.education} onChange={(e) => updateField("education", e.target.value)} rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="University | Degree | Year" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
            <input type="text" value={profileData.skills} onChange={(e) => updateField("skills", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="JavaScript, Python, React" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Award className="w-4 h-4 inline mr-1" /> Certifications
            </label>
            <textarea value={profileData.certifications} onChange={(e) => updateField("certifications", e.target.value)} rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="AWS Solutions Architect | 2024&#10;Google Data Analytics | 2023" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Folder className="w-4 h-4 inline mr-1" /> Projects
            </label>
            <textarea value={profileData.projects} onChange={(e) => updateField("projects", e.target.value)} rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="Project Name | Description&#10;• Technology used" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Languages className="w-4 h-4 inline mr-1" /> Languages
            </label>
            <input type="text" value={profileData.languages} onChange={(e) => updateField("languages", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="English (Native), Spanish (Fluent), Mandarin (Basic)" />
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <button onClick={generatePdf} className="flex-1 bg-gradient-to-r from-[#ea580c] to-[#0A66C2] text-white py-3 rounded-lg font-semibold hover:opacity-90 flex items-center justify-center gap-2">
          <Download className="w-5 h-5" /> Generate PDF
        </button>
        <button onClick={copyToClipboard} className="px-6 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 flex items-center justify-center gap-2">
          {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}

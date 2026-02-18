"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Linkedin, Scan, CheckCircle, XCircle, Star, Sparkles, Download, ExternalLink, RefreshCw,
  MapPin, Briefcase, GraduationCap, Award, Users, Eye, MessageSquare, TrendingUp
} from "lucide-react";

interface ProfileData {
  name: string;
  headline: string;
  location: string;
  about: string;
  experiences: { title: string; company: string; duration: string; description: string }[];
  education: { school: string; degree: string; year: string }[];
  skills: string[];
  languages: string[];
  connections: string;
  profileViews: string;
  postImpressions: string;
}

export default function ProfileAnalyzerTool() {
  const [profileUrl, setProfileUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [scores, setScores] = useState<any[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [error, setError] = useState("");
  
  // Manual input mode
  const [inputMode, setInputMode] = useState<"url" | "manual">("manual");
  const [formData, setFormData] = useState({
    name: "", headline: "", location: "", about: "",
    exp1Title: "", exp1Company: "", exp1Duration: "", exp1Desc: "",
    exp2Title: "", exp2Company: "", exp2Duration: "", exp2Desc: "",
    school: "", degree: "", year: "",
    skills: ""
  });

  const analyzeProfile = async () => {
    setIsScanning(true);
    setScanComplete(false);
    setError("");
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Use manual input data
    const data: ProfileData = {
      name: formData.name || "Your Name",
      headline: formData.headline || "Your Headline",
      location: formData.location || "Location",
      about: formData.about || "Your about section...",
      experiences: [
        { title: formData.exp1Title || "Position", company: formData.exp1Company || "Company", duration: formData.exp1Duration || "Duration", description: formData.exp1Desc || "" },
        formData.exp2Title ? { title: formData.exp2Title, company: formData.exp2Company || "", duration: formData.exp2Duration || "", description: formData.exp2Desc || "" } : { title: "", company: "", duration: "", description: "" }
      ].filter(e => e.title),
      education: formData.school ? [{ school: formData.school, degree: formData.degree || "Degree", year: formData.year || "Year" }] : [],
      skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(s => s) : [],
      languages: [],
      connections: "500+",
      profileViews: "100+",
      postImpressions: "500+"
    };
    
    setProfileData(data);
    
    const categories = [
      { name: "Headline", score: calculateHeadlineScore(data.headline), tips: getHeadlineTips(data.headline), icon: <Star className="w-4 h-4" /> },
      { name: "About", score: calculateAboutScore(data.about), tips: getAboutTips(data.about), icon: <MessageSquare className="w-4 h-4" /> },
      { name: "Experience", score: calculateExperienceScore(data.experiences), tips: getExperienceTips(data.experiences), icon: <Briefcase className="w-4 h-4" /> },
      { name: "Skills", score: calculateSkillsScore(data.skills), tips: getSkillsTips(data.skills), icon: <Award className="w-4 h-4" /> },
      { name: "Engagement", score: 50, tips: ["Post regularly", "Engage with content"], icon: <TrendingUp className="w-4 h-4" /> },
    ];
    
    setScores(categories);
    setOverallScore(Math.round(categories.reduce((acc: number, cat: any) => acc + cat.score, 0) / categories.length));
    
    setIsScanning(false);
    setScanComplete(true);
  };

  const calculateHeadlineScore = (headline: string): number => {
    if (!headline) return 0;
    let score = 0;
    if (headline.length >= 50) score += 30;
    else if (headline.length >= 30) score += 20;
    if (/developer|engineer|manager/i.test(headline)) score += 30;
    if (/react|node|python|aws/i.test(headline)) score += 25;
    if (/helping|building|passionate/i.test(headline)) score += 15;
    return Math.min(100, score);
  };

  const calculateAboutScore = (about: string): number => {
    if (!about) return 0;
    let score = 0;
    if (about.length >= 300) score += 35;
    else if (about.length >= 200) score += 25;
    if (/passion|journey/i.test(about)) score += 20;
    if (/achieved|led|managed/i.test(about)) score += 25;
    if (/looking|seeking|goal/i.test(about)) score += 20;
    return Math.min(100, score);
  };

  const calculateExperienceScore = (experiences: any[]): number => {
    if (!experiences?.length) return 5;
    let score = experiences.length >= 2 ? 40 : 20;
    const hasDesc = experiences.some(e => e.description?.length > 30);
    if (hasDesc) score += 35;
    const hasNumbers = experiences.some(e => e.description && /\d+/.test(e.description));
    if (hasNumbers) score += 25;
    return Math.min(100, score);
  };

  const calculateSkillsScore = (skills: string[]): number => {
    if (!skills?.length) return 5;
    let score = skills.length >= 10 ? 40 : skills.length >= 5 ? 25 : 10;
    if (/react|node|python|aws/i.test(skills.join(' '))) score += 35;
    if (/leadership|communication/i.test(skills.join(' '))) score += 25;
    return Math.min(100, score);
  };

  const getHeadlineTips = (headline: string): string[] => {
    const tips = [];
    if (headline.length < 50) tips.push("Make headline 50+ characters");
    if (!/developer|engineer/i.test(headline)) tips.push("Include job title");
    if (!/react|node|python|aws/i.test(headline)) tips.push("Add key skills");
    return tips.length ? tips : ["Great headline!"];
  };

  const getAboutTips = (about: string): string[] => {
    const tips = [];
    if (about.length < 200) tips.push("Expand to 200+ characters");
    if (!/passion|journey/i.test(about)) tips.push("Share your story");
    if (!/achieved|led/i.test(about)) tips.push("Add achievements");
    return tips.length ? tips : ["Excellent!"];
  };

  const getExperienceTips = (experiences: any[]): string[] => {
    const tips = [];
    if (experiences.length < 2) tips.push("Add more positions");
    const hasDesc = experiences.some(e => e.description?.length > 30);
    if (!hasDesc) tips.push("Add role descriptions");
    return tips.length ? tips : ["Great!"];
  };

  const getSkillsTips = (skills: string[]): string[] => {
    if (skills.length >= 10) return ["Great skills!"];
    return ["Add more skills (10+)"];
  };

  const getStatus = (score: number) => score >= 70 ? "excellent" : score >= 50 ? "good" : "needswork";
  const getScoreColor = (s: string) => s === "excellent" ? "text-green-600" : s === "good" ? "text-yellow-600" : "text-orange-600";
  const getScoreBg = (s: string) => s === "excellent" ? "from-green-500" : s === "good" ? "from-yellow-500" : "from-orange-500";

  const downloadReport = () => {
    if (!profileData) return;
    const report = `LINKEDIN PROFILE ANALYSIS
====================
Profile: ${profileData.name}
Score: ${overallScore}/100

CATEGORIES:
${scores.map((s: any) => `${s.name}: ${s.score}/100`).join('\n')}

PROFILE:
${profileData.headline}
${profileData.about}

EXPERIENCE:
${profileData.experiences.map(e => `${e.title} at ${e.company}`).join('\n')}

SKILLS: ${profileData.skills.join(', ')}`;
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'linkedin-analysis.txt';
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-[#0A66C2] to-[#004182] rounded-lg flex items-center justify-center">
            <Linkedin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">LinkedIn Profile Analyzer</h2>
            <p className="text-gray-500 text-sm">Enter your profile details below</p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => setInputMode("manual")} 
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${inputMode === "manual" ? "bg-[#0A66C2] text-white" : "bg-gray-100 text-gray-600"}`}>
            Fill Details
          </button>
        </div>

        {/* Manual Input Form */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                placeholder="e.g., John Smith" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all text-gray-900 placeholder-gray-400" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Headline <span className="text-red-500">*</span></label>
              <input type="text" value={formData.headline} onChange={(e) => setFormData({...formData, headline: e.target.value})} 
                placeholder="e.g., Full Stack Developer | React & Node.js" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all text-gray-900 placeholder-gray-400" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location</label>
            <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} 
              placeholder="e.g., Lahore, Pakistan" 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all text-gray-900 placeholder-gray-400" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">About Section <span className="text-red-500">*</span></label>
            <textarea value={formData.about} onChange={(e) => setFormData({...formData, about: e.target.value})} 
              placeholder="Copy and paste your About section from LinkedIn..." 
              rows={5} 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all text-gray-900 placeholder-gray-400 resize-none" />
            <p className="text-xs text-gray-500 mt-1">{formData.about.length} characters</p>
          </div>
          
          {/* Experience 1 */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-[#0A66C2] rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
              <h4 className="font-semibold text-gray-900 text-sm">Experience</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input type="text" value={formData.exp1Title} onChange={(e) => setFormData({...formData, exp1Title: e.target.value})} 
                placeholder="Job Title *" className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent" />
              <input type="text" value={formData.exp1Company} onChange={(e) => setFormData({...formData, exp1Company: e.target.value})} 
                placeholder="Company *" className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent" />
              <input type="text" value={formData.exp1Duration} onChange={(e) => setFormData({...formData, exp1Duration: e.target.value})} 
                placeholder="e.g., Jan 2023 - Present" className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent" />
              <input type="text" value={formData.exp1Desc} onChange={(e) => setFormData({...formData, exp1Desc: e.target.value})} 
                placeholder="Description & achievements" className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent" />
            </div>
          </div>
          
          {/* Experience 2 */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
              <h4 className="font-semibold text-gray-700 text-sm">Experience 2 <span className="text-gray-400 font-normal">(optional)</span></h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input type="text" value={formData.exp2Title} onChange={(e) => setFormData({...formData, exp2Title: e.target.value})} 
                placeholder="Job Title" className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent" />
              <input type="text" value={formData.exp2Company} onChange={(e) => setFormData({...formData, exp2Company: e.target.value})} 
                placeholder="Company" className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent" />
            </div>
          </div>
          
          {/* Education */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4 text-[#0A66C2]" />
              <h4 className="font-semibold text-gray-900 text-sm">Education</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="text" value={formData.school} onChange={(e) => setFormData({...formData, school: e.target.value})} 
                placeholder="University" className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent" />
              <input type="text" value={formData.degree} onChange={(e) => setFormData({...formData, degree: e.target.value})} 
                placeholder="Degree" className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent" />
              <input type="text" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} 
                placeholder="Year" className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent" />
            </div>
          </div>
          
          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Skills <span className="text-red-500">*</span></label>
            <textarea value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} 
              placeholder="JavaScript, React, Node.js, Python, AWS, Docker..." 
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all text-gray-900 placeholder-gray-400" />
            <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
          </div>
          
          <button onClick={analyzeProfile} disabled={!formData.name || !formData.headline || !formData.about || !formData.skills}
            className="w-full py-3.5 bg-gradient-to-r from-[#0A66C2] to-[#057642] text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all transform hover:scale-[1.01]">
            <Sparkles className="w-5 h-5" /> 
            Analyze My Profile
          </button>
          
          <p className="text-xs text-gray-500 text-center">* Required fields. For best results, copy directly from your LinkedIn profile.</p>
        </div>
          <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="Location" className="w-full px-3 py-2 border rounded-lg text-sm" />
          
          <textarea value={formData.about} onChange={(e) => setFormData({...formData, about: e.target.value})} placeholder="About Section (copy from LinkedIn) *" rows={4} className="w-full px-3 py-2 border rounded-lg text-sm" />
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs font-medium text-gray-700 mb-2">Experience 1</p>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" value={formData.exp1Title} onChange={(e) => setFormData({...formData, exp1Title: e.target.value})} placeholder="Job Title" className="px-2 py-1.5 border rounded text-sm" />
              <input type="text" value={formData.exp1Company} onChange={(e) => setFormData({...formData, exp1Company: e.target.value})} placeholder="Company" className="px-2 py-1.5 border rounded text-sm" />
              <input type="text" value={formData.exp1Duration} onChange={(e) => setFormData({...formData, exp1Duration: e.target.value})} placeholder="Duration" className="px-2 py-1.5 border rounded text-sm" />
              <input type="text" value={formData.exp1Desc} onChange={(e) => setFormData({...formData, exp1Desc: e.target.value})} placeholder="Description" className="px-2 py-1.5 border rounded text-sm" />
            </div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs font-medium text-gray-700 mb-2">Experience 2 (optional)</p>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" value={formData.exp2Title} onChange={(e) => setFormData({...formData, exp2Title: e.target.value})} placeholder="Job Title" className="px-2 py-1.5 border rounded text-sm" />
              <input type="text" value={formData.exp2Company} onChange={(e) => setFormData({...formData, exp2Company: e.target.value})} placeholder="Company" className="px-2 py-1.5 border rounded text-sm" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <input type="text" value={formData.school} onChange={(e) => setFormData({...formData, school: e.target.value})} placeholder="University" className="px-2 py-1.5 border rounded text-sm" />
            <input type="text" value={formData.degree} onChange={(e) => setFormData({...formData, degree: e.target.value})} placeholder="Degree" className="px-2 py-1.5 border rounded text-sm" />
            <input type="text" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} placeholder="Year" className="px-2 py-1.5 border rounded text-sm" />
          </div>
          
          <input type="text" value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} placeholder="Skills (comma separated) *" className="w-full px-3 py-2 border rounded-lg text-sm" />
          
          <button onClick={analyzeProfile} disabled={!formData.name || !formData.headline || !formData.about || !formData.skills}
            className="w-full py-3 bg-gradient-to-r from-[#0A66C2] to-[#004182] text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50">
            <Sparkles className="w-4 h-4" /> Analyze Profile
          </button>
          
          <p className="text-xs text-gray-500 text-center">* Required fields. For best results, copy directly from your LinkedIn profile.</p>
        </div>

      {/* Results */}
      <AnimatePresence>
        {scanComplete && profileData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Score */}
            <div className="bg-gradient-to-r from-[#0A66C2] to-[#004182] rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Overall Score</p>
                  <p className="text-4xl font-bold">{overallScore}<span className="text-xl opacity-70">/100</span></p>
                </div>
                <div className={`text-right ${overallScore >= 70 ? 'text-green-300' : overallScore >= 50 ? 'text-yellow-300' : 'text-red-300'}`}>
                  <p className="font-semibold">{overallScore >= 70 ? '✓ Good' : overallScore >= 50 ? '→ Fair' : '↑ Needs Work'}</p>
                </div>
              </div>
              <div className="mt-3 bg-white/20 rounded-full h-2">
                <div className={`h-2 rounded-full bg-gradient-to-r ${getScoreBg(getStatus(overallScore))}`} style={{ width: `${overallScore}%` }} />
              </div>
            </div>

            {/* Profile Preview */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="h-16 bg-gradient-to-r from-[#0A66C2] via-[#7c3aed] to-[#0A66C2]"></div>
              <div className="px-5 pb-4">
                <div className="flex justify-between items-end -mt-8 mb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded-full flex items-center justify-center text-white text-xl font-bold border-4 border-white">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <h1 className="text-xl font-bold text-gray-900">{profileData.name}</h1>
                <p className="text-gray-600 text-sm">{profileData.headline}</p>
                <p className="text-gray-400 text-xs mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> {profileData.location}</p>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">About</h3>
                  <p className="text-gray-600 text-sm">{profileData.about.substring(0, 250)}...</p>
                </div>
                
                {profileData.experiences.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">Experience</h3>
                    {profileData.experiences.map((exp, i) => (
                      <p key={i} className="text-gray-600 text-sm">{exp.title} at {exp.company}</p>
                    ))}
                  </div>
                )}
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">Skills ({profileData.skills.length})</h3>
                  <div className="flex flex-wrap gap-1">
                    {profileData.skills.slice(0, 8).map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Scores */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-900 text-sm">Score Breakdown</h3>
                <button onClick={downloadReport} className="text-xs text-[#0A66C2] font-medium">Export</button>
              </div>
              <div className="space-y-3">
                {scores.map((cat: any, i: number) => {
                  const status = getStatus(cat.score);
                  return (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-[#0A66C2]">{cat.icon}</div>
                        <span className="text-sm text-gray-700">{cat.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full bg-gradient-to-r ${getScoreBg(status)}`} style={{ width: `${cat.score}%` }} />
                        </div>
                        <span className={`text-sm font-bold ${getScoreColor(status)} w-8 text-right`}>{cat.score}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Improvements</h3>
              <div className="space-y-1">
                {scores.filter((s: any) => s.score < 70).slice(0, 3).map((cat: any, i: number) => (
                  <p key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                    <span><b>{cat.name}:</b> {cat.tips[0]}</span>
                  </p>
                ))}
                {scores.filter((s: any) => s.score >= 70).length > 0 && (
                  <p className="text-sm text-green-700 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Good: {scores.filter((s: any) => s.score >= 70).map((s: any) => s.name).join(', ')}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ThumbsUp, Copy, Check, Sparkles, Plus } from "lucide-react";

export default function EndorsementRequestTool() {
  const [formData, setFormData] = useState({ name: "", skill1: "", skill2: "", skill3: "" });
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState<"friendly" | "professional">("friendly");

  const generateRequest = () => {
    const skills = [formData.skill1, formData.skill2, formData.skill3].filter(s => s).join(", ");
    
    if (tone === "friendly") {
      setGenerated(`Hey ${formData.name || "there"}! 👋

Hope you're doing great! 

I know you're pretty busy, but I was wondering if you could endorse me for ${skills || "some skills"} on LinkedIn? It would really help boost my profile!

Of course, happy to endorse you back for any skills you think I can vouch for!

Thanks so much! 🙏`);
    } else {
      setGenerated(`Dear ${formData.name || "there"},

I hope this message finds you well. I would greatly appreciate it if you could endorse me for ${skills || "the following skills"} on LinkedIn. Your endorsement would be valuable to me.

Should you need any endorsements in return, I would be happy to reciprocate.

Thank you for your time and consideration.

Best regards`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tool-section">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#057642] rounded-xl flex items-center justify-center">
          <ThumbsUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Endorsement Request</h2>
          <p className="text-gray-500 text-sm">Ask for skill endorsements professionally</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="tool-label">Tone</label>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setTone("friendly")} className={`p-3 rounded-lg text-sm font-medium transition-all ${tone === "friendly" ? "bg-[#0A66C2] text-white" : "bg-gray-100 text-gray-600"}`}>Friendly</button>
          <button onClick={() => setTone("professional")} className={`p-3 rounded-lg text-sm font-medium transition-all ${tone === "professional" ? "bg-[#057642] text-white" : "bg-gray-100 text-gray-600"}`}>Professional</button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <label className="tool-label">Person's Name</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="tool-input" placeholder="John" />
        </div>
        <div>
          <label className="tool-label">Skills to Endorse (up to 3)</label>
          <div className="space-y-2">
            <input type="text" value={formData.skill1} onChange={(e) => setFormData({...formData, skill1: e.target.value})} className="tool-input" placeholder="Skill 1" />
            <input type="text" value={formData.skill2} onChange={(e) => setFormData({...formData, skill2: e.target.value})} className="tool-input" placeholder="Skill 2" />
            <input type="text" value={formData.skill3} onChange={(e) => setFormData({...formData, skill3: e.target.value})} className="tool-input" placeholder="Skill 3" />
          </div>
        </div>
      </div>

      <button onClick={generateRequest} className="tool-button-primary w-full mb-4">
        <Sparkles className="w-4 h-4" /> Generate Request
      </button>

      {generated && (
        <div className="tool-result">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-gray-800">Generated Message:</p>
            <button onClick={copyToClipboard} className="text-[#0A66C2] text-sm font-medium flex items-center gap-1">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-gray-700 whitespace-pre-line">{generated}</p>
        </div>
      )}
    </div>
  );
}

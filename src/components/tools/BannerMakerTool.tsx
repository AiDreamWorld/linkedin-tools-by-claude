"use client";

import { useState, useRef } from "react";
import { Download, Layout, Type, Image, Palette, Move } from "lucide-react";

const bannerTemplates = [
  { name: "Professional Blue", gradient: "from-[#0A66C2] to-[#004182]", colors: ["#0A66C2", "#004182"], text: "text-white", textColor: "#ffffff", accent: "white" },
  { name: "Purple Haze", gradient: "from-[#7c3aed] to-[#5b21b6]", colors: ["#7c3aed", "#5b21b6"], text: "text-white", textColor: "#ffffff", accent: "white" },
  { name: "Sunset Orange", gradient: "from-[#ea580c] to-[#c2410c]", colors: ["#ea580c", "#c2410c"], text: "text-white", textColor: "#ffffff", accent: "white" },
  { name: "Forest Green", gradient: "from-[#057642] to-[#065f46]", colors: ["#057642", "#065f46"], text: "text-white", textColor: "#ffffff", accent: "white" },
  { name: "Pink Dreams", gradient: "from-[#db2777] to-[#be185d]", colors: ["#db2777", "#be185d"], text: "text-white", textColor: "#ffffff", accent: "white" },
  { name: "Dark Mode", gradient: "from-[#1f2937] to-[#111827]", colors: ["#1f2937", "#111827"], text: "text-white", textColor: "#ffffff", accent: "white" },
  { name: "Light Clean", gradient: "from-[#f3f4f6] to-[#e5e7eb]", colors: ["#f3f4f6", "#e5e7eb"], text: "text-gray-900", textColor: "#111827", accent: "gray" },
  { name: "Tech Blue", gradient: "from-[#2563eb] to-[#1d4ed8]", colors: ["#2563eb", "#1d4ed8"], text: "text-white", textColor: "#ffffff", accent: "white" },
  { name: "Ocean", gradient: "from-[#06b6d4] to-[#0891b2]", colors: ["#06b6d4", "#0891b2"], text: "text-white", textColor: "#ffffff", accent: "white" },
  { name: "Gold", gradient: "from-[#f59e0b] to-[#d97706]", colors: ["#f59e0b", "#d97706"], text: "text-white", textColor: "#ffffff", accent: "white" },
  { name: "Ruby", gradient: "from-[#ef4444] to-[#dc2626]", colors: ["#ef4444", "#dc2626"], text: "text-white", textColor: "#ffffff", accent: "white" },
  { name: "Mint", gradient: "from-[#10b981] to-[#059669]", colors: ["#10b981", "#059669"], text: "text-white", textColor: "#ffffff", accent: "white" },
];

const layouts = [
  { id: "centered", name: "Centered", icon: "⊕" },
  { id: "left", name: "Left", icon: "◧" },
  { id: "right", name: "Right", icon: "◨" },
  { id: "split", name: "Split", icon: "⬒" },
];

export default function BannerMakerTool() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [selectedLayout, setSelectedLayout] = useState("centered");
  const [showIcon, setShowIcon] = useState(true);
  const [showTagline, setShowTagline] = useState(true);
  const [fontSize, setFontSize] = useState("medium");
  const bannerRef = useRef<HTMLDivElement>(null);

  const template = bannerTemplates[selectedTemplate];
  
  const getFontSize = () => {
    switch(fontSize) {
      case "small": return { name: "text-2xl", title: "text-lg" };
      case "large": return { name: "text-4xl", title: "text-2xl" };
      default: return { name: "text-3xl", title: "text-xl" };
    }
  };
  
  const fontSizes = getFontSize();

  const getLayoutClass = () => {
    switch(selectedLayout) {
      case "left": return "items-start justify-start text-left pl-12";
      case "right": return "items-end justify-end text-right pr-12";
      case "split": return "items-center justify-center";
      default: return "items-center justify-center text-center";
    }
  };

  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  const downloadBanner = async () => {
    if (!bannerRef.current) return;
    setDownloading(true);
    setDownloadError("");
    try {
      const html2canvas = (await import("html2canvas")).default;
      // LinkedIn banner recommended size: 1584 x 396px
      const previewWidth = bannerRef.current.offsetWidth;
      const targetWidth = 1584;
      const scale = targetWidth / previewWidth;
      const canvas = await html2canvas(bannerRef.current, {
        useCORS: true,
        allowTaint: true,
        scale: scale,
        backgroundColor: null,
        logging: false,
        imageTimeout: 0,
      });
      const link = document.createElement("a");
      link.download = `linkedin-banner-linkforge.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Banner download error:", err);
      setDownloadError("Download failed. Please try again or take a screenshot.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#7c3aed] to-[#0A66C2] rounded-xl flex items-center justify-center">
          <Image className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Banner Maker</h2>
          <p className="text-gray-500 text-sm">Create professional LinkedIn banners</p>
        </div>
      </div>

      <div className="space-y-6">
        <div
          ref={bannerRef}
          className={`w-full aspect-[4/1] rounded-xl flex ${getLayoutClass()} p-8 relative overflow-hidden`}
          style={{ background: `linear-gradient(to right, ${template.colors[0]}, ${template.colors[1]})` }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full translate-y-1/2 -translate-x-1/2"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          />

          <div className="relative z-10">
            {showIcon && (
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <svg className="w-10 h-10" style={{ color: template.textColor }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
            )}
            <h3
              className={`${fontSizes.name} font-bold mb-2`}
              style={{ color: template.textColor }}
            >
              {name || "Your Name"}
            </h3>
            <p
              className={`${fontSizes.title}`}
              style={{ color: template.textColor, opacity: 0.85 }}
            >
              {title || "Your Title"}
            </p>
            {showTagline && tagline && (
              <p
                className="text-sm mt-2"
                style={{ color: template.textColor, opacity: 0.65 }}
              >
                {tagline}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Title</label>
            <input type="text" placeholder="Software Engineer" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tagline (Optional)</label>
            <input type="text" placeholder="Helping professionals succeed" value={tagline} onChange={(e) => setTagline(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
            <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2"><Layout className="w-4 h-4 inline mr-1" /> Layout</label>
          <div className="grid grid-cols-4 gap-2">
            {layouts.map((layout) => (
              <button key={layout.id} onClick={() => setSelectedLayout(layout.id)} className={`py-2 px-3 rounded-lg text-sm font-medium ${selectedLayout === layout.id ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {layout.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={showIcon} onChange={(e) => setShowIcon(e.target.checked)} className="w-4 h-4 rounded text-purple-600" />
            Show LinkedIn Icon
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={showTagline} onChange={(e) => setShowTagline(e.target.checked)} className="w-4 h-4 rounded text-purple-600" />
            Show Tagline
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2"><Palette className="w-4 h-4 inline mr-1" /> Color Theme</label>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {bannerTemplates.map((t, i) => (
              <button key={i} onClick={() => setSelectedTemplate(i)} className={`w-full aspect-[4/1] rounded-lg bg-gradient-to-r ${t.gradient} ${selectedTemplate === i ? "ring-2 ring-offset-2 ring-purple-500" : ""}`} title={t.name} />
            ))}
          </div>
        </div>

        {downloadError && (
          <p className="text-red-500 text-sm text-center">{downloadError}</p>
        )}
        <button onClick={downloadBanner} disabled={downloading} className="w-full bg-gradient-to-r from-[#7c3aed] to-[#0A66C2] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-70">
          {downloading ? (
            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Downloading...</>
          ) : (
            <><Download className="w-5 h-5" /> Download Banner as PNG</>
          )}
        </button>
      </div>
    </div>
  );
}

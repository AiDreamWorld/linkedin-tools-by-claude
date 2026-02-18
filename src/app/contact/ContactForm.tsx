"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";

const subjects = [
  "General Question",
  "Bug Report",
  "Feature Request",
  "Tool Suggestion",
  "Feedback",
  "Partnership",
  "Other",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "General Question", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Build mailto link
    const body = encodeURIComponent(`Name: ${formData.name}\n\n${formData.message}`);
    const subject = encodeURIComponent(`[LinkForge] ${formData.subject}`);
    const mailtoUrl = `mailto:iamaaadil@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.open(mailtoUrl, "_blank");
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Ready!</h3>
        <p className="text-gray-600 mb-6">
          Your email client has opened with your message pre-filled. Just hit Send!
        </p>
        <p className="text-sm text-gray-500">
          If it didn't open,{" "}
          <a href="mailto:iamaaadil@gmail.com" className="text-[#0A66C2] underline">
            email us directly
          </a>
          .
        </p>
        <button
          onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "General Question", message: "" }); }}
          className="mt-6 px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent outline-none transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <select
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent outline-none transition-all bg-white"
          >
            {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent outline-none transition-all resize-none"
            placeholder="Tell us what's on your mind..."
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-70"
        >
          {loading ? (
            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Opening email client...</>
          ) : (
            <><Send className="w-5 h-5" />Send Message</>
          )}
        </button>
      </form>
    </div>
  );
}

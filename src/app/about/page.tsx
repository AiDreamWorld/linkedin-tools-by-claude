import type { Metadata } from "next";
import Link from "next/link";
import { Users, Zap, Shield, Heart, CheckCircle, ArrowRight, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "About LinkForge – Free LinkedIn Tools for Professionals",
  description: "Learn about LinkForge – a free platform with 40+ LinkedIn tools built to help students and professionals optimize their profiles, create content, and grow their careers.",
};

const features = [
  { icon: "🆓", title: "Always Free", description: "Every single tool is 100% free to use. No paywalls, no subscriptions, no credit card required." },
  { icon: "🔒", title: "Privacy First", description: "All your data stays in your browser. We don't store your information on any server." },
  { icon: "⚡", title: "Instant Results", description: "Get results in seconds. No waiting, no loading screens, no sign-up required." },
  { icon: "🎯", title: "Built for LinkedIn", description: "Every tool is specifically designed and optimized for LinkedIn's formats and best practices." },
];

const toolCategories = [
  { emoji: "👤", name: "Profile Tools", count: 10, desc: "Optimize your headline, about section, and overall profile" },
  { emoji: "✍️", name: "Content Tools", count: 13, desc: "Create engaging posts, hooks, captions, and hashtags" },
  { emoji: "📨", name: "Outreach Tools", count: 8, desc: "Write connection requests, messages, and InMails" },
  { emoji: "💼", name: "Career Tools", count: 7, desc: "Track jobs, generate CVs, and prepare for interviews" },
  { emoji: "🎨", name: "Visual Tools", count: 2, desc: "Design banners and visual content for your profile" },
];

const steps = [
  { step: "1", title: "Choose a Tool", description: "Browse our 40+ free tools organized by category. Find exactly what you need." },
  { step: "2", title: "Fill in Your Details", description: "Enter your information or preferences. Our tools adapt to your specific situation." },
  { step: "3", title: "Get Instant Results", description: "Click generate and get professional results in seconds. Copy and use immediately." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A66C2] via-[#004182] to-[#7c3aed] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Made with ❤️ for professionals
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            The Free LinkedIn Toolkit<br />Built for Everyone
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            LinkForge is a free platform with 40+ tools to help students and professionals optimize their LinkedIn presence, create engaging content, and advance their careers.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 bg-white text-[#0A66C2] font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Explore All Tools <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              LinkedIn is one of the most powerful platforms for career growth — but not everyone has access to expensive coaches or premium tools. We believe professional success shouldn't be gated behind a paywall.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded-xl flex items-center justify-center shrink-0">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Democratizing Professional Growth</h3>
                <p className="text-gray-600 leading-relaxed">
                  LinkForge was created to level the playing field. Whether you're a fresh graduate entering the job market, a professional changing careers, or a recruiter building their network — you deserve access to the same quality tools as everyone else, completely free.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Every tool on this platform is built specifically for LinkedIn's formats and best practices, giving you professional-grade results without the professional-grade price tag.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose LinkForge?</h2>
            <p className="text-gray-600">Built with your success in mind, from day one</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-[#0A66C2] hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Three simple steps to better LinkedIn results</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">40+ Tools Across 5 Categories</h2>
            <p className="text-gray-600">Everything you need to succeed on LinkedIn</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolCategories.map((cat, i) => (
              <div key={i} className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-[#0A66C2] hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{cat.emoji}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{cat.name}</h3>
                    <span className="text-sm text-[#0A66C2] font-medium">{cat.count} tools</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{cat.desc}</p>
              </div>
            ))}
            <div className="p-6 bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded-2xl text-white flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-bold text-xl mb-2">40+ Total Tools</h3>
              <p className="text-blue-100 text-sm mb-4">All completely free</p>
              <Link
                href="/tools"
                className="bg-white text-[#0A66C2] font-semibold px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm"
              >
                Browse All →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Is LinkForge For?</h2>
          <p className="text-gray-600 mb-10">Anyone who wants to make the most of LinkedIn</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: "🎓", title: "Students & Graduates", points: ["Build your profile from scratch", "Create standout headlines", "Write compelling about sections", "Land your first job"] },
              { emoji: "💼", title: "Professionals", points: ["Optimize for new opportunities", "Create engaging content", "Expand your network", "Advance your career"] },
              { emoji: "🔍", title: "Job Seekers", points: ["Track all your applications", "Generate tailored cover letters", "Prepare for interviews", "Research companies"] },
            ].map((persona, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 text-left">
                <div className="text-4xl mb-3">{persona.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-4">{persona.title}</h3>
                <ul className="space-y-2">
                  {persona.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your LinkedIn?</h2>
          <p className="text-blue-100 mb-8">Start using our free tools right now. No sign-up, no credit card, no catch.</p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 bg-white text-[#0A66C2] font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg"
          >
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

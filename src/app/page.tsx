"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Zap, Shield, Clock, Sparkles, Star,
  FileText, TrendingUp, Users, Award, CheckCircle,
  ChevronRight, BarChart2, Briefcase, PenTool, Target
} from "lucide-react";
import RecentlyUsedTools from "@/components/RecentlyUsedTools";

const STATS = [
  { value: "45+", label: "Free Tools", icon: <Sparkles className="w-5 h-5" /> },
  { value: "100%", label: "Free Forever", icon: <Shield className="w-5 h-5" /> },
  { value: "0", label: "Sign-ups Needed", icon: <Zap className="w-5 h-5" /> },
  { value: "∞", label: "Uses Per Tool", icon: <Clock className="w-5 h-5" /> },
];

const FEATURED_TOOLS = [
  {
    emoji: "📄",
    name: "CV Generator",
    desc: "8 premium templates, PDF export — free vs paid alternatives charging $30/month",
    href: "/tools/cv-generator",
    gradient: "from-[#0A66C2] to-[#7c3aed]",
    badge: "Most Popular",
  },
  {
    emoji: "✍️",
    name: "Post Generator",
    desc: "Generate viral LinkedIn posts with the right tone and structure",
    href: "/tools/post-generator",
    gradient: "from-[#7c3aed] to-[#db2777]",
    badge: "Trending",
  },
  {
    emoji: "🎯",
    name: "Headline Generator",
    desc: "Craft attention-grabbing headlines that get you noticed by recruiters",
    href: "/tools/headline-generator",
    gradient: "from-[#057642] to-[#0A66C2]",
    badge: "High Impact",
  },
  {
    emoji: "📊",
    name: "Job Tracker",
    desc: "Track applications, deadlines, and follow-ups — all in your browser",
    href: "/tools/job-tracker",
    gradient: "from-[#ea580c] to-[#db2777]",
    badge: "Career Essential",
  },
  {
    emoji: "🖼️",
    name: "Banner Maker",
    desc: "Create a stunning LinkedIn banner in minutes — downloads as real PNG",
    href: "/tools/banner-maker",
    gradient: "from-[#db2777] to-[#7c3aed]",
    badge: "Visual",
  },
  {
    emoji: "💌",
    name: "Cover Letter Generator",
    desc: "Professional cover letters tailored to any job description",
    href: "/tools/cover-letter-generator",
    gradient: "from-[#0A66C2] to-[#057642]",
    badge: "Job Seeker",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: <Target className="w-7 h-7" />,
    title: "Pick Your Tool",
    desc: "Browse 45+ free LinkedIn tools organized by category — profile, content, career, and outreach.",
    color: "from-[#0A66C2] to-[#004182]",
  },
  {
    step: "02",
    icon: <PenTool className="w-7 h-7" />,
    title: "Fill in Details",
    desc: "Enter your information, role, or topic. No account, no login, no personal data stored on servers.",
    color: "from-[#7c3aed] to-[#5b21b6]",
  },
  {
    step: "03",
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Get Results Instantly",
    desc: "Generate professional-grade output in seconds. Copy, download, or export to PDF — all free.",
    color: "from-[#057642] to-[#065f46]",
  },
];

const CATEGORIES = [
  { icon: <Users className="w-5 h-5" />, name: "Profile Optimization", count: 12, color: "bg-blue-50 text-blue-700 border-blue-200", href: "/tools" },
  { icon: <PenTool className="w-5 h-5" />, name: "Content Creation", count: 11, color: "bg-purple-50 text-purple-700 border-purple-200", href: "/tools" },
  { icon: <Briefcase className="w-5 h-5" />, name: "Career Tools", count: 8, color: "bg-green-50 text-green-700 border-green-200", href: "/tools" },
  { icon: <BarChart2 className="w-5 h-5" />, name: "Analytics & Research", count: 7, color: "bg-orange-50 text-orange-700 border-orange-200", href: "/tools" },
  { icon: <FileText className="w-5 h-5" />, name: "Outreach & Messages", count: 7, color: "bg-pink-50 text-pink-700 border-pink-200", href: "/tools" },
];

const TESTIMONIALS = [
  {
    name: "Sarah K.",
    role: "Marketing Graduate",
    avatar: "SK",
    color: "bg-blue-500",
    text: "The CV Generator saved me hours. I had a professional PDF in minutes — other services charge $30/month for the same thing!",
    stars: 5,
  },
  {
    name: "James M.",
    role: "Software Engineer",
    avatar: "JM",
    color: "bg-purple-500",
    text: "The Post Generator helped me grow from 200 to 2,000 followers. The templates are actually good, not generic garbage.",
    stars: 5,
  },
  {
    name: "Priya N.",
    role: "MBA Student",
    avatar: "PN",
    color: "bg-green-500",
    text: "I used the Headline Generator and Banner Maker for my job search. Got 3 recruiter messages in the first week!",
    stars: 5,
  },
  {
    name: "Alex T.",
    role: "Freelance Designer",
    avatar: "AT",
    color: "bg-orange-500",
    text: "The Banner Maker is incredible. Real PNG download, beautiful templates. Exactly what I needed for my profile.",
    stars: 5,
  },
];

const COMPARISON = [
  { feature: "Professional CV Templates", linkforge: true, competitor: false },
  { feature: "LinkedIn Post Generator", linkforge: true, competitor: true },
  { feature: "PDF Export", linkforge: true, competitor: false },
  { feature: "Completely Free", linkforge: true, competitor: false },
  { feature: "No Account Required", linkforge: true, competitor: false },
  { feature: "Banner Maker (Real PNG)", linkforge: true, competitor: false },
  { feature: "Job Application Tracker", linkforge: true, competitor: false },
  { feature: "45+ Tools in One Place", linkforge: true, competitor: false },
];

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A66C2 0%, #5b21b6 50%, #0A66C2 100%)" }}>

        {/* Animated blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "rgba(139,92,246,0.35)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full blur-3xl"
            style={{ background: "rgba(59,130,246,0.3)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl"
            style={{ background: "rgba(167,139,250,0.15)" }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">

            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold mb-8 shadow-lg border border-white/20"
                style={{ background: "rgba(5,118,66,0.85)", backdropFilter: "blur(10px)" }}>
                <Sparkles className="w-4 h-4 text-yellow-300" />
                45+ Free LinkedIn Tools — No Sign-up Required
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 leading-[1.08] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Supercharge Your
              <br />
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #fde68a, #f9a8d4, #a5f3fc)" }}>
                LinkedIn Profile
              </span>
              <br />
              <span className="text-4xl sm:text-5xl font-bold text-white/90">for Free. Forever.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Generate CVs, posts, headlines, banners, cover letters and more.
              While others charge <s className="text-red-300">$29/month</s>, we give you everything — <strong className="text-white">100% free</strong>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/tools">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-4 bg-white text-[#0A66C2] rounded-xl font-bold text-lg shadow-2xl flex items-center gap-2"
                >
                  Explore All 45 Tools
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/tools/cv-generator">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-4 rounded-xl font-bold text-lg text-white flex items-center gap-2 border-2 border-white/40"
                  style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}
                >
                  Build My CV Free
                  <FileText className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 text-white/85"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                { icon: <Zap className="w-4 h-4 text-yellow-300" />, text: "Instant Results" },
                { icon: <Shield className="w-4 h-4 text-green-300" />, text: "No Data Collected" },
                { icon: <Clock className="w-4 h-4 text-cyan-300" />, text: "No Registration" },
                { icon: <Award className="w-4 h-4 text-pink-300" />, text: "Professional Quality" },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-2">
                  {b.icon}
                  <span className="text-sm font-medium">{b.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Stats Row */}
          <motion.div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {STATS.map((s) => (
              <div key={s.label}
                className="rounded-2xl p-5 text-center border border-white/20"
                style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}
              >
                <div className="flex justify-center mb-2 text-yellow-300">{s.icon}</div>
                <div className="text-3xl font-extrabold text-white">{s.value}</div>
                <div className="text-blue-200 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 100L60 92C120 84 240 68 360 60C480 52 600 52 720 56C840 60 960 68 1080 72C1200 76 1320 76 1380 76L1440 76V100H0Z"
              fill="var(--background, #f8fafc)" />
          </svg>
        </div>
      </section>

      {/* ── Recently Used ── */}
      <RecentlyUsedTools />

      {/* ── How It Works ── */}
      <section className="py-20 bg-[var(--background,#f8fafc)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4 uppercase tracking-wide">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional results in 3 steps
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              No sign-up, no paywall, no nonsense. Just pick a tool and get results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#0A66C2] via-[#7c3aed] to-[#057642] opacity-30" />
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={step.step}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-5 shadow-lg`}>
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{step.step}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-1 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Tools ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-full mb-4 uppercase tracking-wide">
              Most-Used Tools
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed on LinkedIn
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From your first profile to landing your dream job — we have a free tool for every step.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_TOOLS.map((tool, i) => (
              <motion.div key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={tool.href}
                  className="group block bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#0A66C2]/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                      {tool.emoji}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">{tool.badge}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{tool.desc}</p>
                  <div className="flex items-center text-[#0A66C2] font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
                    Use for free <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/tools">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl font-bold text-white text-base shadow-lg flex items-center gap-2 mx-auto"
                style={{ background: "linear-gradient(135deg, #0A66C2, #7c3aed)" }}
              >
                View All 45+ Tools
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tool Categories ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Tools by Category</h2>
            <p className="text-gray-600">Find exactly what you need, organized by purpose</p>
          </motion.div>
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((cat, i) => (
              <motion.div key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link href={cat.href}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border font-semibold text-sm hover:shadow-md transition-all ${cat.color}`}
                >
                  {cat.icon}
                  {cat.name}
                  <span className="text-xs opacity-70">({cat.count})</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full mb-4 uppercase tracking-wide">
              Real Users
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professionals Love LinkForge
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              <span className="ml-2 text-gray-600 font-medium">4.9 / 5</span>
            </div>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 ${t.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-4 uppercase tracking-wide">
              Why LinkForge
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Free vs Paid Competitors
            </h2>
            <p className="text-gray-600">We give you premium features at $0</p>
          </motion.div>
          <motion.div
            className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 text-sm font-bold">
              <div className="p-4 text-gray-600">Feature</div>
              <div className="p-4 text-center text-[#0A66C2]">LinkForge ✓</div>
              <div className="p-4 text-center text-gray-500">Paid Tools</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={row.feature}
                className={`grid grid-cols-3 border-b border-gray-100 last:border-0 text-sm ${i % 2 === 1 ? "bg-gray-50/50" : "bg-white"}`}
              >
                <div className="p-4 text-gray-700 font-medium">{row.feature}</div>
                <div className="p-4 flex justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500 fill-green-100" />
                </div>
                <div className="p-4 flex justify-center">
                  {row.competitor
                    ? <CheckCircle className="w-5 h-5 text-gray-400" />
                    : <span className="text-red-400 font-bold text-lg leading-none">✕</span>
                  }
                </div>
              </div>
            ))}
          </motion.div>
          <p className="text-center text-gray-500 text-xs mt-4">
            * Competitor tools typically charge $15–$49/month for premium features
          </p>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why We're Different
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🔐", title: "Privacy First", desc: "All tools run in your browser. Nothing is sent to our servers. Your data stays yours." },
              { icon: "⚡", title: "Instant Results", desc: "No waiting, no queue. Get professional output in under 5 seconds." },
              { icon: "💎", title: "Premium Quality", desc: "Templates and outputs that rival $50/month professional services." },
              { icon: "🎯", title: "LinkedIn-Specific", desc: "Every tool is built specifically for LinkedIn — optimized for the platform's limits and best practices." },
              { icon: "📱", title: "Works Everywhere", desc: "Mobile, tablet, desktop. No app download needed." },
              { icon: "🆓", title: "Always Free", desc: "No freemium trap. Every feature, every tool, every template — permanently free." },
            ].map((item, i) => (
              <motion.div key={item.title}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0A66C2 0%, #5b21b6 50%, #0A66C2 100%)" }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-5xl mb-6">🚀</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Start Winning on LinkedIn Today
            </h2>
            <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of professionals using LinkForge to build their brand, land jobs, and grow their networks — <strong className="text-white">completely free</strong>.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/tools">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-4 bg-white text-[#0A66C2] rounded-xl font-bold text-lg shadow-2xl flex items-center gap-2"
                >
                  Get Started — It's Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/tools/cv-generator">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-4 rounded-xl font-bold text-lg text-white flex items-center gap-2 border-2 border-white/40"
                  style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}
                >
                  Build My CV Now
                  <FileText className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

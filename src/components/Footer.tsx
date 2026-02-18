"use client";

import Link from "next/link";
import { Sparkles, Mail, Twitter, Linkedin, Github, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const toolCategories = [
    {
      title: "Profile Tools",
      links: [
        { href: "/tools/profile-analyzer", label: "Profile Analyzer" },
        { href: "/tools/headline-generator", label: "Headline Generator" },
        { href: "/tools/about-writer", label: "About Writer" },
        { href: "/tools/summary-generator", label: "Summary Generator" },
        { href: "/tools/skills-analyzer", label: "Skills Analyzer" },
      ]
    },
    {
      title: "Content Tools",
      links: [
        { href: "/tools/post-generator", label: "Post Generator" },
        { href: "/tools/hook-generator", label: "Hook Generator" },
        { href: "/tools/content-calendar", label: "Content Calendar" },
        { href: "/tools/hashtag-generator", label: "Hashtag Generator" },
        { href: "/tools/post-preview", label: "Post Preview" },
      ]
    },
    {
      title: "Outreach Tools",
      links: [
        { href: "/tools/connection-request-generator", label: "Connection Request" },
        { href: "/tools/inmail-generator", label: "InMail Generator" },
        { href: "/tools/message-generator", label: "Message Generator" },
        { href: "/tools/welcome-message", label: "Welcome Message" },
      ]
    },
    {
      title: "Career Tools",
      links: [
        { href: "/tools/job-tracker", label: "Job Tracker" },
        { href: "/tools/cv-generator", label: "CV Generator" },
        { href: "/tools/cover-letter-generator", label: "Cover Letter" },
        { href: "/tools/interview-questions-generator", label: "Interview Questions" },
        { href: "/tools/salary-research", label: "Salary Research" },
      ]
    },
  ];

  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/settings", label: "⚙️" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <span className="text-xl font-bold">LinkForge</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Free LinkedIn tools for students and professionals. 
              Build your professional brand without spending a dime.
            </p>
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <Sparkles className="w-4 h-4" />
              <span>100% Free forever</span>
            </div>
          </div>

          {toolCategories.map((category) => (
            <div key={category.title}>
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">{category.title}</h3>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4">
              {companyLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-gray-400 hover:text-white text-sm">
                  {link.label}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <a href="mailto:hello@linkforge.tools" className="text-gray-400 hover:text-white">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" /> for students worldwide
              <span className="mx-2">•</span>
              © {currentYear} LinkForge. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

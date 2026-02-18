export interface Tool {
  name: string;
  slug: string;
  category: "profile" | "content" | "outreach" | "career" | "visual";
  description: string;
  gradient: string;
  emoji: string;
}

export const TOOL_CATEGORIES = [
  { id: "all", label: "All Tools", emoji: "🔧" },
  { id: "profile", label: "Profile", emoji: "👤" },
  { id: "content", label: "Content", emoji: "✍️" },
  { id: "outreach", label: "Outreach", emoji: "📨" },
  { id: "career", label: "Career", emoji: "💼" },
  { id: "visual", label: "Visual", emoji: "🎨" },
] as const;

export const ALL_TOOLS: Tool[] = [
  // Profile Tools
  { name: "Profile Analyzer", slug: "profile-analyzer", category: "profile", description: "Score your LinkedIn profile and get actionable improvement tips", gradient: "from-[#0A66C2] to-[#004182]", emoji: "📊" },
  { name: "Headline Generator", slug: "headline-generator", category: "profile", description: "Generate 10 compelling LinkedIn headline variations", gradient: "from-[#0A66C2] to-[#7c3aed]", emoji: "✨" },
  { name: "Headline Optimizer", slug: "headline-optimizer", category: "profile", description: "Optimize your existing headline for maximum impact", gradient: "from-[#7c3aed] to-[#0A66C2]", emoji: "🎯" },
  { name: "About Writer", slug: "about-writer", category: "profile", description: "Write a compelling About section that tells your story", gradient: "from-[#057642] to-[#065f46]", emoji: "📝" },
  { name: "Summary Generator", slug: "summary-generator", category: "profile", description: "Generate a professional summary for your LinkedIn profile", gradient: "from-[#057642] to-[#0A66C2]", emoji: "📄" },
  { name: "Skills Analyzer", slug: "skills-analyzer", category: "profile", description: "Analyze and optimize your skills section for your target role", gradient: "from-[#0A66C2] to-[#057642]", emoji: "🧠" },
  { name: "Profile Checklist", slug: "profile-checklist", category: "profile", description: "Complete checklist to maximize your profile completeness", gradient: "from-[#2563eb] to-[#0A66C2]", emoji: "✅" },
  { name: "Keyword Optimizer", slug: "keyword-optimizer", category: "profile", description: "Find the right keywords to get discovered by recruiters", gradient: "from-[#0A66C2] to-[#06b6d4]", emoji: "🔍" },
  { name: "Custom URL Optimizer", slug: "custom-url-optimizer", category: "profile", description: "Optimize your LinkedIn profile URL for better branding", gradient: "from-[#06b6d4] to-[#0A66C2]", emoji: "🔗" },
  { name: "Brand Statement", slug: "brand-statement", category: "profile", description: "Create a powerful personal brand statement", gradient: "from-[#7c3aed] to-[#db2777]", emoji: "💡" },

  // Content Tools
  { name: "Post Generator", slug: "post-generator", category: "content", description: "Generate engaging LinkedIn posts with 8 different styles", gradient: "from-[#ea580c] to-[#c2410c]", emoji: "📢" },
  { name: "Post Writer", slug: "post-writer", category: "content", description: "Write professional posts with customizable tone and style", gradient: "from-[#c2410c] to-[#ea580c]", emoji: "✍️" },
  { name: "Hook Generator", slug: "hook-generator", category: "content", description: "Create scroll-stopping opening lines for your posts", gradient: "from-[#db2777] to-[#be185d]", emoji: "🎣" },
  { name: "Caption Generator", slug: "caption-generator", category: "content", description: "Write compelling captions for your LinkedIn images", gradient: "from-[#be185d] to-[#db2777]", emoji: "💬" },
  { name: "Hashtag Generator", slug: "hashtag-generator", category: "content", description: "Generate relevant hashtags to boost your post reach", gradient: "from-[#7c3aed] to-[#6d28d9]", emoji: "#️⃣" },
  { name: "Text Formatter", slug: "text-formatter", category: "content", description: "Format your text with bold, italic, bullets, and more", gradient: "from-[#6d28d9] to-[#7c3aed]", emoji: "🔡" },
  { name: "Character Counter", slug: "character-counter", category: "content", description: "Count characters for posts, headlines, messages, and more", gradient: "from-[#0A66C2] to-[#2563eb]", emoji: "🔢" },
  { name: "Readability Checker", slug: "readability-checker", category: "content", description: "Analyze and improve your post readability score", gradient: "from-[#2563eb] to-[#0A66C2]", emoji: "📖" },
  { name: "Post Preview", slug: "post-preview", category: "content", description: "Preview how your post will look in the LinkedIn feed", gradient: "from-[#0A66C2] to-[#004182]", emoji: "👁️" },
  { name: "Post Comment Generator", slug: "post-comment-generator", category: "content", description: "Generate thoughtful comments to boost engagement", gradient: "from-[#057642] to-[#065f46]", emoji: "💭" },
  { name: "CTA Generator", slug: "cta-generator", category: "content", description: "Create powerful calls-to-action for your posts", gradient: "from-[#ea580c] to-[#f59e0b]", emoji: "🚀" },
  { name: "Poll Questions Generator", slug: "poll-questions-generator", category: "content", description: "Generate engaging poll questions for LinkedIn", gradient: "from-[#f59e0b] to-[#ea580c]", emoji: "📊" },
  { name: "Content Calendar", slug: "content-calendar", category: "content", description: "Plan and schedule your LinkedIn content strategy", gradient: "from-[#0A66C2] to-[#7c3aed]", emoji: "📅" },

  // Outreach Tools
  { name: "Message Generator", slug: "message-generator", category: "outreach", description: "Generate personalized outreach messages that get responses", gradient: "from-[#057642] to-[#0A66C2]", emoji: "✉️" },
  { name: "Connection Request Generator", slug: "connection-request-generator", category: "outreach", description: "Write connection requests that people actually accept", gradient: "from-[#0A66C2] to-[#057642]", emoji: "🤝" },
  { name: "InMail Generator", slug: "inmail-generator", category: "outreach", description: "Craft professional InMail messages for any situation", gradient: "from-[#7c3aed] to-[#0A66C2]", emoji: "📬" },
  { name: "Welcome Message", slug: "welcome-message", category: "outreach", description: "Create warm welcome messages for new connections", gradient: "from-[#057642] to-[#10b981]", emoji: "👋" },
  { name: "Recommendation Request", slug: "recommendation-request", category: "outreach", description: "Request recommendations professionally and effectively", gradient: "from-[#f59e0b] to-[#ea580c]", emoji: "⭐" },
  { name: "Endorsement Request", slug: "endorsement-tracker", category: "outreach", description: "Track and manage your skill endorsements", gradient: "from-[#ea580c] to-[#f59e0b]", emoji: "👍" },
  { name: "Follow-Up Message", slug: "follow-up-message", category: "outreach", description: "Write effective follow-up messages after networking", gradient: "from-[#0A66C2] to-[#2563eb]", emoji: "🔄" },
  { name: "Thank You Message", slug: "thank-you-message", category: "outreach", description: "Express gratitude professionally after interviews or help", gradient: "from-[#db2777] to-[#be185d]", emoji: "🙏" },

  // Career Tools
  { name: "Job Tracker", slug: "job-tracker", category: "career", description: "Track all your job applications and their status in one place", gradient: "from-[#0A66C2] to-[#004182]", emoji: "📋" },
  { name: "CV Generator", slug: "cv-generator", category: "career", description: "Create a professional CV with multiple templates and PDF export", gradient: "from-[#004182] to-[#0A66C2]", emoji: "📄" },
  { name: "Cover Letter Generator", slug: "cover-letter-generator", category: "career", description: "Generate tailored cover letters for any job application", gradient: "from-[#057642] to-[#065f46]", emoji: "📃" },
  { name: "Interview Questions Generator", slug: "interview-questions-generator", category: "career", description: "Practice with role-specific interview questions", gradient: "from-[#065f46] to-[#057642]", emoji: "🎤" },
  { name: "Salary Research", slug: "salary-research", category: "career", description: "Research salary ranges for your role and location", gradient: "from-[#f59e0b] to-[#d97706]", emoji: "💰" },
  { name: "Company Research", slug: "company-research", category: "career", description: "Get quick insights about companies before interviews", gradient: "from-[#d97706] to-[#f59e0b]", emoji: "🏢" },
  { name: "Profile to PDF", slug: "profile-to-pdf", category: "career", description: "Export your LinkedIn profile as a beautiful PDF document", gradient: "from-[#ef4444] to-[#dc2626]", emoji: "📑" },

  // Visual & Planning Tools
  { name: "Banner Maker", slug: "banner-maker", category: "visual", description: "Design stunning LinkedIn profile banners with live preview", gradient: "from-[#7c3aed] to-[#0A66C2]", emoji: "🖼️" },
  { name: "Banner Ideas", slug: "banner-ideas", category: "visual", description: "Get creative banner design inspiration and ideas", gradient: "from-[#0A66C2] to-[#7c3aed]", emoji: "💡" },
];

import { MetadataRoute } from "next";

const BASE_URL = "https://linkedin-tools-by-claude.vercel.app";

const toolSlugs = [
  "about-writer", "banner-ideas", "banner-maker", "brand-statement",
  "caption-generator", "character-counter", "company-research",
  "connection-request-generator", "content-calendar", "cover-letter-generator",
  "cta-generator", "custom-url-optimizer", "cv-generator", "endorsement-tracker",
  "follow-up-message", "hashtag-generator", "headline-generator",
  "headline-optimizer", "hook-generator", "inmail-generator",
  "interview-questions-generator", "job-tracker", "keyword-optimizer",
  "message-generator", "poll-questions-generator", "post-comment-generator",
  "post-generator", "post-preview", "post-writer", "profile-analyzer",
  "profile-checklist", "profile-to-pdf", "readability-checker",
  "recommendation-request", "salary-research", "skills-analyzer",
  "summary-generator", "text-formatter", "thank-you-message", "welcome-message",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const toolEntries = toolSlugs.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...toolEntries,
  ];
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { BookOpen, Eye, ArrowRight, PenSquare } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "published" | "draft" | "scheduled";
  author: string;
  category: string;
  tags: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
}

const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Tips for LinkedIn Success in 2025",
    excerpt: "Master LinkedIn with these proven strategies to boost your professional presence and get noticed by recruiters.",
    slug: "10-tips-linkedin-2025",
    category: "Career",
    content: "Full article content here...",
    status: "published",
    author: "LinkForge Team",
    tags: ["linkedin", "career"],
    views: 5423,
    createdAt: "2025-01-15",
    updatedAt: "2025-01-15",
  },
  {
    id: "2",
    title: "How to Write the Perfect LinkedIn Headline",
    excerpt: "Your headline is your first impression. Learn how to craft a compelling headline that gets you discovered.",
    slug: "perfect-linkedin-headline",
    category: "Profile Tips",
    content: "Full article content here...",
    status: "published",
    author: "LinkForge Team",
    tags: ["headline", "profile"],
    views: 3212,
    createdAt: "2025-01-10",
    updatedAt: "2025-01-12",
  },
  {
    id: "3",
    title: "Best Times to Post on LinkedIn in 2025",
    excerpt: "Maximize your reach with optimal posting times. Data-backed strategies for better engagement.",
    slug: "best-times-to-post",
    category: "Content Strategy",
    content: "Full article content here...",
    status: "published",
    author: "LinkForge Team",
    tags: ["timing", "engagement"],
    views: 2156,
    createdAt: "2025-01-05",
    updatedAt: "2025-01-05",
  },
  {
    id: "4",
    title: "How to Grow Your LinkedIn Network Fast",
    excerpt: "Proven strategies to grow your LinkedIn network meaningfully without spamming your connections.",
    slug: "grow-linkedin-network",
    category: "Networking",
    content: "Full article content here...",
    status: "published",
    author: "LinkForge Team",
    tags: ["connections", "networking"],
    views: 1876,
    createdAt: "2024-12-28",
    updatedAt: "2024-12-28",
  },
  {
    id: "5",
    title: "LinkedIn Profile Photo: The Complete Guide",
    excerpt: "Make a great first impression with the perfect profile picture. Tips on lighting, background, and expression.",
    slug: "profile-photo-guide",
    category: "Profile Tips",
    content: "Full article content here...",
    status: "published",
    author: "LinkForge Team",
    tags: ["photo", "profile"],
    views: 1543,
    createdAt: "2024-12-20",
    updatedAt: "2024-12-20",
  },
  {
    id: "6",
    title: "Writing LinkedIn Messages That Get Responses",
    excerpt: "Craft outreach messages that get responses and build genuine professional relationships.",
    slug: "linkedin-messages-that-work",
    category: "Outreach",
    content: "Full article content here...",
    status: "published",
    author: "LinkForge Team",
    tags: ["messages", "outreach"],
    views: 1234,
    createdAt: "2024-12-15",
    updatedAt: "2024-12-15",
  },
];

const categoryColors: Record<string, string> = {
  Career: "bg-blue-100 text-blue-700",
  "Profile Tips": "bg-purple-100 text-purple-700",
  "Content Strategy": "bg-orange-100 text-orange-700",
  Networking: "bg-green-100 text-green-700",
  Outreach: "bg-pink-100 text-pink-700",
  Tips: "bg-yellow-100 text-yellow-700",
  Strategy: "bg-indigo-100 text-indigo-700",
  Growth: "bg-teal-100 text-teal-700",
  Communication: "bg-rose-100 text-rose-700",
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("blog_posts");
      if (stored) {
        const parsed = JSON.parse(stored);
        const publishedPosts = parsed.filter((p: BlogPost) => p.status === "published");
        setPosts(publishedPosts.length > 0 ? publishedPosts : defaultPosts);
      } else {
        setPosts(defaultPosts);
      }
    } catch {
      setPosts(defaultPosts);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0A66C2]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A66C2] via-[#004182] to-[#7c3aed] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn Blog</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Tips, guides, and strategies to boost your LinkedIn presence and advance your career.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">No blog posts yet.</p>
            <Link href="/settings" className="text-[#0A66C2] hover:underline">
              Go to Admin to create posts →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#0A66C2] hover:shadow-lg transition-all duration-300 group"
              >
                {post.imageUrl ? (
                  <div className="h-48 overflow-hidden">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                ) : (
                  <div className="h-40 bg-gradient-to-br from-[#0A66C2]/10 to-[#7c3aed]/10 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-[#0A66C2]/30" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-600"}`}>
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {post.views.toLocaleString()}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#0A66C2] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">{post.createdAt}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[#0A66C2] text-sm font-medium hover:text-[#7c3aed] transition flex items-center gap-1"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Write for Us CTA */}
        <div className="mt-12 bg-white border border-gray-200 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded-xl flex items-center justify-center mx-auto mb-4">
            <PenSquare className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Want to Write for Us?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Share your LinkedIn expertise with our community. We're always looking for guest contributors.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Get In Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}

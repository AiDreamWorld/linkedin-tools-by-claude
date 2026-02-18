import Link from "next/link";
import { BookOpen, Eye, ArrowRight, PenSquare } from "lucide-react";
import type { Metadata } from "next";
import blogPosts from "@/data/blog-posts.json";

export const metadata: Metadata = {
  title: "LinkedIn Blog – Tips, Guides & Strategies",
  description: "Expert LinkedIn tips, career strategies, and profile guides to help you grow professionally and land your dream job.",
};

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
  const posts = (blogPosts as BlogPost[]).filter((p) => p.status === "published");

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
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No blog posts yet.</p>
            <p className="text-gray-400 text-sm">Check back soon for LinkedIn tips and guides.</p>
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
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-40 bg-gradient-to-br from-[#0A66C2]/10 to-[#7c3aed]/10 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-[#0A66C2]/30" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        categoryColors[post.category] || "bg-gray-100 text-gray-600"
                      }`}
                    >
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
            Share your LinkedIn expertise with our community. We&apos;re always looking for guest contributors.
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

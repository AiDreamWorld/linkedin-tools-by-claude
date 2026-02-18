"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

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

const defaultPosts: BlogPost[] = [];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("blog_posts");
    if (stored) {
      try {
        const posts: BlogPost[] = JSON.parse(stored);
        const found = posts.find(p => p.slug === slug && p.status === "published");
        if (found) {
          setPost(found);
        }
      } catch {
        setPost(null);
      }
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0A0a0a] to-[#1a1a2e] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0A66C2]"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0A0a0a] to-[#1a1a2e]">
        <header className="border-b border-white/10 backdrop-blur-xl bg-black/20">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LF</span>
                </div>
                <span className="text-white font-semibold text-xl">LinkForge</span>
              </Link>
              <div className="flex items-center gap-8">
                <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
                <Link href="/tools" className="text-gray-300 hover:text-white transition">Tools</Link>
                <Link href="/blog" className="text-white font-medium">Blog</Link>
              </div>
            </div>
          </nav>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog" className="text-[#0A66C2] hover:underline">← Back to Blog</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0A0a0a] to-[#1a1a2e]">
      <header className="border-b border-white/10 backdrop-blur-xl bg-black/20">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LF</span>
              </div>
              <span className="text-white font-semibold text-xl">LinkForge</span>
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
              <Link href="/tools" className="text-gray-300 hover:text-white transition">Tools</Link>
              <Link href="/blog" className="text-white font-medium">Blog</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/blog" className="text-[#0A66C2] hover:underline mb-8 inline-block">← Back to Blog</Link>
        
        {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded-2xl mb-8" />
        )}
        
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-[#0A66C2]/20 text-[#0A66C2] text-sm rounded-full">{post.category}</span>
          <span className="text-gray-500 text-sm">{post.createdAt}</span>
          <span className="text-gray-500 text-sm">•</span>
          <span className="text-gray-500 text-sm">{post.views} views</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>
        
        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/10">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded-full flex items-center justify-center">
            <span className="text-white font-bold">{post.author[0]}</span>
          </div>
          <div>
            <p className="text-white font-medium">{post.author}</p>
            <p className="text-gray-500 text-sm">Author</p>
          </div>
        </div>

        <article className="prose prose-invert max-w-none">
          <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </article>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-400 mb-3">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 text-gray-300 text-sm rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-white/10 bg-black/20 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">LF</span>
              </div>
              <span className="text-white font-semibold">LinkForge</span>
            </div>
            <p className="text-gray-500 text-sm">© 2024 LinkForge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

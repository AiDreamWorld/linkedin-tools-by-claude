import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye, Calendar, User, Tag } from "lucide-react";
import type { Metadata } from "next";
import blogPosts from "@/data/blog-posts.json";

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

const posts = blogPosts as BlogPost[];

export async function generateStaticParams() {
  return posts
    .filter((p) => p.status === "published")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug && p.status === "published");
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug && p.status === "published");

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A66C2] via-[#004182] to-[#7c3aed] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                categoryColors[post.category] || "bg-white/20 text-white"
              }`}
            >
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-blue-100 text-lg mb-6">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 text-blue-200 text-sm">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" /> {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {post.createdAt}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" /> {post.views.toLocaleString()} views
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 object-cover rounded-2xl mb-8 shadow-lg"
          />
        )}

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-gray-400" />
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-blue-50 hover:text-blue-700 transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Related posts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts
              .filter((p) => p.status === "published" && p.id !== post.id)
              .slice(0, 4)
              .map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#0A66C2] hover:shadow-md transition-all group"
                >
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      categoryColors[related.category] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {related.category}
                  </span>
                  <h3 className="font-semibold text-gray-900 mt-2 group-hover:text-[#0A66C2] transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{related.excerpt}</p>
                </Link>
              ))}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Link>
        </div>
      </main>
    </div>
  );
}

import PostPreviewTool from "@/components/tools/PostPreviewTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Post Preview | See How Your Post Looks",
  description: "Preview how your LinkedIn post will appear in the feed. Check the see more cutoff and optimize for engagement.",
  keywords: "linkedin post preview, linkedin preview tool, post appearance, linkedin feed",
};

export default function PostPreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#db2777] to-[#7c3aed] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn Post Preview</h1>
          <p className="text-xl text-pink-100 mb-6">See exactly how your post will appear</p>
          <div className="flex items-center justify-center gap-2 text-sm text-pink-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Mobile & Desktop Preview
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <PostPreviewTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">LinkedIn Post Best Practices</h2>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">The "See More" Cutoff</h3>
            <p className="text-gray-600">In the LinkedIn feed, only the first ~210 characters appear before "see more". Make your hook compelling to encourage clicks.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Mobile vs Desktop</h3>
            <p className="text-gray-600">Mobile shows less characters before "see more" (~140) compared to desktop (~210). Test your posts on both.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">First Line Matters Most</h3>
            <p className="text-gray-600">Many users only read the first few lines. Put your most important point at the beginning.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

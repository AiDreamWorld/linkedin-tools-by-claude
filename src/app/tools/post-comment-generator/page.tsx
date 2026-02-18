import PostCommentGeneratorTool from "@/components/tools/PostCommentGeneratorTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Comment Generator | Engagement Tool",
  description: "Generate thoughtful, engaging comments for LinkedIn posts to boost your visibility and build relationships.",
  keywords: "linkedin comment generator, post engagement, linkedin comments",
};

export default function PostCommentGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#057642] to-[#0A66C2] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Post Comment Generator</h1>
          <p className="text-green-100">Create engaging comments to boost visibility</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PostCommentGeneratorTool />
      </div>
    </div>
  );
}

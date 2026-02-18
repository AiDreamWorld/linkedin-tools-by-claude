import PostWriterTool from "@/components/tools/PostWriterTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Post Writer (AI) | Generate Engaging Posts",
  description: "AI-powered LinkedIn post writer. Create viral posts in seconds.",
  keywords: "linkedin post writer, ai writer, content generator, viral post",
};

export default function PostWriterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#db2777] to-[#ea580c] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn Post Writer (AI)</h1>
          <p className="text-xl text-pink-100 mb-6">Generate engaging posts with AI</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <PostWriterTool />
      </div>
    </div>
  );
}

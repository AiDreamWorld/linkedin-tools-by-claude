import BannerIdeasTool from "@/components/tools/BannerIdeasTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Banner Ideas Generator | Design Inspiration",
  description: "Get creative banner design ideas and color palettes for your LinkedIn profile.",
  keywords: "linkedin banner ideas, profile banner, linkedin background",
};

export default function BannerIdeasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#db2777] to-[#7c3aed] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Banner Ideas Generator</h1>
          <p className="text-pink-100">Get creative banner design ideas</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BannerIdeasTool />
      </div>
    </div>
  );
}

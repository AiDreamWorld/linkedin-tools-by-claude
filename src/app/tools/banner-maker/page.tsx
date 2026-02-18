import BannerMakerTool from "@/components/tools/BannerMakerTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Banner Maker | Create Professional Cover Photos",
  description: "Create stunning LinkedIn banner images for your profile. Choose from professional templates and customize your cover photo.",
  keywords: "linkedin banner maker, cover photo creator, linkedin background, profile banner",
};

export default function BannerMakerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#7c3aed] to-[#0A66C2] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn Banner Maker</h1>
          <p className="text-xl text-purple-100 mb-6">Create professional cover photos</p>
          <div className="flex items-center justify-center gap-2 text-sm text-purple-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free to use - No design skills needed
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <BannerMakerTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">LinkedIn Banner Size Guide</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Recommended Dimensions</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• <strong>Personal Profile:</strong> 1584 x 396 pixels</li>
                <li>• <strong>Company Page:</strong> 1128 x 191 pixels</li>
                <li>• <strong>Showcase Page:</strong> 974 x 330 pixels</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Best Practices</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Keep important text in the center</li>
                <li>• Use high-resolution images (300 DPI)</li>
                <li>• Avoid text-heavy designs</li>
                <li>• Make it brand-consistent</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

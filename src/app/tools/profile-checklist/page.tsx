import ProfileChecklistTool from "@/components/tools/ProfileChecklistTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Profile Checklist | Complete Your Profile",
  description: "Use our free LinkedIn profile completion checklist. Step-by-step guide to optimize your profile and get noticed by recruiters.",
  keywords: "linkedin profile checklist, linkedin optimization, profile completion, linkedin tips",
};

export default function ProfileChecklistPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#0A66C2] to-[#057642] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">LinkedIn Profile Checklist</h1>
          <p className="text-blue-100">Complete your profile step by step</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProfileChecklistTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Complete Your LinkedIn Profile?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Get Found by Recruiters</h3>
            <p className="text-gray-600 text-sm">Complete profiles appear higher in search results. Recruiters often filter by profile completion.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Build Trust</h3>
            <p className="text-gray-600 text-sm">A complete profile looks more professional and trustworthy to potential connections.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">More Opportunities</h3>
            <p className="text-gray-600 text-sm">Complete profiles get 40% more profile views and 40% more connection requests.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">SEO Benefits</h3>
            <p className="text-gray-600 text-sm">Complete profiles rank higher in Google for your name and relevant keywords.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Completion Tips</h2>
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <ul className="space-y-2 text-gray-700">
            <li>• Upload a professional photo - first impressions matter</li>
            <li>• Write a custom headline, not just your job title</li>
            <li>• Fill out your About section with your story</li>
            <li>• Add quantifiable achievements in experience</li>
            <li>• Request recommendations from colleagues</li>
            <li>• Add skills relevant to your target jobs</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

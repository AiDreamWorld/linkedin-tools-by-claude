import ContentCalendarTool from "@/components/tools/ContentCalendarTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Content Calendar | Post Planning Tool",
  description: "Plan and organize your LinkedIn content strategy with our free content calendar. Set reminders, track posts, and never miss a posting day.",
  keywords: "linkedin content calendar, post planner, content strategy, linkedin scheduler",
};

export default function ContentCalendarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#7c3aed] to-[#db2777] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full mb-3">
            100% FREE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Content Calendar</h1>
          <p className="text-purple-100">Plan, schedule, and track your LinkedIn content</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ContentCalendarTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Use a Content Calendar?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Consistency is Key</h3>
            <p className="text-gray-600 text-sm">Posting regularly helps LinkedIn's algorithm favor your content. A calendar ensures you maintain a steady posting schedule.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Better Content Quality</h3>
            <p className="text-gray-600 text-sm">When you plan ahead, you can create higher quality content instead of scrambling for ideas at the last minute.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Topic Variety</h3>
            <p className="text-gray-600 text-sm">A calendar helps you balance different types of content - educational, personal, professional, and engagement posts.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Track Your Progress</h3>
            <p className="text-gray-600 text-sm">See what you've posted and what's coming up. Mark posts as done to track your content creation journey.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 bg-white rounded-2xl mx-4 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use This Tool</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 font-bold">1</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Add Your Posts</h3>
              <p className="text-gray-600 text-sm">Plan what you want to post each day. Select the post type, topic, and write your idea.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 font-bold">2</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Set Reminders</h3>
              <p className="text-gray-600 text-sm">Click the bell icon to enable browser notifications. You'll get reminded on the day you planned to post.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 font-bold">3</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Export & Backup</h3>
              <p className="text-gray-600 text-sm">Use the download button to export your calendar as a JSON file. Import it later or keep it as a backup.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 font-bold">4</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Mark as Posted</h3>
              <p className="text-gray-600 text-sm">When you successfully post content, click the circle to mark it as done. Track your consistency over time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Posting Frequency</h2>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <div>
                <strong className="text-gray-900">Minimum:</strong> 2-3 times per week to stay visible
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <div>
                <strong className="text-gray-900">Recommended:</strong> 5 times per week (Monday-Friday)
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <div>
                <strong className="text-gray-900">Best times:</strong> 8-10 AM and 12-1 PM (when professionals check LinkedIn)
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <div>
                <strong className="text-gray-900">Weekend:</strong> Optional, but engagement is often higher
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Storage</h2>
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
          <p className="text-yellow-800 text-sm">
            <strong>Your data is stored locally in your browser.</strong> This means:
          </p>
          <ul className="mt-2 text-sm text-yellow-700 space-y-1">
            <li>• It won't disappear when you close the browser (stored in localStorage)</li>
            <li>• It won't sync across different devices</li>
            <li>• Use the Export button to backup your calendar</li>
            <li>• Clear browser data will delete your calendar</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

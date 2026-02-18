import JobTrackerTool from "@/components/tools/JobTrackerTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Job Application Tracker | Manage Your Job Search",
  description: "Track your job applications, interviews, and offers in one place. Free tool to stay organized during your job search.",
  keywords: "job application tracker, job search tracker, interview tracker, career tools",
};

export default function JobTrackerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#db2777] to-[#be185d] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Job Application Tracker</h1>
          <p className="text-xl text-pink-100 mb-6">Stay organized during your job search</p>
          <div className="flex items-center justify-center gap-2 text-sm text-pink-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            100% Free - No Login Required
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <JobTrackerTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Search Tips</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">Track Everything</h3>
            <p className="text-gray-600 text-sm">Keep track of every job you apply to, including the date, position, company, and any contacts. This helps you follow up appropriately and identify patterns.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">Set Reminders</h3>
            <p className="text-gray-600 text-sm">Follow up 1-2 weeks after applying. Use the notes section to track when you should follow up on each application.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">Organize by Status</h3>
            <p className="text-gray-600 text-sm">Keep track of where each application is in the process: Applied, Interviewing, Offer, or Rejected. This helps you prioritize your efforts.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">Note Important Details</h3>
            <p className="text-gray-600 text-sm">Record the job description, salary range, benefits, and any other important details from each posting for easy reference later.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 bg-white rounded-2xl mx-4 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Application Best Practices</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-pink-600 text-sm">1</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Customize Your Applications</h3>
              <p className="text-gray-600 text-sm">Tailor your resume and cover letter for each position. Use keywords from the job description.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-pink-600 text-sm">2</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Apply Early</h3>
              <p className="text-gray-600 text-sm">Many jobs are filled on a rolling basis. Apply as soon as you see a position you're interested in.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-pink-600 text-sm">3</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Network</h3>
              <p className="text-gray-600 text-sm">Connect with employees at companies you're interested in. Referrals significantly increase your chances.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-pink-600 text-sm">4</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Stay Positive</h3>
              <p className="text-gray-600 text-sm">Job searching takes time. Stay persistent and learn from each interview experience.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Is my data saved?</h3>
            <p className="text-gray-600">Yes, your job applications are saved in your browser's local storage. They will persist until you clear your browser data.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Can I export my data?</h3>
            <p className="text-gray-600">Currently, data is stored locally. You can manually copy your job details if needed.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

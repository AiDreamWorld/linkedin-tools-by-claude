import ProfileAnalyzer from "@/components/ProfileAnalyzer";
import HeadlineGenerator from "@/components/HeadlineGenerator";
import AboutWriter from "@/components/AboutWriter";
import MessageGenerator from "@/components/MessageGenerator";
import JobTracker from "@/components/JobTracker";

export default function ToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">LinkedIn Tools</h1>
        <p className="text-gray-600">Supercharge your LinkedIn presence with these powerful tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProfileAnalyzer />
        <HeadlineGenerator />
        <AboutWriter />
        <MessageGenerator />
        <JobTracker />
      </div>
    </div>
  );
}

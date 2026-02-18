import Link from "next/link";
import { Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto">
        <div className="w-24 h-24 bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Search className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist. It may have been moved, deleted, or you may have typed the URL incorrectly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0A66C2] to-[#004182] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            href="/tools"
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#0A66C2] text-[#0A66C2] font-semibold rounded-xl hover:bg-blue-50 transition-colors"
          >
            Browse All Tools
          </Link>
        </div>
      </div>
    </div>
  );
}

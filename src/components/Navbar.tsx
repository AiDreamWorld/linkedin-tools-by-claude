"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">LinkForge</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-1">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/") 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/tools" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/tools") 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Tools
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

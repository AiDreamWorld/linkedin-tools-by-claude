"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Circle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  completed: boolean;
}

const checklistData: Omit<ChecklistItem, "completed">[] = [
  // Profile Basics
  { id: "photo", category: "Profile Photo", title: "Professional Photo", description: "Use a high-quality, professional-looking photo where you're clearly visible" },
  { id: "headline", category: "Headline", title: "Custom Headline", description: "Don't use 'Looking for opportunities' - instead describe what you do" },
  { id: "about", category: "About", title: "About Section", description: "Fill out your About section with your story, achievements, and value proposition" },
  { id: "contact", category: "Contact", title: "Contact Info", description: "Add at least your email address so people can reach you" },
  
  // Experience
  { id: "experience", category: "Experience", title: "Work Experience", description: "List all relevant work experience with descriptions and achievements" },
  { id: "achievements", category: "Experience", title: "Quantified Achievements", description: "Use numbers, metrics, and results in your descriptions" },
  { id: "promoted", category: "Experience", title: "Promoted Content", description: "Mark relevant content as 'Promoted' to highlight important achievements" },
  
  // Education
  { id: "education", category: "Education", title: "Education History", description: "Add all relevant education, including degrees and certifications" },
  { id: "courses", category: "Education", title: "Relevant Courses", description: "List courses that are relevant to your field" },
  
  // Skills
  { id: "skills", category: "Skills", title: "Skills Section", description: "Add at least 5 relevant skills for your industry" },
  { id: "endorsements", category: "Skills", title: "Get Endorsements", description: "Request endorsements from colleagues for your top skills" },
  { id: "recommendations", category: "Skills", title: "Recommendations", description: "Request and display recommendations from colleagues or clients" },
  
  // Media
  { id: "media", category: "Media", title: "Rich Media", description: "Add images, videos, presentations, or links to showcase your work" },
  { id: "portfolio", category: "Media", title: "Portfolio Link", description: "Include a link to your portfolio or personal website" },
  
  // Engagement
  { id: "connections", category: "Engagement", title: "Build Network", description: "Connect with professionals in your industry (aim for 500+)" },
  { id: "activity", category: "Engagement", title: "Posting Activity", description: "Regularly post or share content to stay active" },
  
  // Customization
  { id: "vanity", category: "Custom URL", title: "Custom URL", description: "Set a custom LinkedIn URL (linkedin.com/in/yourname)" },
  { id: "public", category: "Settings", title: "Public Profile", description: "Make your profile public so it appears in search engines" },
];

export default function ProfileChecklistTool() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Profile Basics");

  useEffect(() => {
    const saved = localStorage.getItem("profileChecklist");
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(checklistData.map(item => ({ ...item, completed: false })));
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("profileChecklist", JSON.stringify(items));
    }
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const resetAll = () => {
    setItems(checklistData.map(item => ({ ...item, completed: false })));
    localStorage.removeItem("profileChecklist");
  };

  const categories = [...new Set(items.map(item => item.category))];
  
  const getCategoryProgress = (category: string) => {
    const categoryItems = items.filter(item => item.category === category);
    const completed = categoryItems.filter(item => item.completed).length;
    return { completed, total: categoryItems.length };
  };

  const totalProgress = {
    completed: items.filter(item => item.completed).length,
    total: items.length,
    percentage: Math.round((items.filter(item => item.completed).length / items.length) * 100)
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-[#0A66C2] to-[#057642] rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Profile Checklist</h2>
            <p className="text-gray-500 text-sm">Complete your LinkedIn profile step by step</p>
          </div>
        </div>
        <button onClick={resetAll} className="text-sm text-gray-500 hover:text-red-500">
          Reset All
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Profile Completion</span>
          <span className="text-sm font-bold text-[#0A66C2]">{totalProgress.percentage}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#0A66C2] to-[#057642] transition-all duration-500"
            style={{ width: `${totalProgress.percentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">{totalProgress.completed} of {totalProgress.total} items completed</p>
      </div>

      <div className="space-y-2">
        {categories.map((category) => {
          const progress = getCategoryProgress(category);
          const isExpanded = expandedCategory === category;
          
          return (
            <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : category)}
                className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-900">{category}</span>
                  <span className="text-xs text-gray-500">
                    {progress.completed}/{progress.total}
                  </span>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
              </button>
              
              {isExpanded && (
                <div className="p-2 space-y-1">
                  {items.filter(item => item.category === category).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-3 rounded-lg flex items-start gap-3 cursor-pointer transition ${
                        item.completed ? "bg-green-50" : "hover:bg-gray-50"
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className={`font-medium ${item.completed ? "text-green-800" : "text-gray-900"}`}>
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

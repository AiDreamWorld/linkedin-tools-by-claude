"use client";

import { useState } from "react";
import { DollarSign, MapPin, Briefcase, TrendingUp, Copy, Check, Sparkles } from "lucide-react";

const salaryData: Record<string, Record<string, { min: number; max: number; avg: number }>> = {
  "software engineer": {
    "entry": { min: 50000, max: 80000, avg: 65000 },
    "mid": { min: 80000, max: 130000, avg: 105000 },
    "senior": { min: 130000, max: 200000, avg: 160000 },
    "staff": { min: 180000, max: 300000, avg: 230000 },
  },
  "data analyst": {
    "entry": { min: 45000, max: 70000, avg: 55000 },
    "mid": { min: 70000, max: 110000, avg: 85000 },
    "senior": { min: 110000, max: 170000, avg: 135000 },
  },
  "product manager": {
    "entry": { min: 70000, max: 100000, avg: 85000 },
    "mid": { min: 100000, max: 160000, avg: 125000 },
    "senior": { min: 150000, max: 250000, avg: 190000 },
  },
  "ux designer": {
    "entry": { min: 50000, max: 75000, avg: 60000 },
    "mid": { min: 75000, max: 120000, avg: 95000 },
    "senior": { min: 110000, max: 180000, avg: 140000 },
  },
  "marketing manager": {
    "entry": { min: 45000, max: 70000, avg: 55000 },
    "mid": { min: 70000, max: 110000, avg: 85000 },
    "senior": { min: 100000, max: 160000, avg: 125000 },
  },
  "data scientist": {
    "entry": { min: 60000, max: 95000, avg: 75000 },
    "mid": { min: 95000, max: 150000, avg: 120000 },
    "senior": { min: 140000, max: 220000, avg: 175000 },
  },
  "devops engineer": {
    "entry": { min: 60000, max: 90000, avg: 72000 },
    "mid": { min: 90000, max: 140000, avg: 115000 },
    "senior": { min: 130000, max: 200000, avg: 165000 },
  },
};

const locationMultipliers: Record<string, number> = {
  "san francisco": 1.35,
  "new york": 1.30,
  "seattle": 1.25,
  "boston": 1.18,
  "austin": 1.08,
  "chicago": 1.05,
  "denver": 1.02,
  "remote": 1.0,
  "default": 1.0,
};

export default function SalaryResearchTool() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("mid");
  const [location, setLocation] = useState("");
  const [showResults, setShowResults] = useState(false);

  const getSalary = () => {
    const roleKey = Object.keys(salaryData).find((key) =>
      role.toLowerCase().includes(key)
    ) || "software engineer";
    
    const levelData = salaryData[roleKey]?.[experience] || salaryData["software engineer"]["mid"];
    
    const multiplier = Object.entries(locationMultipliers).find(([city]) =>
      location.toLowerCase().includes(city)
    )?.[1] || 1.0;

    return {
      min: Math.round(levelData.min * multiplier),
      max: Math.round(levelData.max * multiplier),
      avg: Math.round(levelData.avg * multiplier),
    };
  };

  const handleSearch = () => {
    if (role) setShowResults(true);
  };

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const popularRoles = Object.keys(salaryData);

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#057642] to-[#0A66C2] rounded-xl flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Salary Research Tool</h2>
          <p className="text-gray-500 text-sm">Research salary ranges for different roles</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Software Engineer"
            list="roles"
          />
          <datalist id="roles">
            {popularRoles.map((r) => (
              <option key={r} value={r} />
            ))}
          </datalist>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="entry">Entry Level (0-2 yrs)</option>
            <option value="mid">Mid Level (2-5 yrs)</option>
            <option value="senior">Senior (5+ yrs)</option>
            <option value="staff">Staff/Principal (8+ yrs)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="e.g., San Francisco, Remote"
            list="locations"
          />
          <datalist id="locations">
            <option value="San Francisco" />
            <option value="New York" />
            <option value="Seattle" />
            <option value="Austin" />
            <option value="Remote" />
          </datalist>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full bg-gradient-to-r from-[#057642] to-[#0A66C2] text-white py-3 rounded-lg font-semibold hover:opacity-90 flex items-center justify-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        Research Salary
      </button>

      {showResults && (
        <div className="mt-6 space-y-4">
          <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Salary Range for {role || "Software Engineer"}
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Minimum</p>
                <p className="text-2xl font-bold text-green-600">{formatSalary(getSalary().min)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Average</p>
                <p className="text-2xl font-bold text-[#0A66C2]">{formatSalary(getSalary().avg)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Maximum</p>
                <p className="text-2xl font-bold text-purple-600">{formatSalary(getSalary().max)}</p>
              </div>
            </div>

            {location && (
              <p className="text-sm text-gray-600 mt-4">
                * Based on {location} location. Remote positions typically offer base salaries similar to major tech hubs.
              </p>
            )}
          </div>

          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> These figures are estimates based on market data. Actual salaries vary based on company size, industry, specific skills, and benefits. Use this as a starting point for salary negotiations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

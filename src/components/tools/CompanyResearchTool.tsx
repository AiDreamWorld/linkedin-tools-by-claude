"use client";

import { useState } from "react";
import { Building2, Users, TrendingUp, Globe, MapPin, Star, Sparkles, Copy, Check } from "lucide-react";

const companyData: Record<string, {
  name: string;
  industry: string;
  size: string;
  founded: number;
  headquarters: string;
  description: string;
  culture: string[];
  perks: string[];
}> = {
  google: {
    name: "Google",
    industry: "Technology",
    size: "100,000+ employees",
    founded: 1998,
    headquarters: "Mountain View, CA",
    description: "Global technology leader specializing in internet-related services and products.",
    culture: ["Innovation-focused", "Work-life balance", "Data-driven", "Inclusive"],
    perks: ["Free meals", "Health insurance", "401k match", "Gym", "Remote work"],
  },
  meta: {
    name: "Meta (Facebook)",
    industry: "Technology",
    size: "50,000+ employees",
    founded: 2004,
    headquarters: "Menlo Park, CA",
    description: "Social media and technology company focused on connecting people.",
    culture: ["Move fast", "Bold", "Open", "Build social infrastructure"],
    perks: ["RSUs", "Health benefits", "Parental leave", "Free food"],
  },
  amazon: {
    name: "Amazon",
    industry: "E-commerce & Cloud",
    size: "1,000,000+ employees",
    founded: 1994,
    headquarters: "Seattle, WA",
    description: "E-commerce, cloud computing, and AI company.",
    culture: ["Customer-obsessed", "Bias for action", "Inventive", "Simplify"],
    perks: ["Stock options", "Health insurance", "Career development"],
  },
  microsoft: {
    name: "Microsoft",
    industry: "Technology",
    size: "200,000+ employees",
    founded: 1975,
    headquarters: "Redmond, WA",
    description: "Software and technology company developing products and services.",
    culture: ["Growth mindset", "Diversity & inclusion", "Integrity", "Innovation"],
    perks: ["Stock awards", "Health", "401k", "Gaming perks"],
  },
  apple: {
    name: "Apple",
    industry: "Technology",
    size: "150,000+ employees",
    founded: 1976,
    headquarters: "Cupertino, CA",
    description: "Designs, manufactures, and markets smartphones and consumer electronics.",
    culture: ["Innovation", "Excellence", "Confidentiality", "Simplicity"],
    perks: ["Stock purchase plan", "Health", "Education reimbursement"],
  },
  netflix: {
    name: "Netflix",
    industry: "Entertainment/Tech",
    size: "10,000+ employees",
    founded: 1997,
    headquarters: "Los Gatos, CA",
    description: "Streaming entertainment service and content producer.",
    culture: ["Freedom & responsibility", "Innovation", "Inclusion", "Transparency"],
    perks: ["Unlimited PTO", "Stock", "Health", "Parental leave"],
  },
};

export default function CompanyResearchTool() {
  const [companyName, setCompanyName] = useState("");
  const [showResults, setShowResults] = useState(false);

  const getCompanyInfo = () => {
    const company = Object.values(companyData).find((c) =>
      companyName.toLowerCase().includes(c.name.toLowerCase()) ||
      c.name.toLowerCase().includes(companyName.toLowerCase())
    );
    return company || null;
  };

  const company = getCompanyInfo();

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#ea580c] to-[#db2777] rounded-xl flex items-center justify-center">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Company Research Tool</h2>
          <p className="text-gray-500 text-sm">Get quick insights about companies you're interested in</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
            setShowResults(false);
          }}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
          placeholder="e.g., Google, Meta, Amazon, Netflix"
          list="companies"
        />
        <datalist id="companies">
          {Object.values(companyData).map((c) => (
            <option key={c.name} value={c.name} />
          ))}
        </datalist>
      </div>

      <button
        onClick={() => company && setShowResults(true)}
        disabled={!companyName}
        className="w-full bg-gradient-to-r from-[#ea580c] to-[#db2777] text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        Research Company
      </button>

      {showResults && company && (
        <div className="mt-6 space-y-4">
          <div className="p-6 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{company.name}</h3>
                <p className="text-gray-600">{company.industry}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {company.size}
              </span>
            </div>

            <p className="text-gray-700 mb-6">{company.description}</p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Founded {company.founded}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{company.headquarters}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span className="text-sm">{company.size}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Company Culture</h4>
              <div className="flex flex-wrap gap-2">
                {company.culture.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-white border border-orange-200 rounded-full text-sm text-gray-700">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Common Perks & Benefits</h4>
              <div className="flex flex-wrap gap-2">
                {company.perks.map((perk, i) => (
                  <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> When researching companies, also check their LinkedIn page, Glassdoor reviews, and recent news to get a complete picture.
            </p>
          </div>
        </div>
      )}

      {!company && companyName && !showResults && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-gray-600 text-sm">
            Company not found in database. Try searching for: Google, Meta, Amazon, Microsoft, Apple, or Netflix.
          </p>
        </div>
      )}
    </div>
  );
}

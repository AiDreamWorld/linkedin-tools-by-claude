"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: "active" | "inactive";
}

const categoryColors: Record<string, string> = {
  General: "bg-blue-100 text-blue-700",
  Tools: "bg-purple-100 text-purple-700",
  Features: "bg-green-100 text-green-700",
  Privacy: "bg-orange-100 text-orange-700",
};

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    supabase
      .from("faqs")
      .select("*")
      .eq("status", "active")
      .order("order", { ascending: true })
      .then(({ data }) => {
        setFaqs(data || []);
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];
  const filteredFaqs = selectedCategory === "All" ? faqs : faqs.filter((f) => f.category === selectedCategory);

  const toggleFaq = (id: string) => setOpenFaqId(openFaqId === id ? null : id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0A66C2]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#0A66C2] via-[#004182] to-[#7c3aed] text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Find answers to the most common questions about LinkForge and our LinkedIn tools.
          </p>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-4 py-12">
        {faqs.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No FAQs available yet.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-[#0A66C2] text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-[#0A66C2] hover:text-[#0A66C2]"
                  }`}
                >
                  {cat}
                  {cat !== "All" && (
                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${selectedCategory === cat ? "bg-white/20" : "bg-gray-100"}`}>
                      {faqs.filter((f) => f.category === cat).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#0A66C2]/50 transition-colors">
                  <button onClick={() => toggleFaq(faq.id)} className="w-full flex items-start justify-between p-5 text-left gap-4">
                    <div className="flex-1">
                      <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${categoryColors[faq.category] || "bg-gray-100 text-gray-600"}`}>
                        {faq.category}
                      </span>
                      <h3 className="text-base font-semibold text-gray-900">{faq.question}</h3>
                    </div>
                    <div className={`shrink-0 mt-1 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${openFaqId === faq.id ? "bg-[#0A66C2] text-white" : "bg-gray-100 text-gray-500"}`}>
                      {openFaqId === faq.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>
                  {openFaqId === faq.id && (
                    <div className="px-5 pb-5 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded-xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Still Have Questions?</h2>
          <p className="text-gray-600 mb-5 max-w-md mx-auto text-sm">Can&apos;t find what you&apos;re looking for? Our team is happy to help.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-xl font-medium hover:opacity-90 transition-opacity text-sm">
            Contact Us
          </Link>
        </div>
      </main>
    </div>
  );
}

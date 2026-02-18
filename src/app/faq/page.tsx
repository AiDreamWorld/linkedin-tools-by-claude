"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: "active" | "inactive";
}

const defaultFaqs: FAQ[] = [
  {
    id: "1",
    question: "Are these tools really free?",
    answer: "Yes! All LinkedIn tools on LinkForge are 100% free for students and professionals. No hidden fees, no subscriptions, no credit card required — ever.",
    category: "General",
    order: 1,
    status: "active",
  },
  {
    id: "2",
    question: "Do I need to create an account?",
    answer: "No account required! All tools work instantly in your browser without any sign-up. Just visit the tool page and start using it right away.",
    category: "General",
    order: 2,
    status: "active",
  },
  {
    id: "3",
    question: "How do I use the CV Generator?",
    answer: "Simply fill in your personal details, work experience, education, and skills in the CV Generator. Choose a template that suits your style (Modern, Classic, Creative, or Minimal), preview your CV, and download it as a PDF.",
    category: "Tools",
    order: 3,
    status: "active",
  },
  {
    id: "4",
    question: "Can I export my job application data?",
    answer: "Yes! The Job Tracker tool has a built-in CSV export feature. Click the Export CSV button to download all your tracked applications with status, company, role, and notes.",
    category: "Features",
    order: 4,
    status: "active",
  },
  {
    id: "5",
    question: "Is my data secure and private?",
    answer: "Absolutely. We don't store your personal data on any server. All processing happens locally in your browser using localStorage. Your information never leaves your device and is completely private.",
    category: "Privacy",
    order: 5,
    status: "active",
  },
  {
    id: "6",
    question: "Why is my data gone after clearing my browser?",
    answer: "LinkForge saves data in your browser's localStorage, which is cleared when you clear your browser history or site data. To keep your data, use the export feature in tools like Job Tracker and Content Calendar before clearing.",
    category: "Privacy",
    order: 6,
    status: "active",
  },
  {
    id: "7",
    question: "How do I track my job applications?",
    answer: "Use our Job Tracker tool to add every position you apply for. You can track the status (Applied, Interview, Offer, Rejected), add notes, and see an overview of your job search progress at a glance.",
    category: "Tools",
    order: 7,
    status: "active",
  },
  {
    id: "8",
    question: "Can I use these tools on mobile?",
    answer: "Yes! LinkForge is fully responsive and works on mobile browsers. However, some tools like the CV Generator and Banner Maker are best experienced on a desktop for the full preview experience.",
    category: "General",
    order: 8,
    status: "active",
  },
  {
    id: "9",
    question: "How do I download my LinkedIn banner?",
    answer: "In the Banner Maker tool, customize your banner with your name, title, and preferred theme, then click the 'Download Banner as PNG' button. The banner will be downloaded as a high-resolution PNG file.",
    category: "Tools",
    order: 9,
    status: "active",
  },
  {
    id: "10",
    question: "Are the generated posts really ready to use on LinkedIn?",
    answer: "The generated content is a great starting point! We recommend personalizing the output with your own voice, specific experiences, and details before posting. The tools give you a strong template — you make it yours.",
    category: "Features",
    order: 10,
    status: "active",
  },
];

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
    try {
      const stored = localStorage.getItem("faqs");
      if (stored) {
        const parsed = JSON.parse(stored);
        const activeFaqs = parsed.filter((f: FAQ) => f.status === "active");
        setFaqs(activeFaqs.length > 0 ? activeFaqs : defaultFaqs);
      } else {
        setFaqs(defaultFaqs);
      }
    } catch {
      setFaqs(defaultFaqs);
    }
    setLoading(false);
  }, []);

  const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];
  const filteredFaqs = selectedCategory === "All" ? faqs : faqs.filter((f) => f.category === selectedCategory);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0A66C2]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
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
            <p className="text-gray-500 text-lg mb-4">No FAQs available yet.</p>
            <Link href="/settings" className="text-[#0A66C2] hover:underline">
              Go to Admin to add FAQs →
            </Link>
          </div>
        ) : (
          <>
            {/* Category Filters */}
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

            {/* FAQ Items */}
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#0A66C2]/50 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-start justify-between p-5 text-left gap-4"
                  >
                    <div className="flex-1">
                      <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${categoryColors[faq.category] || "bg-gray-100 text-gray-600"}`}>
                        {faq.category}
                      </span>
                      <h3 className="text-base font-semibold text-gray-900">{faq.question}</h3>
                    </div>
                    <div className={`shrink-0 mt-1 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${openFaqId === faq.id ? "bg-[#0A66C2] text-white" : "bg-gray-100 text-gray-500"}`}>
                      {openFaqId === faq.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
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

        {/* Still Have Questions CTA */}
        <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded-xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Still Have Questions?</h2>
          <p className="text-gray-600 mb-5 max-w-md mx-auto text-sm">
            Can't find what you're looking for? Our team is happy to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-xl font-medium hover:opacity-90 transition-opacity text-sm"
          >
            Contact Us
          </Link>
        </div>
      </main>
    </div>
  );
}

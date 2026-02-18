import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { Mail, MessageCircle, Twitter, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact LinkForge – Get Help & Share Feedback",
  description: "Have a question, suggestion, or feedback about LinkForge? Reach out to us. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question, feature request, or just want to say hi? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Contact Info</h2>
              <div className="space-y-4">
                <a
                  href="mailto:iamaaadil@gmail.com"
                  className="flex items-center gap-3 text-gray-600 hover:text-[#0A66C2] transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#0A66C2]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="font-medium text-sm">iamaaadil@gmail.com</p>
                  </div>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-600 hover:text-[#0A66C2] transition-colors"
                >
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                    <Twitter className="w-5 h-5 text-sky-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Twitter / X</p>
                    <p className="font-medium text-sm">@linkforge</p>
                  </div>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Github className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">GitHub</p>
                    <p className="font-medium text-sm">linkforge</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-2">Response Time</h3>
              <p className="text-blue-100 text-sm">We typically respond within 24–48 hours on weekdays.</p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <h3 className="font-bold mb-2">Common Questions?</h3>
                <a href="/faq" className="text-blue-200 hover:text-white text-sm underline">Check our FAQ →</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

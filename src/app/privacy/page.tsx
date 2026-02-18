import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy – LinkForge",
  description: "Learn how LinkForge handles your data. We store everything locally in your browser — no server, no tracking of personal data.",
};

export default function PrivacyPage() {
  const lastUpdated = "January 2025";

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-gradient-to-br from-[#0A66C2] to-[#057642] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-blue-900 mb-2">The Short Version</h2>
          <p className="text-blue-800 text-sm leading-relaxed">
            LinkForge is a free, client-side tool platform. <strong>We do not collect, store, or transmit your personal data to any server.</strong> All data (job applications, content drafts, preferences) is stored only in your browser's localStorage and never leaves your device.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100">
          {[
            {
              title: "1. Information We Collect",
              content: `LinkForge does not collect personal information. Specifically:

• We do not require you to create an account or provide any personal details
• We do not collect your name, email, phone number, or LinkedIn credentials
• We do not track individual users or their behavior across sessions
• We do not store any content you generate using our tools on our servers

The only data that exists is stored locally in your browser (see Section 2).`,
            },
            {
              title: "2. Local Browser Storage",
              content: `Some tools use your browser's localStorage to save your work between sessions. This includes:

• Job Tracker: Your job applications and their status
• Content Calendar: Your scheduled content ideas
• Endorsement Tracker: Your endorsement records
• Admin Settings: Configuration preferences (if you use the admin panel)

This data is stored entirely on your device. It is never sent to our servers. You can clear it at any time by clearing your browser's site data (Settings → Privacy → Clear browsing data).`,
            },
            {
              title: "3. Analytics & Tracking",
              content: `By default, LinkForge does not use any analytics or tracking services.

If the site administrator has enabled Google Analytics or Google AdSense through the admin panel, those services may collect anonymous usage data (page views, browser type, approximate location) according to Google's own Privacy Policy. This data is aggregated and not personally identifiable.

You can opt out of Google Analytics tracking by using browser extensions like uBlock Origin or by enabling "Do Not Track" in your browser.`,
            },
            {
              title: "4. Cookies",
              content: `LinkForge itself does not use cookies. We use browser localStorage instead for any persistent data.

If Google Analytics or AdSense is enabled by the administrator, those services may set their own cookies in accordance with Google's Privacy Policy.`,
            },
            {
              title: "5. Third-Party Services",
              content: `LinkForge may include links to or information about third-party services (LinkedIn, job boards, etc.). We are not responsible for the privacy practices of these external sites. We recommend reviewing their individual privacy policies.`,
            },
            {
              title: "6. Your Data Rights (GDPR)",
              content: `Since we do not store your personal data on our servers, most GDPR rights are automatically fulfilled:

• Right to Access: Your data is in your own browser
• Right to Deletion: Clear your browser's localStorage at any time
• Right to Portability: Some tools (like Content Calendar) offer JSON export
• Right to Correction: Edit your data directly in the tools

If you have questions about data rights or this policy, contact us at iamaaadil@gmail.com.`,
            },
            {
              title: "7. Children's Privacy",
              content: `LinkForge is not directed at children under 13. We do not knowingly collect data from children. If you believe a child has used this platform and you have concerns, please contact us.`,
            },
            {
              title: "8. Changes to This Policy",
              content: `We may update this Privacy Policy from time to time. Changes will be reflected by updating the "Last updated" date at the top of this page. We encourage you to review this policy periodically.`,
            },
            {
              title: "9. Contact",
              content: `If you have any questions about this Privacy Policy, please contact us at iamaaadil@gmail.com or visit our Contact page.`,
            },
          ].map((section, i) => (
            <div key={i} className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
              <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{section.content}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Questions?{" "}
            <Link href="/contact" className="text-[#0A66C2] hover:underline">
              Contact us
            </Link>{" "}
            or read our{" "}
            <Link href="/terms" className="text-[#0A66C2] hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleServicesScript from "@/components/GoogleServicesScript";
import GoogleAdsense from "@/components/GoogleAdsense";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "LinkForge – 40+ Free LinkedIn Tools for Professionals",
    template: "%s | LinkForge",
  },
  description: "LinkForge offers 40+ free LinkedIn tools for students and professionals. Generate headlines, posts, CVs, cover letters, track jobs, create banners, and more — all free, no sign-up required.",
  keywords: ["linkedin tools", "free linkedin tools", "linkedin headline generator", "linkedin post generator", "cv generator", "job tracker", "linkedin profile optimizer", "cover letter generator", "linkedin banner maker"],
  authors: [{ name: "LinkForge" }],
  creator: "LinkForge",
  metadataBase: new URL("https://linkedin-tools-by-claude.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://linkedin-tools-by-claude.vercel.app",
    title: "LinkForge – 40+ Free LinkedIn Tools",
    description: "Optimize your LinkedIn profile, create engaging content, track job applications, and advance your career with 40+ free tools.",
    siteName: "LinkForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkForge – 40+ Free LinkedIn Tools",
    description: "Optimize your LinkedIn profile with 40+ free tools. No sign-up required.",
    creator: "@linkforge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleServicesScript />
      </head>
      <body className={inter.className}>
        <GoogleAdsense />
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

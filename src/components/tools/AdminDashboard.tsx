"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Users, Eye, Clock, TrendingUp, Activity, Globe, 
  ArrowUp, ArrowDown, Settings, LogOut, RefreshCw,
  BarChart3, Monitor, MapPin, ExternalLink, Search,
  Smartphone, Tablet, MonitorSmartphone, FileText, DollarSign, 
  Database, Mail, Plus, Edit, Trash2, Download, Upload, 
  Search as SearchIcon, Users as UsersIcon, CheckCircle, XCircle, 
  AlertCircle, FlaskConical, Search as SeoIcon, Zap, Send,
  Target, TrendingDown, AlertTriangle, Check, Mail as MailIcon,
  PieChart, Calendar, BookOpen, HelpCircle, File, Save, X, MessageSquare, Star, Lightbulb, Archive, Key, MousePointer, Info, HardDrive
} from "lucide-react";

function StarIcon({ className }: { className?: string }) {
  return <Star className={className} />;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "published" | "draft" | "scheduled";
  author: string;
  category: string;
  tags: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: "active" | "inactive";
}

interface StaticPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: "published" | "draft";
  lastUpdated: string;
}

interface SEOConfig {
  page: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
}

interface ToolData {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "enabled" | "disabled";
  views: number;
  uniqueUsers: number;
  avgTime: number;
  conversions: number;
  engagement: number;
  rating: number;
  feedback: number;
  category?: string;
  popularity?: number;
  icon?: string;
}

interface ABTest {
  id: string;
  name: string;
  tool: string;
  status: "draft" | "running" | "completed" | "paused";
  variantA: { name: string; visitors: number; conversions: number };
  variantB: { name: string; visitors: number; conversions: number };
  winner: "A" | "B" | null;
  startDate: string;
  endDate: string | null;
}

interface SEOData {
  keywords: { keyword: string; position: number; impressions: number; clicks: number; change: number }[];
  pages: { page: string; impressions: number; clicks: number; ctr: number; position: number }[];
  sitemaps: { url: string; status: "submitted" | "pending" | "error"; pages: number }[];
  indexing: { indexed: number; pending: number; excluded: number };
}

interface EmailData {
  subscribers: number;
  growth: number;
  campaigns: { name: string; sent: number; opened: number; clicked: number; date: string }[];
  recentSubscribers: { email: string; date: string }[];
}

interface AdData {
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  revenue: number;
  campaigns: { name: string; status: "active" | "paused"; impressions: number; clicks: number; cost: number; revenue: number }[];
}

interface PerformanceData {
  loadTime: number;
  ttfb: number;
  uptime: number;
  errors: number;
  apiLatency: number;
  bandwidth: number;
}

interface AnalyticsData {
  overview: { totalVisitors: number; pageViews: number; avgSessionDuration: number; bounceRate: number; newUsers: number; returningUsers: number; avgPagesPerSession: number; conversionRate: number };
  dailyVisitors: { date: string; visitors: number; pageViews: number }[];
  topTools: { name: string; views: number }[];
  popularPages: { page: string; views: number; uniqueUsers: number; bounceRate: number }[];
  trafficSources: { source: string; sessions: number; percentage: number }[];
  userLocations: { country: string; countryCode: string; sessions: number; percentage: number }[];
  devices: { type: string; sessions: number; percentage: number }[];
  browsers: { name: string; sessions: number; percentage: number }[];
  realtime: { activeUsers: number; pageViews: number; topActivePages: { page: string; users: number }[] };
}

interface UserData {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "guest";
  status: "active" | "inactive";
  joinedAt: string;
  lastActive: string;
}

interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: string;
  page: string;
  timestamp: string;
  device: string;
  location: string;
}

interface PremiumUser {
  id: string;
  name: string;
  email: string;
  plan: "free" | "basic" | "pro" | "enterprise";
  status: "active" | "expired" | "cancelled";
  startDate: string;
  endDate: string | null;
  amount: number;
  paymentMethod: string;
}

interface UserFeedback {
  id: string;
  userId: string;
  userName: string;
  tool: string;
  rating: number;
  comment: string;
  status: "new" | "reviewed" | "resolved";
  createdAt: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  createdAt: string;
}

interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string;
  status: "active" | "unsubscribed";
  subscribedAt: string;
  source: string;
}

interface UserSuggestion {
  id: string;
  userName: string;
  userEmail: string;
  category: "feature" | "bug" | "improvement" | "other";
  title: string;
  description: string;
  status: "new" | "reviewed" | "implemented" | "declined";
  createdAt: string;
}

interface SiteBranding {
  siteName: string;
  siteDescription: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface SocialLinks {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  github: string;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  service: string;
  status: "active" | "inactive";
  createdAt: string;
}

interface EmailSettings {
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
  enableSsl: boolean;
}

interface AdPlacement {
  id: string;
  name: string;
  location: string;
  size: string;
  status: "active" | "paused" | "disabled";
  impressions: number;
  clicks: number;
  revenue: number;
}

interface AffiliateLink {
  id: string;
  program: string;
  product: string;
  url: string;
  clicks: number;
  conversions: number;
  earnings: number;
  status: "active" | "paused";
}

interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  plan: "basic" | "pro" | "enterprise";
  price: number;
  status: "active" | "coming_soon" | "disabled";
  subscribers: number;
  revenue: number;
}

interface ErrorLog {
  id: string;
  level: "error" | "warning" | "info";
  message: string;
  page: string;
  timestamp: string;
  userId: string | null;
}

interface BackupData {
  id: string;
  name: string;
  size: string;
  createdAt: string;
  type: "full" | "partial";
  status: "completed" | "in_progress" | "failed";
}

interface CacheData {
  type: string;
  size: string;
  items: number;
  lastCleared: string;
}

const TABS = {
  OVERVIEW: "overview",
  TOOLS: "tools",
  ANALYTICS: "analytics",
  SEO: "seo",
  EMAIL: "email",
  ADS: "ads",
  PERFORMANCE: "performance",
  USERS: "users",
  USER_ACTIVITY: "user_activity",
  PREMIUM_USERS: "premium_users",
  USER_FEEDBACK: "user_feedback",
  CONTACT_SUBMISSIONS: "contact_submissions",
  NEWSLETTER: "newsletter",
  SUGGESTIONS: "suggestions",
  REVENUE: "revenue",
  CONTENT: "content",
  BLOG: "blog",
  FAQ: "faq",
  STATIC: "static",
  SEO_SETTINGS: "seo_settings",
  SITE_BRANDING: "site_branding",
  SOCIAL_LINKS: "social_links",
  API_KEYS: "api_keys",
  EMAIL_SETTINGS: "email_settings",
  AD_MANAGEMENT: "ad_management",
  AFFILIATE_LINKS: "affiliate_links",
  PREMIUM_FEATURES: "premium_features",
  ERROR_LOGS: "error_logs",
  BACKUP_RESTORE: "backup_restore",
  CACHE_MANAGEMENT: "cache_management",
  DATA: "data"
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(TABS.CONTENT);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tools, setTools] = useState<ToolData[]>([]);
  const [abTests, setAbTests] = useState<ABTest[]>([]);
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [emailData, setEmailData] = useState<EmailData | null>(null);
  const [adData, setAdData] = useState<AdData | null>(null);
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [revenue, setRevenue] = useState<any>(null);
  const [content, setContent] = useState<any>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [staticPages, setStaticPages] = useState<StaticPage[]>([]);
  const [seoConfigs, setSeoConfigs] = useState<SEOConfig[]>([]);
  const [userActivity, setUserActivity] = useState<UserActivity[]>([]);
  const [premiumUsers, setPremiumUsers] = useState<PremiumUser[]>([]);
  const [userFeedback, setUserFeedback] = useState<UserFeedback[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [userSuggestions, setUserSuggestions] = useState<UserSuggestion[]>([]);
  const [siteBranding, setSiteBranding] = useState<SiteBranding>({
    siteName: "LinkForge",
    siteDescription: "Free LinkedIn Tools for Students",
    logoUrl: "",
    faviconUrl: "",
    primaryColor: "#0A66C2",
    secondaryColor: "#7c3aed",
    accentColor: "#057642"
  });
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    github: ""
  });
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    smtpHost: "",
    smtpPort: "587",
    smtpUser: "",
    smtpPassword: "",
    fromEmail: "",
    fromName: "LinkForge",
    enableSsl: true
  });
  const [adPlacements, setAdPlacements] = useState<AdPlacement[]>([]);
  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLink[]>([]);
  const [premiumFeatures, setPremiumFeatures] = useState<PremiumFeature[]>([]);
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [backups, setBackups] = useState<BackupData[]>([]);
  const [caches, setCaches] = useState<CacheData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [showPageModal, setShowPageModal] = useState(false);
  const [editingPage, setEditingPage] = useState<StaticPage | null>(null);
  const [showSeoModal, setShowSeoModal] = useState(false);
  const [editingSeo, setEditingSeo] = useState<SEOConfig | null>(null);
  const [showToolModal, setShowToolModal] = useState(false);
  const [editingTool, setEditingTool] = useState<ToolData | null>(null);
  const [showAbTestModal, setShowAbTestModal] = useState(false);
  const [editingAbTest, setEditingAbTest] = useState<ABTest | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth !== "true") {
      router.push("/settings");
      return;
    }
    setIsAuthenticated(true);
    loadData();
  }, [router]);

  const loadData = () => {
    setAnalytics(generateAnalyticsData());
    
    const storedTools = localStorage.getItem("tools");
    if (storedTools) {
      try {
        setTools(JSON.parse(storedTools));
      } catch {
        setTools(generateToolData());
      }
    } else {
      setTools(generateToolData());
    }
    setAbTests(generateABTests());
    setSeoData(generateSEOData());
    setEmailData(generateEmailData());
    setAdData(generateAdData());
    setPerformanceData(generatePerformanceData());
    setUsers(generateUserData());
    setRevenue(generateRevenueData());
    setContent(generateContentData());
    
    // Load blog posts from Supabase
    supabase.from("blog_posts").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setBlogPosts(data ? data.map(p => ({
        id: p.id, title: p.title, slug: p.slug, excerpt: p.excerpt || "",
        content: p.content || "", status: p.status, author: p.author || "Admin",
        category: p.category || "", tags: p.tags || [], views: p.views || 0,
        createdAt: p.created_at?.split("T")[0] || "", updatedAt: p.updated_at?.split("T")[0] || "",
        imageUrl: p.image_url || ""
      })) : []);
    });

    // Load FAQs from Supabase
    supabase.from("faqs").select("*").order("order", { ascending: true }).then(({ data }) => {
      setFaqs(data ? data.map(f => ({
        id: f.id, question: f.question, answer: f.answer,
        category: f.category || "General", order: f.order || 0, status: f.status
      })) : []);
    });
    
    const storedPages = localStorage.getItem("static_pages");
    if (storedPages) {
      try {
        setStaticPages(JSON.parse(storedPages));
      } catch {
        setStaticPages(generateStaticPages());
      }
    } else {
      setStaticPages(generateStaticPages());
    }
    
    const storedSeo = localStorage.getItem("seo_configs");
    if (storedSeo) {
      try {
        setSeoConfigs(JSON.parse(storedSeo));
      } catch {
        setSeoConfigs(generateSeoConfigs());
      }
    } else {
      setSeoConfigs(generateSeoConfigs());
    }
    setUserActivity(generateUserActivity());
    setPremiumUsers(generatePremiumUsers());
    setUserFeedback(generateUserFeedback());
    setContactSubmissions(generateContactSubmissions());
    setNewsletterSubscribers(generateNewsletterSubscribers());
    setUserSuggestions(generateUserSuggestions());
    setApiKeys(generateApiKeys());
    setAdPlacements(generateAdPlacements());
    setAffiliateLinks(generateAffiliateLinks());
    setPremiumFeatures(generatePremiumFeatures());
    setErrorLogs(generateErrorLogs());
    setBackups(generateBackups());
    setCaches(generateCaches());
    setLoading(false);
  };

  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      setRefreshing(false);
    }, 1000);
  };

  const generateAnalyticsData = (): AnalyticsData => {
    const dailyVisitors = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dailyVisitors.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        visitors: Math.floor(Math.random() * 800) + 200,
        pageViews: Math.floor(Math.random() * 2000) + 500
      });
    }
    return {
      overview: { totalVisitors: 45892, pageViews: 156234, avgSessionDuration: 185, bounceRate: 38.5, newUsers: 28456, returningUsers: 17436, avgPagesPerSession: 3.4, conversionRate: 2.8 },
      dailyVisitors,
      topTools: [
        { name: "Profile Analyzer", views: 12453 },
        { name: "Hook Generator", views: 9823 },
        { name: "Hashtag Generator", views: 8234 },
        { name: "CV Generator", views: 7234 },
        { name: "Post Generator", views: 6543 },
      ],
      popularPages: [
        { page: "/tools/profile-analyzer", views: 12453, uniqueUsers: 8921, bounceRate: 32.5 },
        { page: "/tools/hook-generator", views: 9823, uniqueUsers: 7234, bounceRate: 28.4 },
        { page: "/tools/hashtag-generator", views: 8234, uniqueUsers: 6123, bounceRate: 35.2 },
        { page: "/", views: 15432, uniqueUsers: 12345, bounceRate: 45.6 },
        { page: "/tools", views: 8923, uniqueUsers: 7234, bounceRate: 22.3 }
      ],
      trafficSources: [
        { source: "Google Search", sessions: 18432, percentage: 40.2 },
        { source: "Direct", sessions: 9234, percentage: 20.1 },
        { source: "Social Media", sessions: 7234, percentage: 15.8 },
        { source: "Referral", sessions: 5632, percentage: 12.3 },
        { source: "Email", sessions: 2876, percentage: 6.3 },
        { source: "Paid Ads", sessions: 2484, percentage: 5.4 }
      ],
      userLocations: [
        { country: "United States", countryCode: "US", sessions: 18432, percentage: 40.2 },
        { country: "India", countryCode: "IN", sessions: 8234, percentage: 17.9 },
        { country: "United Kingdom", countryCode: "GB", sessions: 4523, percentage: 9.9 },
        { country: "Germany", countryCode: "DE", sessions: 3245, percentage: 7.1 },
        { country: "Canada", countryCode: "CA", sessions: 2890, percentage: 6.3 },
      ],
      devices: [
        { type: "Desktop", sessions: 28456, percentage: 62.0 },
        { type: "Mobile", sessions: 14321, percentage: 31.2 },
        { type: "Tablet", sessions: 3115, percentage: 6.8 }
      ],
      browsers: [
        { name: "Chrome", sessions: 31234, percentage: 68.1 },
        { name: "Safari", sessions: 8234, percentage: 17.9 },
        { name: "Edge", sessions: 3245, percentage: 7.1 },
        { name: "Firefox", sessions: 2134, percentage: 4.6 },
      ],
      realtime: { activeUsers: 127, pageViews: 342, topActivePages: [
        { page: "/tools/profile-analyzer", users: 45 },
        { page: "/tools/hook-generator", users: 32 },
        { page: "/tools/cv-generator", users: 28 },
        { page: "/", users: 22 }
      ]}
    };
  };

  const generateToolData = (): ToolData[] => [
    { id: "1", name: "Profile Analyzer", slug: "profile-analyzer", description: "Analyze your LinkedIn profile with actionable tips", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Profile", popularity: 100, icon: "analyzer" },
    { id: "2", name: "Hook Generator", slug: "hook-generator", description: "Create attention-grabbing hooks for your posts", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Content", popularity: 95, icon: "hook" },
    { id: "3", name: "Hashtag Generator", slug: "hashtag-generator", description: "Generate relevant hashtags for your content", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Content", popularity: 90, icon: "hashtag" },
    { id: "4", name: "CV Generator", slug: "cv-generator", description: "Create professional CVs in minutes", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Career", popularity: 95, icon: "cv" },
    { id: "5", name: "Post Generator", slug: "post-generator", description: "Generate complete LinkedIn posts", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Content", popularity: 90, icon: "post" },
    { id: "6", name: "Content Calendar", slug: "content-calendar", description: "Plan and organize your content schedule", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Content", popularity: 85, icon: "calendar" },
    { id: "7", name: "Banner Maker", slug: "banner-maker", description: "Create stunning LinkedIn banners", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Design", popularity: 80, icon: "banner" },
    { id: "8", name: "Cover Letter Generator", slug: "cover-letter-generator", description: "Write professional cover letters", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Career", popularity: 88, icon: "letter" },
    { id: "9", name: "Headline Generator", slug: "headline-generator", description: "Create catchy LinkedIn headlines", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Profile", popularity: 92, icon: "headline" },
    { id: "10", name: "Caption Generator", slug: "caption-generator", description: "Generate engaging captions", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Content", popularity: 88, icon: "caption" },
    { id: "11", name: "Post Writer", slug: "post-writer", description: "Write professional LinkedIn posts", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Content", popularity: 90, icon: "writer" },
    { id: "12", name: "InMail Generator", slug: "inmail-generator", description: "Create effective LinkedIn messages", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Messaging", popularity: 85, icon: "mail" },
    { id: "13", name: "Connection Request Generator", slug: "connection-request-generator", description: "Write personalized connection requests", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Networking", popularity: 82, icon: "connect" },
    { id: "14", name: "Follow Up Message", slug: "follow-up-message", description: "Create follow-up messages", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Messaging", popularity: 80, icon: "followup" },
    { id: "15", name: "Thank You Message", slug: "thank-you-message", description: "Send professional thank you messages", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Messaging", popularity: 78, icon: "thankyou" },
    { id: "16", name: "Welcome Message", slug: "welcome-message", description: "Create welcome messages for new connections", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Messaging", popularity: 75, icon: "welcome" },
    { id: "17", name: "Post Comment Generator", slug: "post-comment-generator", description: "Generate engaging comments", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Engagement", popularity: 77, icon: "comment" },
    { id: "18", name: "Job Tracker", slug: "job-tracker", description: "Track your job applications", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Career", popularity: 85, icon: "job" },
    { id: "19", name: "Skills Analyzer", slug: "skills-analyzer", description: "Analyze and improve your skills section", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Profile", popularity: 80, icon: "skills" },
    { id: "20", name: "Profile Checklist", slug: "profile-checklist", description: "Complete LinkedIn profile checklist", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Profile", popularity: 88, icon: "checklist" },
    { id: "21", name: "Summary Generator", slug: "summary-generator", description: "Create compelling profile summaries", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Profile", popularity: 86, icon: "summary" },
    { id: "22", name: "Endorsement Tracker", slug: "endorsement-tracker", description: "Track your skill endorsements", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Profile", popularity: 72, icon: "endorse" },
    { id: "23", name: "Recommendation Request", slug: "recommendation-request", description: "Request professional recommendations", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Profile", popularity: 75, icon: "recommend" },
    { id: "24", name: "Salary Research", slug: "salary-research", description: "Research salary data", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Career", popularity: 78, icon: "salary" },
    { id: "25", name: "Company Research", slug: "company-research", description: "Research companies you're interested in", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Career", popularity: 80, icon: "company" },
    { id: "26", name: "Banner Ideas", slug: "banner-ideas", description: "Get banner design ideas", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Design", popularity: 75, icon: "ideas" },
    { id: "27", name: "About Writer", slug: "about-writer", description: "Write your About section", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Profile", popularity: 84, icon: "about" },
    { id: "28", name: "CTA Generator", slug: "cta-generator", description: "Create call-to-action buttons", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Content", popularity: 73, icon: "cta" },
    { id: "29", name: "Brand Statement", slug: "brand-statement", description: "Create your brand statement", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Profile", popularity: 76, icon: "brand" },
    { id: "30", name: "Interview Questions Generator", slug: "interview-questions-generator", description: "Generate common interview questions", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Career", popularity: 82, icon: "interview" },
    { id: "31", name: "Poll Questions Generator", slug: "poll-questions-generator", description: "Create engaging poll questions", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Engagement", popularity: 74, icon: "poll" },
    { id: "32", name: "Message Generator", slug: "message-generator", description: "Generate personalized messages", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Messaging", popularity: 83, icon: "message" },
    { id: "33", name: "Keyword Optimizer", slug: "keyword-optimizer", description: "Optimize your profile keywords", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "SEO", popularity: 71, icon: "keyword" },
    { id: "34", name: "Headline Optimizer", slug: "headline-optimizer", description: "Optimize your LinkedIn headline", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Profile", popularity: 79, icon: "headline" },
    { id: "35", name: "Custom URL Optimizer", slug: "custom-url-optimizer", description: "Create custom LinkedIn URL", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Profile", popularity: 68, icon: "url" },
    { id: "36", name: "Post Preview", slug: "post-preview", description: "Preview your LinkedIn post", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Content", popularity: 70, icon: "preview" },
    { id: "37", name: "Profile to PDF", slug: "profile-to-pdf", description: "Export profile as PDF", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Profile", popularity: 81, icon: "pdf" },
    { id: "38", name: "Readability Checker", slug: "readability-checker", description: "Check content readability", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Content", popularity: 65, icon: "readability" },
    { id: "39", name: "Text Formatter", slug: "text-formatter", description: "Format your text beautifully", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Content", popularity: 72, icon: "format" },
    { id: "40", name: "Character Counter", slug: "character-counter", description: "Count characters in your content", status: "enabled", views: 0, uniqueUsers: 0, avgTime: 0, conversions: 0, engagement: 0, rating: 0, feedback: 0, category: "Content", popularity: 60, icon: "counter" },
  ];

  const generateABTests = (): ABTest[] => [
    { id: "1", name: "Hook Generator Color Test", tool: "hook-generator", status: "running", variantA: { name: "Blue Theme", visitors: 1234, conversions: 89 }, variantB: { name: "Purple Theme", visitors: 1256, conversions: 102 }, winner: null, startDate: "2024-08-01", endDate: null },
    { id: "2", name: "CV Template Test", tool: "cv-generator", status: "completed", variantA: { name: "Modern Template", visitors: 2345, conversions: 345 }, variantB: { name: "Classic Template", visitors: 2289, conversions: 298 }, winner: "A", startDate: "2024-07-15", endDate: "2024-07-30" },
  ];

  const generateSEOData = (): SEOData => ({
    keywords: [
      { keyword: "linkedin tools free", position: 3, impressions: 12453, clicks: 892, change: 2 },
      { keyword: "linkedin profile analyzer", position: 5, impressions: 8234, clicks: 543, change: -1 },
      { keyword: "linkedin cv generator", position: 2, impressions: 6543, clicks: 654, change: 3 },
    ],
    pages: [
      { page: "/tools/profile-analyzer", impressions: 45321, clicks: 2341, ctr: 5.2, position: 3.2 },
      { page: "/tools/hook-generator", impressions: 34567, clicks: 1876, ctr: 5.4, position: 4.1 },
    ],
    sitemaps: [
      { url: "/sitemap.xml", status: "submitted", pages: 47 },
      { url: "/sitemap-tools.xml", status: "submitted", pages: 45 },
    ],
    indexing: { indexed: 47, pending: 3, excluded: 5 }
  });

  const generateEmailData = (): EmailData => ({
    subscribers: 2847,
    growth: 12.5,
    campaigns: [
      { name: "New Tool Launch", sent: 2500, opened: 1125, clicked: 234, date: "2024-08-10" },
      { name: "Weekly Tips", sent: 2700, opened: 1485, clicked: 456, date: "2024-08-05" },
    ],
    recentSubscribers: [
      { email: "john@example.com", date: "2024-08-15" },
      { email: "sarah@example.com", date: "2024-08-14" },
    ]
  });

  const generateAdData = (): AdData => ({
    impressions: 156234,
    clicks: 4532,
    ctr: 2.9,
    cpc: 0.45,
    revenue: 1234.56,
    campaigns: [
      { name: "LinkedIn Tools Promo", status: "active", impressions: 65432, clicks: 2134, cost: 543, revenue: 654 },
      { name: "CV Generator Ads", status: "active", impressions: 45678, clicks: 1456, cost: 432, revenue: 387 },
    ]
  });

  const generatePerformanceData = (): PerformanceData => ({
    loadTime: 1.2,
    ttfb: 245,
    uptime: 99.98,
    errors: 12,
    apiLatency: 89,
    bandwidth: 2.4
  });

  const generateUserData = (): UserData[] => [
    { id: "1", email: "iamaaadil@gmail.com", name: "Adil", role: "admin", status: "active", joinedAt: "2024-01-15", lastActive: "Just now" },
    { id: "2", email: "john@example.com", name: "John Smith", role: "user", status: "active", joinedAt: "2024-06-20", lastActive: "2 hours ago" },
    { id: "3", email: "sarah@example.com", name: "Sarah Johnson", role: "user", status: "active", joinedAt: "2024-07-05", lastActive: "1 day ago" },
    { id: "4", email: "mike@example.com", name: "Mike Brown", role: "user", status: "inactive", joinedAt: "2024-03-12", lastActive: "30 days ago" },
  ];

  const generateRevenueData = () => ({
    adsense: { today: 12.45, month: 342.67, year: 2847.23 },
    total: { today: 12.45, month: 342.67, year: 2847.23 }
  });

  const generateContentData = () => ({
    tools: [
      { name: "Profile Analyzer", slug: "profile-analyzer", status: "published", views: 12453 },
      { name: "Hook Generator", slug: "hook-generator", status: "published", views: 9823 },
      { name: "Hashtag Generator", slug: "hashtag-generator", status: "published", views: 8234 },
      { name: "Post Writer", slug: "post-writer", status: "published", views: 7823 },
      { name: "Caption Generator", slug: "caption-generator", status: "published", views: 6543 },
      { name: "Headline Generator", slug: "headline-generator", status: "published", views: 5987 },
      { name: "Post Generator", slug: "post-generator", status: "published", views: 5432 },
      { name: "InMail Generator", slug: "inmail-generator", status: "published", views: 4876 },
      { name: "Connection Request Generator", slug: "connection-request-generator", status: "published", views: 4321 },
      { name: "Follow Up Message", slug: "follow-up-message", status: "published", views: 3987 },
      { name: "Thank You Message", slug: "thank-you-message", status: "published", views: 3543 },
      { name: "Welcome Message", slug: "welcome-message", status: "published", views: 3210 },
      { name: "Post Comment Generator", slug: "post-comment-generator", status: "published", views: 2987 },
      { name: "Cover Letter Generator", slug: "cover-letter-generator", status: "published", views: 2765 },
      { name: "CV Generator", slug: "cv-generator", status: "published", views: 2543 },
      { name: "Job Tracker", slug: "job-tracker", status: "published", views: 2321 },
      { name: "Skills Analyzer", slug: "skills-analyzer", status: "published", views: 2109 },
      { name: "Profile Checklist", slug: "profile-checklist", status: "published", views: 1987 },
      { name: "Summary Generator", slug: "summary-generator", status: "published", views: 1876 },
      { name: "Endorsement Tracker", slug: "endorsement-tracker", status: "published", views: 1654 },
      { name: "Recommendation Request", slug: "recommendation-request", status: "published", views: 1543 },
      { name: "Salary Research", slug: "salary-research", status: "published", views: 1432 },
      { name: "Company Research", slug: "company-research", status: "published", views: 1321 },
      { name: "Content Calendar", slug: "content-calendar", status: "published", views: 1210 },
      { name: "Banner Maker", slug: "banner-maker", status: "published", views: 1098 },
      { name: "Banner Ideas", slug: "banner-ideas", status: "published", views: 987 },
      { name: "About Writer", slug: "about-writer", status: "published", views: 876 },
      { name: "CTA Generator", slug: "cta-generator", status: "published", views: 765 },
      { name: "Brand Statement", slug: "brand-statement", status: "published", views: 654 },
      { name: "Interview Questions Generator", slug: "interview-questions-generator", status: "published", views: 543 },
      { name: "Poll Questions Generator", slug: "poll-questions-generator", status: "published", views: 432 },
      { name: "Message Generator", slug: "message-generator", status: "published", views: 421 },
      { name: "Keyword Optimizer", slug: "keyword-optimizer", status: "published", views: 410 },
      { name: "Headline Optimizer", slug: "headline-optimizer", status: "published", views: 398 },
      { name: "Custom URL Optimizer", slug: "custom-url-optimizer", status: "published", views: 387 },
      { name: "Post Preview", slug: "post-preview", status: "published", views: 376 },
      { name: "Profile to PDF", slug: "profile-to-pdf", status: "published", views: 365 },
      { name: "Readability Checker", slug: "readability-checker", status: "published", views: 354 },
      { name: "Text Formatter", slug: "text-formatter", status: "published", views: 343 },
    ],
    pages: [
      { name: "Home", slug: "/", status: "published" },
      { name: "All Tools", slug: "/tools", status: "published" },
      { name: "About", slug: "/about", status: "published" },
    ],
    blogPosts: [
      { title: "10 Tips for LinkedIn Success", slug: "10-tips-linkedin", status: "published", date: "2024-08-15" },
    ]
  });

  const generateBlogPosts = (): BlogPost[] => [
    { id: "1", title: "10 Tips for LinkedIn Success in 2024", slug: "10-tips-linkedin-2024", excerpt: "Master LinkedIn with these proven strategies...", content: "...", status: "published", author: "Admin", category: "Career", tags: ["linkedin", "career"], views: 5423, createdAt: "2024-08-15", updatedAt: "2024-08-15" },
    { id: "2", title: "How to Write the Perfect LinkedIn Bio", slug: "perfect-linkedin-bio", excerpt: "Your bio is your first impression...", content: "...", status: "published", author: "Admin", category: "Tips", tags: ["bio", "profile"], views: 3212, createdAt: "2024-08-10", updatedAt: "2024-08-12" },
    { id: "3", title: "LinkedIn Algorithm Explained", slug: "linkedin-algorithm-explained", excerpt: "Understanding how LinkedIn's algorithm works...", content: "...", status: "draft", author: "Admin", category: "Insights", tags: ["algorithm", "tips"], views: 0, createdAt: "2024-08-20", updatedAt: "2024-08-20" },
    { id: "4", title: "Best Times to Post on LinkedIn", slug: "best-times-to-post", excerpt: "Maximize your reach with optimal posting times...", content: "...", status: "published", author: "Admin", category: "Strategy", tags: ["timing", "engagement"], views: 2156, createdAt: "2024-08-05", updatedAt: "2024-08-05" },
  ];

  const generateFaqs = (): FAQ[] => [
    { id: "1", question: "Are these tools really free?", answer: "Yes! All LinkedIn tools on LinkForge are 100% free for students.", category: "General", order: 1, status: "active" },
    { id: "2", question: "How do I use the CV Generator?", answer: "Simply fill in your details, choose a template, and download your CV.", category: "Tools", order: 2, status: "active" },
    { id: "3", question: "Can I export my data?", answer: "Yes, you can export your job applications and tracked data.", category: "Features", order: 3, status: "active" },
    { id: "4", question: "Is my data secure?", answer: "We don't store your personal data. All processing happens in your browser.", category: "Privacy", order: 4, status: "active" },
  ];

  const generateStaticPages = (): StaticPage[] => [
    { id: "1", title: "Home", slug: "/", content: "...", status: "published", lastUpdated: "2024-08-01" },
    { id: "2", title: "All Tools", slug: "/tools", content: "...", status: "published", lastUpdated: "2024-08-01" },
    { id: "3", title: "About Us", slug: "/about", content: "...", status: "published", lastUpdated: "2024-07-15" },
    { id: "4", title: "Contact", slug: "/contact", content: "...", status: "published", lastUpdated: "2024-07-15" },
    { id: "5", title: "Privacy Policy", slug: "/privacy", content: "...", status: "published", lastUpdated: "2024-06-01" },
    { id: "6", title: "Terms of Service", slug: "/terms", content: "...", status: "published", lastUpdated: "2024-06-01" },
    { id: "7", title: "FAQ", slug: "/faq", content: "...", status: "published", lastUpdated: "2024-07-20" },
  ];

  const generateSeoConfigs = (): SEOConfig[] => [
    { page: "Home", title: "LinkForge - Free LinkedIn Tools for Students", description: "Supercharge your LinkedIn with free tools", keywords: ["linkedin tools", "free linkedin", "students"], ogImage: "/og-home.jpg" },
    { page: "Tools", title: "All LinkedIn Tools - Free & Easy to Use", description: "Browse our collection of free LinkedIn tools", keywords: ["linkedin tools", "free tools"], ogImage: "/og-tools.jpg" },
    { page: "Profile Analyzer", title: "Free LinkedIn Profile Analyzer", description: "Analyze and improve your LinkedIn profile", keywords: ["profile analyzer", "linkedin optimization"], ogImage: "/og-analyzer.jpg" },
  ];

  const generateUserActivity = (): UserActivity[] => [
    { id: "1", userId: "u1", userName: "John Smith", userEmail: "john@example.com", action: "Used CV Generator", page: "/tools/cv-generator", timestamp: "2 min ago", device: "Desktop", location: "New York, US" },
    { id: "2", userId: "u2", userName: "Sarah Johnson", userEmail: "sarah@example.com", action: "Viewed Profile Analyzer", page: "/tools/profile-analyzer", timestamp: "5 min ago", device: "Mobile", location: "London, UK" },
    { id: "3", userId: "u3", userName: "Mike Brown", userEmail: "mike@example.com", action: "Generated Hooks", page: "/tools/hook-generator", timestamp: "10 min ago", device: "Tablet", location: "Berlin, DE" },
    { id: "4", userId: "u1", userName: "John Smith", userEmail: "john@example.com", action: "Downloaded CV", page: "/tools/cv-generator", timestamp: "15 min ago", device: "Desktop", location: "New York, US" },
    { id: "5", userId: "u4", userName: "Emma Wilson", userEmail: "emma@example.com", action: "Used Content Calendar", page: "/tools/content-calendar", timestamp: "20 min ago", device: "Mobile", location: "Toronto, CA" },
    { id: "6", userId: "u5", userName: "David Lee", userEmail: "david@example.com", action: "Viewed Hashtag Generator", page: "/tools/hashtag-generator", timestamp: "25 min ago", device: "Desktop", location: "Sydney, AU" },
    { id: "7", userId: "u2", userName: "Sarah Johnson", userEmail: "sarah@example.com", action: "Created Cover Letter", page: "/tools/cover-letter-generator", timestamp: "30 min ago", device: "Desktop", location: "London, UK" },
    { id: "8", userId: "u6", userName: "Lisa Chen", userEmail: "lisa@example.com", action: "Used Post Generator", page: "/tools/post-generator", timestamp: "35 min ago", device: "Mobile", location: "Singapore, SG" },
  ];

  const generatePremiumUsers = (): PremiumUser[] => [
    { id: "1", name: "John Smith", email: "john@company.com", plan: "pro", status: "active", startDate: "2024-06-15", endDate: "2024-09-15", amount: 29.99, paymentMethod: "Credit Card" },
    { id: "2", name: "Sarah Johnson", email: "sarah@company.com", plan: "enterprise", status: "active", startDate: "2024-05-01", endDate: "2025-05-01", amount: 99.99, paymentMethod: "PayPal" },
    { id: "3", name: "Mike Brown", email: "mike@company.com", plan: "basic", status: "active", startDate: "2024-07-20", endDate: "2024-10-20", amount: 9.99, paymentMethod: "Credit Card" },
    { id: "4", name: "Emma Wilson", email: "emma@company.com", plan: "pro", status: "expired", startDate: "2024-01-15", endDate: "2024-07-15", amount: 29.99, paymentMethod: "Credit Card" },
    { id: "5", name: "David Lee", email: "david@company.com", plan: "enterprise", status: "active", startDate: "2024-08-01", endDate: "2025-08-01", amount: 99.99, paymentMethod: "Bank Transfer" },
  ];

  const generateUserFeedback = (): UserFeedback[] => [
    { id: "1", userId: "u1", userName: "John Smith", tool: "CV Generator", rating: 5, comment: "Amazing tool! Saved me so much time.", status: "reviewed", createdAt: "2024-08-15" },
    { id: "2", userId: "u2", userName: "Sarah Johnson", tool: "Profile Analyzer", rating: 4, comment: "Great insights, but would love more features.", status: "new", createdAt: "2024-08-14" },
    { id: "3", userId: "u3", userName: "Mike Brown", tool: "Hook Generator", rating: 5, comment: "The hooks are so creative! Best tool ever.", status: "reviewed", createdAt: "2024-08-13" },
    { id: "4", userId: "u4", userName: "Emma Wilson", tool: "Content Calendar", rating: 3, comment: "Good but needs more customization.", status: "resolved", createdAt: "2024-08-12" },
    { id: "5", userId: "u5", userName: "David Lee", tool: "Post Generator", rating: 4, comment: "Very useful for content creation.", status: "new", createdAt: "2024-08-11" },
    { id: "6", userId: "u6", userName: "Lisa Chen", tool: "Cover Letter Generator", rating: 5, comment: "Helped me land my dream job!", status: "reviewed", createdAt: "2024-08-10" },
  ];

  const generateContactSubmissions = (): ContactSubmission[] => [
    { id: "1", name: "John Smith", email: "john@example.com", subject: "Feature Request", message: "Would love to see an AI-powered resume builder!", status: "read", createdAt: "2024-08-15" },
    { id: "2", name: "Sarah Johnson", email: "sarah@example.com", subject: "Bug Report", message: "The CV generator is not working on mobile.", status: "new", createdAt: "2024-08-14" },
    { id: "3", name: "Mike Brown", email: "mike@example.com", subject: "Partnership Inquiry", message: "We would like to partner with LinkForge.", status: "replied", createdAt: "2024-08-13" },
    { id: "4", name: "Emma Wilson", email: "emma@example.com", subject: "General Question", message: "How can I use these tools for my business?", status: "read", createdAt: "2024-08-12" },
    { id: "5", name: "David Lee", email: "david@example.com", subject: "Feedback", message: "Great platform! Love the new features.", status: "archived", createdAt: "2024-08-11" },
  ];

  const generateNewsletterSubscribers = (): NewsletterSubscriber[] => [
    { id: "1", email: "john@example.com", name: "John Smith", status: "active", subscribedAt: "2024-07-01", source: "Website" },
    { id: "2", email: "sarah@example.com", name: "Sarah Johnson", status: "active", subscribedAt: "2024-07-05", source: "Blog" },
    { id: "3", email: "mike@example.com", name: "Mike Brown", status: "active", subscribedAt: "2024-07-10", source: "Tool Page" },
    { id: "4", email: "emma@example.com", name: "Emma Wilson", status: "active", subscribedAt: "2024-07-15", source: "Website" },
    { id: "5", email: "david@example.com", name: "David Lee", status: "unsubscribed", subscribedAt: "2024-07-20", source: "Blog" },
    { id: "6", email: "lisa@example.com", name: "Lisa Chen", status: "active", subscribedAt: "2024-08-01", source: "Tool Page" },
    { id: "7", email: "tom@example.com", name: "Tom Wilson", status: "active", subscribedAt: "2024-08-05", source: "Website" },
  ];

  const generateUserSuggestions = (): UserSuggestion[] => [
    { id: "1", userName: "John Smith", userEmail: "john@example.com", category: "feature", title: "Add AI-powered writing assistant", description: "It would be amazing to have an AI assistant to help write better content.", status: "reviewed", createdAt: "2024-08-15" },
    { id: "2", userName: "Sarah Johnson", userEmail: "sarah@example.com", category: "bug", title: "Fix export issue", description: "PDF export crashes on Safari browser.", status: "implemented", createdAt: "2024-08-14" },
    { id: "3", userName: "Mike Brown", userEmail: "mike@example.com", category: "improvement", title: "More templates", description: "Please add more CV templates for different industries.", status: "new", createdAt: "2024-08-13" },
    { id: "4", userName: "Emma Wilson", userEmail: "emma@example.com", category: "feature", title: "Mobile app", description: "Would love a mobile app for easier access.", status: "new", createdAt: "2024-08-12" },
    { id: "5", userName: "David Lee", userEmail: "david@example.com", category: "other", title: "Dark mode", description: "Dark mode would be easier on the eyes.", status: "declined", createdAt: "2024-08-11" },
  ];

  const generateApiKeys = (): ApiKey[] => [
    { id: "1", name: "OpenAI API", key: "sk-...xxxx", service: "AI Generation", status: "active", createdAt: "2024-08-01" },
    { id: "2", name: "Google Analytics", key: "GA-XXXXX-X", service: "Analytics", status: "active", createdAt: "2024-07-15" },
    { id: "3", name: "AdSense", key: "ca-pub-XXXXX", service: "Advertising", status: "active", createdAt: "2024-07-20" },
    { id: "4", name: "Serper API", key: "serper_...xxxx", service: "Search", status: "inactive", createdAt: "2024-06-10" },
  ];

  const generateAdPlacements = (): AdPlacement[] => [
    { id: "1", name: "Header Banner", location: "Top of all pages", size: "728x90", status: "active", impressions: 125000, clicks: 2500, revenue: 450 },
    { id: "2", name: "Sidebar Ads", location: "Tool pages sidebar", size: "300x250", status: "active", impressions: 85000, clicks: 1800, revenue: 320 },
    { id: "3", name: "Between Tools", location: "Between tool listings", size: "728x90", status: "active", impressions: 65000, clicks: 980, revenue: 180 },
    { id: "4", name: "Footer Banner", location: "Bottom of all pages", size: "728x90", status: "paused", impressions: 45000, clicks: 650, revenue: 95 },
    { id: "5", name: "Interstitial", location: "Between page navigations", size: "320x480", status: "active", impressions: 35000, clicks: 1200, revenue: 280 },
  ];

  const generateAffiliateLinks = (): AffiliateLink[] => [
    { id: "1", program: "Amazon Associates", product: "Books & Courses", url: "amazon.com/...", clicks: 3250, conversions: 45, earnings: 340, status: "active" },
    { id: "2", program: "Udemy", product: "Online Courses", url: "udemy.com/...", clicks: 2100, conversions: 28, earnings: 420, status: "active" },
    { id: "3", program: "LinkedIn Premium", product: "Premium Subscription", url: "linkedin.com/...", clicks: 1850, conversions: 12, earnings: 580, status: "active" },
    { id: "4", program: "Canva Pro", product: "Design Tools", url: "canva.com/...", clicks: 980, conversions: 8, earnings: 120, status: "active" },
    { id: "5", program: "Notion", product: "Productivity Tools", url: "notion.so/...", clicks: 750, conversions: 5, earnings: 85, status: "paused" },
  ];

  const generatePremiumFeatures = (): PremiumFeature[] => [
    { id: "1", name: "AI Content Writer", description: "Advanced AI-powered content generation", plan: "pro", price: 9.99, status: "active", subscribers: 156, revenue: 1558 },
    { id: "2", name: "Unlimited Exports", description: "Export unlimited PDFs and documents", plan: "basic", price: 4.99, status: "active", subscribers: 289, revenue: 1442 },
    { id: "3", name: "Priority Support", description: "Get priority customer support", plan: "pro", price: 14.99, status: "active", subscribers: 45, revenue: 674 },
    { id: "4", name: "Custom Branding", description: "Remove LinkForge watermark", plan: "enterprise", price: 29.99, status: "active", subscribers: 23, revenue: 689 },
    { id: "5", name: "API Access", description: "Access to LinkedIn Tools API", plan: "enterprise", price: 49.99, status: "coming_soon", subscribers: 0, revenue: 0 },
    { id: "6", name: "Team Collaboration", description: "Work with your team", plan: "enterprise", price: 19.99, status: "coming_soon", subscribers: 0, revenue: 0 },
  ];

  const generateErrorLogs = (): ErrorLog[] => [
    { id: "1", level: "error", message: "Failed to load CV template", page: "/tools/cv-generator", timestamp: "2024-08-15 14:32:15", userId: "u123" },
    { id: "2", level: "warning", message: "Slow API response", page: "/tools/post-generator", timestamp: "2024-08-15 14:28:45", userId: null },
    { id: "3", level: "error", message: "PDF export failed", page: "/tools/profile-to-pdf", timestamp: "2024-08-15 13:45:22", userId: "u456" },
    { id: "4", level: "info", message: "New user registered", page: "/", timestamp: "2024-08-15 13:12:00", userId: null },
    { id: "5", level: "warning", message: "High memory usage", page: "/admin", timestamp: "2024-08-15 12:30:10", userId: null },
    { id: "6", level: "error", message: "API rate limit exceeded", page: "/tools/hook-generator", timestamp: "2024-08-15 11:55:33", userId: "u789" },
    { id: "7", level: "info", message: "Backup completed", page: "/admin", timestamp: "2024-08-15 10:00:00", userId: null },
  ];

  const generateBackups = (): BackupData[] => [
    { id: "1", name: "Full Backup - Aug 15", size: "2.4 GB", createdAt: "2024-08-15 10:00:00", type: "full", status: "completed" },
    { id: "2", name: "Partial Backup - Aug 14", size: "156 MB", createdAt: "2024-08-14 10:00:00", type: "partial", status: "completed" },
    { id: "3", name: "Full Backup - Aug 13", size: "2.3 GB", createdAt: "2024-08-13 10:00:00", type: "full", status: "completed" },
    { id: "4", name: "Partial Backup - Aug 12", size: "142 MB", createdAt: "2024-08-12 10:00:00", type: "partial", status: "completed" },
    { id: "5", name: "Full Backup - Aug 11", size: "2.2 GB", createdAt: "2024-08-11 10:00:00", type: "full", status: "completed" },
  ];

  const generateCaches = (): CacheData[] => [
    { type: "User Sessions", size: "45 MB", items: 1234, lastCleared: "2024-08-15 08:00:00" },
    { type: "API Responses", size: "128 MB", items: 5678, lastCleared: "2024-08-15 08:00:00" },
    { type: "Static Assets", size: "89 MB", items: 234, lastCleared: "2024-08-15 08:00:00" },
    { type: "Database Queries", size: "34 MB", items: 8901, lastCleared: "2024-08-15 08:00:00" },
    { type: "Images", size: "256 MB", items: 456, lastCleared: "2024-08-15 08:00:00" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/");
  };

  const toggleToolStatus = (id: string) => {
    const updated = tools.map(tool => 
      tool.id === id ? { ...tool, status: tool.status === "enabled" ? "disabled" as const : "enabled" as const } : tool
    );
    setTools(updated);
    localStorage.setItem("tools", JSON.stringify(updated));
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Manage your LinkedIn tools platform</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={refreshData} disabled={refreshing} className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} /> Refresh
            </button>
            <button onClick={() => router.push("/settings")} className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
              <Settings className="w-4 h-4" /> Settings
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: TABS.CONTENT, label: "📝 Content" },
            { id: TABS.BLOG, label: "📄 Blog" },
            { id: TABS.FAQ, label: "❓ FAQ" },
            { id: TABS.STATIC, label: "📃 Pages" },
            { id: TABS.SEO_SETTINGS, label: "⚙️ SEO" },
            { id: TABS.TOOLS, label: "🔧 Tools" },
            { id: TABS.USERS, label: "👥 Users" },
            { id: TABS.USER_ACTIVITY, label: "👁️ Activity" },
            { id: TABS.PREMIUM_USERS, label: "⭐ Premium" },
            { id: TABS.USER_FEEDBACK, label: "💬 Feedback" },
            { id: TABS.CONTACT_SUBMISSIONS, label: "📩 Contact" },
            { id: TABS.NEWSLETTER, label: "📧 Newsletter" },
            { id: TABS.SUGGESTIONS, label: "💡 Suggestions" },
            { id: TABS.OVERVIEW, label: "📊 Overview" },
            { id: TABS.ANALYTICS, label: "📈 Analytics" },
            { id: TABS.REVENUE, label: "💰 Revenue" },
            { id: TABS.SEO, label: "🔍 SEO" },
            { id: TABS.EMAIL, label: "📧 Email" },
            { id: TABS.ADS, label: "📢 Ads" },
            { id: TABS.PERFORMANCE, label: "⚡ Performance" },
            { id: TABS.DATA, label: "💾 Data" },
            { id: TABS.SITE_BRANDING, label: "🎨 Branding" },
            { id: TABS.SOCIAL_LINKS, label: "🔗 Social" },
            { id: TABS.API_KEYS, label: "🔑 API Keys" },
            { id: TABS.EMAIL_SETTINGS, label: "✉️ Email" },
            { id: TABS.AD_MANAGEMENT, label: "📺 Ads" },
            { id: TABS.AFFILIATE_LINKS, label: "🔗 Affiliate" },
            { id: TABS.PREMIUM_FEATURES, label: "💎 Premium" },
            { id: TABS.ERROR_LOGS, label: "⚠️ Errors" },
            { id: TABS.BACKUP_RESTORE, label: "💾 Backup" },
            { id: TABS.CACHE_MANAGEMENT, label: "🗑️ Cache" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                activeTab === tab.id ? "bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === TABS.OVERVIEW && analytics && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Visitors", value: analytics.overview.totalVisitors.toLocaleString(), icon: Users, change: "+12.5%", up: true },
                { label: "Page Views", value: analytics.overview.pageViews.toLocaleString(), icon: Eye, change: "+8.2%", up: true },
                { label: "Avg. Session", value: `${Math.floor(analytics.overview.avgSessionDuration / 60)}m`, icon: Clock, change: "+5.1%", up: true },
                { label: "Bounce Rate", value: `${analytics.overview.bounceRate}%`, icon: Activity, change: "-2.3%", up: false }
              ].map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] rounded-xl flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${stat.up ? "text-green-400" : "text-red-400"}`}>
                      {stat.up ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-6">Daily Visitors (Last 30 Days)</h3>
                <div className="flex items-end justify-between h-48 gap-1">
                  {analytics.dailyVisitors.slice(-14).map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-gradient-to-t from-[#0A66C2] to-[#7c3aed] rounded-t-lg" style={{ height: `${(day.visitors / 1000) * 100}%`, minHeight: "4px" }} />
                      <span className="text-gray-500 text-[10px]">{day.date.split(" ")[1]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-6">Traffic Sources</h3>
                <div className="space-y-4">
                  {analytics.trafficSources.map((source, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-300 text-sm">{source.source}</span>
                        <span className="text-white font-medium">{source.sessions.toLocaleString()} ({source.percentage}%)</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] rounded-full" style={{ width: `${source.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-6">Top Tools</h3>
                <div className="space-y-3">
                  {analytics.topTools.map((tool, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white">{tool.name}</span>
                      <span className="text-gray-400">{tool.views.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-6">User Locations</h3>
                <div className="space-y-3">
                  {analytics.userLocations.map((loc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white">{loc.country}</span>
                      <span className="text-gray-400">{loc.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-6">Devices</h3>
                <div className="space-y-3">
                  {analytics.devices.map((dev, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white">{dev.type}</span>
                      <span className="text-gray-400">{dev.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Real-time Users</h3>
                  <p className="text-gray-400 text-sm">Active right now</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-green-400 font-bold text-2xl">{analytics.realtime.activeUsers}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {analytics.realtime.topActivePages.map((page, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl">
                    <p className="text-gray-400 text-sm truncate">{page.page}</p>
                    <p className="text-white font-bold text-xl mt-1">{page.users}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.TOOLS && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Eye className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-white">{tools.reduce((a, t) => a + t.views, 0).toLocaleString()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Target className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Conversions</p>
                <p className="text-2xl font-bold text-white">{tools.reduce((a, t) => a + t.conversions, 0).toLocaleString()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <TrendingUp className="w-6 h-6 text-purple-400 mb-2" />
                <p className="text-gray-400 text-sm">Avg. Engagement</p>
                <p className="text-2xl font-bold text-white">{(tools.reduce((a, t) => a + t.engagement, 0) / tools.length).toFixed(1)}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Activity className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-gray-400 text-sm">Avg. Rating</p>
                <p className="text-2xl font-bold text-white">{(tools.reduce((a, t) => a + t.rating, 0) / tools.length).toFixed(1)}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Tool Management</h3>
                <button 
                  onClick={() => { setEditingTool(null); setShowToolModal(true); }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg hover:opacity-90"
                >
                  <Plus className="w-4 h-4" /> Add Tool
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Tool</th>
                      <th className="text-center text-gray-400 font-medium py-3 px-4">Status</th>
                      <th className="text-right text-gray-400 font-medium py-3 px-4">Views</th>
                      <th className="text-right text-gray-400 font-medium py-3 px-4">Conversions</th>
                      <th className="text-right text-gray-400 font-medium py-3 px-4">Engagement</th>
                      <th className="text-right text-gray-400 font-medium py-3 px-4">Rating</th>
                      <th className="text-right text-gray-400 font-medium py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tools.map((tool) => (
                      <tr key={tool.id} className="border-b border-white/5">
                        <td className="py-3 px-4">
                          <p className="text-white font-medium">{tool.name}</p>
                          <p className="text-gray-500 text-sm">/{tool.slug}</p>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button onClick={() => toggleToolStatus(tool.id)} className={`px-3 py-1 rounded-full text-xs font-medium ${tool.status === "enabled" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                            {tool.status === "enabled" ? "● Enabled" : "○ Disabled"}
                          </button>
                        </td>
                        <td className="text-right text-white py-3 px-4">{tool.views.toLocaleString()}</td>
                        <td className="text-right text-white py-3 px-4">{tool.conversions.toLocaleString()}</td>
                        <td className="text-right text-white py-3 px-4">{tool.engagement}%</td>
                        <td className="text-right text-white py-3 px-4">{tool.rating} ⭐</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => { setEditingTool(tool); setShowToolModal(true); }}
                              className="p-2 hover:bg-white/10 rounded-lg" title="Edit"
                            ><Edit className="w-4 h-4 text-blue-400" /></button>
                            <a 
                              href={`/tools/${tool.slug}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 hover:bg-white/10 rounded-lg" title="View"
                            ><ExternalLink className="w-4 h-4 text-gray-400" /></a>
                            <button 
                              onClick={() => { 
                                if (confirm("Are you sure you want to delete this tool?")) {
                                  const updated = tools.filter(t => t.id !== tool.id);
                                  setTools(updated);
                                  localStorage.setItem("tools", JSON.stringify(updated));
                                }
                              }}
                              className="p-2 hover:bg-white/10 rounded-lg" title="Delete"
                            ><Trash2 className="w-4 h-4 text-red-400" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FlaskConical className="w-6 h-6 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">A/B Testing</h3>
                </div>
                <button 
                  onClick={() => { setEditingAbTest(null); setShowAbTestModal(true); }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
                >
                  <Plus className="w-4 h-4" /> New Test
                </button>
              </div>
              <div className="space-y-4">
                {abTests.map((test) => (
                  <div key={test.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-white font-medium">{test.name}</h4>
                        <p className="text-gray-500 text-sm">{test.tool} • Started: {test.startDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${test.status === "running" ? "bg-green-500/20 text-green-400" : test.status === "completed" ? "bg-blue-500/20 text-blue-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                          {test.status}
                        </span>
                        {test.status === "running" && (
                          <button 
                            onClick={() => {
                              const updated = abTests.map(t => t.id === test.id ? { ...t, status: "completed" as const, endDate: new Date().toISOString().split("T")[0] } : t);
                              setAbTests(updated);
                            }}
                            className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded" title="Stop Test"
                          >
                            Stop
                          </button>
                        )}
                        <button 
                          onClick={() => { setEditingAbTest(test); setShowAbTestModal(true); }}
                          className="p-2 hover:bg-white/10 rounded-lg"
                        ><Edit className="w-4 h-4 text-blue-400" /></button>
                        <button 
                          onClick={() => { 
                            if (confirm("Are you sure you want to delete this test?")) {
                              setAbTests(abTests.filter(t => t.id !== test.id));
                            }
                          }}
                          className="p-2 hover:bg-white/10 rounded-lg"
                        ><Trash2 className="w-4 h-4 text-red-400" /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-gray-400 text-sm">{test.variantA.name}</p>
                          {test.winner === "A" && <span className="text-green-400 text-xs">Winner</span>}
                        </div>
                        <p className="text-white">{test.variantA.visitors} visitors</p>
                        <p className="text-green-400 text-sm">{test.variantA.conversions} conversions ({(test.variantA.conversions/test.variantA.visitors*100 || 0).toFixed(1)}%)</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-gray-400 text-sm">{test.variantB.name}</p>
                          {test.winner === "B" && <span className="text-green-400 text-xs">Winner</span>}
                        </div>
                        <p className="text-white">{test.variantB.visitors} visitors</p>
                        <p className="text-green-400 text-sm">{test.variantB.conversions} conversions ({(test.variantB.conversions/test.variantB.visitors*100 || 0).toFixed(1)}%)</p>
                      </div>
                    </div>
                  </div>
                ))}
                {abTests.length === 0 && (
                  <p className="text-gray-400 text-center py-8">No A/B tests yet. Create one to start testing!</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.ANALYTICS && analytics && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Popular Pages</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Page</th>
                      <th className="text-right text-gray-400 font-medium py-3 px-4">Views</th>
                      <th className="text-right text-gray-400 font-medium py-3 px-4">Unique Users</th>
                      <th className="text-right text-gray-400 font-medium py-3 px-4">Bounce Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.popularPages.map((page, i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="py-3 px-4 text-white">{page.page}</td>
                        <td className="text-right text-white py-3 px-4">{page.views.toLocaleString()}</td>
                        <td className="text-right text-white py-3 px-4">{page.uniqueUsers.toLocaleString()}</td>
                        <td className="text-right text-white py-3 px-4">{page.bounceRate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.USERS && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">User Management</h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500" />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg">
                    <Plus className="w-4 h-4" /> Add User
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-gray-400 font-medium py-3 px-4">User</th>
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Role</th>
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Status</th>
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Joined</th>
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-white/5">
                        <td className="py-3 px-4">
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                        </td>
                        <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs ${user.role === "admin" ? "bg-purple-500/20 text-purple-300" : "bg-blue-500/20 text-blue-300"}`}>{user.role}</span></td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {user.status === "active" ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                            <span className={user.status === "active" ? "text-green-400" : "text-red-400"}>{user.status}</span>
                          </div>
                        </td>
                        <td className="text-gray-300 py-3 px-4">{user.joinedAt}</td>
                        <td className="text-gray-300 py-3 px-4">{user.lastActive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.USER_ACTIVITY && userActivity && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Activity className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Actions</p>
                <p className="text-2xl font-bold text-white">{userActivity.length * 125}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Users className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-white">{[...new Set(userActivity.map(a => a.userId))].length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Monitor className="w-6 h-6 text-purple-400 mb-2" />
                <p className="text-gray-400 text-sm">Desktop</p>
                <p className="text-2xl font-bold text-white">{userActivity.filter(a => a.device === "Desktop").length * 15}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Smartphone className="w-6 h-6 text-orange-400 mb-2" />
                <p className="text-gray-400 text-sm">Mobile</p>
                <p className="text-2xl font-bold text-white">{userActivity.filter(a => a.device === "Mobile").length * 12}%</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Recent User Activity</h3>
              <div className="space-y-3">
                {userActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] rounded-full flex items-center justify-center text-white font-bold">
                        {activity.userName[0]}
                      </div>
                      <div>
                        <p className="text-white font-medium">{activity.userName}</p>
                        <p className="text-gray-400 text-sm">{activity.action} • {activity.page}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">{activity.location}</p>
                        <p className="text-gray-500 text-xs">{activity.timestamp}</p>
                      </div>
                      <span className="px-2 py-1 bg-white/10 text-gray-400 rounded-full text-xs">{activity.device}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.PREMIUM_USERS && premiumUsers && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Users className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Premium</p>
                <p className="text-2xl font-bold text-white">{premiumUsers.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Active</p>
                <p className="text-2xl font-bold text-white">{premiumUsers.filter(p => p.status === "active").length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <DollarSign className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Monthly Revenue</p>
                <p className="text-2xl font-bold text-white">${premiumUsers.filter(p => p.status === "active").reduce((a, p) => a + p.amount, 0).toFixed(2)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <TrendingUp className="w-6 h-6 text-purple-400 mb-2" />
                <p className="text-gray-400 text-sm">ARR</p>
                <p className="text-2xl font-bold text-white">${(premiumUsers.filter(p => p.status === "active").reduce((a, p) => a + p.amount, 0) * 12).toFixed(0)}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Premium Subscribers</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-gray-400 font-medium py-3 px-4">User</th>
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Plan</th>
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Status</th>
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Start Date</th>
                      <th className="text-left text-gray-400 font-medium py-3 px-4">End Date</th>
                      <th className="text-right text-gray-400 font-medium py-3 px-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {premiumUsers.map((user) => (
                      <tr key={user.id} className="border-b border-white/5">
                        <td className="py-3 px-4">
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.plan === "enterprise" ? "bg-purple-500/20 text-purple-400" :
                            user.plan === "pro" ? "bg-yellow-500/20 text-yellow-400" :
                            "bg-blue-500/20 text-blue-400"
                          }`}>{user.plan.toUpperCase()}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === "active" ? "bg-green-500/20 text-green-400" :
                            user.status === "expired" ? "bg-red-500/20 text-red-400" :
                            "bg-gray-500/20 text-gray-400"
                          }`}>{user.status}</span>
                        </td>
                        <td className="text-gray-300 py-3 px-4">{user.startDate}</td>
                        <td className="text-gray-300 py-3 px-4">{user.endDate || "Lifetime"}</td>
                        <td className="text-right text-white py-3 px-4">${user.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.USER_FEEDBACK && userFeedback && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <MessageSquare className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Feedback</p>
                <p className="text-2xl font-bold text-white">{userFeedback.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <StarIcon className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-gray-400 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold text-white">{(userFeedback.reduce((a, f) => a + f.rating, 0) / userFeedback.length).toFixed(1)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <AlertCircle className="w-6 h-6 text-orange-400 mb-2" />
                <p className="text-gray-400 text-sm">New</p>
                <p className="text-2xl font-bold text-white">{userFeedback.filter(f => f.status === "new").length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Resolved</p>
                <p className="text-2xl font-bold text-white">{userFeedback.filter(f => f.status === "resolved").length}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">User Feedback & Reviews</h3>
              <div className="space-y-4">
                {userFeedback.map((feedback) => (
                  <div key={feedback.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] rounded-full flex items-center justify-center text-white font-bold">
                          {feedback.userName[0]}
                        </div>
                        <div>
                          <p className="text-white font-medium">{feedback.userName}</p>
                          <p className="text-gray-400 text-sm">{feedback.tool}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          feedback.status === "new" ? "bg-orange-500/20 text-orange-400" :
                          feedback.status === "reviewed" ? "bg-blue-500/20 text-blue-400" :
                          "bg-green-500/20 text-green-400"
                        }`}>{feedback.status}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon key={star} className={`w-4 h-4 ${star <= feedback.rating ? "text-yellow-400" : "text-gray-600"}`} />
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm">{feedback.comment}</p>
                    <p className="text-gray-500 text-xs mt-2">{feedback.createdAt}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>
          )}

        {activeTab === TABS.CONTACT_SUBMISSIONS && contactSubmissions && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Mail className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Messages</p>
                <p className="text-2xl font-bold text-white">{contactSubmissions.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <AlertCircle className="w-6 h-6 text-orange-400 mb-2" />
                <p className="text-gray-400 text-sm">New</p>
                <p className="text-2xl font-bold text-white">{contactSubmissions.filter(c => c.status === "new").length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Replied</p>
                <p className="text-2xl font-bold text-white">{contactSubmissions.filter(c => c.status === "replied").length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Archive className="w-6 h-6 text-gray-400 mb-2" />
                <p className="text-gray-400 text-sm">Archived</p>
                <p className="text-2xl font-bold text-white">{contactSubmissions.filter(c => c.status === "archived").length}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Contact Form Submissions</h3>
              <div className="space-y-4">
                {contactSubmissions.map((submission) => (
                  <div key={submission.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-white font-medium">{submission.subject}</h4>
                        <p className="text-gray-400 text-sm">{submission.name} • {submission.email}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        submission.status === "new" ? "bg-orange-500/20 text-orange-400" :
                        submission.status === "read" ? "bg-blue-500/20 text-blue-400" :
                        submission.status === "replied" ? "bg-green-500/20 text-green-400" :
                        "bg-gray-500/20 text-gray-400"
                      }`}>{submission.status}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{submission.message}</p>
                    <p className="text-gray-500 text-xs mt-2">{submission.createdAt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.NEWSLETTER && newsletterSubscribers && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Users className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Subscribers</p>
                <p className="text-2xl font-bold text-white">{newsletterSubscribers.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Active</p>
                <p className="text-2xl font-bold text-white">{newsletterSubscribers.filter(n => n.status === "active").length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <XCircle className="w-6 h-6 text-red-400 mb-2" />
                <p className="text-gray-400 text-sm">Unsubscribed</p>
                <p className="text-2xl font-bold text-white">{newsletterSubscribers.filter(n => n.status === "unsubscribed").length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <TrendingUp className="w-6 h-6 text-purple-400 mb-2" />
                <p className="text-gray-400 text-sm">Active Rate</p>
                <p className="text-2xl font-bold text-white">{Math.round((newsletterSubscribers.filter(n => n.status === "active").length / newsletterSubscribers.length) * 100)}%</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Newsletter Subscribers</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Email</th>
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Name</th>
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Status</th>
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Source</th>
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Subscribed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsletterSubscribers.map((sub) => (
                      <tr key={sub.id} className="border-b border-white/5">
                        <td className="py-3 px-4 text-white">{sub.email}</td>
                        <td className="py-3 px-4 text-gray-300">{sub.name}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${sub.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-400">{sub.source}</td>
                        <td className="py-3 px-4 text-gray-400">{sub.subscribedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.SUGGESTIONS && userSuggestions && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Lightbulb className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Suggestions</p>
                <p className="text-2xl font-bold text-white">{userSuggestions.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <AlertCircle className="w-6 h-6 text-orange-400 mb-2" />
                <p className="text-gray-400 text-sm">New</p>
                <p className="text-2xl font-bold text-white">{userSuggestions.filter(s => s.status === "new").length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Implemented</p>
                <p className="text-2xl font-bold text-white">{userSuggestions.filter(s => s.status === "implemented").length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <TrendingDown className="w-6 h-6 text-red-400 mb-2" />
                <p className="text-gray-400 text-sm">Declined</p>
                <p className="text-2xl font-bold text-white">{userSuggestions.filter(s => s.status === "declined").length}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">User Suggestions</h3>
              <div className="space-y-4">
                {userSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            suggestion.category === "feature" ? "bg-purple-500/20 text-purple-400" :
                            suggestion.category === "bug" ? "bg-red-500/20 text-red-400" :
                            suggestion.category === "improvement" ? "bg-blue-500/20 text-blue-400" :
                            "bg-gray-500/20 text-gray-400"
                          }`}>{suggestion.category}</span>
                          <h4 className="text-white font-medium">{suggestion.title}</h4>
                        </div>
                        <p className="text-gray-400 text-sm">{suggestion.userName} • {suggestion.userEmail}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        suggestion.status === "new" ? "bg-orange-500/20 text-orange-400" :
                        suggestion.status === "reviewed" ? "bg-blue-500/20 text-blue-400" :
                        suggestion.status === "implemented" ? "bg-green-500/20 text-green-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>{suggestion.status}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{suggestion.description}</p>
                    <p className="text-gray-500 text-xs mt-2">{suggestion.createdAt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.REVENUE && revenue && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-gray-400 text-sm mb-2">Today</h3>
                <p className="text-3xl font-bold text-white">${revenue.total.today.toFixed(2)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-gray-400 text-sm mb-2">This Month</h3>
                <p className="text-3xl font-bold text-white">${revenue.total.month.toFixed(2)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-gray-400 text-sm mb-2">This Year</h3>
                <p className="text-3xl font-bold text-white">${revenue.total.year.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.CONTENT && content && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {content.tools.map((tool: any, i: number) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <h4 className="text-white font-medium">{tool.name}</h4>
                    <p className="text-gray-400 text-sm">/{tool.slug}</p>
                    <span className="text-green-400 text-sm">{tool.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.BLOG && blogPosts && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <BookOpen className="w-6 h-6 text-blue-400 mb-2" />
                  <p className="text-gray-400 text-sm">Total Posts</p>
                  <p className="text-2xl font-bold text-white">{blogPosts.length}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <Eye className="w-6 h-6 text-green-400 mb-2" />
                  <p className="text-gray-400 text-sm">Total Views</p>
                  <p className="text-2xl font-bold text-white">{blogPosts.reduce((a, p) => a + p.views, 0).toLocaleString()}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <CheckCircle className="w-6 h-6 text-purple-400 mb-2" />
                  <p className="text-gray-400 text-sm">Published</p>
                  <p className="text-2xl font-bold text-white">{blogPosts.filter(p => p.status === "published").length}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <FileText className="w-6 h-6 text-yellow-400 mb-2" />
                  <p className="text-gray-400 text-sm">Drafts</p>
                  <p className="text-2xl font-bold text-white">{blogPosts.filter(p => p.status === "draft").length}</p>
                </div>
              </div>
              <button 
                onClick={() => { setEditingBlogPost(null); setShowBlogModal(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg hover:opacity-90"
              >
                <Plus className="w-4 h-4" /> New Post
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">All Blog Posts</h3>
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{post.title}</h4>
                      <p className="text-gray-400 text-sm">{post.excerpt}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-gray-500 text-xs">{post.category}</span>
                        <span className="text-gray-500 text-xs">•</span>
                        <span className="text-gray-500 text-xs">{post.createdAt}</span>
                        <span className="text-gray-500 text-xs">•</span>
                        <span className="text-gray-500 text-xs">{post.views.toLocaleString()} views</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === "published" ? "bg-green-500/20 text-green-400" : 
                        post.status === "draft" ? "bg-yellow-500/20 text-yellow-400" : 
                        "bg-blue-500/20 text-blue-400"
                      }`}>{post.status}</span>
                      {post.status === "published" ? (
                        <button
                          onClick={async () => {
                            await supabase.from("blog_posts").update({ status: "draft" }).eq("id", post.id);
                            setBlogPosts(prev => prev.map(p => p.id === post.id ? { ...p, status: "draft" as const } : p));
                          }}
                          className="p-2 hover:bg-white/10 rounded-lg" title="Unpublish"
                        ><FileText className="w-4 h-4 text-yellow-400" /></button>
                      ) : (
                        <button
                          onClick={async () => {
                            await supabase.from("blog_posts").update({ status: "published" }).eq("id", post.id);
                            setBlogPosts(prev => prev.map(p => p.id === post.id ? { ...p, status: "published" as const } : p));
                          }}
                          className="p-2 hover:bg-white/10 rounded-lg" title="Publish"
                        ><CheckCircle className="w-4 h-4 text-green-400" /></button>
                      )}
                      <button
                        onClick={() => { setEditingBlogPost(post); setShowBlogModal(true); }}
                        className="p-2 hover:bg-white/10 rounded-lg" title="Edit"
                      ><Edit className="w-4 h-4 text-blue-400" /></button>
                      <button
                        onClick={async () => {
                          if (confirm("Are you sure you want to delete this post?")) {
                            await supabase.from("blog_posts").delete().eq("id", post.id);
                            setBlogPosts(prev => prev.filter(p => p.id !== post.id));
                          }
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg" title="Delete"
                      ><Trash2 className="w-4 h-4 text-red-400" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showBlogModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-4xl max-h-[95vh] overflow-y-auto border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">{editingBlogPost ? "Edit Post" : "Create New Post"}</h3>
                <button onClick={() => setShowBlogModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Title *</label>
                    <input 
                      type="text" 
                      defaultValue={editingBlogPost?.title || ""}
                      id="blogTitle"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-lg"
                      placeholder="Enter post title"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Slug *</label>
                    <input 
                      type="text" 
                      defaultValue={editingBlogPost?.slug || ""}
                      id="blogSlug"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                      placeholder="post-slug"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Excerpt (Short Description)</label>
                    <textarea 
                      defaultValue={editingBlogPost?.excerpt || ""}
                      id="blogExcerpt"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white h-24"
                      placeholder="Brief description for blog cards..."
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-gray-400 text-sm font-medium">Content</label>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => {
                          const textarea = document.getElementById("blogContent") as HTMLTextAreaElement;
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = textarea.value;
                          const selected = text.substring(start, end);
                          textarea.value = text.substring(0, start) + "**" + selected + "**" + text.substring(end);
                          textarea.focus();
                          textarea.setSelectionRange(start + 2, end + 2);
                        }} className="px-3 py-1 bg-white/5 text-gray-400 text-xs rounded hover:bg-white/10" title="Bold"><strong>B</strong></button>
                        <button type="button" onClick={() => {
                          const textarea = document.getElementById("blogContent") as HTMLTextAreaElement;
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = textarea.value;
                          const selected = text.substring(start, end);
                          textarea.value = text.substring(0, start) + "*" + selected + "*" + text.substring(end);
                          textarea.focus();
                          textarea.setSelectionRange(start + 1, end + 1);
                        }} className="px-3 py-1 bg-white/5 text-gray-400 text-xs rounded hover:bg-white/10" title="Italic"><em>I</em></button>
                        <button type="button" onClick={() => {
                          const textarea = document.getElementById("blogContent") as HTMLTextAreaElement;
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = textarea.value;
                          const selected = text.substring(start, end);
                          textarea.value = text.substring(0, start) + "[" + selected + "](url)" + text.substring(end);
                          textarea.focus();
                          textarea.setSelectionRange(start + 1, start + 1 + selected.length);
                        }} className="px-3 py-1 bg-white/5 text-gray-400 text-xs rounded hover:bg-white/10" title="Link">🔗</button>
                        <button type="button" onClick={() => {
                          const textarea = document.getElementById("blogContent") as HTMLTextAreaElement;
                          const start = textarea.selectionStart;
                          const text = textarea.value;
                          textarea.value = text.substring(0, start) + "![alt text](image-url)" + text.substring(start);
                          textarea.focus();
                          textarea.setSelectionRange(start + 2, start + 10);
                        }} className="px-3 py-1 bg-white/5 text-gray-400 text-xs rounded hover:bg-white/10" title="Image">🖼️</button>
                        <button type="button" onClick={() => {
                          const textarea = document.getElementById("blogContent") as HTMLTextAreaElement;
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = textarea.value;
                          const selected = text.substring(start, end);
                          textarea.value = text.substring(0, start) + "`" + selected + "`" + text.substring(end);
                          textarea.focus();
                          textarea.setSelectionRange(start + 1, end + 1);
                        }} className="px-3 py-1 bg-white/5 text-gray-400 text-xs rounded hover:bg-white/10" title="Code">&lt;/&gt;</button>
                      </div>
                    </div>
                    <textarea 
                      defaultValue={editingBlogPost?.content || ""}
                      id="blogContent"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white h-64 font-mono text-sm"
                      placeholder="Write your article content here... You can use **bold**, *italic*, [links](url), and more."
                    />
                    <p className="text-gray-500 text-xs mt-1">Supports Markdown formatting</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h4 className="text-white font-medium mb-4">Publishing</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Status</label>
                        <select 
                          defaultValue={editingBlogPost?.status || "draft"}
                          id="blogStatus"
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="scheduled">Scheduled</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={async () => {
                            const title = (document.getElementById("blogTitle") as HTMLInputElement).value;
                            const slug = (document.getElementById("blogSlug") as HTMLInputElement).value;
                            const excerpt = (document.getElementById("blogExcerpt") as HTMLTextAreaElement).value;
                            const content = (document.getElementById("blogContent") as HTMLTextAreaElement).value;
                            const category = (document.getElementById("blogCategory") as HTMLInputElement).value;
                            const author = (document.getElementById("blogAuthor") as HTMLInputElement).value;
                            const tags = (document.getElementById("blogTags") as HTMLInputElement).value.split(",").map(t => t.trim());
                            const status: "published" | "draft" | "scheduled" = "draft";
                            const imageUrl = (document.getElementById("blogImageUrl") as HTMLInputElement).value;

                            if (!title || !slug) { alert("Title and Slug are required!"); return; }

                            if (editingBlogPost) {
                              const { data } = await supabase.from("blog_posts").update({
                                title, slug, excerpt, content, category, author, tags, status,
                                image_url: imageUrl, updated_at: new Date().toISOString()
                              }).eq("id", editingBlogPost.id).select().single();
                              if (data) setBlogPosts(prev => prev.map(p => p.id === editingBlogPost.id ? { ...p, title, slug, excerpt, content, category, author, tags, status, imageUrl } : p));
                            } else {
                              const { data } = await supabase.from("blog_posts").insert([{
                                title, slug, excerpt, content, category, author, tags, status,
                                image_url: imageUrl, views: 0
                              }]).select().single();
                              if (data) setBlogPosts(prev => [...prev, { id: data.id, title, slug, excerpt, content, category, author, tags, status, imageUrl, views: 0, createdAt: data.created_at?.split("T")[0] || "", updatedAt: data.updated_at?.split("T")[0] || "" }]);
                            }
                            setShowBlogModal(false);
                          }}
                          className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
                        >
                          Save Draft
                        </button>
                        <button
                          onClick={async () => {
                            const title = (document.getElementById("blogTitle") as HTMLInputElement).value;
                            const slug = (document.getElementById("blogSlug") as HTMLInputElement).value;
                            const excerpt = (document.getElementById("blogExcerpt") as HTMLTextAreaElement).value;
                            const content = (document.getElementById("blogContent") as HTMLTextAreaElement).value;
                            const category = (document.getElementById("blogCategory") as HTMLInputElement).value;
                            const author = (document.getElementById("blogAuthor") as HTMLInputElement).value;
                            const tags = (document.getElementById("blogTags") as HTMLInputElement).value.split(",").map(t => t.trim());
                            const status: "published" | "draft" | "scheduled" = "published";
                            const imageUrl = (document.getElementById("blogImageUrl") as HTMLInputElement).value;

                            if (!title || !slug) { alert("Title and Slug are required!"); return; }

                            if (editingBlogPost) {
                              const { data } = await supabase.from("blog_posts").update({
                                title, slug, excerpt, content, category, author, tags, status,
                                image_url: imageUrl, updated_at: new Date().toISOString()
                              }).eq("id", editingBlogPost.id).select().single();
                              if (data) setBlogPosts(prev => prev.map(p => p.id === editingBlogPost.id ? { ...p, title, slug, excerpt, content, category, author, tags, status, imageUrl } : p));
                            } else {
                              const { data } = await supabase.from("blog_posts").insert([{
                                title, slug, excerpt, content, category, author, tags, status,
                                image_url: imageUrl, views: 0
                              }]).select().single();
                              if (data) setBlogPosts(prev => [...prev, { id: data.id, title, slug, excerpt, content, category, author, tags, status, imageUrl, views: 0, createdAt: data.created_at?.split("T")[0] || "", updatedAt: data.updated_at?.split("T")[0] || "" }]);
                            }
                            setShowBlogModal(false);
                          }}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg hover:opacity-90"
                        >
                          Publish
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h4 className="text-white font-medium mb-4">Details</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Category</label>
                        <input 
                          type="text" 
                          defaultValue={editingBlogPost?.category || ""}
                          id="blogCategory"
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          placeholder="Career, Tips, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Author</label>
                        <input 
                          type="text" 
                          defaultValue={editingBlogPost?.author || "Admin"}
                          id="blogAuthor"
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Tags</label>
                        <input 
                          type="text" 
                          defaultValue={editingBlogPost?.tags?.join(", ") || ""}
                          id="blogTags"
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          placeholder="tag1, tag2, tag3"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h4 className="text-white font-medium mb-4">Featured Image</h4>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Image URL</label>
                      <input 
                        type="text" 
                        defaultValue={editingBlogPost?.imageUrl || ""}
                        id="blogImageUrl"
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        placeholder="https://example.com/image.jpg"
                      />
                      <p className="text-gray-500 text-xs mt-2">Paste a URL to an image</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowBlogModal(false)}
                    className="w-full px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.FAQ && faqs && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <HelpCircle className="w-6 h-6 text-blue-400 mb-2" />
                  <p className="text-gray-400 text-sm">Total FAQs</p>
                  <p className="text-2xl font-bold text-white">{faqs.length}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
                  <p className="text-gray-400 text-sm">Active</p>
                  <p className="text-2xl font-bold text-white">{faqs.filter(f => f.status === "active").length}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <FileText className="w-6 h-6 text-purple-400 mb-2" />
                  <p className="text-gray-400 text-sm">Categories</p>
                  <p className="text-2xl font-bold text-white">{[...new Set(faqs.map(f => f.category))].length}</p>
                </div>
              </div>
              <button 
                onClick={() => { setEditingFaq(null); setShowFaqModal(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg hover:opacity-90"
              >
                <Plus className="w-4 h-4" /> Add FAQ
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-blue-400 font-medium">Q:</span>
                          <h4 className="text-white font-medium">{faq.question}</h4>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-green-400 font-medium">A:</span>
                          <p className="text-gray-300">{faq.answer}</p>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-gray-500 text-xs">{faq.category}</span>
                          <span className="text-gray-500 text-xs">•</span>
                          <span className="text-gray-500 text-xs">Order: {faq.order}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${faq.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                          {faq.status}
                        </span>
                        {faq.status === "active" ? (
                          <button
                            onClick={async () => {
                              await supabase.from("faqs").update({ status: "inactive" }).eq("id", faq.id);
                              setFaqs(prev => prev.map(f => f.id === faq.id ? { ...f, status: "inactive" as const } : f));
                            }}
                            className="p-2 hover:bg-white/10 rounded-lg" title="Deactivate"
                          ><XCircle className="w-4 h-4 text-yellow-400" /></button>
                        ) : (
                          <button
                            onClick={async () => {
                              await supabase.from("faqs").update({ status: "active" }).eq("id", faq.id);
                              setFaqs(prev => prev.map(f => f.id === faq.id ? { ...f, status: "active" as const } : f));
                            }}
                            className="p-2 hover:bg-white/10 rounded-lg" title="Activate"
                          ><CheckCircle className="w-4 h-4 text-green-400" /></button>
                        )}
                        <button
                          onClick={() => { setEditingFaq(faq); setShowFaqModal(true); }}
                          className="p-2 hover:bg-white/10 rounded-lg" title="Edit"
                        ><Edit className="w-4 h-4 text-blue-400" /></button>
                        <button
                          onClick={async () => {
                            if (confirm("Are you sure you want to delete this FAQ?")) {
                              await supabase.from("faqs").delete().eq("id", faq.id);
                              setFaqs(prev => prev.filter(f => f.id !== faq.id));
                            }
                          }}
                          className="p-2 hover:bg-white/10 rounded-lg" title="Delete"
                        ><Trash2 className="w-4 h-4 text-red-400" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showFaqModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-2xl max-h-[95vh] overflow-y-auto border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">{editingFaq ? "Edit FAQ" : "Add New FAQ"}</h3>
                <button onClick={() => setShowFaqModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Question *</label>
                  <input 
                    type="text" 
                    defaultValue={editingFaq?.question || ""}
                    id="faqQuestion"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-lg"
                    placeholder="Enter your question"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Answer *</label>
                  <textarea 
                    defaultValue={editingFaq?.answer || ""}
                    id="faqAnswer"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white h-32"
                    placeholder="Write your answer..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Category</label>
                    <input 
                      type="text" 
                      defaultValue={editingFaq?.category || ""}
                      id="faqCategory"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                      placeholder="General, Tools, Privacy, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Order</label>
                    <input 
                      type="number" 
                      defaultValue={editingFaq?.order || 1}
                      id="faqOrder"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                      placeholder="1"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Status</label>
                  <select 
                    defaultValue={editingFaq?.status || "active"}
                    id="faqStatus"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    onClick={() => setShowFaqModal(false)}
                    className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      const question = (document.getElementById("faqQuestion") as HTMLInputElement).value;
                      const answer = (document.getElementById("faqAnswer") as HTMLTextAreaElement).value;
                      const category = (document.getElementById("faqCategory") as HTMLInputElement).value;
                      const order = parseInt((document.getElementById("faqOrder") as HTMLInputElement).value) || 1;
                      const status = (document.getElementById("faqStatus") as HTMLSelectElement).value as "active" | "inactive";

                      if (!question || !answer) { alert("Question and Answer are required!"); return; }

                      if (editingFaq) {
                        const { data } = await supabase.from("faqs").update({ question, answer, category, order, status }).eq("id", editingFaq.id).select().single();
                        if (data) setFaqs(prev => prev.map(f => f.id === editingFaq.id ? { ...f, question, answer, category, order, status } : f));
                      } else {
                        const { data } = await supabase.from("faqs").insert([{ question, answer, category, order, status }]).select().single();
                        if (data) setFaqs(prev => [...prev, { id: data.id, question, answer, category, order, status }]);
                      }
                      setShowFaqModal(false);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg hover:opacity-90"
                  >
                    {editingFaq ? "Update FAQ" : "Add FAQ"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.STATIC && staticPages && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <File className="w-6 h-6 text-blue-400 mb-2" />
                  <p className="text-gray-400 text-sm">Total Pages</p>
                  <p className="text-2xl font-bold text-white">{staticPages.length}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
                  <p className="text-gray-400 text-sm">Published</p>
                  <p className="text-2xl font-bold text-white">{staticPages.filter(p => p.status === "published").length}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <FileText className="w-6 h-6 text-yellow-400 mb-2" />
                  <p className="text-gray-400 text-sm">Drafts</p>
                  <p className="text-2xl font-bold text-white">{staticPages.filter(p => p.status === "draft").length}</p>
                </div>
              </div>
              <button 
                onClick={() => { setEditingPage(null); setShowPageModal(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg hover:opacity-90"
              >
                <Plus className="w-4 h-4" /> New Page
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Static Pages</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Page</th>
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Slug</th>
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Status</th>
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Last Updated</th>
                      <th className="text-right text-gray-400 font-medium py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staticPages.map((page) => (
                      <tr key={page.id} className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">{page.title}</td>
                        <td className="py-3 px-4 text-gray-400">{page.slug}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${page.status === "published" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                            {page.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-400">{page.lastUpdated}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            {page.status === "published" ? (
                              <button 
                                onClick={() => {
                                  const updated = staticPages.map(p => p.id === page.id ? { ...p, status: "draft" as const, lastUpdated: new Date().toISOString().split("T")[0] } : p);
                                  setStaticPages(updated);
                                  localStorage.setItem("static_pages", JSON.stringify(updated));
                                }}
                                className="p-2 hover:bg-white/10 rounded-lg" title="Unpublish"
                              ><FileText className="w-4 h-4 text-yellow-400" /></button>
                            ) : (
                              <button 
                                onClick={() => {
                                  const updated = staticPages.map(p => p.id === page.id ? { ...p, status: "published" as const, lastUpdated: new Date().toISOString().split("T")[0] } : p);
                                  setStaticPages(updated);
                                  localStorage.setItem("static_pages", JSON.stringify(updated));
                                }}
                                className="p-2 hover:bg-white/10 rounded-lg" title="Publish"
                              ><CheckCircle className="w-4 h-4 text-green-400" /></button>
                            )}
                            <button 
                              onClick={() => { setEditingPage(page); setShowPageModal(true); }}
                              className="p-2 hover:bg-white/10 rounded-lg" title="Edit"
                            ><Edit className="w-4 h-4 text-blue-400" /></button>
                            <a 
                              href={page.slug} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 hover:bg-white/10 rounded-lg" title="View"
                            ><ExternalLink className="w-4 h-4 text-gray-400" /></a>
                            <button 
                              onClick={() => { 
                                if (confirm("Are you sure you want to delete this page?")) {
                                  const updated = staticPages.filter(p => p.id !== page.id);
                                  setStaticPages(updated);
                                  localStorage.setItem("static_pages", JSON.stringify(updated));
                                }
                              }}
                              className="p-2 hover:bg-white/10 rounded-lg" title="Delete"
                            ><Trash2 className="w-4 h-4 text-red-400" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {showPageModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-4xl max-h-[95vh] overflow-y-auto border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">{editingPage ? "Edit Page" : "Create New Page"}</h3>
                <button onClick={() => setShowPageModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Page Title *</label>
                  <input 
                    type="text" 
                    defaultValue={editingPage?.title || ""}
                    id="pageTitle"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-lg"
                    placeholder="Page Title"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Slug *</label>
                  <input 
                    type="text" 
                    defaultValue={editingPage?.slug || ""}
                    id="pageSlug"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                    placeholder="/page-slug"
                  />
                  <p className="text-gray-500 text-xs mt-1">URL path (e.g., /about, /contact)</p>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Page Content</label>
                  <textarea 
                    defaultValue={editingPage?.content || ""}
                    id="pageContent"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white h-64 font-mono text-sm"
                    placeholder="Write your page content here..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Status</label>
                    <select 
                      defaultValue={editingPage?.status || "draft"}
                      id="pageStatus"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Meta Title</label>
                    <input 
                      type="text" 
                      defaultValue={editingPage?.title || ""}
                      id="pageMetaTitle"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                      placeholder="SEO Title"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Meta Description</label>
                  <textarea 
                    defaultValue={""}
                    id="pageMetaDescription"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white h-20"
                    placeholder="SEO meta description"
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    onClick={() => setShowPageModal(false)}
                    className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      const title = (document.getElementById("pageTitle") as HTMLInputElement).value;
                      const slug = (document.getElementById("pageSlug") as HTMLInputElement).value;
                      const content = (document.getElementById("pageContent") as HTMLTextAreaElement).value;
                      const status = (document.getElementById("pageStatus") as HTMLSelectElement).value as "published" | "draft";
                      
                      if (!title || !slug) { alert("Title and Slug are required!"); return; }
                      
                      const finalSlug = slug.startsWith("/") ? slug : "/" + slug;
                      
                      if (editingPage) {
                        const updated = staticPages.map(p => p.id === editingPage.id ? {
                          ...p, title, slug: finalSlug, content, status, lastUpdated: new Date().toISOString().split("T")[0]
                        } : p);
                        setStaticPages(updated);
                        localStorage.setItem("static_pages", JSON.stringify(updated));
                      } else {
                        const newPage: StaticPage = {
                          id: Date.now().toString(),
                          title, slug: finalSlug, content, status,
                          lastUpdated: new Date().toISOString().split("T")[0]
                        };
                        const updated = [...staticPages, newPage];
                        setStaticPages(updated);
                        localStorage.setItem("static_pages", JSON.stringify(updated));
                      }
                      setShowPageModal(false);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg hover:opacity-90"
                  >
                    {editingPage ? "Update Page" : "Create Page"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.SEO_SETTINGS && seoConfigs && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">SEO Configuration</h3>
                <p className="text-gray-400 text-sm">Optimize your pages for search engines</p>
              </div>
              <button 
                onClick={() => { setEditingSeo(null); setShowSeoModal(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg hover:opacity-90"
              >
                <Plus className="w-4 h-4" /> Add SEO Config
              </button>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-4 border border-green-500/20">
              <div className="flex items-start gap-3">
                <SeoIcon className="w-6 h-6 text-green-400 mt-1" />
                <div>
                  <h4 className="text-white font-medium">SEO Tips for More Traffic</h4>
                  <ul className="text-gray-400 text-sm mt-2 space-y-1">
                    <li>• Use unique meta titles (50-60 chars) with main keywords</li>
                    <li>• Write compelling meta descriptions (150-160 chars)</li>
                    <li>• Include 3-5 relevant keywords per page</li>
                    <li>• Add Open Graph images for social media sharing</li>
                    <li>• Use proper heading structure (H1, H2, H3)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {seoConfigs.map((config, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-blue-400" />
                      <h4 className="text-white font-medium">{config.page}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => { setEditingSeo(config); setShowSeoModal(true); }}
                        className="p-2 hover:bg-white/10 rounded-lg" title="Edit"
                      ><Edit className="w-4 h-4 text-blue-400" /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-500 text-xs uppercase tracking-wider">Meta Title</label>
                      <p className="text-white mt-1">{config.title}</p>
                      <p className="text-gray-500 text-xs">{config.title?.length || 0}/60 characters</p>
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs uppercase tracking-wider">Meta Description</label>
                      <p className="text-white text-sm mt-1">{config.description}</p>
                      <p className="text-gray-500 text-xs">{config.description?.length || 0}/160 characters</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-gray-500 text-xs uppercase tracking-wider">Keywords</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {config.keywords.map((kw, j) => (
                          <span key={j} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">{kw}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showSeoModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-2xl max-h-[95vh] overflow-y-auto border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">{editingSeo ? "Edit SEO" : "Add SEO Configuration"}</h3>
                <button onClick={() => setShowSeoModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Page Name *</label>
                  <input 
                    type="text" 
                    defaultValue={editingSeo?.page || ""}
                    id="seoPage"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                    placeholder="Home, Tools, Blog, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Meta Title *</label>
                  <input 
                    type="text" 
                    defaultValue={editingSeo?.title || ""}
                    id="seoTitle"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                    placeholder="Page Title | Brand Name"
                  />
                  <p className="text-gray-500 text-xs mt-1"><span id="seoTitleCount">0</span>/60 characters (50-60 recommended)</p>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Meta Description *</label>
                  <textarea 
                    defaultValue={editingSeo?.description || ""}
                    id="seoDescription"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white h-24"
                    placeholder="Write a compelling description of your page..."
                  />
                  <p className="text-gray-500 text-xs mt-1"><span id="seoDescCount">0</span>/160 characters (150-160 recommended)</p>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Keywords (comma separated)</label>
                  <input 
                    type="text" 
                    defaultValue={editingSeo?.keywords?.join(", ") || ""}
                    id="seoKeywords"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                  <p className="text-gray-500 text-xs mt-1">3-5 keywords recommended</p>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">OG Image URL</label>
                  <input 
                    type="text" 
                    defaultValue={editingSeo?.ogImage || ""}
                    id="seoOgImage"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                    placeholder="https://example.com/og-image.jpg"
                  />
                  <p className="text-gray-500 text-xs mt-1">Recommended size: 1200x630 pixels</p>
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    onClick={() => setShowSeoModal(false)}
                    className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      const page = (document.getElementById("seoPage") as HTMLInputElement).value;
                      const title = (document.getElementById("seoTitle") as HTMLInputElement).value;
                      const description = (document.getElementById("seoDescription") as HTMLTextAreaElement).value;
                      const keywords = (document.getElementById("seoKeywords") as HTMLInputElement).value.split(",").map(k => k.trim()).filter(k => k);
                      const ogImage = (document.getElementById("seoOgImage") as HTMLInputElement).value;
                      
                      if (!page || !title || !description) { alert("Page, Title, and Description are required!"); return; }
                      
                      if (editingSeo) {
                        const updated = seoConfigs.map(c => c.page === editingSeo.page ? {
                          ...c, page, title, description, keywords, ogImage
                        } : c);
                        setSeoConfigs(updated);
                        localStorage.setItem("seo_configs", JSON.stringify(updated));
                      } else {
                        const newConfig: SEOConfig = { page, title, description, keywords, ogImage };
                        const updated = [...seoConfigs, newConfig];
                        setSeoConfigs(updated);
                        localStorage.setItem("seo_configs", JSON.stringify(updated));
                      }
                      setShowSeoModal(false);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg hover:opacity-90"
                  >
                    {editingSeo ? "Update SEO" : "Save SEO"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showToolModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-2xl max-h-[95vh] overflow-y-auto border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">{editingTool ? "Edit Tool" : "Add New Tool"}</h3>
                <button onClick={() => setShowToolModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Tool Name *</label>
                  <input 
                    type="text" 
                    defaultValue={editingTool?.name || ""}
                    id="toolName"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-lg"
                    placeholder="Profile Analyzer"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Slug *</label>
                  <input 
                    type="text" 
                    defaultValue={editingTool?.slug || ""}
                    id="toolSlug"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                    placeholder="profile-analyzer"
                  />
                  <p className="text-gray-500 text-xs mt-1">URL: /tools/[slug]</p>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Description</label>
                  <textarea 
                    defaultValue={editingTool?.description || ""}
                    id="toolDescription"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white h-24"
                    placeholder="Describe what this tool does..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Status</label>
                    <select 
                      defaultValue={editingTool?.status || "enabled"}
                      id="toolStatus"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                    >
                      <option value="enabled">Enabled</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Category</label>
                    <input 
                      type="text" 
                      defaultValue={editingTool?.category || ""}
                      id="toolCategory"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                      placeholder="Profile, Content, etc."
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Views</label>
                    <input 
                      type="number" 
                      defaultValue={editingTool?.views || 0}
                      id="toolViews"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Conversions</label>
                    <input 
                      type="number" 
                      defaultValue={editingTool?.conversions || 0}
                      id="toolConversions"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Engagement %</label>
                    <input 
                      type="number" 
                      defaultValue={editingTool?.engagement || 0}
                      id="toolEngagement"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Rating (0-5)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      max="5"
                      defaultValue={editingTool?.rating || 4.5}
                      id="toolRating"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Popularity Score</label>
                    <input 
                      type="number" 
                      defaultValue={editingTool?.popularity || 50}
                      id="toolPopularity"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    onClick={() => setShowToolModal(false)}
                    className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      const name = (document.getElementById("toolName") as HTMLInputElement).value;
                      const slug = (document.getElementById("toolSlug") as HTMLInputElement).value;
                      const description = (document.getElementById("toolDescription") as HTMLTextAreaElement).value;
                      const status = (document.getElementById("toolStatus") as HTMLSelectElement).value as "enabled" | "disabled";
                      const category = (document.getElementById("toolCategory") as HTMLInputElement).value;
                      const views = parseInt((document.getElementById("toolViews") as HTMLInputElement).value) || 0;
                      const conversions = parseInt((document.getElementById("toolConversions") as HTMLInputElement).value) || 0;
                      const engagement = parseInt((document.getElementById("toolEngagement") as HTMLInputElement).value) || 0;
                      const rating = parseFloat((document.getElementById("toolRating") as HTMLInputElement).value) || 4.5;
                      const popularity = parseInt((document.getElementById("toolPopularity") as HTMLInputElement).value) || 50;
                      
                      if (!name || !slug) { alert("Name and Slug are required!"); return; }
                      
                      if (editingTool) {
                        const updated = tools.map(t => t.id === editingTool.id ? {
                          ...t, name, slug, description, status, category, views, conversions, engagement, rating, popularity
                        } : t);
                        setTools(updated);
                        localStorage.setItem("tools", JSON.stringify(updated));
                      } else {
                        const newTool: ToolData = {
                          id: Date.now().toString(),
                          name, slug, description, status, category, views, conversions, engagement, rating, popularity,
                          icon: "default",
                          uniqueUsers: 0,
                          avgTime: 0,
                          feedback: 0
                        };
                        const updated = [...tools, newTool];
                        setTools(updated);
                        localStorage.setItem("tools", JSON.stringify(updated));
                      }
                      setShowToolModal(false);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg hover:opacity-90"
                  >
                    {editingTool ? "Update Tool" : "Add Tool"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAbTestModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-2xl max-h-[95vh] overflow-y-auto border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">{editingAbTest ? "Edit A/B Test" : "Create A/B Test"}</h3>
                <button onClick={() => setShowAbTestModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Test Name *</label>
                  <input 
                    type="text" 
                    defaultValue={editingAbTest?.name || ""}
                    id="abTestName"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                    placeholder="Homepage Hero Test"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Tool to Test *</label>
                  <select 
                    defaultValue={editingAbTest?.tool || ""}
                    id="abTestTool"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                  >
                    <option value="">Select a tool</option>
                    {tools.map(tool => (
                      <option key={tool.id} value={tool.slug}>{tool.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Variant A Name *</label>
                    <input 
                      type="text" 
                      defaultValue={editingAbTest?.variantA?.name || ""}
                      id="abVariantA"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                      placeholder="Control"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Variant B Name *</label>
                    <input 
                      type="text" 
                      defaultValue={editingAbTest?.variantB?.name || ""}
                      id="abVariantB"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                      placeholder="Variant"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Status</label>
                  <select 
                    defaultValue={editingAbTest?.status || "draft"}
                    id="abTestStatus"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="running">Running</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    onClick={() => setShowAbTestModal(false)}
                    className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      const name = (document.getElementById("abTestName") as HTMLInputElement).value;
                      const tool = (document.getElementById("abTestTool") as HTMLSelectElement).value;
                      const variantA = (document.getElementById("abVariantA") as HTMLInputElement).value;
                      const variantB = (document.getElementById("abVariantB") as HTMLInputElement).value;
                      const status = (document.getElementById("abTestStatus") as HTMLSelectElement).value as "draft" | "running" | "completed";
                      
                      if (!name || !tool || !variantA || !variantB) { alert("All fields are required!"); return; }
                      
                      if (editingAbTest) {
                        const updated = abTests.map(t => t.id === editingAbTest.id ? {
                          ...t, name, tool, variantA: { ...t.variantA, name: variantA }, variantB: { ...t.variantB, name: variantB }, status
                        } : t);
                        setAbTests(updated);
                      } else {
                        const newTest: ABTest = {
                          id: Date.now().toString(),
                          name, tool, status,
                          variantA: { name: variantA, visitors: 0, conversions: 0 },
                          variantB: { name: variantB, visitors: 0, conversions: 0 },
                          winner: null,
                          startDate: new Date().toISOString().split("T")[0],
                          endDate: null
                        };
                        setAbTests([...abTests, newTest]);
                      }
                      setShowAbTestModal(false);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg hover:opacity-90"
                  >
                    {editingAbTest ? "Update Test" : "Create Test"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.SEO && seoData && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <SeoIcon className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Indexed Pages</p>
                <p className="text-2xl font-bold text-white">{seoData.indexing.indexed}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Search className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-gray-400 text-sm">Keywords</p>
                <p className="text-2xl font-bold text-white">{seoData.keywords.length}</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Keyword Rankings</h3>
              <div className="space-y-3">
                {seoData.keywords.map((kw, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-white">{kw.keyword}</span>
                    <span className="text-gray-400">#{kw.position}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.EMAIL && emailData && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Users className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-gray-400 text-sm">Subscribers</p>
                <p className="text-2xl font-bold text-white">{emailData.subscribers.toLocaleString()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <TrendingUp className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Growth</p>
                <p className="text-2xl font-bold text-white">+{emailData.growth}%</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.ADS && adData && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Eye className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-gray-400 text-sm">Impressions</p>
                <p className="text-2xl font-bold text-white">{adData.impressions.toLocaleString()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Target className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">CTR</p>
                <p className="text-2xl font-bold text-white">{adData.ctr}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <DollarSign className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Revenue</p>
                <p className="text-2xl font-bold text-white">${adData.revenue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.PERFORMANCE && performanceData && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Zap className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-gray-400 text-sm">Load Time</p>
                <p className="text-2xl font-bold text-white">{performanceData.loadTime}s</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Clock className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-gray-400 text-sm">TTFB</p>
                <p className="text-2xl font-bold text-white">{performanceData.ttfb}ms</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Activity className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Uptime</p>
                <p className="text-2xl font-bold text-white">{performanceData.uptime}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <AlertTriangle className="w-6 h-6 text-red-400 mb-2" />
                <p className="text-gray-400 text-sm">Errors (24h)</p>
                <p className="text-2xl font-bold text-white">{performanceData.errors}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.DATA && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Download className="w-6 h-6 text-blue-400 mb-2" />
                <h3 className="text-white font-semibold">Export Data</h3>
                <p className="text-gray-400 text-sm">Download all data</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Upload className="w-6 h-6 text-green-400 mb-2" />
                <h3 className="text-white font-semibold">Import Data</h3>
                <p className="text-gray-400 text-sm">Restore backup</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Database className="w-6 h-6 text-purple-400 mb-2" />
                <h3 className="text-white font-semibold">Backup</h3>
                <p className="text-gray-400 text-sm">Create backup</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Trash2 className="w-6 h-6 text-red-400 mb-2" />
                <h3 className="text-white font-semibold">Clear Cache</h3>
                <p className="text-gray-400 text-sm">Clear temporary files</p>
              </div>
            </div>
            </div>
          )}

        {activeTab === TABS.SITE_BRANDING && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Site Branding</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm">Site Name</label>
                  <input
                    type="text"
                    value={siteBranding.siteName}
                    onChange={(e) => setSiteBranding({...siteBranding, siteName: e.target.value})}
                    className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Site Description</label>
                  <input
                    type="text"
                    value={siteBranding.siteDescription}
                    onChange={(e) => setSiteBranding({...siteBranding, siteDescription: e.target.value})}
                    className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Logo URL</label>
                  <input
                    type="text"
                    value={siteBranding.logoUrl}
                    onChange={(e) => setSiteBranding({...siteBranding, logoUrl: e.target.value})}
                    placeholder="https://..."
                    className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Favicon URL</label>
                  <input
                    type="text"
                    value={siteBranding.faviconUrl}
                    onChange={(e) => setSiteBranding({...siteBranding, faviconUrl: e.target.value})}
                    placeholder="https://.../favicon.ico"
                    className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Primary Color</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="color"
                      value={siteBranding.primaryColor}
                      onChange={(e) => setSiteBranding({...siteBranding, primaryColor: e.target.value})}
                      className="w-12 h-10 bg-transparent border border-white/20 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={siteBranding.primaryColor}
                      onChange={(e) => setSiteBranding({...siteBranding, primaryColor: e.target.value})}
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Secondary Color</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="color"
                      value={siteBranding.secondaryColor}
                      onChange={(e) => setSiteBranding({...siteBranding, secondaryColor: e.target.value})}
                      className="w-12 h-10 bg-transparent border border-white/20 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={siteBranding.secondaryColor}
                      onChange={(e) => setSiteBranding({...siteBranding, secondaryColor: e.target.value})}
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Accent Color</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="color"
                      value={siteBranding.accentColor}
                      onChange={(e) => setSiteBranding({...siteBranding, accentColor: e.target.value})}
                      className="w-12 h-10 bg-transparent border border-white/20 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={siteBranding.accentColor}
                      onChange={(e) => setSiteBranding({...siteBranding, accentColor: e.target.value})}
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>
              <button className="mt-6 px-6 py-2 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg">
                Save Branding
              </button>
            </div>
          </div>
        )}

        {activeTab === TABS.SOCIAL_LINKS && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Social Media Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm">Facebook</label>
                  <input
                    type="text"
                    value={socialLinks.facebook}
                    onChange={(e) => setSocialLinks({...socialLinks, facebook: e.target.value})}
                    placeholder="https://facebook.com/..."
                    className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Twitter / X</label>
                  <input
                    type="text"
                    value={socialLinks.twitter}
                    onChange={(e) => setSocialLinks({...socialLinks, twitter: e.target.value})}
                    placeholder="https://twitter.com/..."
                    className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Instagram</label>
                  <input
                    type="text"
                    value={socialLinks.instagram}
                    onChange={(e) => setSocialLinks({...socialLinks, instagram: e.target.value})}
                    placeholder="https://instagram.com/..."
                    className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">LinkedIn</label>
                  <input
                    type="text"
                    value={socialLinks.linkedin}
                    onChange={(e) => setSocialLinks({...socialLinks, linkedin: e.target.value})}
                    placeholder="https://linkedin.com/..."
                    className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">YouTube</label>
                  <input
                    type="text"
                    value={socialLinks.youtube}
                    onChange={(e) => setSocialLinks({...socialLinks, youtube: e.target.value})}
                    placeholder="https://youtube.com/..."
                    className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">GitHub</label>
                  <input
                    type="text"
                    value={socialLinks.github}
                    onChange={(e) => setSocialLinks({...socialLinks, github: e.target.value})}
                    placeholder="https://github.com/..."
                    className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
              </div>
              <button className="mt-6 px-6 py-2 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg">
                Save Social Links
              </button>
            </div>
          </div>
        )}

        {activeTab === TABS.API_KEYS && apiKeys && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <Key className="w-6 h-6 text-blue-400 mb-2" />
                  <p className="text-gray-400 text-sm">Total Keys</p>
                  <p className="text-2xl font-bold text-white">{apiKeys.length}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
                  <p className="text-gray-400 text-sm">Active</p>
                  <p className="text-2xl font-bold text-white">{apiKeys.filter(k => k.status === "active").length}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <XCircle className="w-6 h-6 text-red-400 mb-2" />
                  <p className="text-gray-400 text-sm">Inactive</p>
                  <p className="text-2xl font-bold text-white">{apiKeys.filter(k => k.status === "inactive").length}</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg">
                <Plus className="w-4 h-4" /> Add API Key
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Third-Party API Keys</h3>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <h4 className="text-white font-medium">{apiKey.name}</h4>
                      <p className="text-gray-400 text-sm">{apiKey.service} • {apiKey.key}</p>
                      <p className="text-gray-500 text-xs">Added: {apiKey.createdAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${apiKey.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                        {apiKey.status}
                      </span>
                      <button className="p-2 hover:bg-white/10 rounded-lg"><Edit className="w-4 h-4 text-gray-400" /></button>
                      <button className="p-2 hover:bg-white/10 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.EMAIL_SETTINGS && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">SMTP Email Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm">SMTP Host</label>
                  <input
                    type="text"
                    value={emailSettings.smtpHost}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
                    placeholder="smtp.gmail.com"
                    className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">SMTP Port</label>
                  <input
                    type="text"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
                    placeholder="587"
                    className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">SMTP Username</label>
                  <input
                    type="text"
                    value={emailSettings.smtpUser}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpUser: e.target.value})}
                    placeholder="your-email@gmail.com"
                    className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">SMTP Password</label>
                  <input
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                    placeholder="••••••••"
                    className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">From Email</label>
                  <input
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                    placeholder="noreply@yourdomain.com"
                    className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">From Name</label>
                  <input
                    type="text"
                    value={emailSettings.fromName}
                    onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                    placeholder="LinkForge"
                    className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={emailSettings.enableSsl}
                    onChange={(e) => setEmailSettings({...emailSettings, enableSsl: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <label className="text-gray-300">Enable SSL/TLS</label>
                </div>
              </div>
              <button className="mt-6 px-6 py-2 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg">
                Save Email Settings
              </button>
            </div>
          </div>
        )}

        {activeTab === TABS.AD_MANAGEMENT && adPlacements && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Eye className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Impressions</p>
                <p className="text-2xl font-bold text-white">{adPlacements.reduce((a, p) => a + p.impressions, 0).toLocaleString()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <MousePointer className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Clicks</p>
                <p className="text-2xl font-bold text-white">{adPlacements.reduce((a, p) => a + p.clicks, 0).toLocaleString()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <DollarSign className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Ad Revenue</p>
                <p className="text-2xl font-bold text-white">${adPlacements.reduce((a, p) => a + p.revenue, 0).toFixed(2)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Target className="w-6 h-6 text-purple-400 mb-2" />
                <p className="text-gray-400 text-sm">Avg. CTR</p>
                <p className="text-2xl font-bold text-white">{((adPlacements.reduce((a, p) => a + p.clicks, 0) / adPlacements.reduce((a, p) => a + p.impressions, 0)) * 100).toFixed(2)}%</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Ad Placements</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg">
                  <Plus className="w-4 h-4" /> Add Placement
                </button>
              </div>
              <div className="space-y-4">
                {adPlacements.map((placement) => (
                  <div key={placement.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <h4 className="text-white font-medium">{placement.name}</h4>
                      <p className="text-gray-400 text-sm">{placement.location} • {placement.size}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs">
                        <span className="text-gray-500">{placement.impressions.toLocaleString()} impr.</span>
                        <span className="text-gray-500">{placement.clicks.toLocaleString()} clicks</span>
                        <span className="text-green-400">${placement.revenue} revenue</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        placement.status === "active" ? "bg-green-500/20 text-green-400" :
                        placement.status === "paused" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-gray-500/20 text-gray-400"
                      }`}>{placement.status}</span>
                      <button className="p-2 hover:bg-white/10 rounded-lg"><Edit className="w-4 h-4 text-gray-400" /></button>
                      <button className="p-2 hover:bg-white/10 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.AFFILIATE_LINKS && affiliateLinks && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <MousePointer className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Clicks</p>
                <p className="text-2xl font-bold text-white">{affiliateLinks.reduce((a, p) => a + p.clicks, 0).toLocaleString()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Conversions</p>
                <p className="text-2xl font-bold text-white">{affiliateLinks.reduce((a, p) => a + p.conversions, 0)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <DollarSign className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-white">${affiliateLinks.reduce((a, p) => a + p.earnings, 0).toFixed(2)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <TrendingUp className="w-6 h-6 text-purple-400 mb-2" />
                <p className="text-gray-400 text-sm">Conv. Rate</p>
                <p className="text-2xl font-bold text-white">{((affiliateLinks.reduce((a, p) => a + p.conversions, 0) / affiliateLinks.reduce((a, p) => a + p.clicks, 0)) * 100).toFixed(2)}%</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Affiliate Links</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg">
                  <Plus className="w-4 h-4" /> Add Affiliate
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Program</th>
                      <th className="text-left text-gray-400 font-medium py-3 px-4">Product</th>
                      <th className="text-right text-gray-400 font-medium py-3 px-4">Clicks</th>
                      <th className="text-right text-gray-400 font-medium py-3 px-4">Conversions</th>
                      <th className="text-right text-gray-400 font-medium py-3 px-4">Earnings</th>
                      <th className="text-center text-gray-400 font-medium py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {affiliateLinks.map((link) => (
                      <tr key={link.id} className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">{link.program}</td>
                        <td className="py-3 px-4 text-gray-300">{link.product}</td>
                        <td className="text-right text-white py-3 px-4">{link.clicks.toLocaleString()}</td>
                        <td className="text-right text-white py-3 px-4">{link.conversions}</td>
                        <td className="text-right text-green-400 py-3 px-4">${link.earnings}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${link.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                            {link.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.PREMIUM_FEATURES && premiumFeatures && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Users className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Subscribers</p>
                <p className="text-2xl font-bold text-white">{premiumFeatures.reduce((a, p) => a + p.subscribers, 0)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <DollarSign className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Monthly Revenue</p>
                <p className="text-2xl font-bold text-white">${premiumFeatures.reduce((a, p) => a + p.revenue, 0).toFixed(2)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <CheckCircle className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-gray-400 text-sm">Active Features</p>
                <p className="text-2xl font-bold text-white">{premiumFeatures.filter(p => p.status === "active").length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Clock className="w-6 h-6 text-purple-400 mb-2" />
                <p className="text-gray-400 text-sm">Coming Soon</p>
                <p className="text-2xl font-bold text-white">{premiumFeatures.filter(p => p.status === "coming_soon").length}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Premium Features</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg">
                  <Plus className="w-4 h-4" /> Add Feature
                </button>
              </div>
              <div className="space-y-4">
                {premiumFeatures.map((feature) => (
                  <div key={feature.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-medium">{feature.name}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          feature.plan === "enterprise" ? "bg-purple-500/20 text-purple-400" :
                          feature.plan === "pro" ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-blue-500/20 text-blue-400"
                        }`}>{feature.plan}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs">
                        <span className="text-gray-500">${feature.price}/mo</span>
                        <span className="text-gray-500">{feature.subscribers} subscribers</span>
                        <span className="text-green-400">${feature.revenue}/mo revenue</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        feature.status === "active" ? "bg-green-500/20 text-green-400" :
                        feature.status === "coming_soon" ? "bg-purple-500/20 text-purple-400" :
                        "bg-gray-500/20 text-gray-400"
                      }`}>{feature.status === "coming_soon" ? "Coming Soon" : feature.status}</span>
                      <button className="p-2 hover:bg-white/10 rounded-lg"><Edit className="w-4 h-4 text-gray-400" /></button>
                      <button className="p-2 hover:bg-white/10 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>
          )}

        {activeTab === TABS.ERROR_LOGS && errorLogs && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <AlertCircle className="w-6 h-6 text-red-400 mb-2" />
                <p className="text-gray-400 text-sm">Errors</p>
                <p className="text-2xl font-bold text-white">{errorLogs.filter(e => e.level === "error").length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <AlertTriangle className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-gray-400 text-sm">Warnings</p>
                <p className="text-2xl font-bold text-white">{errorLogs.filter(e => e.level === "warning").length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Info className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-gray-400 text-sm">Info</p>
                <p className="text-2xl font-bold text-white">{errorLogs.filter(e => e.level === "info").length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Activity className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Logs</p>
                <p className="text-2xl font-bold text-white">{errorLogs.length}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Recent Error Logs</h3>
              <div className="space-y-3">
                {errorLogs.map((log) => (
                  <div key={log.id} className="flex items-start justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-start gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        log.level === "error" ? "bg-red-500/20 text-red-400" :
                        log.level === "warning" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-blue-500/20 text-blue-400"
                      }`}>{log.level}</span>
                      <div>
                        <p className="text-white font-medium">{log.message}</p>
                        <p className="text-gray-400 text-sm">{log.page}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-xs">{log.timestamp}</p>
                      {log.userId && <p className="text-gray-500 text-xs">User: {log.userId}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.BACKUP_RESTORE && backups && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Database className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Backups</p>
                <p className="text-2xl font-bold text-white">{backups.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <HardDrive className="w-6 h-6 text-purple-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Size</p>
                <p className="text-2xl font-bold text-white">{backups.reduce((a, b) => a + parseFloat(b.size), 0).toFixed(1)} GB</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-white">{backups.filter(b => b.status === "completed").length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Clock className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-gray-400 text-sm">Last Backup</p>
                <p className="text-2xl font-bold text-white">{backups[0]?.createdAt.split(" ")[0]}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Backup History</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg">
                  <Plus className="w-4 h-4" /> Create Backup
                </button>
              </div>
              <div className="space-y-3">
                {backups.map((backup) => (
                  <div key={backup.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <h4 className="text-white font-medium">{backup.name}</h4>
                      <p className="text-gray-400 text-sm">{backup.createdAt} • {backup.size}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        backup.status === "completed" ? "bg-green-500/20 text-green-400" :
                        backup.status === "in_progress" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>{backup.status}</span>
                      <span className="px-2 py-1 bg-white/10 text-gray-400 rounded-full text-xs">{backup.type}</span>
                      <button className="p-2 hover:bg-white/10 rounded-lg"><Download className="w-4 h-4 text-gray-400" /></button>
                      <button className="p-2 hover:bg-white/10 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Restore Backup</h3>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">Drop a backup file here or click to upload</p>
                <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">Choose File</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === TABS.CACHE_MANAGEMENT && caches && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Database className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Cache</p>
                <p className="text-2xl font-bold text-white">{caches.reduce((a, c) => a + parseFloat(c.size), 0).toFixed(0)} MB</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <FileText className="w-6 h-6 text-purple-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Items</p>
                <p className="text-2xl font-bold text-white">{caches.reduce((a, c) => a + c.items, 0).toLocaleString()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Clock className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-gray-400 text-sm">Last Cleared</p>
                <p className="text-2xl font-bold text-white">{caches[0]?.lastCleared.split(" ")[0]}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <Trash2 className="w-6 h-6 text-red-400 mb-2" />
                <p className="text-gray-400 text-sm">Clear All</p>
                <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Clear All Cache</button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Cache Types</h3>
              <div className="space-y-4">
                {caches.map((cache, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <h4 className="text-white font-medium">{cache.type}</h4>
                      <p className="text-gray-400 text-sm">{cache.items.toLocaleString()} items • Last cleared: {cache.lastCleared}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-white font-medium">{cache.size}</span>
                      <button className="px-3 py-1 bg-white/10 text-gray-400 rounded-lg hover:bg-white/20 text-sm">Clear</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

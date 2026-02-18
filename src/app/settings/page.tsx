"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff, Save, Check, X } from "lucide-react";

interface GoogleServices {
  analytics: {
    enabled: boolean;
    measurementId: string;
  };
  adsense: {
    enabled: boolean;
    adSlotId: string;
  };
  searchConsole: {
    enabled: boolean;
    verificationCode: string;
  };
  tagManager: {
    enabled: boolean;
    containerId: string;
  };
}

interface ApiSettings {
  openai: { enabled: boolean; apiKey: string };
  anthropic: { enabled: boolean; apiKey: string };
  serper: { enabled: boolean; apiKey: string };
  apify: { enabled: boolean; apiKey: string };
  phantomBuster: { enabled: boolean; apiKey: string };
}

const DEFAULT_GOOGLE_SERVICES: GoogleServices = {
  analytics: { enabled: false, measurementId: "" },
  adsense: { enabled: false, adSlotId: "" },
  searchConsole: { enabled: false, verificationCode: "" },
  tagManager: { enabled: false, containerId: "" },
};

const DEFAULT_API_SETTINGS: ApiSettings = {
  openai: { enabled: false, apiKey: "" },
  anthropic: { enabled: false, apiKey: "" },
  serper: { enabled: false, apiKey: "" },
  apify: { enabled: false, apiKey: "" },
  phantomBuster: { enabled: false, apiKey: "" },
};

export default function AdminSettings() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [activeTab, setActiveTab] = useState<"auth" | "google" | "apis">("auth");
  const [googleServices, setGoogleServices] = useState<GoogleServices>(DEFAULT_GOOGLE_SERVICES);
  const [apiSettings, setApiSettings] = useState<ApiSettings>(DEFAULT_API_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    
    const storedGoogle = localStorage.getItem("google_services");
    if (storedGoogle) {
      setGoogleServices(JSON.parse(storedGoogle));
    }
    
    const storedApis = localStorage.getItem("api_settings");
    if (storedApis) {
      setApiSettings(JSON.parse(storedApis));
    }
    
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "") && password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "")) {
      localStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    router.push("/");
  };

  const saveGoogleServices = () => {
    localStorage.setItem("google_services", JSON.stringify(googleServices));
    showSaved();
  };

  const saveApiSettings = () => {
    localStorage.setItem("api_settings", JSON.stringify(apiSettings));
    showSaved();
  };

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleService = (service: keyof GoogleServices) => {
    setGoogleServices(prev => ({
      ...prev,
      [service]: { ...prev[service], enabled: !prev[service].enabled }
    }));
  };

  const toggleApi = (api: keyof ApiSettings) => {
    setApiSettings(prev => ({
      ...prev,
      [api]: { ...prev[api], enabled: !prev[api].enabled }
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <p className="text-gray-400 mt-2">Access your dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                placeholder="admin@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <a href="/" className="text-gray-400 hover:text-white text-sm">← Back to Home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Settings</h1>
            <p className="text-gray-400 mt-1">Configure integrations and APIs</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Logout
          </button>
        </div>

        {saved && (
          <div className="mb-6 bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg flex items-center gap-2">
            <Check className="w-5 h-5" /> Settings saved successfully!
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
          <div className="flex border-b border-white/20">
            <button
              onClick={() => setActiveTab("auth")}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === "auth" 
                  ? "bg-white/10 text-white" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Authentication
            </button>
            <button
              onClick={() => setActiveTab("google")}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === "google" 
                  ? "bg-white/10 text-white" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Google Services
            </button>
            <button
              onClick={() => setActiveTab("apis")}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === "apis" 
                  ? "bg-white/10 text-white" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              APIs
            </button>
          </div>

          <div className="p-6">
            {activeTab === "auth" && (
              <div className="space-y-6">
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-300">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">You are logged in</span>
                  </div>
                  <p className="text-green-200/70 text-sm mt-1">Email: {process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin"}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Current Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                        placeholder="••••••••"
                      />
                    </div>
                    <button className="px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#0A66C2]/90 w-fit">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "google" && (
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.84 12.14c0-.81-.07-1.59-.19-2.34H12v4.42h6.08c-.26 1.38-1.06 2.56-2.26 3.34v2.78h3.66c2.14-1.97 3.36-4.87 3.36-8.2z"/>
                            <path d="M12 22c3.04 0 5.6-1 7.47-2.72l-3.66-2.78c-1.01.68-2.31 1.08-3.81 1.08-2.93 0-5.41-1.98-6.3-4.64H1.87v2.87C3.72 19.57 7.56 22 12 22z"/>
                            <path d="M5.7 13.94c-.23-.68-.36-1.4-.36-2.14s.13-1.46.36-2.14V6.79H1.87C1.08 8.17.64 9.75.64 11.4s.44 3.23 1.23 4.61l3.83-2.07z"/>
                            <path d="M12 4.58c1.62 0 3.07.56 4.21 1.64l3.15-3.15C17.6 1.18 15.04 0 12 0 7.56 0 3.72 2.43 1.87 5.79l3.83 2.07c.89-2.66 3.37-4.28 6.3-4.28z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Google Analytics</h4>
                          <p className="text-gray-400 text-sm">Track website traffic and user behavior</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleService("analytics")}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          googleServices.analytics.enabled ? "bg-green-500" : "bg-gray-600"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          googleServices.analytics.enabled ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>
                    {googleServices.analytics.enabled && (
                      <input
                        type="text"
                        value={googleServices.analytics.measurementId}
                        onChange={(e) => setGoogleServices(prev => ({
                          ...prev,
                          analytics: { ...prev.analytics, measurementId: e.target.value }
                        }))}
                        placeholder="G-XXXXXXXXXX"
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500"
                      />
                    )}
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21.6 18.2L13 11.75v-.91c1.65-.49 2.8-2.17 2.43-4.05-.26-1.31-1.3-2.4-2.61-2.7C10.54 3.57 8.5 5.3 8.5 7.5h2c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5c0 .84-.69 1.52-1.53 1.5-.54-.01-.97.45-.97.99v1.76L2.4 18.2c-.65.49-.02 1.8.82 1.8h16.36c.84 0 1.47-1.31.82-1.8z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Google AdSense</h4>
                          <p className="text-gray-400 text-sm">Monetize your website with ads</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleService("adsense")}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          googleServices.adsense.enabled ? "bg-green-500" : "bg-gray-600"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          googleServices.adsense.enabled ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>
                    {googleServices.adsense.enabled && (
                      <input
                        type="text"
                        value={googleServices.adsense.adSlotId}
                        onChange={(e) => setGoogleServices(prev => ({
                          ...prev,
                          adsense: { ...prev.adsense, adSlotId: e.target.value }
                        }))}
                        placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500"
                      />
                    )}
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Google Search Console</h4>
                          <p className="text-gray-400 text-sm">Monitor and maintain search presence</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleService("searchConsole")}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          googleServices.searchConsole.enabled ? "bg-green-500" : "bg-gray-600"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          googleServices.searchConsole.enabled ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>
                    {googleServices.searchConsole.enabled && (
                      <input
                        type="text"
                        value={googleServices.searchConsole.verificationCode}
                        onChange={(e) => setGoogleServices(prev => ({
                          ...prev,
                          searchConsole: { ...prev.searchConsole, verificationCode: e.target.value }
                        }))}
                        placeholder="google-site-verification code"
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500"
                      />
                    )}
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10 0h2v2h-2zm-6-4h8v2h-8z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Google Tag Manager</h4>
                          <p className="text-gray-400 text-sm">Manage tracking tags easily</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleService("tagManager")}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          googleServices.tagManager.enabled ? "bg-green-500" : "bg-gray-600"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          googleServices.tagManager.enabled ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>
                    {googleServices.tagManager.enabled && (
                      <input
                        type="text"
                        value={googleServices.tagManager.containerId}
                        onChange={(e) => setGoogleServices(prev => ({
                          ...prev,
                          tagManager: { ...prev.tagManager, containerId: e.target.value }
                        }))}
                        placeholder="GTM-XXXXXXX"
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500"
                      />
                    )}
                  </div>
                </div>

                <button
                  onClick={saveGoogleServices}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg hover:opacity-90"
                >
                  <Save className="w-5 h-5" />
                  Save Google Services
                </button>
              </div>
            )}

            {activeTab === "apis" && (
              <div className="space-y-6">
                <p className="text-gray-300 mb-4">Toggle APIs ON/OFF and configure API keys</p>
                
                <div className="grid gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-green-400 font-bold">AI</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">OpenAI API</h4>
                          <p className="text-gray-400 text-sm">GPT models for AI-powered features</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleApi("openai")}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          apiSettings.openai.enabled ? "bg-green-500" : "bg-gray-600"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          apiSettings.openai.enabled ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>
                    {apiSettings.openai.enabled && (
                      <input
                        type="password"
                        value={apiSettings.openai.apiKey}
                        onChange={(e) => setApiSettings(prev => ({
                          ...prev,
                          openai: { ...prev.openai, apiKey: e.target.value }
                        }))}
                        placeholder="sk-..."
                        className="w-full mt-3 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500"
                      />
                    )}
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-orange-400 font-bold">AN</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Anthropic API</h4>
                          <p className="text-gray-400 text-sm">Claude models for advanced AI</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleApi("anthropic")}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          apiSettings.anthropic.enabled ? "bg-green-500" : "bg-gray-600"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          apiSettings.anthropic.enabled ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>
                    {apiSettings.anthropic.enabled && (
                      <input
                        type="password"
                        value={apiSettings.anthropic.apiKey}
                        onChange={(e) => setApiSettings(prev => ({
                          ...prev,
                          anthropic: { ...prev.anthropic, apiKey: e.target.value }
                        }))}
                        placeholder="sk-ant-..."
                        className="w-full mt-3 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500"
                      />
                    )}
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-blue-400 font-bold">🔍</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Serper API</h4>
                          <p className="text-gray-400 text-sm">Google search results for research</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleApi("serper")}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          apiSettings.serper.enabled ? "bg-green-500" : "bg-gray-600"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          apiSettings.serper.enabled ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>
                    {apiSettings.serper.enabled && (
                      <input
                        type="password"
                        value={apiSettings.serper.apiKey}
                        onChange={(e) => setApiSettings(prev => ({
                          ...prev,
                          serper: { ...prev.serper, apiKey: e.target.value }
                        }))}
                        placeholder="API key"
                        className="w-full mt-3 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500"
                      />
                    )}
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-cyan-400 font-bold">AP</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Apify API</h4>
                          <p className="text-gray-400 text-sm">Web scraping and data extraction</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleApi("apify")}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          apiSettings.apify.enabled ? "bg-green-500" : "bg-gray-600"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          apiSettings.apify.enabled ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>
                    {apiSettings.apify.enabled && (
                      <input
                        type="password"
                        value={apiSettings.apify.apiKey}
                        onChange={(e) => setApiSettings(prev => ({
                          ...prev,
                          apify: { ...prev.apify, apiKey: e.target.value }
                        }))}
                        placeholder="API key"
                        className="w-full mt-3 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500"
                      />
                    )}
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-pink-400 font-bold">PB</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">PhantomBuster API</h4>
                          <p className="text-gray-400 text-sm">LinkedIn data extraction</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleApi("phantomBuster")}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          apiSettings.phantomBuster.enabled ? "bg-green-500" : "bg-gray-600"
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          apiSettings.phantomBuster.enabled ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>
                    {apiSettings.phantomBuster.enabled && (
                      <input
                        type="password"
                        value={apiSettings.phantomBuster.apiKey}
                        onChange={(e) => setApiSettings(prev => ({
                          ...prev,
                          phantomBuster: { ...prev.phantomBuster, apiKey: e.target.value }
                        }))}
                        placeholder="API key"
                        className="w-full mt-3 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500"
                      />
                    )}
                  </div>
                </div>

                <button
                  onClick={saveApiSettings}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white rounded-lg hover:opacity-90"
                >
                  <Save className="w-5 h-5" />
                  Save API Settings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

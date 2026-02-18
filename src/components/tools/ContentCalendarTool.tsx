"use client";

import { useState, useEffect } from "react";
import { Calendar, Copy, Check, Sparkles, Plus, Trash2, Download, Upload, Bell, BellOff, CheckCircle, Circle, Clock, AlertCircle } from "lucide-react";

interface CalendarPost {
  id: number;
  day: string;
  date: string;
  type: string;
  topic: string;
  idea: string;
  status: "pending" | "posted" | "scheduled";
  reminder: boolean;
}

const contentTypes = [
  { type: "Educational", examples: ["How-to guide", "Tutorial", "Tips & tricks", "Industry explainer"], emoji: "📚" },
  { type: "Personal", examples: ["Career journey", "Lessons learned", "Behind the scenes", "Day in the life"], emoji: "👤" },
  { type: "Professional", examples: ["Industry news", "Company update", "Team achievement", "Project showcase"], emoji: "💼" },
  { type: "Engagement", examples: ["Question poll", "Thought starter", "Prediction", "Debate"], emoji: "💬" },
  { type: "Announcement", examples: ["Product launch", "Milestone", "Partnership", "Event"], emoji: "📢" },
  { type: "Story", examples: ["Success story", "Failure & lessons", "Customer story", "Team story"], emoji: "📖" },
];

const topics = [
  "Career Advice", "Tech Trends", "Leadership", "Productivity", "Remote Work",
  "Networking", "Interview Tips", "Industry Insights", "Personal Branding", "Skills Development",
  "AI & Automation", "Cloud Computing", "Data Science", "Marketing", "Entrepreneurship"
];

const ideaTemplates = [
  "5 things I wish I knew about {topic}...",
  "How I landed my dream job in {topic}...",
  "The truth about {topic} no one tells you...",
  "{topic} tips that actually work...",
  "My journey from beginner to expert in {topic}...",
  "What's your take on {topic}?",
  "Hot take: {topic} is overrated because...",
  "I asked 100 people about {topic}. Here's what they said...",
];

export default function ContentCalendarTool() {
  const [posts, setPosts] = useState<CalendarPost[]>([]);
  const [showIdeas, setShowIdeas] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>("default");
  const [filter, setFilter] = useState<"all" | "pending" | "posted">("all");

  useEffect(() => {
    const saved = localStorage.getItem("contentCalendar");
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      const today = new Date();
      setPosts([
        { id: 1, day: "Monday", date: getNextDay(today, 1), type: "Educational", topic: "Career Advice", idea: "", status: "pending", reminder: true },
        { id: 2, day: "Tuesday", date: getNextDay(today, 2), type: "Personal", topic: "Lessons learned", idea: "", status: "pending", reminder: false },
        { id: 3, day: "Wednesday", date: getNextDay(today, 3), type: "Professional", topic: "Industry Insights", idea: "", status: "pending", reminder: true },
        { id: 4, day: "Thursday", date: getNextDay(today, 4), type: "Engagement", topic: "Question poll", idea: "", status: "pending", reminder: false },
        { id: 5, day: "Friday", date: getNextDay(today, 5), type: "Personal", topic: "Career Journey", idea: "", status: "pending", reminder: true },
      ]);
    }
    
    if (typeof window !== "undefined" && "Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contentCalendar", JSON.stringify(posts));
  }, [posts]);

  function getNextDay(today: Date, dayOfWeek: number): string {
    const result = new Date(today);
    const currentDay = result.getDay();
    const distance = (dayOfWeek + 7 - currentDay) % 7;
    result.setDate(result.getDate() + (distance === 0 ? 7 : distance));
    return result.toISOString().split("T")[0];
  }

  const requestNotificationPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
    }
  };

  const scheduleReminder = (post: CalendarPost) => {
    if (notificationPermission !== "granted") {
      requestNotificationPermission();
      return;
    }
    
    const postDate = new Date(post.date);
    const now = new Date();
    const reminderTime = new Date(postDate);
    reminderTime.setHours(9, 0, 0, 0);
    
    if (reminderTime > now) {
      const timeUntilReminder = reminderTime.getTime() - now.getTime();
      setTimeout(() => {
        new Notification("LinkedIn Content Reminder", {
          body: `Time to post! Your "${post.type}" post about ${post.topic} is scheduled for today.`,
          icon: "/favicon.ico"
        });
      }, timeUntilReminder);
      alert(`Reminder set for ${post.date} at 9:00 AM`);
    } else {
      alert("This date has already passed. Please update the date to set a reminder.");
    }
  };

  const addPost = () => {
    const today = new Date();
    setPosts([...posts, { 
      id: Date.now(), 
      day: "", 
      date: getNextDay(today, posts.length % 5 + 1),
      type: "Educational", 
      topic: "Career Advice", 
      idea: "", 
      status: "pending",
      reminder: false
    }]);
  };

  const removePost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const updatePost = (id: number, field: string, value: any) => {
    setPosts(posts.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const toggleStatus = (id: number) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        const newStatus = p.status === "posted" ? "pending" : "posted";
        return { ...p, status: newStatus };
      }
      return p;
    }));
  };

  const generateIdeas = () => {
    const newIdeas = ideaTemplates.map(template => {
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      const randomType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
      return {
        id: Date.now() + Math.random(),
        day: "",
        date: getNextDay(new Date(), Math.floor(Math.random() * 5) + 1),
        type: randomType.type,
        topic: randomTopic,
        idea: template.replace("{topic}", randomTopic.toLowerCase()),
        status: "pending" as const,
        reminder: false
      };
    });
    setPosts([...posts, ...newIdeas]);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(posts, null, 2);
    const dataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(dataStr);
    const exportFileDefaultName = "content-calendar.json";
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (Array.isArray(imported)) {
          setPosts(imported);
          alert("Calendar imported successfully!");
        }
      } catch {
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  const filteredPosts = posts.filter(p => {
    if (filter === "pending") return p.status === "pending";
    if (filter === "posted") return p.status === "posted";
    return true;
  });

  const stats = {
    total: posts.length,
    pending: posts.filter(p => p.status === "pending").length,
    posted: posts.filter(p => p.status === "posted").length,
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#7c3aed] to-[#db2777] rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Content Calendar</h2>
            <p className="text-gray-500 text-sm">Plan your LinkedIn posting schedule</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={exportData} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200" title="Export Calendar">
            <Download className="w-4 h-4 text-gray-600" />
          </button>
          <label className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer" title="Import Calendar">
            <Upload className="w-4 h-4 text-gray-600" />
            <input type="file" accept=".json" onChange={importData} className="hidden" />
          </label>
        </div>
      </div>

      {notificationPermission !== "granted" && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <span className="text-sm text-yellow-700">Enable notifications to get reminders</span>
          </div>
          <button onClick={requestNotificationPermission} className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm font-medium">
            Enable
          </button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
          <p className="text-xs text-gray-500">Pending</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{stats.posted}</p>
          <p className="text-xs text-gray-500">Posted</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded-full text-sm ${filter === "all" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600"}`}>All</button>
        <button onClick={() => setFilter("pending")} className={`px-3 py-1 rounded-full text-sm ${filter === "pending" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}>Pending</button>
        <button onClick={() => setFilter("posted")} className={`px-3 py-1 rounded-full text-sm ${filter === "posted" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600"}`}>Posted</button>
        <button onClick={generateIdeas} className="ml-auto px-3 py-1 bg-gradient-to-r from-[#7c3aed] to-[#db2777] text-white rounded-full text-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Generate Ideas
        </button>
      </div>

      <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No posts yet. Add a post or generate ideas!</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className={`p-4 rounded-lg border ${post.status === "posted" ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleStatus(post.id)} className={post.status === "posted" ? "text-green-600" : "text-gray-400"}>
                    {post.status === "posted" ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </button>
                  <input 
                    type="text" 
                    value={post.day} 
                    onChange={(e) => updatePost(post.id, "day", e.target.value)}
                    className="font-semibold text-gray-800 bg-transparent border-none focus:outline-none w-24"
                    placeholder="Day"
                  />
                  <input 
                    type="date" 
                    value={post.date} 
                    onChange={(e) => updatePost(post.id, "date", e.target.value)}
                    className="text-xs px-2 py-1 bg-white border rounded"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => scheduleReminder(post)} 
                    className={`p-1 rounded ${post.reminder ? "text-purple-600 bg-purple-100" : "text-gray-400 hover:text-purple-600"}`}
                    title="Set reminder"
                  >
                    {post.reminder ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => removePost(post.id)} className="text-red-500 hover:text-red-700 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <select value={post.type} onChange={(e) => updatePost(post.id, "type", e.target.value)} className="text-sm p-2 border rounded bg-white">
                  {contentTypes.map(t => <option key={t.type}>{t.type}</option>)}
                </select>
                <select value={post.topic} onChange={(e) => updatePost(post.id, "topic", e.target.value)} className="text-sm p-2 border rounded bg-white">
                  {topics.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <input 
                type="text"
                value={post.idea}
                onChange={(e) => updatePost(post.id, "idea", e.target.value)}
                className="w-full p-2 text-sm border rounded"
                placeholder="Your specific idea..."
              />
            </div>
          ))
        )}
      </div>

      <button onClick={addPost} className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-medium flex items-center justify-center gap-2 hover:border-gray-400 hover:text-gray-600">
        <Plus className="w-4 h-4" /> Add Post
      </button>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-1 flex items-center gap-2">
          <Clock className="w-4 h-4" /> How to use this calendar:
        </h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Add your planned posts for each day of the week</li>
          <li>• Click the bell icon to set browser reminders</li>
          <li>• Export your calendar to backup (JSON file)</li>
          <li>• Mark posts as "Posted" when done</li>
          <li>• Use "Generate Ideas" for AI-powered content ideas</li>
        </ul>
      </div>
    </div>
  );
}

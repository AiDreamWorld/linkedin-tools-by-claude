"use client";

import { useState, useEffect } from "react";
import { Bell, Plus, Minus, Trash2, TrendingUp, Calendar, Award, Target, Star } from "lucide-react";

interface Skill {
  id: number;
  name: string;
  count: number;
  lastEndorsed: string;
  targetCount: number;
  notifications: boolean;
  history: { date: string; change: number }[];
}

export default function EndorsementTrackerTool() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [targetCount, setTargetCount] = useState(50);
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState<"all" | "near" | "achieved">("all");

  useEffect(() => {
    const saved = localStorage.getItem("endorsementTracker");
    if (saved) {
      setSkills(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("endorsementTracker", JSON.stringify(skills));
  }, [skills]);

  const addSkill = () => {
    if (!newSkill.trim()) return;
    const skill: Skill = {
      id: Date.now(),
      name: newSkill,
      count: Math.floor(Math.random() * 20),
      lastEndorsed: new Date().toISOString().split("T")[0],
      targetCount: targetCount,
      notifications: true,
      history: [{ date: new Date().toISOString().split("T")[0], change: 0 }],
    };
    setSkills([...skills, skill]);
    setNewSkill("");
    setShowAdd(false);
  };

  const updateCount = (id: number, delta: number) => {
    setSkills(skills.map(s => {
      if (s.id === id) {
        const newCount = Math.max(0, s.count + delta);
        return {
          ...s,
          count: newCount,
          lastEndorsed: delta > 0 ? new Date().toISOString().split("T")[0] : s.lastEndorsed,
          history: [...s.history, { date: new Date().toISOString().split("T")[0], change: delta }],
        };
      }
      return s;
    }));
  };

  const toggleNotifications = (id: number) => {
    setSkills(skills.map(s => s.id === id ? { ...s, notifications: !s.notifications } : s));
  };

  const updateTarget = (id: number, target: number) => {
    setSkills(skills.map(s => s.id === id ? { ...s, targetCount: target } : s));
  };

  const deleteSkill = (id: number) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  const getFilteredSkills = () => {
    let filtered = [...skills];
    if (filter === "near") {
      filtered = filtered.filter(s => s.count >= s.targetCount * 0.7 && s.count < s.targetCount);
    } else if (filter === "achieved") {
      filtered = filtered.filter(s => s.count >= s.targetCount);
    }
    return filtered.sort((a, b) => b.count - a.count);
  };

  const sortedSkills = getFilteredSkills();
  const totalEndorsements = skills.reduce((sum, s) => sum + s.count, 0);
  const nearTarget = skills.filter(s => s.count >= s.targetCount * 0.7 && s.count < s.targetCount).length;
  const achievedTarget = skills.filter(s => s.count >= s.targetCount).length;

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Endorsement Tracker</h2>
          <p className="text-gray-500 text-sm">Track your skill endorsements and set goals</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="px-4 py-2 bg-gradient-to-r from-[#057642] to-[#0A66C2] text-white rounded-lg font-medium text-sm">
          + Add Skill
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 bg-blue-50 rounded-lg text-center">
          <p className="text-2xl font-bold text-blue-600">{totalEndorsements}</p>
          <p className="text-xs text-blue-500">Total</p>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg text-center">
          <p className="text-2xl font-bold text-yellow-600">{nearTarget}</p>
          <p className="text-xs text-yellow-500">Near Target</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg text-center">
          <p className="text-2xl font-bold text-green-600">{achievedTarget}</p>
          <p className="text-xs text-green-500">Achieved</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded-full text-sm ${filter === "all" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600"}`}>All</button>
        <button onClick={() => setFilter("near")} className={`px-3 py-1 rounded-full text-sm ${filter === "near" ? "bg-yellow-500 text-white" : "bg-yellow-100 text-yellow-600"}`}>Near Target</button>
        <button onClick={() => setFilter("achieved")} className={`px-3 py-1 rounded-full text-sm ${filter === "achieved" ? "bg-green-500 text-white" : "bg-green-100 text-green-600"}`}>Achieved</button>
      </div>

      {showAdd && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-3">
            <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Skill name (e.g., JavaScript)" className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Target endorsements:</label>
              <input type="number" value={targetCount} onChange={(e) => setTargetCount(Number(e.target.value))} className="w-20 px-2 py-1 border border-gray-200 rounded-lg" />
            </div>
            <button onClick={addSkill} className="w-full py-2 bg-gradient-to-r from-[#057642] to-[#0A66C2] text-white rounded-lg font-medium">Add Skill</button>
          </div>
        </div>
      )}

      {skills.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No skills tracked yet.</p>
          <p className="text-sm">Add your LinkedIn skills to track endorsements.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedSkills.map((skill) => (
            <div key={skill.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold ${
                    skill.count >= skill.targetCount ? "bg-gradient-to-br from-green-400 to-green-600" :
                    skill.count >= skill.targetCount * 0.7 ? "bg-gradient-to-br from-yellow-400 to-orange-500" :
                    "bg-gradient-to-br from-[#057642] to-[#0A66C2]"
                  }`}>
                    {skill.count}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{skill.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" /> {skill.lastEndorsed}
                      {skill.notifications && <span className="text-green-600">• Notifications on</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateCount(skill.id, -1)} className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center justify-center"><Minus className="w-4 h-4" /></button>
                  <button onClick={() => updateCount(skill.id, 1)} className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center justify-center"><Plus className="w-4 h-4" /></button>
                  <button onClick={() => deleteSkill(skill.id)} className="w-8 h-8 text-red-500 hover:bg-red-50 rounded-lg flex items-center justify-center"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${skill.count >= skill.targetCount ? "bg-green-500" : "bg-[#0A66C2]"}`} style={{ width: `${Math.min(100, (skill.count / skill.targetCount) * 100)}%` }}></div>
                </div>
                <span className="text-xs text-gray-500">{skill.count}/{skill.targetCount}</span>
                <button onClick={() => toggleNotifications(skill.id)} className={`p-1 rounded ${skill.notifications ? "text-green-600" : "text-gray-400"}`} title="Toggle notifications">
                  <Bell className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500 mt-4">💡 Tip: Enable notifications to get reminders when endorsements come in. Data is stored locally in your browser.</p>
    </div>
  );
}

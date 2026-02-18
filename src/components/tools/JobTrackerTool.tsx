"use client";

import { useState, useEffect } from "react";

interface Job {
  id: number;
  company: string;
  role: string;
  status: "applied" | "interview" | "offer" | "rejected";
  date: string;
  notes: string;
}

export default function JobTrackerTool() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Job["status"]>("applied");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("jobTracker");
    if (saved) {
      setJobs(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jobTracker", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = () => {
    if (!company || !role) return;

    const newJob: Job = {
      id: Date.now(),
      company,
      role,
      status,
      date: new Date().toISOString().split("T")[0],
      notes,
    };

    setJobs([newJob, ...jobs]);
    setCompany("");
    setRole("");
    setNotes("");
  };

  const updateStatus = (id: number, newStatus: Job["status"]) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status: newStatus } : job
    ));
  };

  const deleteJob = (id: number) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const getStatusColor = (status: Job["status"]) => {
    switch (status) {
      case "applied": return "bg-blue-100 text-blue-700 border-blue-200";
      case "interview": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "offer": return "bg-green-100 text-green-700 border-green-200";
      case "rejected": return "bg-red-100 text-red-700 border-red-200";
    }
  };

  const stats = {
    applied: jobs.filter(j => j.status === "applied").length,
    interview: jobs.filter(j => j.status === "interview").length,
    offer: jobs.filter(j => j.status === "offer").length,
    rejected: jobs.filter(j => j.status === "rejected").length,
  };

  const exportToCSV = () => {
    if (jobs.length === 0) return;
    const headers = ["Company", "Role", "Status", "Date Applied", "Notes"];
    const rows = jobs.map(j => [
      `"${(j.company || "").replace(/"/g, '""')}"`,
      `"${(j.role || "").replace(/"/g, '""')}"`,
      `"${j.status || ""}"`,
      `"${j.date || ""}"`,
      `"${(j.notes || "").replace(/"/g, '""')}"`,
    ].join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `job-applications-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#db2777] to-[#be185d] rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Track Your Applications</h2>
          <p className="text-gray-500 text-sm">Add and manage your job applications</p>
        </div>
      </div>

      {jobs.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
            <span className="text-blue-700 font-semibold">{stats.applied}</span>
            <span className="text-blue-600 text-sm">Applied</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 rounded-full">
            <span className="text-yellow-700 font-semibold">{stats.interview}</span>
            <span className="text-yellow-600 text-sm">Interview</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
            <span className="text-green-700 font-semibold">{stats.offer}</span>
            <span className="text-green-600 text-sm">Offer</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-100 rounded-full">
            <span className="text-red-700 font-semibold">{stats.rejected}</span>
            <span className="text-red-600 text-sm">Rejected</span>
          </div>
          <button
            onClick={exportToCSV}
            disabled={jobs.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Export CSV
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            placeholder="e.g., Google"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role / Position</label>
          <input
            type="text"
            placeholder="e.g., Software Engineer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Job["status"])}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
          <input
            type="text"
            placeholder="e.g., Refer by John"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        onClick={addJob}
        className="w-full bg-gradient-to-r from-[#db2777] to-[#be185d] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#be185d] hover:to-[#db2777] transition-all"
      >
        Add Job
      </button>

      {jobs.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-sm font-semibold text-gray-700">Your Applications ({jobs.length})</p>
          <div className="max-h-96 overflow-y-auto space-y-2">
            {jobs.map((job) => (
              <div 
                key={job.id} 
                className="p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{job.role}</p>
                  <p className="text-sm text-gray-500">{job.company} • {job.date}</p>
                  {job.notes && <p className="text-xs text-gray-400 mt-1">{job.notes}</p>}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <select
                    value={job.status}
                    onChange={(e) => updateStatus(job.id, e.target.value as Job["status"])}
                    className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(job.status)} cursor-pointer`}
                  >
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

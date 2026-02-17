"use client";

import { useState } from "react";

interface Job {
  id: number;
  company: string;
  role: string;
  status: "applied" | "interview" | "offer" | "rejected";
  date: string;
  notes: string;
}

export default function JobTracker() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Job["status"]>("applied");
  const [notes, setNotes] = useState("");

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
      case "applied": return "bg-blue-100 text-blue-700";
      case "interview": return "bg-yellow-100 text-yellow-700";
      case "offer": return "bg-green-100 text-green-700";
      case "rejected": return "bg-red-100 text-red-700";
    }
  };

  const stats = {
    applied: jobs.filter(j => j.status === "applied").length,
    interview: jobs.filter(j => j.status === "interview").length,
    offer: jobs.filter(j => j.status === "offer").length,
    rejected: jobs.filter(j => j.status === "rejected").length,
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Tracker</h3>
      <p className="text-gray-600 text-sm mb-4">Track your job applications</p>

      <div className="space-y-3 mb-4">
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
        />
        <input
          type="text"
          placeholder="Role / Position"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Job["status"])}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <input
          type="text"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
        />

        <button
          onClick={addJob}
          className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-pink-700 transition-colors"
        >
          Add Job
        </button>
      </div>

      {jobs.length > 0 && (
        <div className="mt-4">
          <div className="flex gap-2 mb-3 text-xs">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{stats.applied} Applied</span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">{stats.interview} Interview</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded">{stats.offer} Offer</span>
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded">{stats.rejected}</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {jobs.map((job) => (
              <div 
                key={job.id} 
                className="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">{job.role}</p>
                  <p className="text-xs text-gray-500">{job.company} • {job.date}</p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <select
                    value={job.status}
                    onChange={(e) => updateStatus(job.id, e.target.value as Job["status"])}
                    className={`text-xs px-2 py-1 rounded ${getStatusColor(job.status)} border-0 cursor-pointer`}
                  >
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="text-gray-400 hover:text-red-500"
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

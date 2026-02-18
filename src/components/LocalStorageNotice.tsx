"use client";

import { useState, useEffect } from "react";
import { Info, X } from "lucide-react";
import { getLocalStorage, setLocalStorage } from "@/lib/localStorage";

const DISMISSED_KEY = "localStorage_notice_dismissed";

export default function LocalStorageNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = getLocalStorage<boolean>(DISMISSED_KEY, false);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    setLocalStorage(DISMISSED_KEY, true);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800 mb-6">
      <Info className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" />
      <p className="flex-1">
        <strong>Your data is saved locally</strong> in your browser. Clearing your browser data will reset this tool. Export your data regularly to keep a backup.
      </p>
      <button onClick={dismiss} className="text-blue-400 hover:text-blue-600 shrink-0">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

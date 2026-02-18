"use client";

import { useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "@/lib/localStorage";

const MAX_RECENT = 6;
const STORAGE_KEY = "recently_used_tools";

export function useTrackToolVisit(slug: string) {
  useEffect(() => {
    if (!slug) return;
    const current = getLocalStorage<string[]>(STORAGE_KEY, []);
    const filtered = current.filter((s) => s !== slug);
    const updated = [slug, ...filtered].slice(0, MAX_RECENT);
    setLocalStorage(STORAGE_KEY, updated);
  }, [slug]);
}

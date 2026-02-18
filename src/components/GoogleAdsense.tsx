"use client";

import { useEffect, useState } from "react";

export default function GoogleAdsense() {
  const [adSlotId, setAdSlotId] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("google_services");
    if (stored) {
      const services = JSON.parse(stored);
      if (services.adsense?.enabled && services.adsense?.adSlotId) {
        setAdSlotId(services.adsense.adSlotId);
      }
    }
  }, []);

  if (!adSlotId) return null;

  return (
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      crossOrigin="anonymous"
    />
  );
}

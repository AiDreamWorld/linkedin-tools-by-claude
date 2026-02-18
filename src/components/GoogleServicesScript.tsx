"use client";

import { useEffect, useState } from "react";
import { Trash2, Copy } from "lucide-react";

interface GoogleServices {
  analytics: { enabled: boolean; measurementId: string };
  adsense: { enabled: boolean; adSlotId: string };
  searchConsole: { enabled: boolean; verificationCode: string };
  tagManager: { enabled: boolean; containerId: string };
}

export default function GoogleServicesScript() {
  const [services, setServices] = useState<GoogleServices | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("google_services");
    if (stored) {
      setServices(JSON.parse(stored));
    }
  }, []);

  if (!services) return null;

  return (
    <>
      {services.analytics.enabled && services.analytics.measurementId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${services.analytics.measurementId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${services.analytics.measurementId}');
              `,
            }}
          />
        </>
      )}

      {services.tagManager.enabled && services.tagManager.containerId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${services.tagManager.containerId}');
            `,
          }}
        />
      )}

      {services.searchConsole.enabled && services.searchConsole.verificationCode && (
        <meta
          name="google-site-verification"
          content={services.searchConsole.verificationCode}
        />
      )}
    </>
  );
}

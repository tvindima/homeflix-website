"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "@/lib/client-tracking";

export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent({ event: "page_view", pathname, source: "client_router" });

    let maxSent = 0;
    const levels = [25, 50, 75, 100];

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.min(100, Math.round((scrollTop / docHeight) * 100));

      for (const level of levels) {
        if (percent >= level && maxSent < level) {
          maxSent = level;
          trackEvent({ event: "scroll_depth", pathname, source: "scroll", meta: { percent: level } });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}

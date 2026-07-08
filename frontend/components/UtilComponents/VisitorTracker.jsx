"use client";

import { useEffect } from "react";
import { API } from "../../Core/rl";

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        if (!sessionStorage.getItem("visit_counted")) {
          await API.post("/web/increment-views");
          sessionStorage.setItem("visit_counted", "true");
        }
      } catch (err) {
        console.error("Failed to increment page views", err);
      }
    };

    trackVisit();
  }, []);

  return null;
}

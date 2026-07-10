"use client";

import { useEffect, useState, useRef } from "react";
import { API } from "@/Core/rl";

export const useContributionData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await API.get("/contribution");
        setData(res.data);
      } catch (err) {
        console.error("CONTRIBUTION PAGE ERROR:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

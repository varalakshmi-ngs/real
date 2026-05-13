"use client";

import { useEffect, useRef, useState } from "react";
import { API } from "@/Core/rl";

export const useHomeDataHook = () => {
  const [data, setData] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [magazine, setMagazine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;

    fetchedRef.current = true;

    const fetchAllData = async () => {
      try {
        setLoading(true);

        const [
          homeRes,
          testimonialRes,
          magazineRes,
        ] = await Promise.all([
          API.get("/home/"),
          API.get("/web/testimonial"),
          API.get("/magazine"),
        ]);

        setData(homeRes.data._doc);
        setTestimonials(testimonialRes.data.data);
        setMagazine(magazineRes.data);

      } catch (err) {
        console.error("HOME PAGE ERROR:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return {
    data,
    testimonials,
    loading,
    error,
    magazine,
  };
};
"use client";
import { useEffect, useState } from "react";
import { API } from "@/Core/rl";

export const useHomeDataHook = () => {
  const [data, setData] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [magazine, setMagazine] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ytLink, setYtLink] = useState(null);

  const getdata = async () => {
    try {
      setLoading(true);
      const response = await API.get("/home/");
      setData(response.data._doc);
    } catch (err) {
      console.error("Error fetching home data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getTestimonials = async () => {
    try {
      setLoading(true);
      const response = await API.get("/web/testimonial");
      setTestimonials(response.data.data);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getMagazines = async () => {
    try {
      setLoading(true);
      const response = await API.get("/magazine");
      setMagazine(response.data);
    } catch (error) {
      console.error("MAGAZINE ERR", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getYoutubeLive = async () => {
    try {
      setLoading(true);
      const response = await API.get("/youtube-data/get-live-streams");
      setYtLink(response.data?.[0]?.watchUrl);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const navToYoutube = () => {
    const url = ytLink || "https://www.youtube.com/@REALTEMPLE";

    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    getdata();
    getTestimonials();
    getMagazines();
    getYoutubeLive();
  }, []);

  return { data, testimonials, loading, error, magazine, ytLink, navToYoutube };
};

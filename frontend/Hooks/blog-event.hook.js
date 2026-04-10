"use client";
import { getblogsApi } from "@/service/blog-server";
import { useEffect, useState } from "react";

export const useBlogHook = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("Sermons");

  const handleTabChange = (item) => {
    setTab(item);
    fetchBlogs({ page: 1, search: item });
  };

  const fetchBlogs = async ({ page = 1, search = "Sermons" }) => {
    setLoading(true);
    const data = await getblogsApi({
      page,
      token: "",
      limit: 6,
      search,
    });

    if (data?.status) {
      setBlog(data?.res?.data);
    } else {
      setError(data?.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs({ page: 1, search: "Sermons" });
  }, []);

  return {
    loading,
    error,
    blog,
    fetchBlogs,
    tab,
    handleTabChange,
  };
};

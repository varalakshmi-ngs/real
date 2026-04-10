"use client";

import { getblogsApi } from "@/service/blog-server";
import { singleEventWithSuggestion } from "@/service/event-server";
import { useEffect, useState } from "react";

export const useSignleEventHook = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [singleEvent, setSingleEvent] = useState({});
  const [suggestionEvent, setSuggestionEvent] = useState([]);

  const [blogLoading, setBlogLoading] = useState(false);
  const [blogError, setBlogError] = useState("");
  const [suggestionBlog, setSuggestionBlog] = useState([]);

  const fetchSingleEventWithSuggetion = async ({ id }) => {
    setLoading(true);

    const apiData = await singleEventWithSuggestion({ id, token: "" });
    if (apiData.status) {
      setSingleEvent(apiData?.singleEvent);
      setSuggestionEvent(apiData?.suggestions);
    } else {
      setError(apiData?.error);
    }
    setLoading(false);
  };

  const fetchSuggectionBlogs = async ({ page = 1, search = "" }) => {
    setBlogLoading(true);
    const data = await getblogsApi({
      page,
      token: "",
      limit: 2,
      search,
    });

    if (data?.status) {
      setSuggestionBlog(data?.res?.data);
    } else {
      setBlogError(data?.error);
    }
    setBlogLoading(false);
  };

  useEffect(() => {
    fetchSingleEventWithSuggetion({ id });
    fetchSuggectionBlogs({ page: 1, search: "" });
  }, [id]);

  return {
    singleEvent,
    suggestionEvent,
    loading,
    error,
    //

    blogLoading,
    blogError,
    suggestionBlog,
  };
};

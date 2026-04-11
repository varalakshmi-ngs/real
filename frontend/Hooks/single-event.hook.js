"use client";

import { singleEventWithSuggestion } from "@/service/event-server";
import { useEffect, useState } from "react";

export const useSignleEventHook = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [singleEvent, setSingleEvent] = useState({});
  const [suggestionEvent, setSuggestionEvent] = useState([]);

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

  useEffect(() => {
    fetchSingleEventWithSuggetion({ id });
  }, [id]);

  return {
    singleEvent,
    suggestionEvent,
    loading,
    error,
  };
};

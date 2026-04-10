"use client";
import { getEventApi } from "@/service/event-server";
import { useEffect, useState } from "react";

export const useEventHook = ({ limit = 6 }) => {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEvents = async ({ page = 1, search = "" }) => {
    setLoading(true);
    const data = await getEventApi({
      page,
      token: "",
      limit: limit,
      search,
    });

    if (data?.status) {
      setEvent(data?.res?.data);
    } else {
      setError(data?.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents({ page: 1, search: "" });
  }, []);

  return {
    loading,
    error,
    event,
  };
};

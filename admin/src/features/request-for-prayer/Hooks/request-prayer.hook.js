import { useEffect, useState } from "react";
import {
  approvedRequestPrayerApi,
  deleteRequestPrayerApi,
  getRequestPrayerApi,
} from "../service/request-orayer-service";

export const useRequestPrayerHook = () => {
  const [requestForPrayer, setRequestForPrayer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  // debounce search text
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  // fetch data when page or debounced search changes
  useEffect(() => {
    fetchPrayerRequest({
      page: currentPage + 1,
      search: debouncedSearchText,
    });
  }, [debouncedSearchText, currentPage]);

  const fetchPrayerRequest = async ({ page = 1, search = "" }) => {
    setLoading(true);
    setError("");
    const data = await getRequestPrayerApi({
      page,
      token: "",
      limit: 10,
      search,
    });
    if (data?.status) {
      setRequestForPrayer(data?.res?.data || []);
      setTotalPages(data?.res?.totalPages || 0);
    } else {
      setError(data?.error || "Failed to load requests");
    }
    setLoading(false);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const searchContact = (text) => {
    setSearchText(text);
    setCurrentPage(0);
  };

  const refreshPrayerRequests = async () => {
    const nextPage = currentPage + 1;
    const data = await getRequestPrayerApi({
      token: "",
      page: nextPage,
      limit: 10,
      search: debouncedSearchText,
    });

    const totalPagesCount = data?.res?.totalPages || 0;

    if (nextPage > totalPagesCount && totalPagesCount > 0) {
      setCurrentPage(totalPagesCount - 1);
      fetchPrayerRequest({
        page: totalPagesCount,
        search: debouncedSearchText,
      });
    } else {
      fetchPrayerRequest({ page: nextPage, search: debouncedSearchText });
    }
  };

  const deletPrayerRequesr = async (id) => {
    const data = await deleteRequestPrayerApi({ id, token: "" });
    if (data?.status) {
      await refreshPrayerRequests();
    }
  };

  const isPrayerRequest = async (id) => {
    const data = await approvedRequestPrayerApi({ id, token: "" });
    if (data?.status) {
      await refreshPrayerRequests();
    }
  };

  return {
    requestForPrayer,
    totalPages,
    handlePageClick,
    loading,
    currentPage,
    error,
    searchContact,
    deletPrayerRequesr,
    isPrayerRequest,
    searchText,
  };
};

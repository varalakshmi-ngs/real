import { useEffect, useState } from "react";
import { deletEventApi, getEventApi } from "../service/event.service";

export const useBlogHook = () => {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // 🔹 State for search
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const [addEventModal, setAddEventModal] = useState(false);
  const [singleEvent, setSignleEvent] = useState(null);

  const handleEventOpenModal = () => setAddEventModal(true);
  const handleEventCloseModal = () => setAddEventModal(false);

  const fetchEvents = async ({ page = 1, search = "" }) => {
    setLoading(true);
    const data = await getEventApi({
      page,
      token: "",
      limit: 10,
      search,
    });

    if (data?.status) {
      setEvent(data?.res?.data);
      setTotalPages(data?.res?.totalPages);
    } else {
      setError(data?.error);
    }
    setLoading(false);
  };

  // 🔹 Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  // 🔹 Fetch events when debounced search or page changes
  useEffect(() => {
    fetchEvents({ page: currentPage + 1, search: debouncedSearchText });
  }, [debouncedSearchText, currentPage]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  // 🔹 This updates search instantly
  const searchContact = (text) => {
    setSearchText(text);
    setCurrentPage(0);
  };

  const refreshPrayerRequests = async () => {
    const nextPage = currentPage + 1;
    const data = await getEventApi({
      token: "",
      page: nextPage,
      limit: 10,
      search: debouncedSearchText,
    });

    const totalPages = data?.res?.totalPages || 0;
    if (nextPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
      fetchEvents({ page: totalPages, search: debouncedSearchText });
    } else {
      fetchEvents({ page: nextPage, search: debouncedSearchText });
    }
  };

  const deletEvent = async (id) => {
    const data = await deletEventApi({ id, token: "" });
    if (data?.status) {
      await refreshPrayerRequests();
    }
  };

  const editBlog = async (blog) => {
    handleEventOpenModal();
    setSignleEvent(blog);
  };

  return {
    deletEvent,
    editBlog,
    loading,
    error,
    totalPages,
    currentPage,
    searchText, // 🔹 return this for controlled input
    searchContact,
    handlePageClick,
    event,
    fetchEvents,
    singleEvent,
    addEventModal,
    handleEventOpenModal,
    handleEventCloseModal,
  };
};

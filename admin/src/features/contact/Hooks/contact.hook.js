import { useEffect, useState } from "react";
import { deletContactAPI, getContact } from "../service/get-contact";

export const useContactHook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [contact, setContact] = useState([]);
  const [originalContact, setOriginalContact] = useState([]); // Keep unfiltered data
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchText, setSearchText] = useState("");

  const fetchContact = async ({ page = 1 }) => {
    setLoading(true);
    const data = await getContact({ token: "", page, limit: 10 });

    if (data?.status) {
      setOriginalContact(data?.res?.data); // Save original data
      applySearchFilter(data?.res?.data, searchText);
      setTotalPages(data?.res?.totalPages);
    } else {
      setError(data?.error);
    }

    setLoading(false);
  };

  const applySearchFilter = (data, text) => {
    if (!text.trim()) {
      setContact(data);
      return;
    }

    const filtered = data?.filter(
      (item) =>
        item.firstName.toLowerCase().includes(text.toLowerCase()) ||
        item.message.toLowerCase().includes(text.toLowerCase()) ||
        item.subject.toLowerCase().includes(text.toLowerCase()) ||
        item.email.toLowerCase().includes(text.toLowerCase()) ||
        item.mobile.toLowerCase().includes(text.toLowerCase())
    );

    setContact(filtered);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    fetchContact({ page: event.selected + 1 });
  };

  const deletContact = async (id) => {
    await deletContactAPI({ id, token: "" });
    const data = await getContact({
      token: "",
      page: currentPage + 1,
      limit: 10,
    });

    if (currentPage + 1 > data?.res?.totalPages && data?.res?.totalPages > 0) {
      setCurrentPage(data.res.totalPages - 1);
      fetchContact({ page: data.res.totalPages });
    } else {
      fetchContact({ page: currentPage + 1 });
    }
  };

  const searchContact = (text) => {
    setSearchText(text);
    applySearchFilter(originalContact, text);
  };

  useEffect(() => {
    fetchContact({ page: 1 });
  }, []);

  return {
    contact,
    deletContact,
    totalPages,
    handlePageClick,
    loading,
    currentPage,
    error,
    searchContact,
    searchText, // ✅ added
  };
};

import { useEffect, useState } from "react";
import {
  approvedCommentApi,
  getComment,
  rejectCommentApi,
} from "../service/get-comment";

export const useTestimonialHook = () => {
  const [testLoading, setTestLoading] = useState(false);
  const [testError, setTestError] = useState("");
  const [testimonial, setTestimonial] = useState([]);
  const [originalContact, setOriginalContact] = useState([]);
  const [testiTotalPages, setTestiTotalPages] = useState(0);
  const [testCurrentPage, setTestCurrentPage] = useState(0);
  const [testSearchText, setTestSearchText] = useState("");

  const fetchTestimonial = async ({ page = 1 }) => {
    setTestLoading(true);
    const data = await getComment({ token: "", page, limit: 10 });

    if (data?.status) {
      setOriginalContact(data?.res?.data);
      applySearchFilter(data?.res?.data, testSearchText);
      setTestiTotalPages(data?.res?.totalPages);
    } else {
      setTestError(data?.error);
    }
    setTestLoading(false);
  };

  useEffect(() => {
    fetchTestimonial({ page: 1 });
  }, []);

  const testHandlePageClick = (event) => {
    setTestCurrentPage(event.selected);
    fetchTestimonial({ page: event.selected + 1 });
  };

  const handleCommentAction = async (apiFunc, id) => {
    const response = await apiFunc({ id, token: "" });
    if (!response?.status) return;

    const nextPage = testCurrentPage + 1;
    const data = await getComment({ token: "", page: nextPage, limit: 10 });

    const totalPages = data?.res?.totalPages || 0;
    if (nextPage > totalPages && totalPages > 0) {
      const prevPage = totalPages - 1;
      setTestCurrentPage(prevPage);
      fetchTestimonial({ page: totalPages });
    } else {
      fetchTestimonial({ page: nextPage });
    }
  };

  const testiRejected = async (id) => {
    await handleCommentAction(rejectCommentApi, id);
  };

  const testApproved = async (id) => {
    await handleCommentAction(approvedCommentApi, id);
  };

  const applySearchFilter = (data, text) => {
    if (!text.trim()) {
      setTestimonial(data);
      return;
    }
    const filtered = data?.filter(
      (item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.comment.toLowerCase().includes(text.toLowerCase())
    );
    setTestimonial(filtered);
  };

  const searchTestimonial = (text) => {
    setTestSearchText(text);
    applySearchFilter(originalContact, text);
  };

  return {
    testHandlePageClick,
    testLoading,
    testError,
    testimonial,
    testiTotalPages,
    testCurrentPage,
    testiRejected,
    testApproved,
    searchTestimonial,
    testSearchText, // ✅ return search text
  };
};

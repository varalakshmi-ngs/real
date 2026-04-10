import { useEffect, useState } from "react";
import { deletBlogApi, getBlogApi } from "../service/blog-service";

export const useBlogHook = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [addBlogModal, setAddBlogModal] = useState(false);
  const [singleBlog, setSignleBlog] = useState(null);

  const handleAddblogModal = () => setAddBlogModal(!addBlogModal);

  const fetchBlogs = async ({ page = 1, search = "" }) => {
    setLoading(true);
    const data = await getBlogApi({
      page,
      token: "",
      limit: 10,
      search,
    });

    if (data?.status) {
      setBlog(data?.res?.data);
      setTotalPages(data?.res?.totalPages);
    } else {
      setError(data?.error);
    }
    setLoading(false);
  };

  // debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  // fetch blogs on search/page change
  useEffect(() => {
    fetchBlogs({ page: currentPage + 1, search: debouncedSearchText });
  }, [debouncedSearchText, currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const searchContact = (text) => {
    setSearchText(text);
    setCurrentPage(0);
  };

  const refreshPrayerRequests = async () => {
    const nextPage = currentPage + 1;
    const data = await getBlogApi({
      token: "",
      page: nextPage,
      limit: 10,
      search: debouncedSearchText,
    });

    const totalPages = data?.res?.totalPages || 0;

    if (nextPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
      fetchBlogs({ page: totalPages, search: debouncedSearchText });
    } else {
      fetchBlogs({ page: nextPage, search: debouncedSearchText });
    }
  };

  const deletBlog = async (id) => {
    const data = await deletBlogApi({ id, token: "" });
    if (data?.status) {
      await refreshPrayerRequests();
    }
  };

  const editBlog = async (blog) => {
    setAddBlogModal(true);
    setSignleBlog(blog);
  };

  return {
    blog,
    loading,
    error,
    totalPages,
    currentPage,
    searchText, // ✅ return searchText
    searchContact,
    handlePageClick,
    deletBlog,
    fetchBlogs,
    addBlogModal,
    handleAddblogModal,
    editBlog,
    singleBlog,
  };
};

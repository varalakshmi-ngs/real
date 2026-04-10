// src/hooks/useAddBlogHook.js
import { useState } from "react";
import { createBlog, updateBlog } from "../service/blog-service";

export const useAddBlogHook = ({
  fetchBlogs,
  handleAddblogModal,
  initialData = null,
  reset,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleBlogSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("author", data.author);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("date", data.date);
      formData.append("location", data.location);

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      let response;

      if (initialData && initialData._id) {
        // Update mode
        response = await updateBlog(initialData._id, formData);
        setSuccess("Blog updated successfully!");
      } else {
        // Create mode
        response = await createBlog(formData);
        setSuccess("Blog submitted successfully!");
      }

      fetchBlogs({ page: 1, search: "" });
      handleAddblogModal();
      reset();
    } catch (err) {
      console.error("Submit Blog Error:", err);
      setError("Something went wrong while submitting blog");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleBlogSubmit,
    loading,
    error,
    success,
  };
};

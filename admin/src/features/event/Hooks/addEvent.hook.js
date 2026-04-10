import { useState } from "react";
import { createEvent, updateEvent } from "../service/event.service";

export const useAddEventHook = ({
  fetchEvent,
  handleCloseModal,
  initialData,
  reset,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEventSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();
      formData.append("eventName", data.eventName);
      formData.append("date", data.date);
      formData.append("description", data.description);
      formData.append("eventType", data.eventType);
      formData.append("startTime", data.startTime);
      formData.append("endTime", data.endTime);
      formData.append("location", data.location);

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      let response;

      if (initialData && initialData._id) {
        // Update mode
        response = await updateEvent(initialData._id, formData);
        setSuccess("Event updated successfully!");
      } else {
        // Create mode
        response = await createEvent(formData);
        setSuccess("Event submitted successfully!");
      }
      fetchEvent({ page: 1, search: "" });
      handleCloseModal();
      reset();
    } catch (err) {
      console.error("Submit Blog Error:", err);
      setError("Something went wrong while submitting blog");
    } finally {
      setLoading(false);
    }
  };
  return {
    handleEventSubmit,
    loading,
    error,
    success,
  };
};

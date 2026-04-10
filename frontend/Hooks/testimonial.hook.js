import { fetchTestimonialApi } from "@/service/testimonial.service";
import { useEffect, useState } from "react";

export const useTestimonilHook = () => {
  const [testLoading, setTestLoading] = useState(true);
  const [testError, setTestError] = useState("");
  const [testimonial, setTestimonial] = useState([]);

  const fetchTestimonial = async () => {
    const data = await fetchTestimonialApi();
    data.status ? setTestimonial(data?.data?.data) : setTestError(data?.error);
    setTestLoading(false);
  };

  useEffect(() => {
    fetchTestimonial();
  }, []);

  return {
    testLoading,
    testError,
    testimonial,
  };
};

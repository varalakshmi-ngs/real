import { API } from "@/Core/rl";
import { errorMsgApi } from "@/Core/tosts";

export const fetchTestimonialApi = async () => {
  try {
    const res = await API.get("/web/testimonial");

    return {
      status: true,
      data: res?.data,
    };
  } catch (error) {
    console.log("error", error);

    let mes = error?.response?.data?.message || "Something went wrong";
    errorMsgApi(mes);
    return {
      status: false,
      error: mes,
    };
  }
};

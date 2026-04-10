import { errorMsgApi, successfully } from "../../../Core/tosts";
import { API } from "../../../Core/url";

export const getComment = async ({ token, page, limit = 10 }) => {
  try {
    const res = await API.get(
      `/web/testimonial?page=${page}&limit=${limit}&status=initiall`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("-----------------------------------------", res);

    return { status: true, res: res.data ?? [] };
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

export const rejectCommentApi = async ({ token, id }) => {
  try {
    const res = await API.patch(`/web/testimonial-rejected/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    successfully(res.data?.message || "Updated....!");

    return { status: true };
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

export const approvedCommentApi = async ({ token, id }) => {
  try {
    const res = await API.patch(`/web/testimonial-approved/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    successfully(res.data?.message || "Updated....!");
    return { status: true };
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

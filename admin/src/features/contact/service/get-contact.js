import { errorMsgApi, successfully } from "../../../Core/tosts";
import { API } from "../../../Core/url";

export const getContact = async ({ token, page, limit = 10 }) => {
  try {
    const res = await API.get(`/web/contact?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { status: true, res: res.data ?? [] };
  } catch (error) {
    let mes = error?.response?.data?.message || "Something went wrong";
    errorMsgApi(mes);
    return {
      status: false,
      error: mes,
    };
  }
};

export const deletContactAPI = async ({ id, token = "" }) => {
  try {
    const res = await API.delete(`/web/contact/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    successfully(res.data?.message || "Contact Deleted successfully..!");
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

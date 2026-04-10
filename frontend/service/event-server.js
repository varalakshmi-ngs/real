import { API } from "@/Core/rl";
import { errorMsgApi } from "@/Core/tosts";

export const getEventApi = async ({
  token = "",
  page,
  limit = 6,
  search = "",
}) => {
  try {
    const query = `/web/event?page=${page}&limit=${limit}${
      search ? `&search=${search}` : ""
    }`;

    const res = await API.get(query, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: true, res: res?.data ?? [] };
  } catch (error) {
    let mes = error?.response?.data?.message || "Something went wrong";
    errorMsgApi(mes);
    return {
      status: false,
      error: mes,
    };
  }
};

export const singleEventWithSuggestion = async ({ id, token = "" }) => {
  try {
    const res = await API.get(`web/event/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      status: true,
      singleEvent: res?.data?.event ?? {},
      suggestions: res?.data?.suggestions ?? [],
    };
  } catch (error) {
    let mes = error?.response?.data?.message || "Something went wrong";
    errorMsgApi(mes);
    return {
      status: false,
      error: mes,
    };
  }
};

import { errorMsgApi, successfully } from "../../../Core/tosts";
import { API } from "../../../Core/url";

export const getRequestPrayerApi = async ({
  token = "",
  page,
  limit = 10,
  search = "",
}) => {
  try {
    const query = `/web/prayer-request?page=${page}&limit=${limit}${
      search ? `&search=${search}` : ""
    }`;

    const res = await API.get(query, {
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

export const approvedRequestPrayerApi = async ({ id, token = "" }) => {
  try {
    const res = await API.patch(`/web/prayer-request/${id}/mark-prayed`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data, "------------------------daata");

    successfully(res.data?.message || "Updated..!");
    return {
      status: true,
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

export const deleteRequestPrayerApi = async ({ id, token = "" }) => {
  try {
    const res = await API.delete(`/web/prayer-request/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    successfully(res.data?.message || "Updated..!");
    return {
      status: true,
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

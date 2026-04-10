import { errorMsgApi, successfully } from "../../../Core/tosts";
import { API } from "../../../Core/url";

export const getEventApi = async ({
  token = "",
  page,
  limit = 10,
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

export const deletEventApi = async ({ id, token }) => {
  try {
    const res = await API.delete(`/web/event/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    successfully(res.data?.message || "Updated..!");
    return {
      status: true,
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

export const createEvent = async (formData) => {
  const response = await API.post("/web/event", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateEvent = async (id, formData) => {
  console.log("formData", formData);

  const response = await API.patch(`/web/event/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

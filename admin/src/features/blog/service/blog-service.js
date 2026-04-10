import { errorMsgApi, successfully } from "../../../Core/tosts";
import { API } from "../../../Core/url";

export const getBlogApi = async ({
  token = "",
  page,
  limit = 10,
  search = "",
}) => {
  try {
    const query = `/web/blogs?page=${page}&limit=${limit}${
      search ? `&search=${search}` : ""
    }`;

    const res = await API.get(query, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("---", res?.dat);

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

export const deletBlogApi = async ({ id, token }) => {
  try {
    const res = await API.delete(`/web/blogs/${id}`, {
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

export const createBlog = async (formData) => {
  const response = await API.post("/web/blogs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateBlog = async (id, formData) => {
  console.log("formData", formData);

  const response = await API.patch(`/web/blogs/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

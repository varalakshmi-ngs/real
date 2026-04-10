import { API } from "@/Core/rl";
import { errorMsgApi } from "@/Core/tosts";

export const getblogsApi = async ({
  page,
  limit = 8,
  search = "",
  token = "",
}) => {
  try {
    const query = `/web/blogs-webpage?page=${page}&limit=${limit}${
      search ? `&search=${search}` : ""
    }`;
    const res = await API.get(query, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: true, res: res?.data ?? [] };
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

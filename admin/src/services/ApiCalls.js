import { errorMsgApi, successfully } from "../Core/tosts";
import { API } from "../Core/url";

export const apiRequest = async ({
  method,
  url,
  data = null,
  headers = {},
}) => {
  try {
    const response = await API({
      method,
      url,
      data,
      headers,
    });

    if (method !== "get") {
      successfully("Success");
    }

    console.log("API CALL SUCCESS");

    return { success: true, data: response.data };
  } catch (error) {
    errorMsgApi(error?.response?.data?.message || error.message);
    return null;
  }
};

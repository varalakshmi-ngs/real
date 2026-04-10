import { errorMsgApi, successfully } from "../../../Core/tosts";
import { API } from "../../../Core/url";

export const addServiceApi = async ({ data }) => {
  try {
    const res = await API.post("/services", data);
    successfully("Added..!");
    return { status: true, data: res.data };
  } catch (error) {
    console.log("service add failed", error);
    errorMsgApi(error?.response?.data?.error || "Failed to add service");
    return { status: false };
  }
};

export const updateServiceApi = async ({ data, id }) => {
  try {
    const res = await API.patch(`/services/${id}`, data);
    return { status: true, data: res.data };
  } catch (error) {
    console.log("service add failed", error);
    errorMsgApi(error?.response?.data?.error || "Failed to add service");
    return { status: false };
  }
};

export const deleteServiceApi = async ({ id }) => {
  try {
    await API.delete(`/services/${id}`);
    return { status: true };
  } catch (error) {
    console.log("service add failed", error);
    errorMsgApi(error?.response?.data?.error || "Failed to add service");
    return { status: false };
  }
};

export const getServiceApi = async () => {
  try {
    const res = await API.get(`/services`);
    return { status: true, data: res?.data };
  } catch (error) {
    console.log("service add failed", error);
    errorMsgApi(error?.response?.data?.error || "Failed to add service");
    return { status: false };
  }
};

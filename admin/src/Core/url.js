import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "";

export const API = axios.create({
  baseURL,
});

export const APIURL = baseURL;

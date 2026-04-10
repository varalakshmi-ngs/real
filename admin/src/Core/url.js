import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4040";

export const API = axios.create({
  baseURL,
});

export const APIURL = baseURL;

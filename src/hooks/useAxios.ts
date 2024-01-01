import axios from "axios";

const BASE_URL = process.env.REACT_APP_REAL_API_BASE_URL || "https://dummyjson.com";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
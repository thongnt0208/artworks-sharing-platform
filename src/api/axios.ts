import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export default axios.create({
  baseURL: process.env.NODE_ENV_BASE_URL || BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: process.env.NODE_ENV_BASE_URL || BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

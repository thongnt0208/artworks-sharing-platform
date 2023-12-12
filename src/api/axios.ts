import axios from "axios";

export default axios.create({
  baseURL: process.env.NODE_ENV_BASE_URL || "https://dummyjson.com",
});

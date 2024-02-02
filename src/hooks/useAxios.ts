import axios from "axios";
import useRefreshToken from "./useRefreshToken";
import { getAuthInfo } from "../util/AuthUtil";

const BASE_URL = process.env.REACT_APP_REAL_API_BASE_URL || "https://dummyjson.com";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = (() => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
  });

  const refresh = useRefreshToken();

  const requestInterceptor = instance.interceptors.request.use(
    (config) => {
      const authenticationInfo = getAuthInfo();
      // Add Bearer token to requests if not present
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${authenticationInfo?.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const responseInterceptor = instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 403 && !error.config?.retry) {
        error.config.retry = true; // Mark the request for retry to prevent infinite loop

        await refresh(); // Refresh the token

        // Update the Authorization header with the new access token
        error.config.headers["Authorization"] = `Bearer ${getAuthInfo()?.accessToken}`;

        // Retry the request with the updated token
        return instance(error.config);
      }
      return Promise.reject(error);
    }
  );

  return {
    ...instance,
    post: instance.post,
    get: instance.get,
    put: instance.put,
    patch: instance.patch,
    delete: instance.delete,
    interceptors: {
      ejectInterceptors: () => {
        instance.interceptors.request.eject(requestInterceptor);
        instance.interceptors.response.eject(responseInterceptor);
      },
    },
  };
})();

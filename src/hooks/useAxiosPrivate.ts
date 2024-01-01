import { axiosPrivate } from "./useAxios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { getAuthInfo } from "../util/AuthUtil";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const  authenticationInfo  = getAuthInfo();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${authenticationInfo?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;// Retrieves the request configuration that resulted in an error

                // If the error is 403 (Forbidden) and the request has not been sent
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;// Marks the request as sent to prevent multiple retries
                    
                    await refresh();// Calls the 'refresh' function to set a new access token to LS
                                        
                    // Updates the Authorization header with the new access token            
                    prevRequest.headers['Authorization'] = `Bearer ${getAuthInfo()?.accessToken}`;
                    return axiosPrivate(prevRequest);// Resends the updated request with the new access token
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [authenticationInfo, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;
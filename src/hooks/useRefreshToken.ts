import axios from "./useAxios";
import { getAuthInfo, setNewAccessToken } from "../util/AuthUtil";

const useRefreshToken = () => {
  let authInfo = getAuthInfo();

  const refresh = async () => {
    const body = { refreshToken: authInfo?.accessToken }; //current access token
    const response = await axios.post("/auth/refresh-token", body);
    if (response?.data?.isSuccess) {
      setNewAccessToken(response?.data?.result?.accessToken);
    }
    return response?.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;

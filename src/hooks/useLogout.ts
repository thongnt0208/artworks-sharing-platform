import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuthenticationInfo } = useAuth();

  const logout = async () => {
    setAuthenticationInfo({});
    try {
      await axios("/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};

export default useLogout;

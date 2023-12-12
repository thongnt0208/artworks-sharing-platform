import { useContext } from "react";
import {AuthContext} from "../auth/AuthContext";


const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;
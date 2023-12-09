import { createContext, useState } from "react";
import { login } from "./AuthService";

let defaultContext = {
    isAuthenticated: false,
    loginHandler: (username: string, password: string) => {},
    logoutHandler: () => {},
    
}

const AuthContext = createContext({...defaultContext});

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginHandler = (username: string, password: string) => {
    login(username, password)
      .then((res: any) => {
        console.log(res);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logoutHandler = () => {
    // Perform logout logic (clear tokens, etc.)
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginHandler, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

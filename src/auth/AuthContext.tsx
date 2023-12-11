import { createContext, useState } from "react";

const AuthContext = createContext({
  authenticationInfo: {},
  setAuthenticationInfo: (value: any) => {},
});

export const AuthProvider = ({ children }: any) => {
  const [authenticationInfo, setAuthenticationInfo] = useState({});

  return (
    <AuthContext.Provider value={{ authenticationInfo, setAuthenticationInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

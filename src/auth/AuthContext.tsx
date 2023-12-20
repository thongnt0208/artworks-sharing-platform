import React, { ReactNode, createContext, useState } from "react";

type Props = {
  children?: ReactNode;
};
type AuthContextType = {
  authenticationInfo: {
    id: string;
    username: string;
    password: string;
    accessToken: string;
    role: string[] | string;
  };
  setAuthenticationInfo: (info: any) => void;
};

const initialValue = {
  authenticationInfo: {
    id: "",
    username: "",
    password: "123",
    accessToken: "aT",
    role: "admin",
  },
  setAuthenticationInfo: () => {},
};
const AuthContext = createContext<AuthContextType>({
  ...initialValue,
  setAuthenticationInfo: () => {}, // Placeholder function
});
const AuthProvider = ({ children }: Props) => {
  const [authenticationInfo, setAuthenticationInfo] = useState(
    initialValue.authenticationInfo
  );

  return (
    <AuthContext.Provider value={{ authenticationInfo, setAuthenticationInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

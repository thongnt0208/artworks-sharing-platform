import PropTypes from "prop-types";
import { useMemo, useState, createContext, ReactNode } from "react";
import { getAuthInfo } from "../../util/AuthUtil";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextValue {
  authInfo: any;
  setAuthInfo: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export function AuthProvider({ children }: AuthProviderProps) {
  const [authInfo, setAuthInfo] = useState(getAuthInfo() || {});

  // ----------------------------------------------------------------------

  const memorizable = useMemo(() => ({ authInfo, setAuthInfo }), [authInfo]);

  return <AuthContext.Provider value={memorizable}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

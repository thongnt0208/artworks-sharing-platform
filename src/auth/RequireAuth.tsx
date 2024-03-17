import { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAuthInfo } from "../util/AuthUtil";

type Props = {
  children?: ReactNode;
};

export default function RequireAuth({ children }: Props) {
  const  authenticationInfo  = getAuthInfo();

  const location = useLocation();
  //   if the user is logged in, render the child components
  //  otherwise, redirect to the login screen
  return authenticationInfo?.id ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace={true} />
  );
}

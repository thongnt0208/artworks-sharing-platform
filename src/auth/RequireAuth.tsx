import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type Props = {
  children?: ReactNode;
};

export default function RequireAuth({ children }: Props) {
  const { authenticationInfo } = useAuth();
  console.log(authenticationInfo);

  const location = useLocation();
  //   if the user is logged in, render the child components
  //  otherwise, redirect to the login screen
  return authenticationInfo.username ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace={true} />
  );
}

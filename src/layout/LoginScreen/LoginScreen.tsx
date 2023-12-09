import React, { useContext } from "react";
import AuthContext from "../../auth/AuthContext";

const LoginScreen: React.FC = () => {
  const { loginHandler } = useContext(AuthContext);

  const handleForm = () => {
    // Handle form submission, call login function from context
    // loginHandler();
  };
  return <></>;
};

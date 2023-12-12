import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { login } from "../../auth/AuthService";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LoginScreen = () => {
  const { authenticationInfo, setAuthenticationInfo } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const navigate = useNavigate();
  const toast: any = useRef(null);

  const validateInputs = () => {
    let valid = true;
    const newErrors = { username: "", password: "" };

    if (!username) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validateInputs()) {
      login(username, password)
        .then((response) => {
          const accessToken = response?.data?.accessToken;
          const role = response?.data?.role;
          setAuthenticationInfo({ username, password, accessToken, role });

          console.log({ username, password, accessToken, role });

          toast.current.show({
            severity: "success",
            summary: "Login Successful",
            detail: "You have been logged in successfully",
            life: 3000,
          });
          setTimeout(() => {
            navigate("/");
          }, 3000);
        })
        .catch((error) => {
          if (error?.status !== 200) {
            toast.current.show({
              severity: "error",
              summary: "Login Failed",
              detail: `There was an error logging in, please try again later.`,
              life: 3000,
            });
          }
        });
    }
  };

  useEffect(() => {
    console.log(authenticationInfo);
  }, [authenticationInfo]);

  return (
    <div className="login-form">
      <Toast ref={toast} />
      <div className="p-field">
        <label htmlFor="username">Username</label>
        <InputText
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <small className="p-error">{errors.username}</small>
      </div>
      <div className="p-field">
        <label htmlFor="password">Password</label>
        <InputText
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <small className="p-error">{errors.password}</small>
      </div>
      <Button label="Login" onClick={handleLogin} />
    </div>
  );
};

export default LoginScreen;

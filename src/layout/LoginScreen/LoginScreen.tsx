import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { login } from "../../auth/AuthService";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./LoginScreen.scss";
import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import logo from "../../assets/logo/logo_notext.svg";
import logotext from "../../assets/logo/logo.png";
import { Card } from "primereact/card";

const LoginScreen = () => {
  const { authenticationInfo, setAuthenticationInfo } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const navigate = useNavigate();
  const toast: any = useRef(null);

  const validateInputs = () => {
    console.log("Validate Inputttt");

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
            navigate("/editTest");
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
    <>
      <Toast ref={toast} />
      <div className="login-container flex w-100"><div className="background-overlay"></div>
        <div className="logo-container p-4 hidden lg:block">
          <Image alt="logo" src={logotext} height="100" />
        </div>
        <Card className="login-card">
          <div className="header-container pb-4">
            <div className="logo flex justify-content-start lg:hidden">
              <Image alt="logo" src={logo} height="40" />
              <h3 className="m-0">Artworkia</h3>
            </div>
            <h1>Đăng nhập</h1>
            <span>Người dùng mới?</span> <Link to={""}>Tạo tài khoản</Link>
          </div>
          <div className="normal-login">
            <div className="username-container">
              <InputText
                id="username"
                value={username}
                placeholder="Tên đăng nhập"
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => validateInputs()}
              />
              <small className="p-error">{errors.username}</small>
            </div>
            <div className="password-container">
              <InputText
                id="password"
                type="password"
                value={password}
                placeholder="Mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validateInputs()}
              />
              <small className="p-error">{errors.password}</small>
            </div>
            <Button label="Tiếp tục" onClick={handleLogin} />
          </div>

          <Divider />
          <div className="3party-login">
            <div className="google-login"></div>
            <div className="facebook-login"></div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default LoginScreen;

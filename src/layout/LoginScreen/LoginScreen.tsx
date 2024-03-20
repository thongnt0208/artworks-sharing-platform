import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./LoginScreen.scss";

import { InputText, Button, Toast, Divider, Image } from "../index";

import { login } from "../../auth/AuthService";
import logotext from "../../assets/logo/logo.png";

import { jwtDecode } from "jwt-decode";
import { authInfoDataType, setAuthInfo } from "../../util/AuthUtil";

type Props = {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  setAuthInfoChanged: (value: any) => void;
};
const LoginScreen = ({ isLogin, setIsLogin, setAuthInfoChanged }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const toast: any = useRef(null);

  const previousPath = location?.state?.from?.pathname;

  const handleLogin = () => {
    setIsLoading(true);
    login(username, password)
      .then((response) => {
        console.log(response);

        const { data } = response || {};
        const { userId: id, email, fullname, avatar, accessToken, refreshToken } = data || {};
        const decodedAToken = jwtDecode(accessToken) as any;
        console.log(decodedAToken);
        const role = decodedAToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const exp = decodedAToken.exp;

        let currentUserData: authInfoDataType = { id, email, fullname, username, avatar, accessToken, refreshToken, role, aTExp: exp };

        setAuthInfo(currentUserData); //set Auth info to LocalStorage
        setAuthInfoChanged(currentUserData); //notify to state at App.tsx that the user has logged in
        setIsLogin(!!id); // Assuming login is considered valid if 'id' exists
        setIsLoading(false);
        console.log({ ...currentUserData });

        toast.current.show({
          severity: "success",
          summary: "Đăng nhập thành công",
          detail: "Bạn sẽ được chuyển hướng trong 3 giây ...",
          life: 3000,
        });
        setTimeout(() => {
          navigate(previousPath || "/");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        let message = "Kiểm tra lại thông tin và thử lại sau.";
        if (error?.response?.status === 500) message = "Lỗi hệ thống, vui lòng thử lại sau.";
        if (error?.response?.status === 401) message = "Tên đăng nhập hoặc mật khẩu không đúng.";
        toast.current.show({
          severity: "error",
          summary: "Đăng nhập lỗi",
          detail: message,
          life: 3000,
        });
      });
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="login-container">
        <div className="background-overlay"></div>

        <div className="login-card-container">
          <Image alt="logo" src={logotext} height="50" />
          <div className="login-card">
            <div className="login-left">
              <h1 className="m-0">Đăng nhập</h1>
              <h3 className="">Sử dụng tài khoản Artworkia</h3>
            </div>
            <div className="hidden lg:block">
              <Divider layout="vertical" />
            </div>
            <div className="login-right">
              <div className="normal-login">
                <div className="username-container">
                  <InputText
                    id="username"
                    value={username}
                    placeholder="Tên đăng nhập"
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLogin();
                      }
                    }}
                    required
                  />
                </div>
                <div className="password-container">
                  <InputText
                    id="password"
                    type="password"
                    value={password}
                    placeholder="Mật khẩu"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLogin();
                      }
                    }}
                    required
                  />
                </div>
                <div className="">
                  <span>Người dùng mới?</span> <Link to={"/register"}>Tạo tài khoản</Link>
                </div>
                <Button
                  label="Tiếp tục"
                  onClick={handleLogin}
                  disabled={username && password ? false : true}
                  loading={isLoading}
                />
              </div>

              <Divider />
              <div className="3party-login">
                <div className="google-login"></div>
                <div className="facebook-login"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;

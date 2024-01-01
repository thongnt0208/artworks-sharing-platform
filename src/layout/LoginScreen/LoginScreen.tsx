import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./LoginScreen.scss";

import { InputText, Button, Toast, Divider, Image, Card } from "../index";

import { login } from "../../auth/AuthService";
import logo from "../../assets/logo/logo_notext.svg";
import logotext from "../../assets/logo/logo.png";

import { jwtDecode } from "jwt-decode";
import { setAuthInfo } from "../../util/AuthUtil";

type Props = {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
};
const LoginScreen = ({ isLogin, setIsLogin }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const toast: any = useRef(null);

  const previousPath = location?.state?.from?.pathname;

  const handleLogin = () => {
    login(username, password)
      .then((response) => {
        console.log(response);

        const { data } = response || {};
        const { result } = data || {};
        const { userId: id, email, fullname, accessToken, refreshToken } = result || {};
        const decodedAToken = jwtDecode(accessToken) as any;
        console.log(decodedAToken);
        const role = decodedAToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const exp = decodedAToken.exp;

        let currentUserData = { id, email, fullname, accessToken, refreshToken, role, aTExp: exp };

        setAuthInfo(currentUserData);
        setIsLogin(!!id); // Assuming login is considered valid if 'id' exists
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
        if (error?.status !== 200) {
          toast.current.show({
            severity: "error",
            summary: "Đăng nhập lỗi",
            detail: "Kiểm tra lại thông tin và thử lại sau.",
            life: 3000,
          });
        }
      });
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="login-container flex w-100">
        <div className="background-overlay"></div>
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
                required
              />
            </div>
            <Button
              label="Tiếp tục"
              onClick={handleLogin}
              disabled={username && password ? false : true}
            />
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

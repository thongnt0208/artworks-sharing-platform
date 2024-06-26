import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { InputText, Button, Toast, Divider, Image, Password } from "../index";
import { login, loginWithGoogle } from "../../auth/AuthService";
import { jwtDecode } from "jwt-decode";
import { authInfoDataType, setAuthInfo } from "../../util/AuthUtil";
import logotext from "../../assets/logo/logo.png";

import "./LoginScreen.scss";
import { translate2Vietnamese } from "../../util/TextHandle";
// -------------------------------------------------------------------
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

  const handleLoginResponse = (response: any) => {
    console.log(response);

    const { data } = response || {};
    const { userId: id, email, fullname, avatar, accessToken, refreshToken } = data || {};
    const decodedAToken = jwtDecode(accessToken) as any;
    console.log(decodedAToken);
    const role = decodedAToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const exp = decodedAToken.exp;

    let currentUserData: authInfoDataType = {
      id,
      email,
      fullname,
      username,
      avatar,
      accessToken,
      refreshToken,
      role,
      aTExp: exp,
    };

    setAuthInfo(currentUserData); //set Auth info to LocalStorage
    setAuthInfoChanged(currentUserData); //notify to state at App.tsx that the user has logged in
    setIsLogin(!!id); // Assuming login is considered valid if 'id' exists
    setIsLoading(false);
    console.log({ ...currentUserData });

    toast.current.show({
      severity: "success",
      content: (props: any) => (
        <div className="flex flex-column gap-2">
          <span className="text-cus-h2-bold">Đăng nhập thành công</span>
          <span>Bạn sẽ được chuyển hướng sang trang trước ...</span>
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate(previousPath || "/")}
          >
            Đến ngay
          </span>
        </div>
      ),
      life: 3000,
    });
    setTimeout(() => {
      navigate(previousPath || "/");
      setTimeout(() => window.location.reload(), 100);
    }, 800);
  };

  const handleLogin = () => {
    setIsLoading(true);
    login(username, password)
      .then((response) => handleLoginResponse(response))
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        let message = "Kiểm tra lại thông tin và thử lại sau.";
        if (error?.response?.status === 500) message = "Lỗi hệ thống, vui lòng thử lại sau.";
        else error?.response?.data?.errorMessage && (message = error?.response?.data?.errorMessage);
        toast.current.show({
          severity: "error",
          summary: "Đăng nhập lỗi",
          detail: message,
          life: 3000,
        });
      });
  };

  const handleGoogleLogin = (token: string) => {
    console.log("Google Login");
    loginWithGoogle(token)
      .then((response) => handleLoginResponse(response))
      .catch(async (error) => {
        let _msg = await translate2Vietnamese(error?.message);
        toast.current.show({
          severity: "error",
          summary: "Đăng nhập lỗi",
          detail: _msg || "Lỗi không xác định",
          life: 3000,
        });
        console.log(error);
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
                  <Password
                    id="password"
                    value={password}
                    placeholder="Mật khẩu"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLogin();
                      }
                    }}
                    required
                    toggleMask
                    feedback={false}
                  />
                </div>
                <div className="flex align-items-center" style={{marginTop: "-2rem"}}>
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                      handleGoogleLogin(credentialResponse?.credential || "");
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    locale="vi"
                    shape="pill"
                  />
                  <div className="flex align-self-center m-0">
                    <span>Người dùng mới? </span><Link to={"/verify-email"}>Tạo tài khoản</Link>
                  </div>
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

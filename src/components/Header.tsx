import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, InputText, Dialog, Button, Image } from "../layout";
import { Menubar } from "primereact/menubar";
import { logout } from "../auth/AuthService";
import { getAuthInfo, removeAuthInfo } from "../util/AuthUtil";

import Notification, { notificationItemType } from "./Notification";
import ProfilePopup from "./ProfilePopup";
import { AuthContext } from "../auth/context/auth-provider";
import { hideHeaderRoutes } from "../const/uiConstants";

import "./Header.scss";
import { MenuItem } from "primereact/menuitem";

const logo = require("../assets/logo/logo-small.png");
const tmpAvt = require("../assets/defaultImage/blank-100.png");

type HeaderProps = {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  chatboxesData: notificationItemType[];
};

const Header = ({ isLogin, setIsLogin, chatboxesData }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const [showNotification, setShowNotification] = useState(false);
  const [showMessageNotification, setShowMessageNotification] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const currentUrl = location.pathname + location.search + location.hash;

  const handleLogout = () => {
    const accessToken = getAuthInfo()?.accessToken;
    setIsLoading(true);
    logout(accessToken).catch(console.log);
    setTimeout(() => {
      setIsLogin(false);
      setIsLoading(false);
      setShowProfilePopup(false);
      removeAuthInfo();
      authContext?.setAuthInfo?.({});
      navigate("/");
    }, 1500);
  };

  const startItems = [
    [
      <Link to="/">
        <Image src={logo} alt="Logo" />
      </Link>,
    ],
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue !== "") {
      e.preventDefault();
      navigate(`/search?value=${searchValue}`);
    }
  };

  const items: MenuItem[] = [
    { label: "Khám phá", command: () => navigate("/explore") },
    { label: "Thuê", command: () => navigate("/hire") },
    {
      label: !["/search", "/explore"].includes(currentUrl) ? "Tìm kiếm" : "",
      template: !["/search", "/explore"].includes(currentUrl) && (
        <span className="p-input-icon-right search-bar flex">
          <InputText
            className="w-full"
            placeholder="Tìm kiếm"
            style={{ borderRadius: "50px"}}
            tooltip="Nhấn phím Enter để tìm"
            onKeyDown={handleKeyDown}
            onInput={(e) => setSearchValue(e.currentTarget.value)}
          />
          <Button
            icon="pi pi-search"
            rounded
            text
            severity="info"
            aria-label="Tìm kiếm"
            disabled={searchValue === ""}
            style={{position: "absolute", right: 0}}
            onClick={() => navigate(`/search?value=${searchValue}`)}
          />
        </span>
      ),
    },
  ].filter((item) => item.label !== "");

  const dialogModelFields = {
    modal: true,
    position: "top-right" as const,
    dismissableMask: true,
    draggable: false,
    headerClassName: "popup-header",
    closable: false,
  };

  const authInfo = getAuthInfo();

  return (
    <div
      className={`header ${
        hideHeaderRoutes.some((route) => location.pathname.includes(`/${route}`)) ? "hidden" : ""
      }`}
    >
      <Menubar
        className="menubar"
        start={startItems}
        model={items}
        end={[
          [
            <div className="end-menu">
              {isLogin ? (
                <>
                  <Link to="/artwork/post">
                    <Button icon="" label="Đăng tác phẩm" />
                  </Link>
                  <div className="message-icon" onClick={() => setShowMessageNotification(true)}>
                    <i className="pi pi-inbox"></i>
                  </div>
                  <div className="notification-icon" onClick={() => setShowNotification(true)}>
                    <i className="pi pi-bell"></i>
                  </div>
                  <div className="avatar-icon" onClick={() => setShowProfilePopup(true)}>
                    <Avatar image={authInfo?.avatar || tmpAvt} size="normal" shape="circle" />
                  </div>
                </>
              ) : (
                <>
                  <Button label="Đăng nhập" onClick={() => navigate("/login")} />
                  <Button label="Đăng ký" onClick={() => navigate("/register")} className="ml-2" />
                </>
              )}
            </div>,
          ],
        ]}
      />

      <Dialog
        header="Tin nhắn"
        visible={showMessageNotification}
        onHide={() => setShowMessageNotification(false)}
        {...dialogModelFields}
      >
        <Notification notifications={chatboxesData} type="chat" />
      </Dialog>

      <Dialog
        header="Thông báo"
        visible={showNotification}
        onHide={() => setShowNotification(false)}
        {...dialogModelFields}
      >
        <Notification
          notifications={[
            {
              notificationId: "1",
              content: "đã thích một bài viết của bạn.",
              notifyType: "Notification",
              isSeen: true,
              creationDate: "26/12/2023",
            },
            {
              notificationId: "2",
              content: "đã bình luận về tác phẩm của bạn.",
              notifyType: "Notification",
              isSeen: false,
              creationDate: "27/12/2023",
            },
            {
              notificationId: "3",
              content: "đã theo dõi bạn.",
              notifyType: "Notification",
              isSeen: false,
              creationDate: "28/12/2023",
            },
          ]}
          type="noti"
        />
      </Dialog>

      <Dialog
        visible={showProfilePopup}
        onHide={() => setShowProfilePopup(false)}
        {...dialogModelFields}
      >
        <ProfilePopup
          fullname={authInfo?.fullname}
          email={authInfo?.email}
          avatar={authInfo?.avatar || tmpAvt}
        />
        <div className="flex w-full justify-content-center p-2">
          <Button icon="" label="Đăng xuất" loading={isLoading} onClick={handleLogout} />
        </div>
      </Dialog>
    </div>
  );
};

export default Header;

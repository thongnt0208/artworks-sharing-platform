import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { logout } from "../auth/AuthService";
import { getAuthInfo, removeAuthInfo } from "../util/AuthUtil";

import Notification from "./Notification";
import ProfilePopup from "./ProfilePopup";
import "./Header.scss";
import { AuthContext } from "../auth/context/auth-provider";

const logo = require("../assets/logo/logo-small.png");
const avatar = require("../assets/defaultImage/default-avatar.png");

let sampleNotificationData = [
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
];

let sampleMessageData = [
  {
    notificationId: "1",
    content: "đã gửi cho bạn một tin nhắn.",
    notifyType: "",
    isSeen: true,
    creationDate: "26/12/2023",
  },
  {
    notificationId: "2",
    content: "đã gửi cho bạn một yêu cầu.",
    notifyType: "Tương tác",
    isSeen: false,
    creationDate: "27/12/2023",
  },
  {
    notificationId: "3",
    content: "đã gửi cho bạn một tin nhắn.",
    notifyType: "Theo dõi",
    isSeen: false,
    creationDate: "28/12/2023",
  },
];

const Header = ({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}) => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [showMessageNotification, setShowMessageNotification] = useState<boolean>(false);
  const [showProfilePopup, setShowProfilePopup] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentUrl, setCurrentUrl] = useState<string>(window.location.href || "");

  const authContext = useContext(AuthContext);
  console.log(authContext);

  const handleLogoutBtn = () => {
    let accessToken = getAuthInfo()?.accessToken;
    setIsLoading(true);
    logout(accessToken).catch((err) => console.log("Logout ERRR", err));
    setTimeout(() => {
      setIsLogin(false);
      setIsLoading(false);
      setShowProfilePopup(false);
      removeAuthInfo();
      authContext?.setAuthInfo?.({});
      navigate("/");
    }, 1500);
  };

  const handleCheckLogin = () => {
    !isLogin && navigate("/login");
  };

  const startItems = [
    [
      <Link to="/" className="logo">
        <Image src={logo} alt="Logo" />
      </Link>,
    ],
  ];

  const items = [
    { label: "Khám phá", command: () => navigate("/discover") },
    { label: "Thuê", command: () => navigate("/hire") },
  ];

  const dialogModelFields = {
    modal: true,
    position: "top-right" as const, // Set to one of the allowed values
    dismissableMask: true,
    draggable: false,
    headerClassName: "popup-header",
    closable: false,
  };

  let handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/search?value=${searchValue}`);
    }
  };

  useEffect(() => {
    setCurrentUrl(window.location.href);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href]);

  return (
    <div className="header">
      <Menubar
        className="menubar"
        start={() => startItems}
        model={items}
        end={[
          [
            <div className="end-menu">
              <span className="p-input-icon-right search-bar">
                {currentUrl.includes("/search") ? (
                  <></>
                ) : (
                  <InputText
                    placeholder="Search"
                    style={{ width: "30rem" }}
                    tooltip="Nhấn phím Enter để tìm"
                    onKeyDown={(e: any) => handleKeyDown(e)}
                    onInput={(e: any) => setSearchValue(e.target.value)}
                  />
                )}

                <i className="pi pi-search" />
              </span>
              {isLogin ? (
                <>
                  <Link to="/artwork/post">
                    <Button icon="" label="Đăng tác phẩm" />
                  </Link>

                  <div
                    className="message-icon"
                    onClick={() => {
                      setShowMessageNotification(true);
                    }}
                  >
                    <i className="pi pi-inbox"></i>
                  </div>

                  <div
                    className="notification-icon"
                    onClick={() => {
                      setShowNotification(true);
                    }}
                  >
                    <i className="pi pi-bell"></i>
                  </div>

                  <div
                    className="avatar-icon"
                    onClick={() => {
                      setShowProfilePopup(true);
                    }}
                  >
                    <Avatar image={avatar} size="normal" />
                  </div>
                </>
              ) : (
                <>
                  <Button
                    icon=""
                    label="Đăng nhập"
                    onClick={() => {
                      handleCheckLogin();
                    }}
                  />
                  <Button
                    icon=""
                    label="Đăng ký"
                    onClick={() => {
                      navigate("/register");
                    }}
                  />
                </>
              )}
            </div>,
          ],
        ]}
      />

      <Dialog
        header="Tin nhắn"
        visible={showMessageNotification}
        onHide={() => {
          setShowMessageNotification(false);
        }}
        {...dialogModelFields}
      >
        <Notification
          notifications={sampleMessageData}
          account={{
            accountId: "1",
            name: "Trung Thông",
          }}
        />
      </Dialog>

      <Dialog
        header="Thông báo"
        visible={showNotification}
        onHide={() => {
          setShowNotification(false);
        }}
        {...dialogModelFields}
      >
        <Notification
          notifications={sampleNotificationData}
          account={{
            accountId: "1",
            name: "Trung Thông",
          }}
        />
      </Dialog>

      <Dialog
        visible={showProfilePopup}
        onHide={() => {
          setShowProfilePopup(false);
        }}
        {...dialogModelFields}
      >
        <ProfilePopup fullname={getAuthInfo()?.fullname} email={getAuthInfo()?.email} />
        <div className="flex w-full justify-content-center p-2">
          <Button
            icon=""
            label="Đăng xuất"
            loading={isLoading}
            onClick={() => {
              handleLogoutBtn();
            }}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default Header;

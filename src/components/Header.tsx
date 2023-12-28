import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import Notification from "./Notification";
import DefaultButton from "./Button";
import ProfilePopup from "./ProfilePopup";
import "./Header.scss";
import { Button } from "primereact/button";
import { logout } from "../auth/AuthService";
import { removeAuthInfo } from "../util/AuthUtil";

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

const Header = ({ isLogin }: { isLogin: boolean }) => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [showMessageNotification, setShowMessageNotification] = useState<boolean>(false);
  const [showProfilePopup, setShowProfilePopup] = useState<boolean>(false);
  const [isLoginState, setIsLoginState] = useState(isLogin);
  const profilePopupRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const messageNotificationRef = useRef<HTMLDivElement>(null);

  const handleMouseEnterNotification = () => {
    setShowNotification(true);
  };

  const handleMouseEnterMessageNotification = () => {
    setShowMessageNotification(true);
  };

  const handleMouseEnterAvatarClick = () => {
    setShowProfilePopup(true);
  };

  useEffect(() => {
    const handleClickOutsideProfilePopup = (event: MouseEvent) => {
      // Explicitly define MouseEvent
      if (profilePopupRef.current && !profilePopupRef.current.contains(event.target as Node)) {
        setShowProfilePopup(false);
      }
    };

    const handleClickOutsideNotification = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotification(false);
      }
    };

    const handleClickOutsideMessageNotification = (event: MouseEvent) => {
      if (
        messageNotificationRef.current &&
        !messageNotificationRef.current.contains(event.target as Node)
      ) {
        setShowMessageNotification(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideProfilePopup);
    document.addEventListener("mousedown", handleClickOutsideNotification);
    document.addEventListener("mousedown", handleClickOutsideMessageNotification);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideProfilePopup);
      document.removeEventListener("mousedown", handleClickOutsideNotification);
      document.removeEventListener("mousedown", handleClickOutsideMessageNotification);
    };
  }, []);

  const startItems = [
    [
      <Link to="/" className="logo">
        <Image src={logo} alt="Logo" />
      </Link>,
    ],
  ];

  const items = [
    {
      label: "Khám phá",
    },
    {
      label: "Thuê",
    },
  ];

  const endItems = [
    [
      <div className="end-menu">
        <span className="p-input-icon-right search-bar">
          <InputText placeholder="Search" style={{ width: "30rem" }} />
          <i className="pi pi-search" />
        </span>
        {isLoginState ? (
          <>
            <DefaultButton icon="" text="Đăng tác phẩm" onClick={() => {}} />
            <div className="message-icon" onClick={handleMouseEnterMessageNotification}>
              <i className="pi pi-inbox"></i>
              {isLoginState && showMessageNotification && (
                <div className="popup" ref={messageNotificationRef}>
                  <Notification
                    notifications={sampleMessageData}
                    account={{
                      accountId: "1",
                      name: "Trung Thông",
                    }}
                  />
                </div>
              )}
            </div>
            <div className="notification-icon" onClick={handleMouseEnterNotification}>
              <i className="pi pi-bell"></i>
              {isLoginState && showNotification && (
                <div className="popup" ref={notificationRef}>
                  <Notification
                    notifications={sampleNotificationData}
                    account={{
                      accountId: "1",
                      name: "Trung Thông",
                    }}
                  />
                </div>
              )}
            </div>
            <div className="avatar-icon" onClick={handleMouseEnterAvatarClick}>
              <Avatar image={avatar} size="normal" />
              {showProfilePopup && (
                <div className="popup profile-popup" ref={profilePopupRef}>
                  <ProfilePopup username={"danghoanganh36"} email={"danghoanganh36@gmail.com"} />
                  <DefaultButton
                    icon=""
                    text="Đăng xuất"
                    onClick={() => {
                      setIsLoginState(false);
                    }}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <DefaultButton
              icon=""
              text="Đăng nhập"
              onClick={() => {
                setIsLoginState(true);
              }}
            />
            <DefaultButton icon="" text="Đăng ký" onClick={() => {}} />
          </>
        )}
      </div>,
    ],
  ];

  let navigate = useNavigate();
  const handleLogoutBtn = () => {
    logout().catch((err) => console.log('Logout ERRR', err));
    removeAuthInfo();
    setIsLoginState(false);
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <div className="header">
      {isLogin.toString()}
      {isLoginState.toString()}
      {isLogin && <Button label="Log out" onClick={handleLogoutBtn} />}
      <Menubar className="menubar" start={() => startItems} model={items} end={endItems} />
    </div>
  );
};

export default Header;

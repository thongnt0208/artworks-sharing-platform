import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import Notification from "./Notification";
import DefaultButton from "./Button";
import ProfilePopup from "./ProfilePopup";
import "./Header.scss";

const logo = require("../assets/logo/logo-small.png");
const avatar = require("../assets/defaultImage/default-avatar.png");

const Header = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showMessageNotification, setShowMessageNotification] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const handleMouseEnterNotification = () => {
    setShowNotification(true);
  };

  const handleMouseLeaveNotification = () => {
    setShowNotification(false);
  };

  const handleMouseEnterMessageNotification = () => {
    setShowMessageNotification(true);
  };

  const handleMouseLeaveMessageNotification = () => {
    setShowMessageNotification(false);
  };

  const handleMouseEnterAvatarClick = () => {
    setShowProfilePopup(true);
  };

  const handleMouseLeaveAvatarClick = () => {
    setShowProfilePopup(false);
  };

  const startItems = [
    [
      <Link to="/" className="logo" >
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
    {},
  ];

  const endItems = [
    [
      <div className="end-menu" style={{ padding: "0 10px", display: "flex", flexDirection: "row" }}>
        <InputText
          type="text"
          placeholder="Search"
          className="p-inputtext-sm"
        />
        <DefaultButton icon="" text="Đăng tác phẩm" onClick={() => {}} />
        <div
          className="message-icon"
          onMouseEnter={handleMouseEnterMessageNotification}
          onMouseLeave={handleMouseLeaveMessageNotification}
        >
          <i className="pi pi-inbox"></i>
          {showMessageNotification && (
            <div className="popup">
              <Notification
                notification={{
                  notificationId: "1",
                  content: "đã thích một bài viết của bạn.",
                  notifyType: "Tương tác",
                  isSeen: false,
                  creationDate: "",
                }}
                account={{
                  accountId: "1",
                  name: "Trung Thông",
                }}
              />
            </div>
          )}
        </div>
        <div
          className="notification-icon"
          onMouseEnter={handleMouseEnterNotification}
          onMouseLeave={handleMouseLeaveNotification}
        >
          <i className="pi pi-bell"></i>
          {showNotification && (
            <div className="popup">
              <Notification
                notification={{
                  notificationId: "1",
                  content: "đã thích một bài viết của bạn.",
                  notifyType: "Tương tác",
                  isSeen: false,
                  creationDate: "",
                }}
                account={{
                  accountId: "1",
                  name: "Trung Thông",
                }}
              />
            </div>
          )}
        </div>
        <div
          className="avatar-icon"
          onClick={handleMouseEnterAvatarClick}
          onMouseLeave={handleMouseLeaveAvatarClick}
        >
          <Avatar image={avatar} size="large" />
          {showProfilePopup && <ProfilePopup username={""} email={""} />}
        </div>
      </div>,
    ],
  ];

  return (
    <div className="header">
      <Menubar
        className="menubar"
        start={() => startItems}
        model={items}
        end={endItems}
      />
    </div>
  );
};

export default Header;

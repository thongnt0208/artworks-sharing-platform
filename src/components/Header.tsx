import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import Notification from "./Notification";
import DefaultButton from "./Button";
import { Link } from "react-router-dom";

const logo = require("../assets/logo/logo-small.png");
const avatar = require("../assets/defaultImage/default-avatar.png");

const Header = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showMessageNotification, setShowMessageNotification] = useState(false);

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

  const startItems = [
    [
      <Link to="/" style={{ textDecoration: "none" }}>
        <Image src={logo} alt="Logo" width="100px" style={{ padding: "0" }} />
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
      <div style={{ padding: "0 10px", display: "flex", flexDirection: "row" }}>
        <InputText
          type="text"
          placeholder="Search"
          className="p-inputtext-sm"
        />
        <DefaultButton text="Đăng tác phẩm" onClick={() => {}} />
        <div
          onMouseEnter={handleMouseEnterMessageNotification}
          onMouseLeave={handleMouseLeaveMessageNotification}
          style={{ position: "relative", cursor: "pointer" }}
        >
          <i className="pi pi-inbox"></i>
          {showMessageNotification && (
            <div
              style={{
                position: "absolute",
                right: "0",
                top: "100%",
                zIndex: 999,
              }}
            >
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
          onMouseEnter={handleMouseEnterNotification}
          onMouseLeave={handleMouseLeaveNotification}
          style={{ position: "relative", cursor: "pointer" }}
        >
          <i className="pi pi-bell"></i>
          {showNotification && (
            <div
              style={{
                position: "absolute",
                right: "0",
                top: "100%",
                zIndex: 999,
              }}
            >
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

        <Avatar image={avatar} size="large" />
      </div>,
    ],
  ];

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Menubar
        start={() => startItems}
        model={items}
        end={endItems}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default Header;

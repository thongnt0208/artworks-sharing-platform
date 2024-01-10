import React from "react";
import { Avatar } from "primereact/avatar";
import { ListBox } from "primereact/listbox";
import { useNavigate } from "react-router-dom";
import "./ProfilePopup.scss";
import { Button } from "primereact/button";
import { getAuthInfo } from "../util/AuthUtil";

const logo = require("../assets/defaultImage/default-avatar.png");

interface ProfilePopupProps {
  username: string;
  email: string;
  onClose?: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({
  username = "User123",
  email = "user123@gmail.com",
  onClose,
}) => {
  const navigate = useNavigate();
  const handleListBoxChange = (link: string) => {
    navigate(link);
  };

  const handleProfileClick = () => {
    let profileId = getAuthInfo()?.id
    navigate(`/account/${profileId}/artwork`);
  };

  const items = [
    "Quản lý tác phẩm",
    "Bookmarks",
    "Yêu cầu của bạn",
    "Asset đã mua",
    "Quản lý ví",
    "Cài đặt",
    "Trợ giúp",
  ];
  return (
    <div className="notification-container">
      <div className="user-information-bar">
        <Avatar image={logo} style={{ padding: "0" }} size="xlarge" />
        <h3>{username}</h3>
        <p>{email}</p>
        <Button label="Trang cá nhân" onClick={handleProfileClick} />
      </div>

      <div className="list-box">
        <ListBox
          options={items}
          className="w-full md:w-14rem"
          onChange={(e) => handleListBoxChange(e.value)}
        />
      </div>
    </div>
  );
};

export default ProfilePopup;
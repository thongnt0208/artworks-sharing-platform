import React from "react";
import { Avatar } from "primereact/avatar";
import { ListBox } from "primereact/listbox";
import { useNavigate } from "react-router-dom";

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
  console.log("Jeelo" + username);
  const handleListBoxChange = (link: string) => {
    navigate(link);
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
        <Avatar image={logo} style={{ padding: "0" }} />
        <h2 style={{ color: "black" }}>{username}</h2>
        <p style={{ color: "black" }}>{email}</p>
        <button onClick={() => navigate("/profile")}>Trang cá nhân</button>
      </div>

      <div>
        <ListBox
          options={items}
          className="w-full md:w-14rem"
          onChange={(e) => handleListBoxChange(e.value)}
        />
      </div>
      <button onClick={onClose}>Đăng xuất</button>
    </div>
  );
};

export default ProfilePopup;

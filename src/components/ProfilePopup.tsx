import React from "react";
import { Avatar } from "primereact/avatar";
import { ListBox } from 'primereact/listbox';
import { useNavigate } from "react-router-dom";
        

const logo = require("../assets/defaultImage/default-avatar.png");

interface ProfilePopupProps {
    username?: string | "User123";
    email?: string | "user123@gmail.com";
    onClose?: () => void;
}

const ProfilePopup: React.FC = ({ username = "User123", email = "user123@gmail.com", onClose } : ProfilePopupProps) => {
        const navigate = useNavigate();
        console.log("Jeelo" + username);
        const handleListBoxChange = (link: string) => {
                navigate(link);
        }

    const items = [
        "Quản lý tác phẩm",
        "Bookmarks",
        "Yêu cầu của bạn",
        "Asset đã mua",
        "Quản lý ví",
        "Cài đặt",
        "Trợ giúp"
    ];
  return (
    <div
      style={{
        width: "fit-content",
        height: "fit-content",
        position: "absolute",
        right: "0",
        top: "100%",
        zIndex: 999,
        backgroundColor: "white",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          padding: "10px",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "black",
        }}
      >
        <Avatar image={logo} style={{ padding: "0" }} />
        <h2 style={{color: "black"}}>{username}</h2>
        <p style={{color: "black"}}>{email}</p>
        <button onClick={onClose}>Trang cá nhân</button>
      </div>
      <div>
        <ListBox options={items} className="w-full md:w-14rem" onChange={(e) => handleListBoxChange(e.value)} />
      </div>
      <button onClick={onClose}>Đăng xuất</button>
    </div>
  );
};

export default ProfilePopup;
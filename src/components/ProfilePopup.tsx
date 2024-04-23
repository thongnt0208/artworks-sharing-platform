import React from "react";
import { Avatar } from "primereact/avatar";
import { ListBox } from "primereact/listbox";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import "./ProfilePopup.scss";
import { Button } from "primereact/button";
import { getAuthInfo } from "../util/AuthUtil";

interface ProfilePopupProps {
  fullname: string;
  email: string;
  avatar: string;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ fullname, email, avatar }) => {
  const navigate = useNavigate();
  const profileId = getAuthInfo()?.id;

  const handleProfileClick = () => {
    navigate(`/account/${profileId}/artwork`);
  };

  const items = [
    <Link className="link" to={`/account/${profileId}/artwork`}>
      Quản lý tác phẩm
    </Link>,
    <Link className="link" to={`/account/${profileId}/collection`}>
      Tác phẩm đã lưu
    </Link>,
    <Link className="link" to={`/my-requests`}>
      Yêu cầu của tôi
    </Link>,
    <Link className="link" to={`/account/${profileId}/assets`}>
      Tài nguyên đã mua
    </Link>,
    <Link className="link" to={`/account/${profileId}/wallet`}>
      Quản lý ví
    </Link>,
    <Link className="link" to="/help">
      Trợ giúp
    </Link>,
  ];

  return (
    <div className="notification-container-profile">
      <div className="user-information-bar" onClick={handleProfileClick}>
        <Avatar image={avatar} style={{ padding: "0" }} size="xlarge" shape="circle" />
        <h3>{fullname}</h3>
        <p>{email}</p>
        <Button label="Trang cá nhân" onClick={handleProfileClick} />
      </div>

      <div className="list-box">
        <ListBox options={items} className="w-full md:w-14rem" />
      </div>
    </div>
  );
};

export default ProfilePopup;

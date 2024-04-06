import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

import { UserInformationProps } from "./UserInformationCard";
import "./ProfilePreview.scss";

const ProfilePreview: React.FC<{
  creator: UserInformationProps;
  hireCallback?: () => void;
}> = ({ creator, hireCallback }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="creator-info">
        <img
          alt={`Ảnh đại diện của ${creator.fullname}`}
          src={creator.avatar}
          className="avatar-image"
        />
        <h1 className="m-1">{creator.fullname}</h1>
        <h3 className="m-0">{creator.email}</h3>
        <div className="hire-info">
          <p className="project-completed">{creator.projectCompleted} Dự án Hoàn thành</p>
          {creator.isVerrified && <i className="pi pi-verified verrified-icon" />}
        </div>
        <div className="buttons">
          <Button
            label="Thuê"
            className="left-button"
            rounded
            onClick={() => navigate(`/account/${creator.id}/service`)}
          />
          <Button
            label="Trang cá nhân"
            className="right-button"
            rounded
            onClick={() => {
              navigate(`/account/${creator.id}/artwork`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;

import React from "react";

import { UserInformationProps } from "./UserInformationCard";
import "./ProfilePreview.scss";

const ProfilePreview: React.FC<{
  creator: UserInformationProps;
}> = ({ creator }) => {
  return (
    <div className="profile-preview-container">
      <img
        alt={`Ảnh đại diện của ${creator.fullname}`}
        src={creator.avatar}
        className="avatar-image"
      />
      <h1 className="m-1">{creator.fullname}</h1>
      <h3 className="m-0">{creator.email}</h3>
      <div className="hire-info">
        <p className="project-completed">{creator.projectCompleted || 0} Dự án Hoàn thành</p>
        {creator.isVerrified && <i className="pi pi-verified verrified-icon" />}
      </div>
    </div>
  );
};

export default ProfilePreview;

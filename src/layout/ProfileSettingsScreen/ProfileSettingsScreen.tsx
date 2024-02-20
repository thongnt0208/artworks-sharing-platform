import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import UpdateForm from "./UpdateFormView/UpdateFormView";

import "./ProfileSettingsScreen.scss";

const ProfileSettings: React.FC = () => {
  const location = useLocation();
  const profile = location.state.profile;
  return (
    <>
      <div className="profile-settings-container w-full h-fit">
        <div className="back-btn w-full h-fit flex flex-row justify-content-center ">
          <Button
            label="Quay về trang cá nhân"
            className="p-button"
            onClick={() => {
              window.history.back();
            }}
          />
        </div>
        <div className="update-form-container w-full h-fit flex flex-row justify-content-center align-items-center">
          <UpdateForm {...profile} />
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;

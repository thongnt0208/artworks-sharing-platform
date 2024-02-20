import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { UserInformationProps } from "../../../components/UserInformationCard";

import "./UpdateFormView.scss";
const defaultAvatar = require("../../../assets/defaultImage/default-avatar.png");

const UpdateForm: React.FC<UserInformationProps> = (profile) => {
  const toast = useRef<Toast>(null);
  const [fullname, setFullname] = useState(profile.fullname);
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [bio, setBio] = useState(profile.bio);
  const [avatar, setAvatar] = useState<File | string>(profile.avatar);

  const handleFullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullname(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  const handleAvatarChange = (event: any) => {
    console.log(event.files);
    setAvatar(event.files[0]);
    if (toast.current) {
      toast.current.show({ severity: 'success', summary: 'Cập nhật thành công', detail: 'Tải ảnh đại diện thành công' });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(" profile settings:", {
      username: username,
      email: email,
      bio: bio,
    });
  };

  return (
    <div className="update-profile-container grid w-full h-fit">
      <div className="avatar-container col-3 h-fit flex flex-column justify-content-center align-items-center">
        <img className="avatar" src={(avatar instanceof File ? URL.createObjectURL(avatar) : avatar) || defaultAvatar} alt="avatar"/>
        <div className="upload-file flex justify-content-center mt-3">
            <Toast ref={toast}></Toast>
            <FileUpload mode="basic" name="demo[]" accept="image/*" maxFileSize={1000000} onSelect={handleAvatarChange} />
        </div>  
      </div>
      <Divider className="col-1 p-0 m-0" layout="vertical" />
      <div className="profile-info-container col-8 h-fit flex flex-column justify-content-center">
        <h2>Cập nhật thông tin cá nhân của bạn</h2>
        <form
          className="profile-info-form w-full h-fit flex flex-column justify-content-start align-items-start"
          onSubmit={handleSubmit}
        >
          <div className="fullname-container w-full h-fit flex flex-row justify-content-start align-content-between pb-3">
            <div className="fullname-label w-full h-fit flex flex-column justify-content-start align-items-start">
              <label className="text-xl" htmlFor="fullname">Tên đầy đủ</label>
              <InputText
                type="text"
                id="fullname"
                className="text-xl w-8"
                name="fullname"
                placeholder={fullname}
                onChange={handleFullnameChange}
              />
            </div>
          </div>
          <div className="username-container w-full h-fit flex flex-column justify-content-start align-items-start pb-3">
            <label className="text-xl" htmlFor="username">Tên người dùng</label>
            <InputText
              type="text"
              id="username"
              className="text-xl w-8"
              name="username"
              placeholder={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="email-container w-full h-fit flex flex-column justify-content-start align-items-start pb-3">
            <label className="text-xl" htmlFor="email">Email</label>
            <InputText
              type="email"
              id="email"
              className="text-xl w-8"
              name="email"
              placeholder={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="bio-container w-full h-fit flex flex-column justify-content-start align-items-start pb-3">
            <label className="text-xl" htmlFor="bio">Giới thiệu</label>
            <InputTextarea
              id="bio"
              className="text-xl w-8"
              name="bio"
              placeholder={bio}
              onChange={handleBioChange}
            />
          </div>
          <div className="btn-container w-full h-fit flex flex-row justify-content-between align-items-start">
            
            <div className="submission-container w-full h-fit flex flex-row justify-content-start align-items-center">
              <div className="submit-btn w-fit h-fit mr-2 flex flex-row justify-content-center text-300">
                <Button label="Cập nhật" className="p-button" type="submit" />
              </div>
              <div className="cancel-btn w-fit h-fit flex flex-row justify-content-center">
                <Button label="Hủy" className="p-button" />
              </div>
            </div>

            <div className="delete-account-btn w-full h-fit flex flex-row justify-content-center">
              <Button label="Xóa tài khoản" className="p-button" />
            </div>
          
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;

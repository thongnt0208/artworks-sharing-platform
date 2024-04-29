import React, { useState } from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { UserInformationProps } from "../../../components/UserInformationCard";
import { GetProfileData, UpdatePassword, UpdateProfileAvatar, UpdateProfileData } from "../ProfileSettingsService";

import "./UpdateFormView.scss";
import { toast } from "react-toastify";
import { CatchAPICallingError, Password } from "../..";
import { useNavigate } from "react-router-dom";
const defaultAvatar = require("../../../assets/defaultImage/default-avatar.png");

const UpdateForm: React.FC<UserInformationProps> = (profile) => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState(profile.fullname);
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [bio, setBio] = useState(profile.bio);
  const [avatar, setAvatar] = useState<File | string>(profile.avatar);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    let authData = JSON.parse(localStorage.getItem("authData") ?? "");

    setAvatar(event.files[0]);
    if (event.files.length === 0) return;
    const response = UpdateProfileAvatar(profile.id, event.files[0]);
    response.then((res) => {
      try {
        toast.success("Cập nhật ảnh đại diện thành công");
        GetProfileData(profile.id).then((res) => {
          authData.avatar = res.avatar;
          localStorage.setItem("authData", JSON.stringify(authData));
        });
      } catch (error) {
        CatchAPICallingError(error, navigate);
      }
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let data: any = {
      fullname: fullname,
      username: username,
      email: email,
      bio: bio,
    };
    const response = UpdateProfileData(profile.id, data);
    response.then((res) => {
      try {
        toast.success("Cập nhật thông tin thành công");
      } catch (error) {
        CatchAPICallingError(error, navigate);
      }
    });
  };

  const handlePasswordChange = (event: React.FormEvent) => {
    event.preventDefault();
    let data: any = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    const response = UpdatePassword(profile.id, data);
    response.then((res) => {
      try {
        toast.success("Cập nhật mật khẩu thành công");
      } catch (error) {
        CatchAPICallingError(error, navigate);
      }
    });
  };

  const pwFooter = (
    <>
      <Divider />
      <p className="mt-2">Kiến nghị</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>Ít nhất một chữ thường</li>
        <li>Ít nhất một chữ hoa</li>
        <li>Ít nhất một chữ số</li>
        <li>Tối thiểu 8 ký tự</li>
      </ul>
    </>
  );

  return (
    <div className="update-profile-container grid w-full h-fit">
      <div className="avatar-container col-3 h-fit flex flex-column justify-content-center align-items-center">
        <img
          className="avatar"
          src={(avatar instanceof File ? URL.createObjectURL(avatar) : avatar) || defaultAvatar}
          alt="avatar"
        />
        <div className="upload-file flex justify-content-center mt-3">
          <FileUpload
            chooseLabel="Cập nhật ảnh đại diện"
            mode="basic"
            name="demo[]"
            accept="image/*"
            maxFileSize={1000000}
            onSelect={handleAvatarChange}
          />
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
              <label className="text-xl" htmlFor="fullname">
                Tên đầy đủ
              </label>
              <InputText
                type="text"
                id="fullname"
                className="text-xl w-5"
                name="fullname"
                placeholder={fullname}
                onChange={handleFullnameChange}
              />
            </div>
          </div>
          <div className="username-container w-full h-fit flex flex-column justify-content-start align-items-start pb-3">
            <label className="text-xl" htmlFor="username">
              Tên người dùng
            </label>
            <InputText
              type="text"
              id="username"
              className="text-xl w-5"
              name="username"
              placeholder={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="email-container w-full h-fit flex flex-column justify-content-start align-items-start pb-3">
            <label className="text-xl" htmlFor="email">
              Email
            </label>
            <InputText
              type="email"
              id="email"
              className="text-xl w-5"
              name="email"
              placeholder={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="bio-container w-full h-fit flex flex-column justify-content-center align-items-start pb-3">
            <label className="text-xl" htmlFor="bio">
              Giới thiệu
            </label>
            <InputTextarea id="bio" className="text-xl w-5" name="bio" placeholder={bio} onChange={handleBioChange} />
          </div>
          <div className="submit-btn w-fit h-fit mr-2 flex flex-row justify-content-center text-300">
            <Button label="Cập nhật" className="p-button" type="submit" />
          </div>
        </form>
        <Divider className="w-full mt-5" layout="horizontal" />
        <h2>Đổi mật khẩu</h2>
        <form
          className="change-password-form w-full h-fit flex flex-column justify-content-start align-items-start"
          onSubmit={handlePasswordChange}
        >
          <Password
            className="mb-2 w-5"
            id="password"
            inputClassName="text-xl w-full"
            placeholder="Mật khẩu cũ"
            footer={pwFooter}
            onChange={(e) => setOldPassword(e.target.value)}
            toggleMask
          />
          <Password
            className="mb-2 w-5"
            id="password"
            inputClassName="text-xl w-full"
            placeholder="Mật khẩu mới"
            onChange={(e) => setNewPassword(e.target.value)}
            toggleMask
          />
          <Password
            className="mb-2 w-5"
            style={{ color: confirmPassword !== newPassword ? "red" : "black"}}
            id="confirmPassword"
            inputClassName="text-xl w-full"
            placeholder="Nhập lại mật khẩu mới"
            onChange={(e) => setConfirmPassword(e.target.value)}
            feedback={false}
          />
          {confirmPassword !== newPassword && <p className="text-red-500">Mật khẩu không khớp</p>}
          <div className="submit-btn w-fit h-fit text-300">
            <Button label="Cập nhật" className="p-button" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;

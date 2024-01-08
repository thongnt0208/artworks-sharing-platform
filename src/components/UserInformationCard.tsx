import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useState } from "react";
import "./UserInformationCard.scss";

const defaultAvatar = require("../assets/defaultImage/default-avatar.png");

type Props = {
  id: string;
  username: string;
  fullname: string;
  role: string;
  // job: string;
  // address: string;
  bio: string;
  avatar: string;
  profileView: number;
  artworksView: number;
  followerNum: number;
  followingNum: number;
  isCreator: boolean;
  followHandler?: () => void;
  hireHandler?: () => void;
  editHandler?: () => void;
  privacyEditHandler?: () => void;
};

const UserInformationCard: React.FC<Props> = (props: Props) => {
  let footer = (
    <>
      {props.isCreator ? (
        <>
          <Button rounded className="top-button" label="Chỉnh sửa trang cá nhân" onClick={props.editHandler} />
          <Button
          rounded
            className="bot-button" 
            label="Thay đổi chế độ riêng tư"
            onClick={props.privacyEditHandler}
          />
        </>
      ) : (
        <>
          <Button rounded className="top-button" label="Theo dõi" onClick={props.followHandler} />
          <Button rounded className="bot-button" label="Thuê" onClick={props.hireHandler} />
        </>
      )}
    </>
  );
  return (
    <div className="user-information-card-container">
      <Card footer={footer} className="user-information-card">
        <div className="avatar-container">
          <img
            alt={`Ảnh đại diện của ${props.fullname}`}
            src={props.avatar ? props.avatar : defaultAvatar}
            className="avatar-image"
          />
        </div>
        <div className="information-container">
          <h1>{props.fullname}</h1>
          {/* <p>{props.job}</p>
          <p>{props.address}</p> */}
          <p>Nghề nghiệp</p>
          <p>Quận Gò Vấp, Hồ Chí Minh</p>
        </div>
      </Card>
      <div className="views-container grid-nogutter w-full">
        {/* Column for labels */}
        <div className="col-9 pl-4 text-left">
          <div>
            <p>Lượt xem trang cá nhân</p>
          </div>
          <div>
            <p>Lượt xem tác phẩm</p>
          </div>
          <div>
            <p>Người theo dõi</p>
          </div>
          <div>
            <p>Đang theo dõi</p>
          </div>
        </div>

        {/* Column for numbers */}
        <div className="col-3 text-left">
          <div>
            <p>{props.profileView}</p>
          </div>
          <div>
            <p>{props.artworksView}</p>
          </div>
          <div>
            <p>{props.followerNum}</p>
          </div>
          <div>
            <p>{props.followingNum}</p>
          </div>
        </div>
      </div>
      <div className="bio-container w-full pl-4 pr-4">
        <h3>Về tôi</h3>
        <p className="text-justify">{props.bio}</p>
      </div>
    </div>
  );
};

export default UserInformationCard;

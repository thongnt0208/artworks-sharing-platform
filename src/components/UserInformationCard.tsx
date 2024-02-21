import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "./UserInformationCard.scss";
import { useState } from "react";
import ReportDialog from "../layout/ArtworkDetailScreen/dialogs/ReportDialog";

const defaultAvatar = require("../assets/defaultImage/default-avatar.png");

export type UserInformationProps = {
  id: string;
  fullname: string;
  avatar: string;
  job: string;
  address: string;
  isCreator: boolean;
  email: string;
  username: string;
  role?: string;
  bio?: string;
  profileView?: number;
  artworksView?: number;
  followerNum?: number;
  followingNum?: number;
  followHandler?: () => void;
  hireHandler?: () => void;
  editHandler?: () => void;
  privacyEditHandler?: () => void;
};

const UserInformationCard: React.FC<UserInformationProps> = (props: UserInformationProps) => {  
  let [isShowReportDialog, setIsShowReportDialog] = useState(false);
  
  let footer = (
    <>
      {props.isCreator ? (
        <>
          <Button
            rounded
            className="top-button"
            label="Chỉnh sửa trang cá nhân"
            onClick={props.editHandler}
          />
          <Button
            rounded
            className="bot-button"
            label="Thay đổi chế độ riêng tư"
            onClick={props.privacyEditHandler}
          />
        </>
      ) : (
        <>
          <Button
            rounded
            className="top-button"
            label="Theo dõi"
            onClick={props.followHandler}
          />
          <Button
            rounded
            className="bot-button"
            label="Thuê"
            onClick={props.hireHandler}
          />
          <Button
            rounded
            className="bot-button"
            label="Báo cáo"
            onClick={() => setIsShowReportDialog(true)}
          />
        </>
      )}
    </>
  );
  return (
    <div className="user-information-card-container">
      <ReportDialog visible={isShowReportDialog} setVisibility={setIsShowReportDialog} targetId={props.id} entityName="Account"/>
      <Card footer={footer ? footer : ""} className="user-information-card">
        <div className="avatar-container">
          <img
            alt={`Ảnh đại diện của ${props.fullname}`}
            src={props.avatar ? props.avatar : defaultAvatar}
            className="avatar-image"
          />
        </div>
        <div className="information-container">
          <h1>{props.fullname}</h1>
          <p>{props.email}</p>
          <p>{props.address}</p>
        </div>
      </Card>

      {props.profileView && props.artworksView && props.followerNum && props.followingNum ? (
        <div className="views-container w-full flex flex-row justify-content-between align-items-center">
          {/* Column for labels */}
          <div className="pl-4 text-left">
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
          <div className="pr-7 text-left">
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
      ) : (
        <></>
      )}

      {props.bio ? (
        <div className="bio-container w-full pl-4 pr-4">
          <h3>Về tôi</h3>
          <p className="text-justify">{props.bio}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserInformationCard;
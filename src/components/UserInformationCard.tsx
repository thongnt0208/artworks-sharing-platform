import { useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

import ReportDialog from "../layout/ArtworkDetailScreen/dialogs/ReportDialog";
import RequestPopup, { RequestProps } from "./RequestPopup";
import "./UserInformationCard.scss";
import ProfilePreview from "./ProfilePreview";
import { Dialog } from "primereact/dialog";
const defaultAvatar = require("../assets/defaultImage/default-avatar.png");

export type UserInformationProps = {
  id: string;
  fullname: string;
  avatar: string;
  job?: string;
  address?: string;
  isCreator?: boolean;
  email: string;
  username: string;
  role?: string;
  bio?: string;
  profileView?: number;
  artworksView?: number;
  followerNum?: number;
  followingNum?: number;
  isVerrified?: boolean;
  projectCompleted?: number;
  hire?: boolean;
  followHandler?: () => void;
  messageHandler?: (request: RequestProps) => void;
  editHandler?: () => void;
  privacyEditHandler?: () => void;
};

const UserInformationCard: React.FC<UserInformationProps> = (
  props: UserInformationProps
) => {
  let [isShowReportDialog, setIsShowReportDialog] = useState(false);
  const [isShowRequestPopup, setIsShowRequestPopup] = useState(false);
  const [isShowProfilePreview, setIsShowProfilePreview] = useState(false);
  const [isHire, setIsHire] = useState(false);

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
          {props.hire ? (
            <>
              <div className="hire-info">
                <p className="project-completed">
                  {props.projectCompleted} Dự án Hoàn thành
                </p>
                {props.isVerrified && (
                  <i className="pi pi-verified verrified-icon" />
                )}
              </div>
              <Button
                rounded
                className="bot-button"
                label={`Thuê ${props.fullname}`}
                onClick={() => {
                  window.location.href = `/account/${props.id}/service`;
                }}
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
                label="Nhắn tin"
                onClick={() => {
                  setIsShowRequestPopup(true);
                }}
              />
            </>
          )}
        </>
      )}
    </>
  );
  return (
    <div className="user-information-card-container">
      <RequestPopup
        visible={isShowRequestPopup}
        onHide={() => {
          setIsShowRequestPopup(false);
          setIsHire(isHire);
        }}
        accountAvatar={props.avatar}
        accountName={props.fullname}
        isHire={isHire}
        onSubmit={props.messageHandler ? props.messageHandler : () => {}}
      />
      <ReportDialog
        visible={isShowReportDialog}
        setVisibility={setIsShowReportDialog}
        targetId={props.id}
        entityName="Account"
      />
      {isShowProfilePreview && (
        <Dialog
          style={{ width: "60%", height: "100vh" }}
          showHeader={false}
          contentStyle={{ borderRadius: "12px", height: "100%" }}
          visible={isShowProfilePreview}
          onHide={() => setIsShowProfilePreview(false)}
          modal={true}
          dismissableMask={true}
        >
          <ProfilePreview
            creator={props}
            hireCallback={() => {
              setIsShowRequestPopup(true);
              setIsHire(true);
            }}
          />
        </Dialog>
      )}
      <Card
        footer={footer ? footer : ""}
        className="user-information-card"
        onClick={props.hire ? () => setIsShowProfilePreview(true) : undefined}
        style={props.hire ? { cursor: "pointer" } : {}}
      >
        <div className="avatar-container">
          <img
            alt={`Ảnh đại diện của ${props.fullname}`}
            src={props.avatar ? props.avatar : defaultAvatar}
            className="avatar-image"
          />
        </div>
        <div className="information-container">
          <h1 className="m-1">{props.fullname}</h1>
          <h3 className="m-0">{props.email}</h3>
        </div>
      </Card>
      {props.hire ? (
        <></>
      ) : props.bio ? (
        <div className="bio-container w-full pl-4 pr-4">
          <h3>Về tôi</h3>
          <p className="text-justify">{props.bio}</p>
        </div>
      ) : (
        <></>
      )}

      {props.profileView &&
      props.artworksView &&
      props.followerNum &&
      props.followingNum ? (
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

      {props.hire ? (
        <></>
      ) : (
        !props.isCreator && (
          <div
            className="w-full mt-5 grid"
            style={{
              height: "fit-content",
              padding: "10px 10px",
              cursor: "pointer",
            }}
          >
            <div
              className="col-6 text-right"
              style={{
                height: "fit-content",
                borderRight: "1px solid grey",
                padding: "0 5px",
              }}
              onClick={() => setIsShowReportDialog(true)}
            >
              Báo cáo
            </div>
            <div
              className="col-6 text-left"
              style={{
                height: "fit-content",
                borderLeft: "1px solid grey",
                padding: "0 5px",
              }}
              onClick={() => {}}
            >
              Chặn
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default UserInformationCard;

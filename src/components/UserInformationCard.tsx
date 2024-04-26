import { useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

import { useNavigate } from "react-router-dom";
import ReportDialog from "../layout/ArtworkDetailScreen/dialogs/ReportDialog";
import RequestPopup, { RequestProps } from "./RequestPopup";
import "./UserInformationCard.scss";

const defaultAvatar = require("../assets/defaultImage/default-avatar.png");

export type UserInformationProps = {
  id: string;
  fullname: string;
  avatar: string;
  email: string;
  username: string;
  isFollowed: boolean;
  job?: string;
  address?: string;
  isCreator?: boolean;
  role?: string;
  bio?: string;
  profileView?: number;
  artworksView?: number;
  followerNum?: number;
  followingNum?: number;
  isVerrified?: boolean;
  projectCompleted?: number;
  hire?: boolean;
  isLogin: boolean;
  followHandler?: () => void;
  unfollowHandler?: () => void;
  messageHandler?: (request: RequestProps) => void;
  editHandler?: () => void;
  privacyEditHandler?: () => void;
};

const UserInformationCard: React.FC<UserInformationProps> = (props: UserInformationProps) => {
  const navigate = useNavigate();
  let [isShowReportDialog, setIsShowReportDialog] = useState(false);
  const [isShowRequestPopup, setIsShowRequestPopup] = useState(false);
  const [isHire, setIsHire] = useState(false);

  let footer = (
    <>
      {!props.hire && props.bio && (
        <div className="bio-container w-full pt-2 pl-4 pr-4" style={{ borderTop: "1px solid #CCCBC8" }}>
          <h3>Về tôi</h3>
          <p className="text-justify">{props.bio}</p>
        </div>
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
      <Card footer={footer ? footer : undefined} className="user-information-card">
        <div className="avatar-container">
          <img
            alt={`Ảnh đại diện của ${props.fullname}`}
            src={props.avatar ? props.avatar : defaultAvatar}
            className="avatar-image"
          />
        </div>
        <div className="information-container">
          <h1 className="m-0 mb-3">{props.fullname}</h1>
          <h3 className="m-0">{props.email}</h3>
        </div>
        {props.isLogin ? (
          <>
            {!props.hire && (
            <div className="w-full h-fit flex flex-row justify-content-center mt-2">
              <p className="h-fit m-0">
                <strong>{props.followerNum}</strong> người theo dõi
              </p>
              <Divider layout="vertical" className="h-full p-0" />
              <p className="h-fit m-0">
                <strong>{props.followingNum}</strong> đang theo dõi
              </p>
            </div>
            )}
            <div className="action-section">
              {props.isCreator ? (
                <Button rounded className="top-button" label="Chỉnh sửa thông tin" onClick={props.editHandler} />
              ) : (
                <>
                  {props.hire ? (
                    <>
                      <div className="hire-info">
                        <p className="project-completed">{props.projectCompleted} Dự án Hoàn thành</p>
                        {props.isVerrified && <i className="pi pi-verified verrified-icon" />}
                      </div>
                      <Button
                        rounded
                        className="bot-button"
                        label={`Thuê ${props.fullname}`}
                        onClick={() => {
                          navigate(`/account/${props.id}/service`);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      {props.isFollowed ? (
                        <Button rounded className="top-button" label="Hủy theo dõi" onClick={props.unfollowHandler} />
                      ) : (
                        <Button rounded className="top-button" label="Theo dõi" onClick={props.followHandler} />
                      )}

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
            </div>
          </>
        ) : (
          props.hire && (
            <Button
              rounded
              className="mt-4"
              label="Đăng nhập để thuê"
              onClick={() => {
                navigate("/login");
              }}
            />
          )
        )}
      </Card>
    </div>
  );
};

export default UserInformationCard;

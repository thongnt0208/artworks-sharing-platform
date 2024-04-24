import { Button } from "primereact/button";
import "./SquareButton.scss";
import { Avatar } from "primereact/avatar";
import { ToggleButton } from "primereact/togglebutton";
import { ArtworkDetailType } from "../ArtworkDetailType";
import { Tooltip } from "primereact/tooltip";
import ProfilePreview from "../../../components/ProfilePreview";
import { UserInformationProps } from "../../../components/UserInformationCard";
import { ProgressSpinner } from "primereact/progressspinner";

type Props = {
  id?: string;
  title: string;
  thumbnailImg?: string;
  thumbnailAlt?: string;
  onclick: () => void;
  isFollowed?: boolean;
  makeFollow?: () => void;
  _isLoading?: boolean;
  makeUnFollow?: () => void;
  data?: ArtworkDetailType;
};

export default function SquareButton({
  id,
  title,
  thumbnailImg,
  thumbnailAlt,
  onclick,
  isFollowed,
  makeFollow,
  _isLoading,
  makeUnFollow,
  data,
}: Props) {
  const creatorInfo = {
    id: data?.account?.id || "",
    avatar: data?.account?.avatar || "",
    fullname: data?.account?.fullname || "",
    username: data?.account?.username || "",
    email: data?.account?.email || "",
    isFollowed: isFollowed || false,
  } as UserInformationProps;

  return (
    <>
      {title !== "Theo dõi" && title !== "Trang cá nhân" && (
        <div id={id} className="square-button-container" onClick={onclick}>
          <Button rounded className="square-button-thumbnail-container">
            <img
              className="square-button-thumbnail"
              src={thumbnailImg || "https://placehold.in/600"}
              alt={thumbnailAlt || "Hình minh hoạ cho nút bấm"}
            />
          </Button>
          <div className="square-button-title text-cus-small">{title}</div>
        </div>
      )}
      <Tooltip
        id="creator-preview-tooltip"
        target={`#creator-btn-${id}`}
        className="w-19rem"
        position="left"
      >
        <ProfilePreview creator={creatorInfo} />
      </Tooltip>
      {title === "Theo dõi" && (
        <div id={`creator-btn-${id}`} className="square-button-container avatar-btn-ctn">
          <Avatar
            image={thumbnailImg || "https://placehold.in/600"}
            size="xlarge"
            shape="circle"
            className="avatar"
            onClick={onclick}
          />
          <ToggleButton
            onLabel="Theo dõi"
            offLabel="Bỏ theo dõi"
            checked={!isFollowed}
            disabled={isFollowed === undefined || _isLoading}
            onChange={() => {
              isFollowed ? makeUnFollow?.() : makeFollow?.();
            }}
            className="follow-btn p-1"
          />
          {_isLoading && <ProgressSpinner  style={{width: '20px', height: '20px', margin: "-10px"}} strokeWidth="8"/>}
        </div>
      )}
      {title === "Trang cá nhân" && (
        <div id={id} className="square-button-container avatar-btn-ctn">
          <Avatar
            image={thumbnailImg || "https://placehold.in/600"}
            size="xlarge"
            shape="circle"
            className="avatar"
            onClick={onclick}
          />
          <div className="square-button-title text-cus-small">{title}</div>
        </div>
      )}
    </>
  );
}

import { Button } from "primereact/button";
import "./SquareButton.scss";
import { Avatar } from "primereact/avatar";
import { ToggleButton } from "primereact/togglebutton";

type Props = {
  id?: string;
  title: string;
  thumbnailImg?: string;
  thumbnailAlt?: string;
  onClick: () => void;
  isFollowed?: boolean;
  setIsFollowed?: (isFollowed: boolean) => void;
};

export default function SquareButton({
  id,
  title,
  thumbnailImg,
  thumbnailAlt,
  onClick,
  isFollowed,
  setIsFollowed,
}: Props) {
  return (
    <>
      {title !== "Theo dõi" && (
        <div id={id} className="square-button-container" onClick={onClick}>
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

      {title === "Theo dõi" && (
        <div id={id} className="square-button-container avatar-btn-ctn" onClick={onClick}>
          <Avatar
            image={thumbnailImg || "https://placehold.in/600"}
            size="xlarge"
            shape="circle"
            className="avatar"
          />
          <ToggleButton
            onLabel="Bỏ theo dõi"
            offLabel="Theo dõi"
            checked={isFollowed}
            onChange={() => {
              setIsFollowed && setIsFollowed(!isFollowed);
            }}
            className="follow-btn"
          /></div>
      )}
    </>
  );
}

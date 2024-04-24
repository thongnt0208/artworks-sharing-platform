import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dialog, Image, Tooltip } from "../..";
import SquareButton from "../buttons/SquareButton";
import { likeArtwork, unlikeArtwork } from "../Service";
import { CatchAPICallingError } from "../..";
import { ArtworkDetailType } from "../ArtworkDetailType";
import "./Content.scss";
import { Splitter } from "primereact/splitter";
import { likedIcon, likeIcon } from "../../../util/FindAssets";
import { formatTime } from "../../../util/TimeHandle";

const logo = require("../../../assets/logo/logo.png");

type ContentProps = {
  data: ArtworkDetailType;
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  currentUserId: string;
  onTagClick?: (tag: string) => void;
};

export default function Content({ data, isLiked, setIsLiked, id, currentUserId }: ContentProps) {
  const [showAllImages, setShowAllImages] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [tmpLikeCount, setTmpLikeCount] = useState(data.likeCount);
  const navigate = useNavigate();

  let likeButtonHandle = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked); // Change UI
    setTmpLikeCount((prev) => (isLiked ? prev - 1 : prev + 1)); // Change UI
    // Change in server
    let action = isLiked ? unlikeArtwork : likeArtwork;
    console.log(id, currentUserId);

    action(id ? id : "", currentUserId).catch((err) => {
      CatchAPICallingError(err, navigate);
      setIsLiked((prevIsLiked) => !prevIsLiked); // Change UI back
      setTmpLikeCount((prev) => (isLiked ? prev + 1 : prev - 1)); // Change UI back
      console.log(err);
    });
  };

  const toggleShowImages = () => {
    setShowAllImages(!showAllImages);
  };

  return (
    <>
      <Dialog
        // Notification Dialog
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        dismissableMask
        showHeader={false}
        contentStyle={{ borderRadius: "12px" }}
      >
        <div className="flex flex-column align-items-center p-4">
          <img src={logo} alt="logo" width="100px" />
          <h2>Chưa đăng nhập hoặc phiên đăng nhập đã hết hạn</h2>
          <p>Vui lòng đăng nhập lại</p>
          <Link to="/login">
            <Button>Đăng nhập</Button>
          </Link>
        </div>
      </Dialog>
      <div className="title-container pb-2">
        <h1 className="">{data.title}</h1>
      </div>
      <div
        className="artwork-images-container"
        style={{
          maxHeight: showAllImages ? "none" : "800px",
          overflow: "hidden",
        }}
      >
        {/* Display images */}
        {data.images?.map((image, index) => (
          <Image key={index} src={image?.location} alt={`Image ${index + 1}`} width="100%" />
        ))}
      </div>

      <div className="artwork-info-container">
        {/* Show more button */}
        <div className="showmore-btn-container">
          <Button onClick={toggleShowImages} className="show-more-button">
            {showAllImages ? "Thu gọn" : "Xem thêm"}
          </Button>
        </div>
        {/* Description */}
        <p>{data.description}</p>

        {/* Tags */}
        <div className="tags-aw-detail-container flex gap-3">
          {data.tagList?.map((tag: any) => (
            <Button key={tag?.id} className="tag-aw-detail-item p-2" rounded>
              <Link to={`/search?value=${tag?.tagName}`} className="tag-inline">
                #{tag?.tagName}
              </Link>
            </Button>
          ))}
        </div>

        <Splitter className="mt-3" />
        <br />
        <div className="licence-and-ai-container flex flex-column gap-0">
          {/* Licence type */}
          {data.licenseType && (
            <span className="flex gap-1 align-items-center">
              Loại giấy phép: {data.licenseType?.licenseName}
              <Tooltip target="#licence-info-ic" content={data.licenseType?.licenseDescription} />
              <i id="licence-info-ic" className="pi pi-info" />
            </span>
          )}
          {/* AI generated */}
          {data.isAIGenerated && (
            <span className="flex gap-1 align-items-center">
              Được tạo bởi công cụ Trí tuệ nhân tạo (AI)
              <Tooltip
                target="#ai-generated-ic"
                content="Tác giả đã xác nhận nội dung này được tạo ra bởi công cụ Trí tuệ nhân tạo (AI)"
              />
              <i id="ai-generated-ic" className="pi pi-info" />
            </span>
          )}
        </div>

        <div className="like-and-more-container flex flex-column align-items-center gap-1 pb-3">
          {/* Like button */}
          <div className="like-btn-container p-3 pb-0">
            <SquareButton
              id={isLiked ? "dislikeBtn" : "likeBtn"}
              title={isLiked ? "Bỏ thích" : "Thích"}
              thumbnailImg={isLiked ? likedIcon : likeIcon}
              thumbnailAlt=""
              onclick={likeButtonHandle}
            />
          </div>
          {/* LikeCount, ViewCount, CommentCount */}
          <div className="like-view-comment-count-container">
            <div className="like-count">
              <i className="pi pi-heart" />
              {tmpLikeCount}
            </div>
            <div className="view-count">
              <i className="pi pi-eye" />
              {data.viewCount}
            </div>
            <div className="comment-count">
              <i className="pi pi-comments" />
              {data.commentCount}
            </div>
          </div>
          {/* Created Date & Privacy*/}
          <div className="created-date-privacy-container">
            Đã đăng{" "}
            <span style={{ textDecoration: "underline" }}>
              {data.privacy === "Public" ? "Công khai" : "Riêng tư"}
            </span>{" "}
            lúc {formatTime(data.createdOn.toString())}
          </div>
        </div>
      </div>
    </>
  );
}

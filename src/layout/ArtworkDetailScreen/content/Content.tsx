import { Image } from "primereact/image";
import { ArtworkDetailType } from "./ArtworkDetailType";
import { Link, useNavigate } from "react-router-dom";
import "./Content.scss";
import { useState } from "react";
import { Button } from "primereact/button";
import SquareButton from "../buttons/SquareButton";
import { likeArtwork, unlikeArtwork } from "../Service";
import likeIcon from "../../../assets/icons/aw-deatail-06-like-icon.svg";
import likedIcon from "../../../assets/icons/aw-deatail-07-did-like-icon.svg";
import { Dialog } from "primereact/dialog";

const logo = require("../../../assets/logo/logo.png");

type ContentProps = {
  data: ArtworkDetailType;
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>; // Update this line
  setError: (value: any) => void;
  id: string;
  currentUserId: string;
  onTagClick?: (tag: string) => void;
};

export default function Content({
  data,
  isLiked,
  setIsLiked,
  setError,
  id,
  currentUserId,
  onTagClick,
}: ContentProps) {
  const [showAllImages, setShowAllImages] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  let likeButtonHandle = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked); // Change UI

    // Change in server
    let action = isLiked ? unlikeArtwork : likeArtwork;
    console.log(id, currentUserId);

    action(id ? id : "", currentUserId)
      .then((res) => {
        alert("Like Success");
        setError("");
      })
      .catch((err) => {
        let message = err.message || "Something went wrong";
        setError({ ...message });
        if (err.response?.status === 401) {
          setDialogVisible(true);
        }
        setIsLiked((prevIsLiked) => !prevIsLiked); // Change UI back
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
      <div className="title-container">
        <h1 className="text-cus-h1-bold">{data.title}</h1>
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
        <div className="flex gap-3">
          {data.tagDetails?.map((tag: any) => (
            <Button key={tag?.id}>
              <Link to={""} className="tag-inline">
                #{tag?.tagName}
              </Link>
            </Button>
          ))}
        </div>
        {/* Like button */}
        <div className="like-btn-container p-3">
          <SquareButton
            id={isLiked ? "dislikeBtn" : "likeBtn"}
            title={isLiked ? "Bỏ thích" : "Thích"}
            thumbnailImg={isLiked ? likedIcon : likeIcon}
            thumbnailAlt=""
            onClick={likeButtonHandle}
          />
        </div>
      </div>
    </>
  );
}

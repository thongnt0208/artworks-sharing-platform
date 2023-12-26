import { Image } from "primereact/image";
import { ArtworkDetailType } from "./ArtworkDetailType";
import { Link } from "react-router-dom";
import "./Content.scss";
import { useState } from "react";
import { Button } from "primereact/button";
import SquareButton from "../buttons/SquareButton";
import { likeArtwork, unlikeArtwork } from "../Service";
import likeIcon from "../../../assets/icons/aw-deatail-06-like-icon.svg";
import likedIcon from "../../../assets/icons/aw-deatail-07-did-like-icon.svg";

type ContentProps = {
  data: ArtworkDetailType;
  isLiked: boolean;
  setIsLiked: (value: boolean) => void;
  setError: (value: any) => void;
  id: string;
  currentUserId: string;
  onTagClick?: (tag: string) => void;
};

export default function Content({  data,  isLiked,  setIsLiked,  setError,  id,  currentUserId,  onTagClick,}: ContentProps) {
  const [showAllImages, setShowAllImages] = useState(false);

  let likeButtonHandle = () => {
    setIsLiked(!isLiked); //Change UI
    // Change in server
    let action = isLiked ? unlikeArtwork : likeArtwork;

    action(id ? id : "", currentUserId)
      .then((res) => {
        setError("");
      })
      .catch((err) => {
        let message = err.message || "Something went wrong";
        setError({ ...message });
        console.log(err);
      });
  };

  const toggleShowImages = () => {
    setShowAllImages(!showAllImages);
  };

  return (
    <>
      <div className="title-container">
        <h1 className="text-cus-h1-bold">{data.Title}</h1>
      </div>
      <div
        className="artwork-images-container"
        style={{
          maxHeight: showAllImages ? "none" : "800px",
          overflow: "hidden",
        }}
      >
        {/* Display images */}
        {data.Images.map((image, index) => (
          <Image key={index} src={image} alt={`Image ${index + 1}`} width="100%" />
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
        <p>{data.Description}</p>
        {/* Tags */}
        <div className="flex gap-3">
          {data.Tags.map((tag: any) => (
            <Button key={tag.Id}>
              <Link to={""} className="tag-inline">
                #{tag.TagName}
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

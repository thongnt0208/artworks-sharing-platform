import { Image } from "primereact/image";
import { ArtworkDetailType } from "./ArtworkDetailType";
import { Link } from "react-router-dom";
import "./Content.scss";
import { useState } from "react";
import { Button } from "primereact/button";

export default function Content(
  { ...props }: ArtworkDetailType,
  onTagClick?: (tag: string) => void
) {
  const [showAllImages, setShowAllImages] = useState(false);

  const toggleShowImages = () => {
    setShowAllImages(!showAllImages);
  };

  return (
    <>
      <div className="title-container">
        <h1 className="text-cus-h1-bold">{props.Title}</h1>
      </div>
      <div
        className="artwork-images-container"
        style={{
          maxHeight: showAllImages ? "none" : "800px",
          overflow: "hidden",
        }}
      >
        {/* Displaying images */}
        {props.Images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            width="100%"
          />
        ))}
      </div>

      <div className="artwork-info-container">
        {/* Show more button */}
        <div className="showmore-btn-container">
          <Button onClick={toggleShowImages} className="show-more-button">
            {showAllImages ? "Thu gọn" : "Xem thêm"}
          </Button>
        </div>
        <p>{props.Description}</p>
        <div className="flex gap-3">
          {props.Tags.map((tag: any) => (
            <Link key={tag.Id} to={""}>
              #{tag.TagName}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

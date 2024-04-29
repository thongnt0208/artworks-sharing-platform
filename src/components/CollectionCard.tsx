import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

import "./CollectionCard.scss";
const background = require("../assets/defaultImage/default-card-blur-image.png");

export type CollectionProps = {
  id: string;
  creatorFullName: string;
  collectionName: string;
  privacy: string;
  numberOfArtworks: number;
  accountAvatar?: string;
  thumbnail?: string;
};

const CollectionCard: React.FC<CollectionProps> = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("accountAvatar", props.accountAvatar ?? "");
    navigate(`/collection/${props.id}`);
  };
  return (
    <div className="collection-card-container">
      <Button
        id="collection-card"
        style={{
          backgroundColor: "grey",
          backgroundImage: `url(${props.thumbnail ? props.thumbnail : background.default})`,
        }}
        onClick={handleClick}
      >
        <div className="collection-card__info">
          <span className="text-cus-h3-bold">{props.collectionName}</span>
          <span className="text-cus-small">{props.numberOfArtworks} tác phẩm</span>
        </div>
      </Button>
    </div>
  );
};

export default CollectionCard;

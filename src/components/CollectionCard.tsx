import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

import "./CollectionCard.scss";
const background = require("../assets/defaultImage/default-card-blur-image.png");

type Props = {
  id: string;
  creatorFullName: string;
  collectionName: string;
  privacy: string;
  numberOfArtworks: number;
  accountAvatar: string;
}

const CollectionCard: React.FC<Props> = ({ ...props }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("accountAvatar", props.accountAvatar);
    navigate(`/collection/${props.id}`);   
  }
  return (
    <div className="collection-card-container">
      <Button
        id="collection-card"
        style={{
          backgroundImage: `url(${background})`,
        }}
        onClick={handleClick}
      >
        <span className="text-cus-h3-bold">{props.collectionName}</span>
        <span className="text-cus-small">{props.numberOfArtworks} tác phẩm</span>
      </Button>
    </div>
  );
};

export default CollectionCard;

import React from "react";
import { Button } from "primereact/button";
import "./CollectionCard.scss";

const background = require("../assets/defaultImage/default-card-blur-image.png");

interface CollectionCardProps {
  data: {
    id: string;
    // imageUrl: string;
    title: string;
    description: string;
  };
  onClick?: () => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ data }, onClick) => {
  console.log(data);
  const { id, title, description } = data;

  return (
    <Button
      id="collection-card"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <h2 style={{ margin: 0 }}>{title}</h2>
      <p>{description}</p>
    </Button>
  );
};

export default CollectionCard;

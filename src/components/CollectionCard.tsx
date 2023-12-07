import React from "react";
import { Button } from "primereact/button";

const background = require("../assets/defaultImage/default-card-blur-image.png");

interface CollectionCardProps {
  data: {
    id: number;
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
    <>
      <Button
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          width: "340.11px",
          height: "263px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h2 style={{margin: 0}}>{title}</h2>
        <p>{description}</p>
      </Button>
    </>
  );
};

export default CollectionCard;

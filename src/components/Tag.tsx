import React from "react";
import { Button } from "primereact/button";
import "./Tag.scss";

interface TagProps {
  id: string;
  tagName: string;
  color?: string;
}

const Tag: React.FC<TagProps> = ({ id, tagName, color }) => {
  const [isSelected, setIsSelected] = React.useState(false);
  const handleOnClick = () => {
    setIsSelected(!isSelected);
  };
  return (
    <Button
      className="tag"
      label={tagName}
      style={{
        backgroundColor: color || "gray",
        color: isSelected ? "red" : "white",
      }}
      onClick={handleOnClick}
    />
  );
};

export default Tag;
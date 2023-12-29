import React from "react";
import { Button } from "primereact/button";
import "./Tag.scss";
import "../const/variables.scss";

interface TagProps {
  id: string;
  tagName: string;
  color?: string;
  isCategory?: boolean;
}

const Tag: React.FC<TagProps> = ({ id, tagName, color, isCategory }) => {
  const [isSelected, setIsSelected] = React.useState(false);
  const handleOnClick = () => {
    setIsSelected(!isSelected);
  };
  return isCategory ? (
    <Button
      className="tag"
      label={tagName}
      style={{
        color: isSelected ? "#71C4EF" : "black",
        backgroundColor: "#FFFEFB",
        background: "none",
        boxShadow: "0 2px 4px rgba(25,25,25,.15)",
        fontSize: isSelected ? "19px" : "17px",
        minHeight: "50px",
        maxHeight: "50px",
      }}
      onClick={handleOnClick}
    />
  ) : (
    <Button
      className="tag"
      label={"#" + tagName}
      style={{
        backgroundColor: isSelected ? "#00668C" : color,
        fontSize: isSelected ? "19px" : "17px",
      }}
      onClick={handleOnClick}
    />
  );
};

export default Tag;

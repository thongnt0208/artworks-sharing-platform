import React from "react";
import { Button } from "primereact/button";
import "./Tag.scss";
import "../const/variables.scss";
import { Link } from "react-router-dom";

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
      // label={tagName}
      style={{
        backgroundColor: "#FFFEFB",
        background: "none",
        boxShadow: "0 2px 4px rgba(25,25,25,.15)",
      }}
      onClick={handleOnClick}
    >
      <Link
        to={`/discover/${tagName}`}
        className="link"
        style={{ color: isSelected ? "#71C4EF" : "black" }}
      >
        {tagName}
      </Link>
    </Button>
  ) : (
    <Button
      className="tag"
      // label={"#" + tagName}
      style={{
        backgroundColor: isSelected ? "#00668C" : color,
      }}
      onClick={handleOnClick}
    >
      <Link
        to={`/search/${tagName}`}
        className="link"
        // style={{ color: isSelected ? "#71C4EF" : "black" }}
      >
        #{tagName}
      </Link>
    </Button>
  );
};

export default Tag;

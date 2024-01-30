import React from "react";
import { useNavigate } from "react-router-dom";
import "./Tag.scss";
import "../const/variables.scss";

export type TagProps = {
  id: string;
  tagName: string;
  color?: string;
  isCategory?: boolean;
}

const Tag: React.FC<TagProps> = ({ id, tagName, color, isCategory }) => {
  let navigate = useNavigate();
  const [isSelected, setIsSelected] = React.useState(false);
  const handleOnClick = () => {
    setIsSelected(!isSelected);
    navigate(`/discover/${tagName}`);
  };
  return isCategory ? (
    <div
      className="tag category-tag"
      onClick={handleOnClick}
    >
      <p className="link" style={{ color: isSelected ? "#71C4EF" : "black" }}>
        {tagName}
      </p>
    </div>
  ) : (
    <div
      className="tag"
      style={{ backgroundColor: isSelected ? "#00668C" : color }}
      onClick={handleOnClick}
    >
      <p className="link">#{tagName}</p>
    </div>
  );
};

export default Tag;
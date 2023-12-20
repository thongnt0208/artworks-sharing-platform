import React from "react";
import { Button } from "primereact/button";
import "./Tag.scss";
import "../const/variables.scss";

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
        backgroundColor: isSelected? '#00668C' : color , 
        fontSize: isSelected? "19px" : "17px",
      }}
      onClick={handleOnClick}
    />
  );
};

export default Tag;
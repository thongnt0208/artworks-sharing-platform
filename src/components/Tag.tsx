import React from "react";
import { Button } from "primereact/button";
import "./Tag.scss";

interface TagProps {
  label: string;
  color?: string;
}

const Tag: React.FC<TagProps> = ({ label, color }) => {
  const [isSelected, setIsSelected] = React.useState(false);
  const handleOnClick = () => {
    setIsSelected(!isSelected);
  };
  return (
    <Button
      className="tag"
      label={label}
      style={{
        backgroundColor: color || "gray",
        color: isSelected ? "red" : "white",
      }}
      onClick={handleOnClick}
    />
  );
};

export default Tag;
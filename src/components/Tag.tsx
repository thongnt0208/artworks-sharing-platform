import React from "react";
import { Button } from "primereact/button";

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
      label={label}
      style={{
        backgroundColor: color || "gray",
        padding: "0.5rem",
        borderRadius: "0.25rem",
        color: isSelected ? "red" : "white",
      }}
      onClick={handleOnClick}
    />
  );
};

export default Tag;

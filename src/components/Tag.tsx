import React from "react";
import { Button } from "primereact/button";

interface TagProps {
  label: string;
  color?: string;
  onClick: () => void;
}

const Tag: React.FC<TagProps> = ({ label, color, onClick }) => {
  return (
    <Button
      label={label}
      style={{
        backgroundColor: color || "gray",
        padding: "0.5rem",
        borderRadius: "0.25rem",
        color: "white",
        fontWeight: "bold",
      }}
    />
  );
};

export default Tag;

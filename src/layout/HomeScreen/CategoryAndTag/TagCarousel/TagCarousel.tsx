import React from "react";
import { Carousel } from "primereact/carousel";
import Tag from "../../../../components/Tag";

type TagProps = {
  id: string;
  tagName: string;
};

type TagsProps = {
  tags: TagProps[];
};


// Generate a random color code
const getRandomColorCode = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Generate an array of random color codes
const getRandomColorCodes = (count: number): string[] => {
  const colorCodes: string[] = [];
  for (let i = 0; i < count; i++) {
    colorCodes.push(getRandomColorCode());
  }
  return colorCodes;
};

// Example usage
const randomColorCodes = getRandomColorCodes(3);
console.log(randomColorCodes); // Output: e.g. ["#1A2B3C", "#4D5E6F", "#7G8H9I", "#JKLMNO", "#PQRSTU"]


const TagCarousel: React.FC<TagsProps> = ({ tags }) => {

  const renderTag = (tag: TagProps) => {
    const randomColorCode = getRandomColorCode();
    return <Tag key={tag.id} id={tag.id} tagName={tag.tagName} color={randomColorCode}/>;
  };

  return (
    <div>
      <Carousel
        showIndicators={false}
        circular
        value={tags}
        numVisible={8}
        itemTemplate={renderTag} // Updated to use renderTag function directly
      />
    </div>
  );
};

export default TagCarousel;

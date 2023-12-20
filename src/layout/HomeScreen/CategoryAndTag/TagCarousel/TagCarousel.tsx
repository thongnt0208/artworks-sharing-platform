import React from "react";
import { Carousel } from "primereact/carousel";
import Tag from "../../../../components/Tag";
import { GenerateRandomColorCode } from "../../../../util/GenerateRandomColorCode";

type TagProps = {
  id: string;
  tagName: string;
};

type TagsProps = {
  tags: TagProps[];
};

const TagCarousel: React.FC<TagsProps> = ({ tags }) => {

  const renderTag = (tag: TagProps) => {
    const randomColorCode = GenerateRandomColorCode();
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
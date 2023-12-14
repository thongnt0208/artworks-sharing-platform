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

const TagCarousel: React.FC<TagsProps> = ({ tags }) => {
  // const renderTag = (tag: TagProps) => {
  //   return <Tag key={tag.id} id={tag.id} tagName={tag.tagName} />;
  // };

  return (
    <div>
      {/* <Carousel
        showIndicators={false}
        circular
        value={tags}
        numVisible={8}
        itemTemplate={renderTag} // Updated to use renderTag function directly
      /> */}
    </div>
  );
};

export default TagCarousel;

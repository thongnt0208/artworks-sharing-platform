import React from "react";
import { Carousel } from "primereact/carousel";
import Tag from "../../../../components/Tag";

interface TagCarouselProps {
  tags: string[];
}

const TagCarousel: React.FC<TagCarouselProps> = ({ tags }) => {
  const Item = (label: string) => {
    return <Tag label={label} />;
  };
  return (
    <div>
      <Carousel
        showIndicators={false}
        circular
        value={tags}
        numVisible={8}
        itemTemplate={Item}
      />
    </div>
  );
};
export default TagCarousel;
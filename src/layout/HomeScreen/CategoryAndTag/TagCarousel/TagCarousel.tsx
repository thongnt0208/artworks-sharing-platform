import React from "react";
import Tag from "../../../../components/Tag";
import { GenerateRandomColorCode } from "../../../../util/TagColorHandler";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "./TagCarousel.scss";

// import required modules
import { Mousewheel } from "swiper/modules";

type TagProps = {
  id: string;
  tagName: string;
};

type TagsProps = {
  tags: TagProps[];
};

const TagCarousel: React.FC<TagsProps> = ({ tags }) => {
  const productTemplate = (tag: TagProps) => {
    const randomColorCode = GenerateRandomColorCode();
    return (
      <Tag
        key={tag.id}
        id={tag.id}
        tagName={tag.tagName}
        color={randomColorCode}
      />
    );
  };

  return (
    <>
      <div className="tag-carousel">
        <Swiper
          direction="horizontal"
          slidesPerView={10}
          mousewheel={true}
          modules={[Mousewheel]}
          effect={"fade"}
        >
          {tags.map((tag) => (
            <SwiperSlide key={tag.id}>{productTemplate(tag)}</SwiperSlide>
          ))}
        </Swiper>
        <div className="style-section-right" />
        <div className="style-section-left" />
      </div>
    </>
  );
};

export default TagCarousel;

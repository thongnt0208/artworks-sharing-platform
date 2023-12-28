import React, { useRef, useEffect } from "react";
import Tag from "../../../../components/Tag";
import { GenerateRandomColorCode } from "../../../../util/GenerateRandomColorCode";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./TagCarousel.scss";

// import required modules
import { Navigation } from "swiper/modules";

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
      <Swiper
        slidesPerView={5}
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {tags.map((tag) => (
          <SwiperSlide key={tag.id}>{productTemplate(tag)}</SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TagCarousel;

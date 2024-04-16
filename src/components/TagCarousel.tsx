import React from "react";
import Tag from "./Tag";
import { GenerateRandomColorCode } from "../util/TagColorHandler";

type TagProps = {
  id: string;
  tagName: string;
};

type TagsProps = {
  tags: TagProps[];
  slidesPerView: number;
};

const TagCarousel: React.FC<TagsProps> = ({ tags }) => {
  const productTemplate = (tag: TagProps) => {
    const randomColorCode = GenerateRandomColorCode();
    return <Tag key={tag.id} id={tag.id} tagName={tag.tagName} color={randomColorCode} />;
  };

  return <div className="tag-carousel flex">{tags.map((tag) => productTemplate(tag))}</div>;
};

export default TagCarousel;

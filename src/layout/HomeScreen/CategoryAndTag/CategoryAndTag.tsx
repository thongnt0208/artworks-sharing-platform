import React from "react";
import CategoryMenu from "./CategoryCarousel/CategoryCarousel";
import TagCarousel from "../../../components/TagCarousel";
import "./CategoryAndTag.scss";

type TagProps = {
  id: string;
  tagName: string;
};

type CategoryProps = {
  id: string;
  categoryName: string;
};

type CategoryAndTagProps = {
  tags: TagProps[];
  categories: CategoryProps[];
};

const CategoryAndTag: React.FC<CategoryAndTagProps> = ({
  tags,
  categories,
}) => {
  return (
    <div className="category-and-tag grid flex mt-2 mb-4 w-full">
      <div className="category-carousel-section col-4 p-0">
        <CategoryMenu categories={categories} />
      </div>
      <div className="tag-carousel-section col-8 p-0">
        <TagCarousel tags={tags} slidesPerView={9}/>
      </div>
    </div>
  );
};

export default CategoryAndTag;
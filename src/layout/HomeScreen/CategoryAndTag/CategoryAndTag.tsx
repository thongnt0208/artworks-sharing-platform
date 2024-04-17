import React from "react";
import TagCarousel from "../../../components/TagCarousel";
import "./CategoryAndTag.scss";
import CategoryCarousel from "./CategoryCarousel/CategoryCarousel";

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

const CategoryAndTag: React.FC<CategoryAndTagProps> = ({ tags, categories }) => {
  return (
    <div className="category-and-tag grid flex mt-2 mb-4 w-full">
      {categories.length === 0 && (
        <div className="category-carousel-section col-12 p-0">
          <TagCarousel tags={tags} slidesPerView={9} />
        </div>
      )}
      {tags.length === 0 && (
        <div className="tag-carousel-section col-12 p-0">
          <CategoryCarousel categories={categories} />
        </div>
      )}
      {categories.length > 0 && tags.length > 0 && (
        <>
          <div className="category-carousel-section col-4 p-0">
            <CategoryCarousel categories={categories} />
          </div>
          <div className="tag-carousel-section col-8 p-0">
            <TagCarousel tags={tags} slidesPerView={9} />
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryAndTag;

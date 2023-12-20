import React from "react";
import CategoryMenu from "./CategoryMenu/CategoryMenu";
import TagCarousel from "./TagCarousel/TagCarousel";
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
    <div className="category-and-tag">
      <div className="category-menu">
        <CategoryMenu categories={categories} />
      </div>
      <div className="tag-carousel">
        <TagCarousel tags={tags} />
      </div>
    </div>
  );
};

export default CategoryAndTag;

import React from "react";
import CategoryMenu from "./CategoryMenu/CategoryMenu";
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
    <div className="category-and-tag grid flex align-items-center mt-2 w-full">
      <div className="category-menu-section col-4 flex align-items-center p-0">
        <CategoryMenu categories={categories} />
      </div>
      <div className="tag-carousel-section col-8 p-0">
        <TagCarousel tags={tags} slidesPerView={9}/>
      </div>
    </div>
  );
};

export default CategoryAndTag;
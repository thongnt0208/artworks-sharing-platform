import React from "react";
import CategoryMenu from "./CategoryMenu/CategoryMenu";
import TagCarousel from "./TagCarousel/TagCarousel";

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
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "30%" }}>
        <CategoryMenu
          categories={categories}
        />
      </div>
      <div style={{ width: "70%" }}>
        <TagCarousel
          tags={tags}
        />
      </div>
    </div>
  );
};

export default CategoryAndTag;
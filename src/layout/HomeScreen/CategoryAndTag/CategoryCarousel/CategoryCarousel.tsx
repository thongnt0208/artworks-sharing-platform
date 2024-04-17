import React from "react";
import Tag from "../../../../components/Tag";

type CategoryProps = {
  id: string;
  categoryName: string;
};

type CategoriesProps = {
  categories: CategoryProps[];
};

const CategoryCarousel: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <div className="category-carousel flex">
      {categories.map((category) => {
        return (
          <Tag
            key={category.id}
            id={category.id}
            tagName={category.categoryName}
            isCategory={true}
          />
        );
      })}
    </div>
  );
};

export default CategoryCarousel;

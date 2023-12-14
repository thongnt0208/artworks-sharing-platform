import React from "react";
import Tag from "../../../../components/Tag";

type CategoryProps = {
  id: string;
  categoryName: string;
};

type CategoriesProps = {
  categories: CategoryProps[];
};

const CategoryMenu: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <div>
      {/* <span>
        {categories.map((category) => {
          return <Tag id={category.id} tagName={category.categoryName} />;
        })}
      </span> */}
    </div>
  );
};

export default CategoryMenu;

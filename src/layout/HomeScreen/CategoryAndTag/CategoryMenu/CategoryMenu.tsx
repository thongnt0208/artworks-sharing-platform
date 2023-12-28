import React from "react";
import Tag from "../../../../components/Tag";
import "./CategoryMenu.scss"
import { GenerateRandomColorCode } from "../../../../util/GenerateRandomColorCode";

type CategoryProps = {
  id: string;
  categoryName: string;
};

type CategoriesProps = {
  categories: CategoryProps[];
};

const CategoryMenu: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <div className="category-menu">
        {categories.map((category) => {
          return <Tag id={category.id} tagName={category.categoryName} isCategory={true}/>;
        })}
    </div>
  );
};

export default CategoryMenu;
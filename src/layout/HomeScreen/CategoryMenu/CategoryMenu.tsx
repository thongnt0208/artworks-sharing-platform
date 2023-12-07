import React from "react";
import Tag from "../../../components/Tag";

interface CategoryMenuProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  let isSelected = false;

  return (
    <div>
      <span>
        {categories.map((category) => (
          <Tag label={category} />
        ))}
      </span>
    </div>
  );
};

export default CategoryMenu;
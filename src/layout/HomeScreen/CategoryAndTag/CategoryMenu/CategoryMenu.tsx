import React from "react";
import Tag from "../../../../components/Tag";
import "./CategoryMenu.scss"

type CategoryProps = {
  id: string;
  categoryName: string;
};

type CategoriesProps = {
  categories: CategoryProps[];
};

// Generate a random color code
const getRandomColorCode = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Generate an array of random color codes
const getRandomColorCodes = (count: number): string[] => {
  const colorCodes: string[] = [];
  for (let i = 0; i < count; i++) {
    colorCodes.push(getRandomColorCode());
  }
  return colorCodes;
};

// Example usage
const randomColorCodes = getRandomColorCodes(3);
console.log(randomColorCodes); // Output: e.g. ["#1A2B3C", "#4D5E6F", "#7G8H9I", "#JKLMNO", "#PQRSTU"]

const CategoryMenu: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <div className="category-menu">
        {categories.map((category) => {
          const randomColorCode = getRandomColorCode();
          return <Tag id={category.id} tagName={category.categoryName} color={randomColorCode} />;
        })}
    </div>
  );
};

export default CategoryMenu;

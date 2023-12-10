import React from "react";
import CategoryMenu from "./CategoryMenu/CategoryMenu";
import TagCarousel from "./TagCarousel/TagCarousel";

const CategoryAndTag: React.FC = () => {
  
  //Sample Props for TagCarousel
  let tagSampleProps = [
    "Hình minh họa",
    "Truyện tranh",
    "Tiểu thuyết",
    "Hình minh họa",
    "Truyện tranh",
    "Tiểu thuyết",
    "Hình minh họa",
    "Truyện tranh",
    "Tiểu thuyết",
  ];

  //Sample Props for Categories
  let categoriesSampleProps = [
    "Hình minh họa",
    "Truyện tranh",
    "Tiểu thuyết",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "30%" }}>
        <CategoryMenu
          categories={categoriesSampleProps}
          onCategorySelect={(category) => console.log(category)}
        />
      </div>
      <div style={{ width: "70%" }}>
        <TagCarousel
          tags={tagSampleProps}
        />
      </div>
    </div>
  );
};

export default CategoryAndTag;

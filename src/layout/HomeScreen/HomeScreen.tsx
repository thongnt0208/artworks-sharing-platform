import React from "react";
import CategoryMenu from "./CategoryMenu/CategoryMenu";
import TagCarousel from "./TagCarousel/TagCarousel";
import MenuTab from "./MenuTab/MenuTab";

const HomeScreen: React.FC = () => {
  const collectionData = {
    id: 1,
    title: "Collection 1",
    description: "Collection 1 description",
  };

  const serviceData = {
    id: 1,
    serviceName: "Service 1",
    startingPrice: 1000,
    deliveryTime: 1,
    numberOfConcepts: 1,
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "30%" }}>
          <CategoryMenu
            categories={["Hình minh họa", "Truyện tranh", "Tiểu thuyết"]}
            selectedCategory="Hình minh họa"
            onCategorySelect={(category) => console.log(category)}
          />
        </div>
        <div style={{ width: "70%" }}>
          <TagCarousel
            tags={[
              "Hình minh họa",
              "Truyện tranh",
              "Tiểu thuyết",
              "Hình minh họa",
              "Truyện tranh",
              "Tiểu thuyết",
              "Hình minh họa",
              "Truyện tranh",
              "Tiểu thuyết",
            ]}
          />
        </div>
      </div>
      <MenuTab />
    </>
  );
};

export default HomeScreen;
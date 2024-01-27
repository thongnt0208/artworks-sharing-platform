import React from "react";
import Tag from "../../../../components/Tag";
import "./CategoryMenu.scss";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// import required modules
import { Mousewheel } from "swiper/modules";

type CategoryProps = {
  id: string;
  categoryName: string;
};

type CategoriesProps = {
  categories: CategoryProps[];
};

const CategoryMenu: React.FC<CategoriesProps> = ({ categories }) => {
  const productTemplate = (category: CategoryProps) => {
    return (
      <Tag
        key={category.id}
        id={category.id}
        tagName={category.categoryName}
        isCategory={true}
      />
    );
  };

  return (
    <>
      <div className="category-menu">
        <Swiper
          direction="horizontal"
          slidesPerView={4}
          mousewheel={true}
          modules={[Mousewheel]}
          effect={"fade"}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              {productTemplate(category)}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="style-section-right" />
        <div className="style-section-left" />
      </div>
    </>
  );
};

export default CategoryMenu;

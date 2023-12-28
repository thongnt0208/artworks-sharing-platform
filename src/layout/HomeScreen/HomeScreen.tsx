import React, { useState, useEffect, useCallback } from "react";
import CategoryAndTag from "./CategoryAndTag/CategoryAndTag";
import Gallery from "./Gallery/Gallery";
import { TabMenu } from "primereact/tabmenu";
import {
  GetCategoriesData,
  GetFollowingArtworksData,
  GetNewArtworksData,
  GetTagsData,
} from "./HomeService";
import { Link } from "react-router-dom";

type TagProps = {
  id: string;
  tagName: string;
};

type CategoryProps = {
  id: string;
  categoryName: string;
};

type Artwork = {
  id: string;
  title: string;
  subTitle: string;
  images: string[];
  likeNum: number;
  viewNum: number;
};

const HomeScreen: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [tags, setTags] = useState<TagProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);

  const items = [
    { label: "Mới nhất", icon: "pi pi-fw pi-compass" },
    { label: "Theo dõi", icon: "pi pi-fw pi-users" },
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 0) {
        const [newArtworksData, tagsData, categoriesData] = await Promise.all([
          GetNewArtworksData(),
          GetTagsData(),
          GetCategoriesData(),
        ]);
        setArtworks(newArtworksData);
        setTags(tagsData);
        setCategories(categoriesData);
      } else if (activeTab === 1) {
        const followingArtworksData = await GetFollowingArtworksData();
        setArtworks(followingArtworksData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Link to="/login">Log in</Link>
      <CategoryAndTag categories={categories} tags={tags} />
      {isLogin ? (
        <TabMenu
          model={items}
          activeIndex={activeTab}
          onTabChange={(e) => setActiveTab(e.index)}
          className="w-fit m-1 text-black-alpha-10"
        />
      ) : null}

      {loading ? <p>Loading...</p> : <Gallery artworks={artworks} />}
    </>
  );
};

export default HomeScreen;

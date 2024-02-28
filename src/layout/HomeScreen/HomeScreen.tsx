import React, { useState, useEffect, useRef } from "react";
import CategoryAndTag from "./CategoryAndTag/CategoryAndTag";
import Gallery from "../../components/Gallery";
import { TabMenu } from "primereact/tabmenu";
import {
  GetCategoriesData,
  GetFollowingArtworksData,
  GetNewArtworksData,
  GetTagsData,
} from "./HomeService";
import "./HomeScreen.scss";
import { TagProps } from "../../components/Tag";
import { ArtworkProps } from "../../components/ArtworkCard";

export type CategoryProps = {
  id: string;
  categoryName: string;
};

type HomeScreenProps = {
  currentPage: number;
  hasNext: boolean; 
  hasPrevious: boolean;
  items: ArtworkProps[];
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

const HomeScreen: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [tags, setTags] = useState<TagProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [artworks, setArtworks] = useState<ArtworkProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const items = [
    { label: "Mới nhất", icon: "pi pi-fw pi-compass" },
    { label: "Theo dõi", icon: "pi pi-fw pi-users" },
  ];

  const observer = useRef<IntersectionObserver | null>(null);
  const lastArtworkRef = useRef<HTMLDivElement | null>(null);

  const loadMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let newArtworksData: HomeScreenProps;
        if (activeTab === 0) {
          newArtworksData = await GetNewArtworksData(pageNumber, pageSize);
        } else if (activeTab === 1) {
          newArtworksData = await GetFollowingArtworksData(pageNumber, pageSize);
        }

        const tagData = await GetTagsData();
        const categoriesData = await GetCategoriesData();
        setTags(tagData);
        setCategories(categoriesData);
        setArtworks((prevArtworks) => {
          const uniqueArtworkIds = new Set<string>(prevArtworks.map((artwork) => artwork.id));
          const filteredArtworks = newArtworksData.items.filter(
            (artwork: { id: string; }) => !uniqueArtworkIds.has(artwork.id)
          );
  
          return [...prevArtworks, ...filteredArtworks];
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pageNumber, activeTab]); //warning

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreData();
        }
      },
      { threshold: 0.5 } 
    );

    if (lastArtworkRef.current && observer.current) {
      observer.current.observe(lastArtworkRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const handleTabChange = (event: any) => {
    setActiveTab(event.index);
    setPageNumber(1); 
  };

  return (
    <>
      <CategoryAndTag categories={categories} tags={tags} />
      {isLogin ? (
        <TabMenu
          model={items}
          activeIndex={activeTab}
          onTabChange={handleTabChange}
          className="w-max mb-3 text-black-alpha-90 text-lg"
        />
      ) : null}
  
      <Gallery artworks={artworks} />
      {loading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}

      <div ref={lastArtworkRef}>
        {/* This is an invisible marker to observe */}
      </div>
    </>
  );
};

export default HomeScreen;

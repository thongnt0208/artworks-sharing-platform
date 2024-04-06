/* eslint-disable react-hooks/exhaustive-deps */
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
import { ProgressSpinner } from "primereact/progressspinner";
import { CatchAPICallingError } from "..";
import { useNavigate } from "react-router-dom";
import { ArtworkDetailType } from "../ArtworkDetailScreen/ArtworkDetailType";
import { fetchArtworkDetail, fetchIsFollow } from "../ArtworkDetailScreen/Service";
import { getAuthInfo } from "../../util/AuthUtil";

export type CategoryProps = {
  id: string;
  categoryName: string;
};

export type awDetailStateToolsType = {
  selectingAw: ArtworkProps;
  setSelectingAw: React.Dispatch<React.SetStateAction<ArtworkProps>>;
  currentAwDetail: ArtworkDetailType;
  setCurrentAwDetail: React.Dispatch<React.SetStateAction<ArtworkDetailType>>;
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
  isFollowed: boolean;
  setIsFollowed: React.Dispatch<React.SetStateAction<boolean>>;
};

const HomeScreen: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [tags, setTags] = useState<TagProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [artworks, setArtworks] = useState<ArtworkProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectingAw, setSelectingAw] = useState<ArtworkProps>({} as ArtworkProps); //an artwork from the artworks list state
  const [currentAwDetail, setCurrentAwDetail] = useState<ArtworkDetailType>(
    {} as ArtworkDetailType
  ); //the artwork detail of the selectingAw

  const [isLiked, setIsLiked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  const navigate = useNavigate();
  const pageSize = 10;

  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  const awDetailStateTools: awDetailStateToolsType = {
    selectingAw,
    setSelectingAw,
    currentAwDetail,
    setCurrentAwDetail,
    isLiked,
    setIsLiked,
    isFollowed,
    setIsFollowed,
  }

  const items = [
    { label: "Mới nhất", icon: "pi pi-fw pi-compass" },
    { label: "Theo dõi", icon: "pi pi-fw pi-users" },
  ];

  const observer = useRef<IntersectionObserver | null>(null);
  const lastArtworkRef = useRef<HTMLDivElement | null>(null);

  const loadMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  // AW Detail state tools - start
  const fetchIsFollowed = (id: string) => {
    fetchIsFollow(id)
      .then((res) => setIsFollowed(res))
      .catch((err) => {
        setIsFollowed(false);
        CatchAPICallingError(err, navigate);
      });
  };

  const fetchDetail = () => {
    fetchArtworkDetail(selectingAw?.id, currentUserId)
      .then((res) => {
        setCurrentAwDetail(res);
        setIsLiked(res.isLiked);
        fetchIsFollowed(res.account.id);
      })
      .catch((err) => CatchAPICallingError(err, navigate));
  };

  // AW Detail state tools - end

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let newArtworksData: ArtworkProps[];
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
          const filteredArtworks = Array.isArray(newArtworksData)
            ? newArtworksData.filter((artwork: { id: string }) => !uniqueArtworkIds.has(artwork.id))
            : [];
          return [...prevArtworks, ...filteredArtworks];
        });
      } catch (error) {
        CatchAPICallingError(error, navigate);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pageNumber, activeTab]);

  useEffect(() => {
    setArtworks([]);
  }, [activeTab]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
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

  useEffect(()=> {
    if(selectingAw?.id) {
      fetchDetail();
    }
  }, [selectingAw])

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

      {isLoading && <ProgressSpinner />}
      {!isLoading && artworks.length === 0 && (
        <div className="text-center text-2xl">Không có dữ liệu</div>
      )}
      {artworks.length > 0 && <Gallery artworks={artworks} awDetailStateTools={awDetailStateTools} />}
      <div ref={lastArtworkRef}>{/* This is an invisible marker to observe */}</div>
    </>
  );
};

export default HomeScreen;

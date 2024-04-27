/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import CategoryAndTag from "./CategoryAndTag/CategoryAndTag";
import Gallery from "../../components/Gallery";
import { TabMenu } from "primereact/tabmenu";
import { GetCategoriesData, GetFollowingArtworksData, GetNewArtworksData, GetTagsData } from "./HomeService";
import "./HomeScreen.scss";
import { TagProps } from "../../components/Tag";
import { ArtworkProps } from "../../components/ArtworkCard";
import { ProgressSpinner } from "primereact/progressspinner";
import { CatchAPICallingError } from "..";
import { useNavigate } from "react-router-dom";
import { ArtworkDetailType } from "../ArtworkDetailScreen/ArtworkDetailType";
import { fetchArtworkDetail, fetchIsFollow } from "../ArtworkDetailScreen/Service";
import { getAuthInfo } from "../../util/AuthUtil";
import Cookies from "js-cookie";
import { cookieNames } from "../../const/uiConstants";

export type CategoryProps = {
  id: string;
  categoryName: string;
};

export type awDetailStateToolsType = {
  selectingAw: ArtworkProps;
  setSelectingAw: React.Dispatch<React.SetStateAction<ArtworkProps>>;
  isLoading?: boolean;
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
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [currentAwDetail, setCurrentAwDetail] = useState<ArtworkDetailType>({} as ArtworkDetailType);

  const [isLiked, setIsLiked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  const navigate = useNavigate();
  const pageSize = 20;

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
    isLoading: isLoadingDetail,
  };

  const items = [
    { label: "Mới nhất", icon: "pi pi-fw pi-compass" },
    { label: "Theo dõi", icon: "pi pi-fw pi-users" },
  ];

  // AW Detail state tools - start
  const fetchIsFollowed = (id: string) => {
    fetchIsFollow(id)
      .then((res) => setIsFollowed(res))
      .catch((err) => setIsFollowed(false));
  };

  const fetchDetail = () => {
    setIsLoadingDetail(true);
    setCurrentAwDetail({} as ArtworkDetailType);
    fetchArtworkDetail(selectingAw?.id, currentUserId)
      .then((res) => {
        setCurrentAwDetail(res);
        setIsLiked(res.isLiked);
        fetchIsFollowed(res.account.id);
      })
      .catch((err) => CatchAPICallingError(err, navigate))
      .finally(() => setIsLoadingDetail(false));
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
    if (selectingAw?.id) {
      let _tmpCookies = JSON.parse(Cookies.get(cookieNames.interactedArtworks) || "[]") as [{ id: string }];
      console.log(_tmpCookies);

      Cookies.set(cookieNames.interactedArtworks, JSON.stringify([..._tmpCookies, { id: selectingAw.id }]));
      fetchDetail();
    }
  }, [selectingAw]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTabChange = (event: any) => {
    setActiveTab(event.index);
    setArtworks([]);
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
      {!isLoading && artworks.length === 0 && <div className="text-center text-2xl">Không có dữ liệu</div>}
      {artworks.length > 0 && <Gallery artworks={artworks} awDetailStateTools={awDetailStateTools} />}
    </>
  );
};

export default HomeScreen;

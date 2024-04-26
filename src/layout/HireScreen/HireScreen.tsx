import React, { useState, useRef, useEffect } from "react";
import { GetCreatorsData } from "./HireService";
import { GetTagsData } from "../HomeScreen/HomeService";
import { UserInformationProps } from "../../components/UserInformationCard";

import BannerView from "./BannerView/BannerView";
import FilterView from "./FilterView/FilterView";
import CreatorsView from "./CreatorsView/CreatorsView";

type TagProps = {
  id: string;
  tagName: string;
};

const HireScreen: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const [tags, setTags] = React.useState<TagProps[]>([]);
  const [creators, setCreators] = React.useState<UserInformationProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 4;

  const observer = useRef<IntersectionObserver | null>(null);
  const lastArtworkRef = useRef<HTMLDivElement | null>(null);

  //Fetch Tags & Categories 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagsData = await GetTagsData();
        setTags(tagsData);
      } catch (error) {
        console.log("Error fetching tags data:", error);
      }
    };
    fetchData();
  }, []);

  //Fetch Creators
  useEffect(() => {
    const fetchData = async () => {
      try {
        const creatorsData = await GetCreatorsData(pageNumber, pageSize);
        setCreators((prevCreators) => {
          const uniqueCreatorIds = new Set<string>(
            prevCreators.map((creator) => creator.id)
          );
          const filteredCreators = Array.isArray(creatorsData) ? creatorsData.filter(
            (artwork: { id: string }) => !uniqueCreatorIds.has(artwork.id)
          ) : [];
          return [...prevCreators, ...filteredCreators];
        });
      } catch (error) {
        console.log("Error fetching creators data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pageNumber, pageSize]);

  //Scroll handler
  const loadMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };
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

  return (
    <>
      <BannerView />
      <FilterView tags={tags} />
      {!isLoading && creators.length === 0 && (
        <div className="text-center text-2xl">Không có dữ liệu</div>
      )}
      <CreatorsView creators={creators} isLogin={isLogin} />
      <div ref={lastArtworkRef}>
        {/* This is an invisible marker to observe */}
      </div>
    </>
  );
};

export default HireScreen;

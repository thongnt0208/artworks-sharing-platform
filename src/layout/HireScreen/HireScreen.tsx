import React from "react";
import { GetCreatorsData, GetRecommendArtworksData, GetTagsData } from "./HireService";

import BannerView from "./BannerView/BannerView";
import FilterView from "./FilterView/FilterView";
import RecommendArtworkView from "./RecommendArtworkView/RecommendArtworkView";
import CreatorsView from "./CreatorsView/CreatorsView";
import { UserInformationProps } from "../../components/UserInformationCard";

type TagProps = {
  id: string;
  tagName: string;
};

type Artwork = {
  id: string;
  title: string;
  createdBy: string;
  creatorFullName: string;
  thumbnail: string;
  likeCount: number;
  viewCount: number;
};

const HireScreen: React.FC = () => {
  const [tags, setTags] = React.useState<TagProps[]>([]);
  const [artworks, setArtworks] = React.useState<Artwork[]>([]);
  const [creators, setCreators] = React.useState<UserInformationProps[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const tagsData = await GetTagsData();
      setTags(tagsData);
      const artworksData = await GetRecommendArtworksData();
      setArtworks(artworksData);
      const creatorsData = await GetCreatorsData();
      setCreators(creatorsData);
    };
    fetchData();
  }, []);

  return (
    <>
      <BannerView />
      <FilterView tags={tags} />
      <RecommendArtworkView artworks={artworks} />
      <CreatorsView creators={creators} />
    </>
  );
};

export default HireScreen;
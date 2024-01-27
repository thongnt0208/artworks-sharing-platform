import React from "react";
import Gallery from "../../../components/Gallery";

import "./RecommendArtworkView.scss";

type Artwork = {
  id: string;
  title: string;
  createdBy: string;
  creatorFullName: string;
  thumbnail: string;
  likeCount: number;
  viewCount: number;
};

type ArtworksProps = {
  artworks: Artwork[];
};

const RecommendArtworkView: React.FC<ArtworksProps> = ({ artworks }) => {
  return (
    <div className="recommend-aw-container flex flex-column flex-wrap justify-content-center align-items-start">
      <p className="title"><i className="pi pi-star text-2xl"/> Đề xuất</p>
      <Gallery artworks={artworks} />
    </div>
  );
};

export default RecommendArtworkView;
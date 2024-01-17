import React from "react";
import Gallery from "./Gallery/Gallery";

type Artwork = {
  id: string;
  title: string;
  createdBy: string;
  creatorFullName: string;
  thumbnail: string;
  likeNum: number;
  viewNum: number;
};

type ArtworksProps = {
  artworks: Artwork[];
};

const RecommendArtworkView: React.FC<ArtworksProps> = ({ artworks }) => {
  return (
    <div className="flex flex-column flex-wrap justify-content-center align-items-start">
      <h1><i className="pi pi-star text-3xl"/> Đề xuất</h1>
      <Gallery artworks={artworks} />
    </div>
  );
};

export default RecommendArtworkView;

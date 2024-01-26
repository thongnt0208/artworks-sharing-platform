import React from "react";
import ArtworkCard from "./ArtworkCard";
import "./Gallery.scss";
import { useNavigate } from "react-router-dom";

type Artwork = {
  id: string;
  title: string;
  thumbnail: string;
  viewCount: number;
  likeCount: number;

  createdBy: string;
  creatorFullName: string;
};

type ArtworksProps = {
  artworks: Artwork[];
};

const Gallery: React.FC<ArtworksProps> = ({ artworks }) => {
  const navigate = useNavigate();
  return (
    <div className="gallery w-full p-0 flex flex-wrap justify-content-center">
      {artworks
        .map((artwork) => (
          <div className="gallery__item flex flex-row flex-wrap justify-content-center" key={artwork.id}>
            <ArtworkCard
              key={artwork.id}
              id={artwork.id}
              title={artwork.title}
              createdBy={artwork.createdBy}
              creatorFullName={artwork.creatorFullName}
              thumbnail={artwork.thumbnail}
              likeCount={artwork.likeCount}
              viewCount={artwork.viewCount}
              viewHandler={() => navigate(`/artwork/${artwork.id}`)}
            />
          </div>
        ))}
    </div>
  );
};

export default Gallery;
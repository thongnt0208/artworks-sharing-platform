import React from "react";
import ArtworkCard from "../../../components/ArtworkCard";
import "./Gallery.scss";
import { useNavigate } from "react-router-dom";

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

const Gallery: React.FC<ArtworksProps> = ({ artworks }) => {
  const navigate = useNavigate();
  console.log(artworks);
  return (
    <div className="gallery grid p-0 flex justify-content-start">
      {artworks
        .map((artwork) => (
          <div className="gallery__item col col-3 flex flex-row flex-wrap justify-content-center" key={artwork.id}>
            <ArtworkCard
              key={artwork.id}
              id={artwork.id}
              title={artwork.title}
              createdBy={artwork.createdBy}
              creatorFullName={artwork.creatorFullName}
              thumbnail={artwork.thumbnail}
              likeNum={artwork.likeNum}
              viewNum={artwork.viewNum}
              viewHandler={() => navigate(`/artwork/${artwork.id}`)}
            />
          </div>
        ))}
    </div>
  );
};

export default Gallery;

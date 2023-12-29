import React from "react";
import ArtworkCard from "../../../components/ArtworkCard";
import "./Gallery.scss";
import { useNavigate } from "react-router-dom";

type Artwork = {
  id: string;
  title: string;
  subTitle: string;
  images: string[];
  likeNum: number;
  viewNum: number;
};

type ArtworksProps = {
  artworks: Artwork[];
};

const Gallery: React.FC<ArtworksProps> = ({ artworks }) => {
  const navigate = useNavigate();

  return (
    <div className="gallery">
      {artworks
        .filter((artwork) => artwork.images && artwork.images.length > 0) // Filter out artworks with empty or undefined images array
        .map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            id={artwork.id}
            title={artwork.title}
            subTitle={artwork.subTitle}
            image={artwork.images[0]}
            likeNum={artwork.likeNum}
            viewNum={artwork.viewNum}
            viewHandler={() => navigate(`/artwork/${artwork.id}`)}
          />
        ))}
    </div>
  );
};

export default Gallery;

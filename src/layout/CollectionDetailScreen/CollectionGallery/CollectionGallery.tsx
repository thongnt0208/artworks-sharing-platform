import React from "react";
import ArtworkCard from "../../../components/ArtworkCard";
import "./CollectionGallery.scss";
import { useNavigate } from "react-router-dom";

type Artwork = {
  artwork: {
    id: string;
    title: string;
    createdBy: {
      id: string;
      username: string;
      avatar: string;
    };
    creatorFullName: string;
    thumbnail: string;
    likeNum: number;
    viewNum: number;
  }
};

type ArtworksProps = {
  artworks: Artwork[];
};

const Gallery: React.FC<ArtworksProps> = ({ artworks }) => {
  const navigate = useNavigate();

  return (
    <div className="collection-gallery">
      <p className="title">Các tác phẩm</p>
      <div className="gallery">
        {artworks.map((artwork) => (
          <ArtworkCard
            id={artwork.artwork.id}
            title={artwork.artwork.title}
            thumbnail={artwork.artwork.thumbnail}
            viewCount={artwork.artwork.viewNum}
            likeCount={artwork.artwork.likeNum}
            createdBy={artwork.artwork.createdBy?.id}
            creatorFullName={artwork.artwork.creatorFullName}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;

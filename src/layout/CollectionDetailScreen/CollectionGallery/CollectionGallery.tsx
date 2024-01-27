import React from "react";
import ArtworkCard from "../../../components/ArtworkCard";
import "./CollectionGallery.scss";
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
    <div className="collection-gallery">
      <p className="title">Các tác phẩm</p>
      <div className="gallery">
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            id={artwork.id}
            title={artwork.title}
            createdBy={artwork.createdBy}
            creatorFullName={artwork.creatorFullName}
            thumbnail={artwork.thumbnail}
            likeCount={artwork.likeNum}
            viewCount={artwork.viewNum}
            viewHandler={() => navigate(`/artwork/${artwork.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;

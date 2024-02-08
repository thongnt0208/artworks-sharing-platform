import React from "react";
import "./CollectionGallery.scss";
import ArtworkCard from "../../../components/ArtworkCard";

type Artwork = {
    id: string;
    title: string;
    thumbnail: string;
    viewCount: number;
    likeCount: number;
    createdBy: string;
    creatorFullName: string;
};

type ArtworkProps = {
  artworks: Artwork[];
};

const CollectionGallery: React.FC<ArtworkProps> = ({ artworks }) => {
  console.log(artworks);
  return (
    <div className="collection-gallery">
      <p className="title">Các tác phẩm</p>
      <div className="gallery">
        {artworks.map((artwork) => (
          <ArtworkCard
            id={artwork.id}
            title={artwork.title}
            thumbnail={artwork.thumbnail}
            viewCount={artwork.viewCount}
            likeCount={artwork.likeCount}
            createdBy={artwork.createdBy}
            creatorFullName={artwork.creatorFullName}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionGallery;

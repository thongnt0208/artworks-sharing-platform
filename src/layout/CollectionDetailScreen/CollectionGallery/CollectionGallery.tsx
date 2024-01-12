import React from "react";
import ArtworkCard from "../../../components/ArtworkCard";
import "./CollectionGallery.scss";

interface ArtworksProps {
  id: string;
  title: string;
  createdBy: string;
  creatorFullName: string;
  thumbnail: string;
  likeNum: number;
  viewNum: number;
}

const CollectionGallery: React.FC<{ artworks: ArtworksProps[] }> = ({
  artworks,
}) => {
  return (
    <div className="collection-gallery">
      <h1>Collection 1</h1>
      <div className="gallery">
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            id={artwork.id}
            title={artwork.title}
            createdBy={artwork.createdBy}
            creatorFullName={artwork.creatorFullName}
            thumbnail={artwork.thumbnail}
            likeNum={10}
            viewNum={12}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionGallery;

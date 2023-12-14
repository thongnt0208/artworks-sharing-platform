import React from "react";
import ArtworkCard from "../../../../components/ArtworkCard";

interface ArtworksProps {
  id: string;
  title: string;
  subTitle: string;
  imageUrl: string;
  likeNum: number;
  viewNum: number;
}

const ArtworkSection: React.FC<{ artworks: ArtworksProps[] }> = ({
  artworks,
}) => {
  return (
    <div className="artwork-section">
      <h2>Các tác phẩm</h2>
      <div className="flex flex-col gap-4">
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            id={artwork.id}
            title={artwork.title}
            subTitle={artwork.subTitle}
            image={artwork.imageUrl}
            likeNum={artwork.likeNum}
            viewNum={artwork.viewNum}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtworkSection;

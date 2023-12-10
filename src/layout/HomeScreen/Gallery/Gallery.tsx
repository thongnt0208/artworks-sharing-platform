import React from 'react';
import ArtworkCard from '../../../components/ArtworkCard';
import "./Gallery.scss"

interface ArtworksProps {
  id: string,
  title: string,
  subTitle: string,
  imageUrl: string,
  likeNum: number,
  viewNum: number,
}

const Gallery: React.FC<{ artworks: ArtworksProps[] }> = ({ artworks }) => {
  return (
    <div className="gallery">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} id={artwork.id} title={artwork.title} subTitle={artwork.subTitle} image={artwork.imageUrl} likeNum={10} viewNum={12}  />
))}
    </div>
  );
};

export default Gallery;
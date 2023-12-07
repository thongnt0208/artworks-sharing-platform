import React from 'react';
import ArtworkCard from '../../../components/ArtworkCard';

const Gallery: React.FC = () => {
  const artworks = [
    { id: 1, title: 'Artwork 1', imageUrl: 'https://example.com/artwork1.jpg' },
    { id: 2, title: 'Artwork 2', imageUrl: 'https://example.com/artwork2.jpg' },
    { id: 3, title: 'Artwork 3', imageUrl: 'https://example.com/artwork3.jpg' },
  ];

  return (
    <div className="gallery">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id}  />
      ))}
    </div>
  );
};

export default Gallery;
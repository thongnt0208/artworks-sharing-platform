import React from "react";
import ArtworkCard from "../../../../components/ArtworkCard";
import "./Gallery.scss";
import { Link, useNavigate } from "react-router-dom";

interface ArtworksProps {
  id: string;
  title: string;
  subTitle: string;
  image: string;
  likeNum: number;
  viewNum: number;
}

const Gallery: React.FC<{ artworks: ArtworksProps[] }> = ({ artworks }) => {
  console.log("Artworks: " + artworks);
  let navigate = useNavigate();
  return (
    <div className="gallery">
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
          id={artwork.id}
          title={artwork.title}
          subTitle={artwork.subTitle}
          image={artwork.image}
          likeNum={10}
          viewNum={12}
          // viewHandler={() => navigate("/artwork/" + artwork.id)}
          viewHandler={() => navigate("/artwork/e0b1bb5b-4616-4815-90ac-b2fdeb754221")} //only for testing
        />
      ))}
    </div>
  );
};

export default Gallery;

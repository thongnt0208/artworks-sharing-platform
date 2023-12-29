import React from "react";
import "./ArtworkScreen.scss";
import ArtworkCard from "../../../components/ArtworkCard";
import { GetArtworksData } from "./ArtworkService";

type ArtworksProps = {
  id: string;
  title: string;
  subTitle: string;
  image: string;
  likeNum: number;
  viewNum: number;
};

const ArtworkManagement: React.FC = () => {
  const [artworks, setArtworks] = React.useState<ArtworksProps[]>([]);
  React.useEffect(() => {
    const fetchArtworks = async () => {
      const response = await GetArtworksData();
      setArtworks(response);
    };
    fetchArtworks();
  }, []);
  return (
    <>
      <h1>Các tác phẩm</h1>
      <div className="gallery grid">
        {artworks.map((artwork) => (
          <div className="gallery__item col col-6" key={artwork.id}>
            <ArtworkCard
              key={artwork.id}
              id={artwork.id}
              title={artwork.title}
              subTitle={artwork.subTitle}
              image={artwork.image}
              likeNum={10}
              viewNum={12}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ArtworkManagement;

import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";

import { GetArtworksData } from "./ArtworkService";
import "./ArtworkScreen.scss";
import ArtworkCard from "../../../components/ArtworkCard";

type ArtworksProps = {
  id: string;
  title: string;
  subTitle: string;
  image: string;
  likeNum: number;
  viewNum: number;
};

const ArtworkManagement: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  let navigate = useNavigate();
  const [artworks, setArtworks] = React.useState<ArtworksProps[]>([]);
  React.useEffect(() => {
    const fetchArtworks = async () => {
      const response = await GetArtworksData();
      if (Array.isArray(response)) {
        setArtworks(response);
      } else {
        console.error("Response is not an array:", response);
      }
    };
    fetchArtworks();
  }, []);
  return (
    <>
      <h1>Các tác phẩm</h1>
      <div className="gallery grid">
        {artworks.length === 0 ? (
          isLogin ? (
            <Card className="add-artwork-card cursor-pointer flex flex-column justify-content-center align-items-center">
              <i className="pi pi-plus-circle icon m-3" />
              <Button
                label="Tạo tác phẩm"
                onClick={() => {
                  navigate("/postAw");
                }}
              ></Button>
            </Card>
          ) : (
            <div> Tác giả chưa có tác phẩm nào </div>
          )
        ) : (
          artworks.map((artwork) => (
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
          ))
        )}
      </div>
    </>
  );
};

export default ArtworkManagement;

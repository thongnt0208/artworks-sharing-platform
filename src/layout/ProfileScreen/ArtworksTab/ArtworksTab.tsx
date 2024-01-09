import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import { useOutletContext } from "react-router-dom";

import { GetArtworksData } from "./ArtworksService";
import "./ArtworksTab.scss";
import ArtworkCard from "../../../components/ArtworkCard";

type ArtworksProps = {
  id: string;
  title: string;
  creator: string;
  images: string[];
  likeNum: number;
  viewNum: number;
};

const ArtworkManagement: React.FC = () => {
  let navigate = useNavigate();
  let [accountId, isCreator] = useOutletContext() as [string, boolean];
  console.log("User information: " , accountId, isCreator);

  const [artworks, setArtworks] = React.useState<ArtworksProps[]>([]);
  React.useEffect(() => {
    const fetchArtworks = async () => {
      const response = await GetArtworksData(accountId);
      if (Array.isArray(response)) {
        setArtworks(response);
      } else {
        console.error("Response is not an array:", response);
      }
    };
    fetchArtworks();
  }, [accountId]);
  return (
    <>
      <h1>Các tác phẩm</h1>
      <div className="gallery grid">
        {artworks.length === 0 ? (
          isCreator ? (
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
          artworks
            .filter((artwork) => artwork.images && artwork.images.length > 0)
            .map((artwork) => (
              <div className="gallery__item col col-6" key={artwork.id}>
                <ArtworkCard
                  key={artwork.id}
                  id={artwork.id}
                  title={artwork.title}
                  creator={artwork.creator}
                  image={artwork.images[0]}
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

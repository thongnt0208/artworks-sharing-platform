import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import { useOutletContext } from "react-router-dom";

import { GetArtworksData } from "./ArtworksService";
import "./ArtworksView.scss";
import ArtworkCard from "../../../components/ArtworkCard";

type ArtworksProps = {
  id: string;
  title: string;
  creatorId: string;
  creator: string;
  image: string;
  likeNum: number;
  viewNum: number;
};

const ArtworksView: React.FC = () => {
  let navigate = useNavigate();
  let [accountId, isCreator] = useOutletContext() as [string, boolean];

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
      <h1 className="">Các tác phẩm</h1>
      <div className="gallery grid p-0 flex justify-content-start">
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
            .map((artwork) => (
              <div className="gallery__item col col-4" key={artwork.id}>
                <ArtworkCard
                  key={artwork.id}
                  id={artwork.id}
                  title={artwork.title}
                  creatorId={artwork.creatorId}
                  creator={artwork.creator}
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

export default ArtworksView;

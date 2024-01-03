import React from "react";
import { GetAssetsData } from "./AssetService";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";

import AssetsCard from "../../../components/AssetsCard";
import "./AssetScreen.scss";

type Item = {
  id: string;
  name: string;
  price: number;
  extension: string;
  size: number;
  thumbnail?: string;
  editHandler?: () => void;
  saveHandler?: () => void;
  removeHandler?: () => void;
};

type AssetsProps = {
  id: string;
  thumbnail: string;
  isCreator: boolean;
  itemsList: Item[];
  onClickHandler?: () => void;
};

const AssetScreen: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  let navigate = useNavigate();
  const [assets, setAssets] = React.useState<AssetsProps[]>([]);
  React.useEffect(() => {
    const fetchArtworks = async () => {
      const response = await GetAssetsData();
      if (Array.isArray(response)) {
        setAssets(response);
      } else {
        console.error("Response is not an array:", response);
      }
    };
    fetchArtworks();
  }, []);
  return (
    <>
      <h1>Các tài nguyên</h1>
      <div className="gallery">
        {assets.length === 0 ? (
          isLogin ? (
            <Card className="add-asset-card cursor-pointer flex flex-column justify-content-center align-items-center">
              <i className="pi pi-plus-circle icon m-3" />
              <Button
                label="Thêm tài nguyên"
                onClick={() => {
                  navigate("/postAsset");
                }}
              ></Button>
            </Card>
          ) : (
            <div> Tác giả chưa có tài nguyên nào </div>
          )
        ) : (
          assets.map((asset) => (
            console.log("asset", asset),
            <div className="gallery__item col col-6" key={asset.id}>
              <AssetsCard
                key={asset.id}
                id={asset.id}
                thumbnail={asset.thumbnail}
                isCreator={asset.isCreator}
                itemsList={asset.itemsList}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AssetScreen;

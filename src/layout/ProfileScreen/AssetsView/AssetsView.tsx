import React from "react";
import { GetAssetsData } from "./AssetsService";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import { useOutletContext } from "react-router-dom";

import AssetsCard from "../../../components/AssetsCard";
import "./AssetsView.scss";

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

const AssetsView: React.FC = () => {
  let navigate = useNavigate();
  let [accountId, isCreator] = useOutletContext() as [string, boolean];
  const [assets, setAssets] = React.useState<AssetsProps[]>([]);

  React.useEffect(() => {
    const fetchAssets = async () => {
      const response = await GetAssetsData(accountId);
      console.log("Response:", response);
      if (Array.isArray(response)) {
        setAssets(response);
      } else {
        console.error("Response is not an array:", response);
      }
    };
    fetchAssets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="assets-gallery-container">
      <h1>Các tài nguyên</h1>
      <div className="gallery">
        {assets.length === 0 ? (
          isCreator ? (
            <Card>
              <div className="add-asset-card cursor-pointer flex flex-column justify-content-center align-items-center">
                <i className="pi pi-plus-circle icon m-3" />
                <Button
                  label="Thêm tài nguyên"
                  onClick={() => {
                    navigate("/artwork/post");
                  }}
                ></Button>
              </div>
            </Card>
          ) : (
            <div> Tác giả chưa có tài nguyên nào </div>
          )
        ) : (
          assets.map(
            (asset) => (
              (
                <div className="gallery__item col col-12" key={asset.id}>
                  <AssetsCard
                    key={asset.id}
                    id={asset.id}
                    thumbnail={asset.thumbnail}
                    isCreator={asset.isCreator}
                    itemsList={asset.itemsList}
                  />
                </div>
              )
            )
          )
        )}
      </div>
    </div>
  );
};

export default AssetsView;

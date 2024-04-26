/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { GetCollectionsData } from "./CollectionsService";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

import CollectionCard, { CollectionProps } from "../../../components/CollectionCard";
import "./CollectionsView.scss";
import { CatchAPICallingError, ProgressSpinner } from "../..";

const CollectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [collections, setCollections] = React.useState<CollectionProps[]>([]);
  const [accountId, isCreator, accountAvatar] = useOutletContext() as [string, boolean, string];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const collectionList = await GetCollectionsData(accountId);
        setCollections(collectionList);
      } catch (error) {
        CatchAPICallingError(error, navigate);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, [accountId, navigate]);

  const CardContent = (
    <div className="card-content flex flex-column justify-content-center align-items-center">
      <i className="pi pi-search icon m-3" />
      <Button
        label="Tìm tác phẩm"
        onClick={() => {
          navigate("/search");
        }}
      />
    </div>
  );

  return (
    <>
      <h1>Bộ sưu tập</h1>
      <div className="gallery grid p-0 m-0">
        {isLoading && <ProgressSpinner />}
        {!isLoading &&
          (isCreator ? (
            collections.length === 0 ? (
              <Card header={CardContent} className="add-collection-card cursor-pointer" />
            ) : (
              collections.map((collection) => (
                <div className="gallery__item col" key={collection.id}>
                  <CollectionCard {...collection} accountAvatar={accountAvatar} />
                </div>
              ))
            )
          ) : collections.filter((collection) => isCreator || collection.privacy === "Public")
              .length === 0 ? (
            <div> Nhà sáng tạo chưa tạo bộ sưu tập nào </div>
          ) : (
            collections
              .filter((collection) => isCreator || collection.privacy === "Public")
              .map((collection) => (
                <div className="gallery__item col" key={collection.id}>
                  <CollectionCard {...collection} accountAvatar={accountAvatar} />
                </div>
              ))
          ))}
      </div>
    </>
  );
};

export default CollectionScreen;

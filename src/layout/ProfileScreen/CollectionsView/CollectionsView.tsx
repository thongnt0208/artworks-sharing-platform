/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { GetCollectionsData } from "./CollectionsService";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

import CollectionCard, { CollectionProps } from "../../../components/CollectionCard";
import "./CollectionsView.scss";

const CollectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = React.useState<CollectionProps[]>([]);
  const [accountId, isCreator, accountAvatar] = useOutletContext() as [
    string,
    boolean,
    string
  ];

  useEffect(() => {
    const fetchServices = async () => {
      const response = await GetCollectionsData(accountId);
      if (Array.isArray(response)) {
        setCollections(response);
      } else {
        console.error("Response is not an array:", response);
      }
    };

    fetchServices();
  }, [accountId]);

  const CardContent = (
    <div className="card-content flex flex-column justify-content-center align-items-center">
      <i className="pi pi-search icon m-3" />
      <Button label="Tìm tác phẩm" onClick={() => {navigate("/search")}} />
    </div>
  );

  return (
    <>
      <h1>Bộ sưu tập</h1>
      <div className="gallery grid p-0 m-0">
        {collections.length === 0 ? (
          isCreator ? (
            <Card
              header={CardContent}
              className="add-collection-card cursor-pointer"
            />
          ) : (
            <div> Tác giả chưa có bộ sưu tập nào </div>
          )
        ) : (
          collections.map((collection) => (
            <div className="gallery__item col col-6" key={collection.id}>
              <CollectionCard
                key={collection.id}
                id={collection.id}
                collectionName={collection.collectionName}
                creatorFullName={collection.creatorFullName}
                privacy={collection.privacy}
                numberOfArtworks={collection.numberOfArtworks}
                accountAvatar={accountAvatar}
                thumbnail={collection.thumbnail}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CollectionScreen;

import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { GetCollectionsData } from "./CollectionsService";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

import CollectionCard from "../../../components/CollectionCard";
import "./CollectionsView.scss";

type Props = {
  id: string;
  creatorFullName: string;
  collectionName: string;
  privacy: string;
  numberOfArtworks: number;
};

const CollectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = React.useState<Props[]>([]);
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
  }, []);

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
            <div> Tác giả chưa có tác phẩm nào </div>
          )
        ) : (
          collections.map((collection) => (
            <div className="gallery__item col col-6" key={collection.id}>
              <CollectionCard
                key={collection.id}
                id={collection.id}
                creatorFullName={collection.creatorFullName}
                collectionName={collection.collectionName}
                privacy={collection.privacy}
                numberOfArtworks={collection.numberOfArtworks}
                accountAvatar={accountAvatar}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CollectionScreen;

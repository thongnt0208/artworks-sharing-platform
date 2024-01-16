import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import CollectionCard from "../../../components/CollectionCard";
import "./CollectionsView.scss";
import { GetCollectionsData } from "./CollectionsService";

type Props = {
  id: string;
  creatorFullName: string;
  collectionName: string;
  privacy: string;
  numberOfArtworks: number;
};

const CollectionScreen: React.FC = () => {
  const [collections, setCollections] = React.useState<Props[]>([]);
  const [accountId, isCreator, accountAvatar] = useOutletContext() as [string, boolean, string];
  useEffect(() => {
    const fetchServices = async () => {
      const response = await GetCollectionsData();
      if (Array.isArray(response)) {
        setCollections(response);
      } else {
        console.error("Response is not an array:", response);
      }
    };
    fetchServices();
  }, []);
  return (
    <>
      <h1>Bộ sưu tập</h1>
      <div className="gallery grid p-0 m-0">
        {collections.map((collection) => (
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
        ))}
      </div>
    </>
  );
};

export default CollectionScreen;

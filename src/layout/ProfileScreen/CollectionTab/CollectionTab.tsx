import React, { useEffect } from "react";
import CollectionCard from "../../../components/CollectionCard";
import "./CollectionTab.scss";
import { GetCollectionsData } from "./CollectionService";

type Props = {
  id: string;
  collectionName: string;
  privacy: string;
  numberOfArtworks: number;
};

const CollectionScreen: React.FC = () => {
  const [collections, setCollections] = React.useState<Props[]>([]);
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
              collectionName={collection.collectionName}
              privacy={collection.privacy}
              numberOfArtworks={collection.numberOfArtworks}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CollectionScreen;

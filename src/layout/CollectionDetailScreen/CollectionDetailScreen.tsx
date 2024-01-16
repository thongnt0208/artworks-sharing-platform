import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import CollectionInformationSection from "./CollectionInformationSection/CollectionInformationSection";
import CollectionGallery from "./CollectionGallery/CollectionGallery";
import { GetArtworksData, GetCollectionData } from "./CollectionDetailService";

type Artwork = {
  id: string;
  title: string;
  createdBy: string;
  creatorFullName: string;
  thumbnail: string;
  likeNum: number;
  viewNum: number;
};

type CollectionProps = {
  id: string;
  creatorFullName: string;
  collectionName: string;
  privacy: string;
  numberOfArtworks: number;
};

const CollectionDetailScreen: React.FC = () => {
  let collectionId = useParams()?.id;
  const accountAvatar = localStorage.getItem("accountAvatar");
  const [artworks, setArtworks] = React.useState<Artwork[]>([]);
  const [collection, setCollection] = React.useState<CollectionProps>({
    id: "",
    creatorFullName: "",
    collectionName: "",
    privacy: "",
    numberOfArtworks: 0,
  });

  useEffect(() => {
    const fetchServices = async () => {
      const collectionData = await GetCollectionData(collectionId || "");
      setCollection(collectionData);
      const artworksData = await GetArtworksData(collectionId || "");
      if (Array.isArray(artworksData)) {
        setArtworks(artworksData);
        console.log(artworksData)
      } else {
        console.error("Response is not an array:", artworksData);
      }
    };
    fetchServices();
  }, []);
  return (
    <>
      <CollectionInformationSection
        id={collection.id}
        creatorFullName={collection.creatorFullName}
        collectionName={collection.collectionName}
        privacy={collection.privacy}
        numberOfArtworks={collection.numberOfArtworks}
        accountAvatar={accountAvatar ? accountAvatar : ""}
      />
      <CollectionGallery artworks={artworks} />
    </>
  );
};

export default CollectionDetailScreen;

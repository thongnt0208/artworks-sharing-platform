import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CollectionInformationSection from "./CollectionInformationSection/CollectionInformationSection";
import CollectionGallery from "./CollectionGallery/CollectionGallery";
import { GetCollectionData } from "./CollectionDetailService";

type Artwork = {
  id: string;
  title: string;
  createdBy: string;
  creatorFullName: string;
  thumbnail: string;
  likeCount: number;
  viewCount: number;
};

type CollectionProps = {
  id: string;
  creatorFullName: string;
  collectionName: string;
  privacy: string;
  numberOfArtworks: number;
  artworks: Artwork[]; // Add the artworks property
  accountAvatar?: string;
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
    artworks: [],
    accountAvatar: accountAvatar || "",
  });

  const handlePrivacyType = (privacy: string) => {
    if (privacy === "Private") {
      return "Riêng tư";
    } else {
      return "Công khai";
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      const { collection: fetchedCollection, artworks: fetchedArtworks } =
        await GetCollectionData(collectionId || "");
      if (fetchedCollection) {
        setCollection(fetchedCollection);
        setArtworks(fetchedArtworks);
      }
    };
    fetchServices();
  }, [collectionId]);

  return (
    <>
      <CollectionInformationSection
        id={collection.id}
        creatorFullName={collection.creatorFullName}
        collectionName={collection.collectionName}
        privacy={handlePrivacyType(collection.privacy)}
        numberOfArtworks={collection.numberOfArtworks}
        accountAvatar={collection.accountAvatar?.toString() || ""} 
      />
      {artworks && <CollectionGallery artworks={artworks} />} 
      {!artworks && <p>Loading artworks...</p>} 
    </>
  );
};

export default CollectionDetailScreen;

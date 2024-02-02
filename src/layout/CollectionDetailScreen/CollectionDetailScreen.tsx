import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CollectionInformationSection from "./CollectionInformationSection/CollectionInformationSection";
import CollectionGallery from "./CollectionGallery/CollectionGallery";
import { GetCollectionData } from "./CollectionDetailService";

type Artwork = {
  artwork: {
    id: string;
    title: string;
    createdBy: {
      id: string;
      username: string;
      avatar: string;
    };
    creatorFullName: string;
    thumbnail: string;
    likeNum: number;
    viewNum: number;
  }
};

type CollectionDetail = {
  id: string;
  collectionName: string;
  privacy: string;
  createdBy: {
    id: string;
    username: string;
    avatar: string;
  };
  createdOn: string;
  artworks: Artwork[];
};

const CollectionDetailScreen: React.FC = () => {
  let collectionId = useParams()?.id;
  const accountAvatar = localStorage.getItem("accountAvatar");
  const [artworks, setArtworks] = React.useState<Artwork[]>([]);
  const [collection, setCollection] = React.useState<CollectionDetail>({
    id: "",
    collectionName: "",
    privacy: "",
    createdBy: {
      id: "",
      username: "",
      avatar: "",
    },
    createdOn: "",
    artworks: [],
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
      const collectionData = await GetCollectionData(collectionId || "");
      setCollection(collectionData);
      setArtworks(collectionData.artworks);
    };
    fetchServices();
  }, []);

  return (
    <>
      <CollectionInformationSection
        id={collection.id}
        creatorFullName={collection.createdBy?.username}
        collectionName={collection.collectionName}
        privacy={handlePrivacyType(collection.privacy)}
        numberOfArtworks={collection.artworks?.length}
        accountAvatar={collection.createdBy?.avatar}
      />
      <CollectionGallery artworks={artworks} />
    </>
  );
};

export default CollectionDetailScreen;

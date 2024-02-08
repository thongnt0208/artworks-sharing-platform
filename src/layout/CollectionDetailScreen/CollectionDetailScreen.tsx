import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

import { GetCollectionData, UpdateCollectionData, DeleteCollectionData } from "./CollectionDetailService";
import CollectionGallery from "./CollectionGallery/CollectionGallery";
import CollectionInformationSection from "./CollectionInformationSection/CollectionInformationSection";
import { getAuthInfo } from "../../util/AuthUtil";

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
  artworks: Artwork[]; 
  accountAvatar?: string;
};

const CollectionDetailScreen: React.FC = () => {
  let collectionId = useParams()?.id;
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
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

  const showSuccess = () => {
    toast.current?.show({severity:'success', summary: 'Success', detail:'Cập nhật thành công', life: 3000});
  }
  const showError = () => {
    toast.current?.show({severity:'error', summary: 'Lỗi', detail:'Cập nhật lỗi', life: 3000});
  }

  const handleUpdateCollection = async (collectionName: string, privacy: boolean) => {
    try {
      const response = await UpdateCollectionData({
        collectionId: collection.id,
        collectionName,
        privacy,
      });
      if (response) {
        setCollection({
          ...collection,
          collectionName,
          privacy: privacy? "Private" : "Public",
        });
        showSuccess();
      }
      else {
        showError();
      }
    } catch (error) {
      showError();
    }
  };

  const handleDeleteCollection = async () => {
    try {
      const response = await DeleteCollectionData(collection.id);
      if (response) {
        showSuccess();
        setTimeout(() => {
          navigate(`/account/${getAuthInfo().id}/collection`);
        }, 1000);
      }
    } catch (error) {
      showError();
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
        onUpdate={(collectionName: string, privacy: boolean) => {handleUpdateCollection(collectionName, privacy)}}
        onDelete={() => {handleDeleteCollection()}}
      />
      <Toast ref={toast} />
      {artworks && <CollectionGallery artworks={artworks} />} 
      {!artworks && <p>Loading artworks...</p>} 
    </>
  );
};

export default CollectionDetailScreen;

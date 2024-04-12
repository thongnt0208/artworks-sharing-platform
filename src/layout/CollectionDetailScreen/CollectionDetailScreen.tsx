import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { GetCollectionData, UpdateCollectionData, DeleteCollectionData } from "./CollectionDetailService";
import CollectionGallery from "./CollectionGallery/CollectionGallery";
import CollectionInformationSection from "./CollectionInformationSection/CollectionInformationSection";
import { getAuthInfo } from "../../util/AuthUtil";
import { toast } from "react-toastify";
import { CatchAPICallingError } from "..";

type Artwork = {
  id: string;
  title: string;
  createdBy: string;
  creatorFullName: string;
  thumbnail: string;
  likeCount: number;
  viewCount: number;
};

export type CollectionProps = {
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
        toast.success("Cập nhật bộ sưu tập thành công");
      }
      else {
        toast.error("Cập nhật bộ sưu tập thất bại");
      }
    } catch (error) {
      CatchAPICallingError(error, navigate);
    }
  };

  const handleDeleteCollection = async () => {
    try {
      const response = await DeleteCollectionData(collection.id);
      if (response) {
        toast.success("Xóa bộ sưu tập thành công");
        setTimeout(() => {
          navigate(`/account/${getAuthInfo().id}/collection`);
        }, 1000);
      } else {
        toast.error("Xóa bộ sưu tập thất bại");
      }
    } catch (error) {
      CatchAPICallingError(error, navigate);
    }
  };

  const updateArtworks = (artworkId: string) => {
    const updatedArtworks = artworks.filter(
      (artwork) => artwork.id !== artworkId
    );
    setArtworks(updatedArtworks);
  }

  useEffect(() => {
    const fetchArtworks = async () => {
      const { collection: fetchedCollection, artworks: fetchedArtworks } =
        await GetCollectionData(collectionId || "");
      if (fetchedCollection) {
        setCollection(fetchedCollection);
        setArtworks(fetchedArtworks);
      }
    };
    fetchArtworks();
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
      {artworks && <CollectionGallery collectionId={collection.id} artworks={artworks} updateArtworks={updateArtworks}/>} 
      {!artworks && <p>Loading artworks...</p>} 
    </>
  );
};

export default CollectionDetailScreen;

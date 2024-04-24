import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  GetCollectionData,
  UpdateCollectionData,
  DeleteCollectionData,
} from "./CollectionDetailService";
import CollectionGallery from "./CollectionGallery/CollectionGallery";
import CollectionInformationSection from "./CollectionInformationSection/CollectionInformationSection";
import { getAuthInfo } from "../../util/AuthUtil";
import { toast } from "react-toastify";
import { CatchAPICallingError, ProgressSpinner } from "..";

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
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingArtworks, setIsLoadingArtworks] = React.useState(true);
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

  const handleUpdateCollection = async (
    collectionName: string,
    privacy: boolean
  ) => {
    setIsLoading(true);
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
          privacy: privacy ? "Private" : "Public",
        });
        toast.success("Cập nhật bộ sưu tập thành công");
      } else {
        toast.error("Cập nhật bộ sưu tập thất bại");
      }
    } catch (error) {
      CatchAPICallingError(error, navigate);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCollection = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const updateArtworks = (artworkId: string) => {
    setIsLoadingArtworks(true);
    try {
      const updatedArtworks = artworks.filter(
        (artwork) => artwork.id !== artworkId
      );
      setArtworks(updatedArtworks);
    } finally {
      setIsLoadingArtworks(false);
    }
  };

  useEffect(() => {
    const fetchCollectionData = async () => {
      setIsLoading(true);
      try {
        const { collection: fetchedCollection } = await GetCollectionData(collectionId || "");
        if (fetchedCollection) {
          setCollection(fetchedCollection);
          return fetchedCollection;
        }
      } catch (error) {
        CatchAPICallingError(error, navigate);
      } finally {
        setIsLoading(false);
      }
    };
    
    const fetchArtworks = async () => {
      setIsLoadingArtworks(true);
      try {
        const fetchedCollection = await fetchCollectionData();
        if (fetchedCollection) {
          const { artworks: fetchedArtworks } = fetchedCollection;
          setArtworks(fetchedArtworks);
        }
      } catch (error) {
        CatchAPICallingError(error, navigate);
      } finally {
        setIsLoadingArtworks(false);
      }
    };
    fetchCollectionData();  
    fetchArtworks();
  }, [collectionId, navigate]);

  return (
    <>
      {isLoading && <ProgressSpinner />}
      {!isLoading && (
        <>
          <CollectionInformationSection
            id={collection.id}
            creatorFullName={collection.creatorFullName}
            collectionName={collection.collectionName}
            privacy={handlePrivacyType(collection.privacy)}
            numberOfArtworks={collection.numberOfArtworks}
            accountAvatar={collection.accountAvatar?.toString() || ""}
            onUpdate={(collectionName: string, privacy: boolean) => {
              handleUpdateCollection(collectionName, privacy);
            }}
            onDelete={() => {
              handleDeleteCollection();
            }}
          />
          {isLoadingArtworks && <ProgressSpinner />}
          {artworks && (
            <CollectionGallery
              collectionId={collection.id}
              artworks={artworks}
              updateArtworks={updateArtworks}
            />
          )}
        </>
      )}
    </>
  );
};

export default CollectionDetailScreen;

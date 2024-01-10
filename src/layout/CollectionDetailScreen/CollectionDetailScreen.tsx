import React from 'react';
import CollectionInformationSection from './CollectionInformationSection/CollectionInformationSection';
import CollectionGallery from './CollectionGallery/CollectionGallery';

const CollectionDetailScreen: React.FC = () => {
  type Artwork = {
    id: string;
    title: string;
    creatorId: string;
    creator: string;
    image: string;
    likeNum: number;
    viewNum: number;
  };

  type CollectionInformationProps = {
    id: string;
    createdBy: string;
    collectionName: string;
    privacy: string;
    creationDate: string;
  }

  let collectionInformationProps: CollectionInformationProps = {
    id: "1",
    createdBy: "<NAME>",
    collectionName: "Collection 1",
    privacy: "Public",
    creationDate: "2021-08-17",
  };

  return (
    <>
        <CollectionInformationSection collectionInfo={collectionInformationProps}  />
        <CollectionGallery artworks={[]} />
    </>
  );
};

export default CollectionDetailScreen;

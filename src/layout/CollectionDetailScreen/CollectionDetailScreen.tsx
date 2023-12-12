import React from 'react';
import CollectionInformationSection from './CollectionInformationSection/CollectionInformationSection';
import CollectionGallery from './CollectionGallery/CollectionGallery';

const CollectionDetailScreen: React.FC = () => {
  type Artwork = {
    id: string;
    title: string;
    imageUrl: string;
    likeNum: number;
    viewNum: number;
    subTitle: string;
  }

  let artworksSampleProps: Artwork[] = [
    {
      id: "1",
      title: "Artwork 1",
      imageUrl: "https://example.com/artwork1.jpg",
      likeNum: 10,
      viewNum: 12,
      subTitle: "Subtitle 1",
    },
    {
      id: "2",
      title: "Artwork 2",
      imageUrl: "https://example.com/artwork2.jpg",
      likeNum: 10,
      viewNum: 12,
      subTitle: "Subtitle 2",
    },
    {
      id: "3",
      title: "Artwork 3",
      imageUrl: "https://example.com/artwork3.jpg",
      likeNum: 10,
      viewNum: 12,
      subTitle: "Subtitle 3",
    },
  ];

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

  const countArtworks = () => {
    return artworksSampleProps.length;
  };

  return (
    <>
        <CollectionInformationSection collectionInfo={collectionInformationProps}  />
        <CollectionGallery artworks={artworksSampleProps} />
    </>
  );
};

export default CollectionDetailScreen;

import React from "react";
import UserInformationSection from "./UserInformationSide/UserInformationSide";
import UserArtworksSide from "./UserArtworksSide/UserArtworksSide";

const OtherProfileScreen: React.FC = () => {
  interface Artwork {
    id: string;
    title: string;
    imageUrl: string;
    likeNum: number;
    viewNum: number;
    subTitle: string;
  }

  type Item = {
    id: string;
    name: string;
    price: number;
    extension: string;
    size: number;
    thumbnail?: string;
    editHandler?: () => void;
    saveHandler?: () => void;
    removeHandler?: () => void;
  };

  type AssetsProps = {
    id: string;
    thumbnail: string;
    isCreator: boolean;
    itemsList: Item[];
    onClickHandler?: () => void;
  };

  let assetsProps: AssetsProps[] = [
    {
      id: "1",
      thumbnail: "https://placehold.in/600",
      isCreator: true,
      itemsList: [
        {
          id: "1",
          name: "Item 1",
          price: 100,
          extension: "jpg",
          size: 100,
          thumbnail: "https://placehold.in/600",
          editHandler: () => {},
          saveHandler: () => {},
          removeHandler: () => {},
        },
      ],
    },
  ];

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

  type CollectionProps = {
    id: string;
    title: string;
    description: string;
  };

  let collectionSampleProps: CollectionProps[] = [
    {
      id: "1",
      title: "Collection 1",
      description: "Collection 1 description",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <UserInformationSection />
        <UserArtworksSide artworks={artworksSampleProps} assets={assetsProps} collections={collectionSampleProps} />
      </div>
    </>
  );
};

export default OtherProfileScreen;

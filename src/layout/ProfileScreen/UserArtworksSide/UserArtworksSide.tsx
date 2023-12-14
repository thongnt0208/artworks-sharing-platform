import React from "react";
import { TabCustom } from "../../../components/TabCustom";
import ArtworkSection from "./ArtworkSection/ArtworkSection";
import AssetSection from "./AssetSection/AssetSection";
import SubcribingAreaSection from "./SubcribingArea/SubcribingArea";

interface ArtworksProps {
  id: string;
  title: string;
  subTitle: string;
  imageUrl: string;
  likeNum: number;
  viewNum: number;
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

type CollectionProps = {
  id: string;
  title: string;
  description: string;
};

const UserArtworksSide: React.FC<{ artworks: ArtworksProps[], assets: AssetsProps[], collections: CollectionProps[] }> = ({
  artworks,
  assets,
  collections
}) => {
  return (
    <>
      <div
        className="tab-section"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TabCustom
          isLogin={false}
          currentTabId={""}
          onClickHandler={function (e: any): void {
            throw new Error("Function not implemented.");
          }}
        />
        <ArtworkSection artworks={artworks} />
        <AssetSection assets={assets} />
        <SubcribingAreaSection assets={assets} collections={collections} />
      </div>
    </>
  );
};

export default UserArtworksSide;

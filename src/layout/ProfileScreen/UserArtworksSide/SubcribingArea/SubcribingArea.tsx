import React from "react";
import AssetsCard from "../../../../components/AssetsCard";
import CollectionCard from "../../../../components/CollectionCard";

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

type AssetProps = {
  id: string;
  thumbnail: string;
  isCreator: boolean;
  itemsList: Item[];
  onClickHandler?: () => void;
};

type CollectionProps = {
  id: string;
  //   imageUrl: string;
  title: string;
  description: string;
};

const SubcribingAreaSection: React.FC<{
  assets: AssetProps[];
  collections: CollectionProps[];
}> = ({ assets, collections }) => {
  return (
    <div className="artwork-section">
      <h2>Vùng cho người đăng ký</h2>
      <div className="flex flex-col gap-4">
        {collections.map((collection) => (
          <CollectionCard
            data={{
              id: collection.id,
              title: collection.title,
              description: collection.description,
            }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {assets.map((asset) => (
          <AssetsCard
            id={asset.id}
            thumbnail={asset.thumbnail}
            isCreator={asset.isCreator}
            itemsList={asset.itemsList}
            onClickHandler={asset.onClickHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default SubcribingAreaSection;

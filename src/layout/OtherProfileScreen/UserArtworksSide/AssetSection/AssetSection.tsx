import React from "react";
import AssetsCard from "../../../../components/AssetsCard";

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

const AssetSection: React.FC<{ assets: AssetProps[] }> = ({ assets }) => {
  return (
    <div className="artwork-section">
      <h2>Các tài nguyên</h2>
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

export default AssetSection;

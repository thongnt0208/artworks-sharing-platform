import React from "react";
import { Button } from "primereact/button";
import { TextLimit } from "../../../../util/StringHandler";
import { formatFileSize } from "../../../../util/FileSizeHandler";
import "./BoughtAssets.scss";

export type BoughtAssetsProps = {
  id: string;
  artworkId: string;
  order: number;
  assetTitle: string;
  description: string;
  assetName: string;
  price: number;
  extension: string;
  size: number;
  isBought: boolean;
  fileMetaData: string;
  lastModificatedOn: string;
  saveHandler?: (id: string) => void;
};

const BoughtAssets: React.FC<BoughtAssetsProps> = (
  props: BoughtAssetsProps
) => {
  return (
    <div className="detail-column grid">
      <div className="file-info col col-4">
        <span className="file-title">
          {TextLimit(props.assetTitle ?? "", 20)}
        </span>
      </div>
      <div className="file-info col col-2 flex flex-column justify-content-start align-propss-start">
        <span className="file-name">
          {TextLimit(props.assetName ?? "", 20)}
        </span>
        <span className="file-description file-size">
          {TextLimit(props.description ?? "", 20)}
        </span>
        {props.size && (
          <span className="file-size">{formatFileSize(props.size)}</span>
        )}
      </div>
      <div className="file-type col col-2">
        {props.extension ? <span>.{props.extension}</span> : <span>.file</span>}
      </div>
      <div className="file-price col col-2">
        <span>{`${props.price.toLocaleString()} Xu`}</span>
      </div>
      <div className="file-action col col-2 flex flex-row justify-content-start align-propss-center">
        <Button
          icon="pi pi-cloud-download"
          className="download-button"
          tooltip="Tải về"
          tooltipOptions={{ position: "top" }}
          onClick={() => props.saveHandler && props.saveHandler(props.id)}
        />
      </div>
    </div>
  );
};

export default BoughtAssets;

import React from "react";
import { Button } from "primereact/button";
import { TextLimit } from "../../../../util/StringHandler";
import "./BoughtAssets.scss";

export type BoughtAssetsProps = {
  id: string;
  artworkId: string;
  order: number;
  assetTitle: string;
  description: string;
  assetName: string;
  price: number;
  isBought: boolean;
  fileMetaData: string;
  lastModificatedOn: string;
};

const BoughtAssets: React.FC<BoughtAssetsProps> = (props: BoughtAssetsProps) => {
  return (
    <div className="detail-column grid">
    <div className="col col-4 file-info flex flex-column justify-content-start align-propss-start">
      <span className="file-title" >{TextLimit(props.assetTitle ?? '', 20)}</span>
      <span className="file-name">{TextLimit(props.assetName ?? '', 20)}</span>
      <span className="file-description file-size">{TextLimit(props.description ?? '', 20)}</span>
      {/* {props.size && <span className="file-size">{props} KB</span>} */}
    </div>
    <div className="col col-2 file-type">
      {/* {props.extension ? <span>.{props.extension}</span> : <span>.file</span>} */}
    </div>
    <div className="col col-4 file-price">
      <span>{`${props.price} Xu`}</span>
    </div>
    <div className="col col-2 file-action flex flex-row justify-content-start align-propss-center">
      <Button
        icon="pi pi-cloud-download"
        className="download-button"
        tooltip="Tải về"
        tooltipOptions={{ position: "top" }}
        // onClick={_saveHandler}
      />
    </div>
  </div>
  );
};

export default BoughtAssets;
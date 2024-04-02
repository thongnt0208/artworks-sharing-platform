import { Button } from "primereact/button";
import { DataScroller } from "primereact/datascroller";

import React from "react";
import "./AssetsCard.scss";
import { AssetType } from "../layout/ArtworkDetailScreen/ArtworkDetailType";

type AssetsProps = {
  id: string;
  thumbnail: string;
  isCreator: boolean;
  itemsList: AssetType[];
  onClickHandler?: () => void;
  editHandler?: () => void;
  saveHandler?: (id: string) => void;
  removeHandler?: () => void;
};

const AssetsCard: React.FC<AssetsProps> = (props: AssetsProps) => {
  const totalItems = props.itemsList ? props.itemsList.length : 0;

  const thumbnailColumn = (image: string) => {
    return (
      <div className="w-fit flex flex-column justify-content-center align-items-end">
        <img alt="Ảnh thu nhỏ của tài nguyên" src={image} className="thumbnail" />
        <Button
          className="number-of-items"
          rounded
          label={`Chứa ${totalItems} tài nguyên`}
          onClick={props.onClickHandler}
        />
      </div>
    );
  };

  const detailsColumn = (item: AssetType) => {
    const _saveHandler: any = () => props.saveHandler && props.saveHandler(item.id);

    return (
      <div className="detail-column">
        <div className="file-info flex flex-column justify-content-start align-items-start">
          <span className="file-name">{item.name}</span>
          <span className="file-description file-size">{item.description}</span>
          {item.size && <span className="file-size">{item.size} KB</span>}
        </div>
        <div className="file-type">
          <span>.{item.extension}</span>
        </div>
        <div className="file-action flex flex-row justify-content-start align-items-center">
          <div className="file-price">
            <span>{`${item.price} Xu`}</span>
          </div>
          <Button
            icon="pi pi-cloud-download"
            className="download-button"
            tooltip="Tải về"
            tooltipOptions={{ position: "top" }}
            onClick={_saveHandler}
          />
          {props.isCreator && props.editHandler && props.removeHandler && (
            <>
              <Button
                icon="pi pi-pencil"
                className="edit-button"
                tooltip="Sửa"
                tooltipOptions={{ position: "top" }}
                onClick={props.editHandler}
              />
              <Button
                icon="pi pi-trash"
                className="remove-button"
                tooltip="Xoá"
                tooltipOptions={{ position: "top" }}
                onClick={props.removeHandler}
              />
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="assets-card-container w-full h-fit">
      {props?.thumbnail && (
        <div className="thumbnail-column-container">{thumbnailColumn(props.thumbnail)}</div>
      )}

      <div className="detail-column-container w-full h-full">
        <DataScroller
          value={props.itemsList}
          itemTemplate={detailsColumn}
          rows={props.itemsList ? props.itemsList.length : 0}
        />
      </div>
    </div>
  );
};

export default AssetsCard;

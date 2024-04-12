import { Button } from "primereact/button";
import { DataScroller } from "primereact/datascroller";

import React from "react";
import "./AssetsCard.scss";
import { AssetType } from "../layout/ArtworkDetailScreen/ArtworkDetailType";
import { TextLimit } from "../util/StringHandler";
import { formatFileSize } from "../util/FileSizeHandler";

export type AssetsProps = {
  id: string;
  thumbnail: string;
  title?: string;
  description?: string;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  privacy?: string;
  state?: string;
  createdBy?: string;
  createdOn?: string;
  isCreator: boolean;
  itemsList: AssetType[];
  onClickHandler?: () => void;
  editHandler?: () => void;
  saveHandler?: (id: string, price?: number) => void;
  removeHandler?: (id: string) => void;
};

const AssetsCard: React.FC<AssetsProps> = (props: AssetsProps) => {
  const totalItems = props.itemsList ? props.itemsList.length : 0;

  const thumbnailColumn = (image: string) => {
    return (
      <div className="w-fit flex flex-column justify-content-center align-items-end">
        <img
          alt="Ảnh thu nhỏ của tài nguyên"
          src={image}
          className="thumbnail"
        />
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
    const _saveHandler: any = () =>
      props.saveHandler && props.saveHandler(item.id, item.price);
    const _removeHandler: any = () => 
      props.removeHandler && props.removeHandler(item.id);
    return (
      <div className="detail-column grid">
        <div className="col col-4 file-info flex flex-column justify-content-start align-items-start">
          <span className="file-name">{TextLimit(item.name ?? '', 20)}</span>
          <span className="file-description file-size">{TextLimit(item.description ?? '', 20)}</span>
          {item.size && <span className="file-size">{formatFileSize(item.size)}</span>}
        </div>
        <div className="col col-2 file-type">
          {item.extension ? <span>.{item.extension}</span> : <span>.file</span>}
        </div>
        <div className="col col-4 file-price">
          <span>{`${item.price.toLocaleString()} Xu`}</span>
        </div>
        <div className="col col-2 file-action flex flex-row justify-content-start align-items-center">
          <Button
            icon="pi pi-cloud-download"
            className="download-button"
            tooltip="Tải về"
            tooltipOptions={{ position: "top" }}
            onClick={_saveHandler}
          />
          {props.isCreator && props.removeHandler && (
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
                onClick={_removeHandler}
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
        <div className="thumbnail-column-container">
          {thumbnailColumn(props.thumbnail)}
        </div>
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
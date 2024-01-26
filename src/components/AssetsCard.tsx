import { Button } from "primereact/button";
import { DataScroller } from "primereact/datascroller";

import React from "react";
import "./AssetsCard.scss";

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

const AssetsCard: React.FC<AssetsProps> = (props: AssetsProps) => {
  const totalItems = props.itemsList ? props.itemsList.length : 0;
  console.log("AssetsCard props:", props);

  const thumbnailColumn = (image: string) => {
    return (
      <div className="w-fit flex flex-column justify-content-center align-items-end">
        <img alt="Ảnh thu nhỏ của một bài đăng" src={image} className="thumbnail" />
        <Button
          className="number-of-items"
          rounded
          label={`Chứa ${totalItems} tài nguyên`}
          onClick={props.onClickHandler}
        />
      </div>
    );
  };

  const detailsColumn = (item: Item) => {
    return (
      <div className="detail-column">
        <div className="file-info flex flex-column justify-content-start align-items-start">
          <span className="file-name">{item.name}</span>
          <span className="file-size">{item.size} KB</span>
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
            onClick={item.saveHandler}
          />
          {props.isCreator && (
            <>
              <Button
                icon="pi pi-pencil"
                className="edit-button"
                tooltip="Sửa"
                tooltipOptions={{ position: "top" }}
                onClick={item.editHandler}
              />
              <Button
                icon="pi pi-trash"
                className="remove-button"
                tooltip="Xoá"
                tooltipOptions={{ position: "top" }}
                onClick={item.removeHandler}
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
          className="w-full"
          value={props.itemsList}
          itemTemplate={detailsColumn}
          rows={props.itemsList ? props.itemsList.length : 0}
        />
      </div>
    </div>
  );
};

export default AssetsCard;

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
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
      <div className="h-full">
        <img
          alt="Ảnh thu nhỏ của một bài đăng"
          src={image}
          style={{ width: "100%", height: "70%", objectFit: "cover" }}
        />
        <Button
          label={`Có ${totalItems} tài nguyên`}
          icon="pi pi-list"
          className="p-button-secondary p-ml-2"
          onClick={props.onClickHandler}
        />
      </div>
    );
  };

  const detailsColumn = (item: Item) => {
    return (
      <div className="grid-nogutter w-full">
        <div className="col-4">
          <div>
            <span>{item.name}</span>
            <span>{item.size} KB</span>
          </div>
        </div>
        <div className="col-4">
          <span>{item.extension}</span>
        </div>
        <div className="col-4">
          <div>
            <span>{`$${item.price}`}</span>
            <Button
              icon="pi pi-cloud-download"
              className="p-button-rounded p-button-secondary p-ml-1"
              tooltip="Tải về"
              tooltipOptions={{ position: "top" }}
              onClick={item.saveHandler}
            />
            {props.isCreator && (
              <>
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-secondary p-ml-1"
                  tooltip="Sửa"
                  tooltipOptions={{ position: "top" }}
                  onClick={item.editHandler}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-secondary p-ml-1"
                  tooltip="Xoá"
                  tooltipOptions={{ position: "top" }}
                  onClick={item.removeHandler}
                />
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="assets-card-container">
      <div className="grid-nogutter">
        <div className="col-4 thumbnail-column-container">
          <div className="h-full">{thumbnailColumn(props.thumbnail)}</div>
        </div>
        <div className="col-8 detail-column-container">
          <DataView
            value={props.itemsList}
            itemTemplate={detailsColumn}
            paginator
            rows={props.itemsList ? props.itemsList.length : 0}
          />
        </div>
      </div>
    </Card>
  );
};

export default AssetsCard;

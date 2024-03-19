import React, { useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { OverlayPanel } from "primereact/overlaypanel";

import { formatLargeNumber } from "../util/NumberHandler";
import "./ArtworkCard.scss";
const unsavedIcon = require("../assets/icons/collection-detail-01-unsaved-icon.png");

export type ArtworkProps = {
  id: string;
  title: string;
  thumbnail: string;
  viewCount: number;
  likeCount: number;
  privacy?: string;
  isCreator?: boolean | undefined;
  createdBy: string;
  creatorFullName: string;
  onRemoveFromCollection?: boolean;
  onSelection?: boolean;
  likeHandler?: () => void;
  viewHandler?: () => void;
  saveHandler?: () => void;
  updateHandler?: () => void;
  deleteHandler?: () => void;
};

const ArtworkCard: React.FC<ArtworkProps> = ({ ...props }: ArtworkProps) => {
  const op = useRef<OverlayPanel>(null);

  let header = (
    <div className={`header-container ${props.onSelection ? "mb-3" : "" }`}>
      <div className="thumbnail-container pt-0">
        <img
          alt={`Hình thu nhỏ của tác phẩm tên ${props.title}`}
          src={props.thumbnail}
          className="thumbnail border-round"
          onClick={props.viewHandler}
        />
      </div>
      {!props.onSelection && (
        <Button
          label={props.viewCount ? formatLargeNumber(props.viewCount) : "0"}
          icon="pi pi-eye"
          onClick={props.viewHandler}
          className="view-button"
        />
      )}  
    </div>
  );
  let footer = (
    <div className="footer-container">
      <Button
        className="like-button"
        label={props.likeCount ? formatLargeNumber(props.likeCount) : "0"}
        icon="pi pi-heart"
        onClick={props.likeHandler}
      />
      <Divider className="divider" layout="vertical" />
      {props.isCreator ? (
        <Button
          className="save-button"
          icon="pi pi-cog"
          onClick={(e) => {
            console.log("Clicked", e, op);
            op.current?.toggle(e);
          }}
        />
      ) : props.onRemoveFromCollection ? (
        <Button className="save-button" onClick={props.saveHandler}>
          <img src={unsavedIcon} alt="icon" />
        </Button>
      ) : (
        <Button
          className="save-button"
          icon="pi pi-bookmark"
          onClick={props.saveHandler}
        />
      )}

      <OverlayPanel ref={op} showCloseIcon={false}>
        <table>
          <tbody>
            <tr>
              <td>
                <Button
                  className="option-btn"
                  label="Chỉnh sửa"
                  onClick={props.updateHandler}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Button
                  className="option-btn"
                  label="Xóa"
                  onClick={props.deleteHandler}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </OverlayPanel>
    </div>
  );
  return (
    <Card
      id={props.id}
      title={props.title}
      subTitle={!props.onSelection && `bởi ${props.creatorFullName}`}
      header={header}
      footer={!props.onSelection && footer}
      className="artwork-card cursor-pointer"
    ></Card>
  );
};

export default ArtworkCard;

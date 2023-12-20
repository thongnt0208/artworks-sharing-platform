import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./ArtworkCard.scss";
import { Divider } from "primereact/divider";

type Props = {
  id: string;
  title: string;
  subTitle: string;
  image: string;
  likeNum: number;
  viewNum: number;
  likeHandler?: () => void;
  viewHandler?: () => void;
  saveHandler?: () => void;
};

const ArtworkCard: React.FC<Props> = ({ ...props }: Props) => {
  let header = (
    <div className="header-container">
      <div className="thumbnail-container">
        <img
          alt={`Hình thu nhỏ của tác phẩm tên ${props.title}`}
          src={props.image}
          className="thumbnail border-round"
        />
      </div>

      <Button
        label={props.viewNum.toString()}
        icon="pi pi-eye"
        onClick={props.viewHandler}
        className="view-button"
      />
    </div>
  );
  let footer = (
    <div className="footer-container">
      <Button
        className="like-button"
        label={props.likeNum.toString()}
        icon="pi pi-heart"
        onClick={props.likeHandler}
      />
      <Divider className="divider" layout="vertical" />
      <Button
        className="save-button"
        icon="pi pi-download"
        onClick={props.saveHandler}
      />
    </div>
  );
  return (
    <Card
      id={props.id}
      title={props.title}
      subTitle={props.subTitle}
      header={header}
      footer={footer}
      className="artwork-card cursor-pointer"
      onClick={props.viewHandler}
    ></Card>
  );
};

export default ArtworkCard;

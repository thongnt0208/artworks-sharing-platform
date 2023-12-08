import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./style.scss";

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
    <>
      <Button
        label={props.likeNum.toString()}
        icon="pi pi-heart"
        onClick={props.likeHandler}
      />

      <Button
        label="Save"
        icon="pi pi-download"
        onClick={props.saveHandler}
        style={{ marginLeft: "0.5em" }}
      />
    </>
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

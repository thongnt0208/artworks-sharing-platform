import React, { useState } from "react";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";

import RequestPopup, { RequestProps } from "./RequestPopup";
import { ArtworkProps } from "./ArtworkCard";
import "./ServiceCard.scss";

const background = require("../assets/defaultImage/default-card-blur-image.png");

export type ServiceProps = {
  id: string;
  serviceName: string;
  description: string;
  deliveryTime: string;
  numberOfConcept: number;
  numberOfRevision: number;
  startingPrice: number;
  thumbnail: string;
  accountId: string;
  accountFullname: string;
  accountAvatar: string;
  isCreator: boolean;
  averageRating: number;
  artworkReferences?: ArtworkProps[];
  editHandler?: () => void;
  hireHandler: (request: RequestProps) => void;
  reviewHandler?: () => void;
};
const ServiceCard: React.FC<ServiceProps> = ({ ...props }: ServiceProps) => {
  const [isShowRequestPopup, setIsShowRequestPopup] = useState(false);
  return (
    <div
      className="service-card-container "
      style={{
        backgroundImage: `url(${props.thumbnail || background})`,
      }}
    >
      <div className="information">
        <div className="service-card-details-top mt-2">
          <h2 className="service-name mt-0 mb-0 ml-3 font-bold">
            {props.serviceName}
          </h2>
          <p className="starting-price mt-0 mb-0 ml-3">
            Từ {props.startingPrice.toLocaleString()} Xu
          </p>
        </div>
        <div className="service-card-details-bottom">
          <div>
            <p className="mt-1 mb-0">
              {" "}
              <i className="pi pi-clock" /> {props.deliveryTime}{" "}
            </p>
            <p className="mt-1 mb-0">
              {" "}
              <i className="pi pi-sync" /> {props.numberOfConcept} ý tưởng,{" "}
              {props.numberOfRevision} lần chỉnh sửa{" "}
            </p>
          </div>
          {props.averageRating === 0 ? (
            <div className="review">
              <p className="review-popup" style={{ cursor: "default" }}>
                Chưa có đánh giá
              </p>
            </div>
          ) : (
            <div className="review">
              <Rating
                className="rating mt-1"
                value={props.averageRating}
                readOnly
                cancel={false}
              />
              <p className="review-popup" onClick={props.reviewHandler}>
                Tất cả đánh giá
              </p>
            </div>
          )}
        </div>
        {props.isCreator ? (
          <div className="hire-button-container w-full flex justify-content-center mt-3 mb-3 ">
            <Button
              label="Chỉnh sửa"
              rounded
              className="hire-button border-none pl-5 pr-5"
              onClick={props.editHandler}
            />
          </div>
        ) : (
          <div className="hire-button-container w-full flex justify-content-center mt-3 mb-3 ">
            <Button
              label="Thuê"
              rounded
              className="hire-button border-none pl-5 pr-5"
              onClick={() => setIsShowRequestPopup(true)}
            />
            <RequestPopup
              visible={isShowRequestPopup}
              onHide={() => {
                setIsShowRequestPopup(false);
              }}
              startingPrice={props.startingPrice}
              accountAvatar={props.accountAvatar}
              accountName={props.accountFullname}
              isHire={true}
              onSubmit={props.hireHandler}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;

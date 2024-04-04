import React, { useState } from "react";
import { Button } from "primereact/button";

import "./ServiceCard.scss";
import RequestPopup, { RequestProps } from "./RequestPopup";
import { ArtworkProps } from "./ArtworkCard";
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
  accountFullname: string;
  accountAvatar: string;
  isCreator?: boolean;
  artworkReferences?: ArtworkProps[];
  editHandler?: () => void;
  hireHandler: (request: RequestProps) => void;
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
          {/* <p className="cover-location mt-0 mb-0 ml-3">{props.coverLocation}</p> */}
        </div>
        <div className="service-card-details-bottom mt-2 ml-3">
          <p className="mt-1 mb-0">
            {" "}
            <i className="pi pi-clock" /> {props.deliveryTime}{" "}
          </p>
          <p className="mt-1 mb-0">
            {" "}
            <i className="pi pi-sync" /> {props.numberOfConcept} thể loại,{" "}
            {props.numberOfRevision} lần chỉnh sửa{" "}
          </p>
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

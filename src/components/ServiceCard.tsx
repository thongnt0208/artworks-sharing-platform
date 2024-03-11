import React from "react";
import { Button } from "primereact/button";

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
  coverLocation: string;
  isCreator?: boolean;
  editHandler?: () => void;
  hireHandler?: () => void;
};
const ServiceCard: React.FC<ServiceProps> = ({ ...props }: ServiceProps) => {

  return (
    <div
      className="service-card-container "
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="information">
        <div className="service-card-details-top mt-2">
          <h2 className="service-name mt-0 mb-0 ml-3 font-bold">
            {props.serviceName}
          </h2>
          <p className="starting-price mt-0 mb-0 ml-3">
            Từ {props.startingPrice} Xu
          </p>
          <p className="cover-location mt-0 mb-0 ml-3">{props.coverLocation}</p>
        </div>
        <div className="service-card-details-bottom mt-2 ml-3">
          <p className="mt-1 mb-0">
            <i className="pi pi-clock" /> Trong khoảng {props.deliveryTime} tuần
          </p>
          <p className="mt-1 mb-0">
            <i className="pi pi-sync" /> {props.numberOfConcept} thể loại,{" "}
            {props.numberOfRevision} lần chỉnh sửa
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
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;

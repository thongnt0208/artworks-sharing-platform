import React from "react";
import { Button } from "primereact/button";
import "./ServiceCard.scss"

const background = require("../assets/defaultImage/default-card-blur-image.png");

interface ServiceCardProps {
  data: {
    id: number;
    serviceName: string;
    startingPrice: number;
    deliveryTime: number;
    numberOfConcepts: number;
  };
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ data }, onClick) => {
  console.log(data);
  const { id, serviceName, startingPrice, deliveryTime, numberOfConcepts } =
    data;

  return (
    <Button
      id="service-card-container"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="information">
        <h2 style={{ margin: 0 }}>{serviceName}</h2>

        <p style={{ margin: 5, textAlign: "left" }}>Từ {startingPrice} Xu</p>
        <p style={{ margin: 5, textAlign: "left" }}>
          <i className="pi pi-clock" /> Trong khoảng {deliveryTime} tuần
        </p>
        <p style={{ margin: 5, textAlign: "left" }}>
          <i className="pi pi-palette" /> {numberOfConcepts} thể loại
        </p>
      </div>
    </Button>
  );
};

export default ServiceCard;

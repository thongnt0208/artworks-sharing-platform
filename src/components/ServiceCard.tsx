import React from "react";
import { Button } from "primereact/button";

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
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        borderRadius: "12px",
        padding: 0,
        width: "450px",
        height: "286px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          backgroundColor: "white",
          color: "black",
          width: "100%",
          outline: "none",
          border: "none"
        }}
      >
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

import React, { useEffect, useState } from "react";
import ServiceCard from "../../../components/ServiceCard";
import { GetServicesData } from "./ServicesService";
import { useOutletContext } from "react-router-dom";

import "./ServicesTab.scss";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

type ServiceCardProps = {
  id: string;
  serviceName: string;
  description: string;
  deliveryTime: number;
  numberOfConcept: number;
  numberOfRevision: number;
  startingPrice: number;
  coverLocation: string;
};

const ServicesTab: React.FC = () => {
  const [services, setServices] = useState<ServiceCardProps[]>([]);
  // let [accountId, isCreator] = useOutletContext() as [string, boolean];
  let isCreator = true;
  useEffect(() => {
    const fetchServices = async () => {
      const response = await GetServicesData();
      if (Array.isArray(response)) {
        setServices(response);
      } else {
        console.error("Response is not an array:", response);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <h1>Các dịch vụ</h1>
      <div className="gallery p-0">
        {services.length === 0 ? (
          isCreator ? (
            <Card className="add-service-card cursor-pointer flex flex-column justify-content-center align-items-center">
              <i className="pi pi-plus-circle icon m-3" />
              <Button label="Tạo dịch vụ" onClick={() => {}}></Button>
            </Card>
          ) : (
            <div> Tác giả chưa có tác phẩm nào </div>
          )
        ) : (
          services.map((service) => (
            <div className="gallery__item col col-6" key={service.id}>
              <ServiceCard
                key={service.id}
                id={service.id}
                serviceName={service.serviceName}
                description={service.description}
                deliveryTime={service.deliveryTime}
                numberOfConcept={service.numberOfConcept}
                numberOfRevision={service.numberOfRevision}
                startingPrice={service.startingPrice}
                coverLocation={service.coverLocation}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ServicesTab;

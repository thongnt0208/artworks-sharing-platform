import React, { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DeleteServiceData, GetServicesData } from "./ServicesService";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

import "./ServicesView.scss";
import ServiceCard, { ServiceProps } from "../../../components/ServiceCard";
import ServiceInformationSection from "./ServiceInformationSection/ServiceInformationSection";

const ServicesView: React.FC = () => {
  const toast = useRef<Toast>(null);
  let [accountId, isCreator] = useOutletContext() as [string, boolean];
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<ServiceProps>({
    id: "",
    serviceName: "",
    description: "",
    deliveryTime: "",
    numberOfConcept: 0,
    numberOfRevision: 0,
    startingPrice: 0,
    coverLocation: "",
  });

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Cập nhật thành công",
      life: 3000,
    });
  };
  const showError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Lỗi",
      detail: "Cập nhật lỗi",
      life: 3000,
    });
  };

  const handleEditService = () => {
    setVisible(true);
  };

  const handleDeleteService = async (serviceId: string) => {
    try {
      const response = await DeleteServiceData(serviceId);
      console.log("Hello", response);
      if (response) {
        showSuccess();
        setVisible(false);
      }
    } catch (error) {
      showError();
    } finally {
      const fetchServices = async () => {
        const response = await GetServicesData(accountId);
        if (Array.isArray(response.items)) {
          setServices(response.items);
        } else {
          console.error("Response is not an array:", response);
        }
      };
      fetchServices();
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      const response = await GetServicesData(accountId);
      if (Array.isArray(response.items)) {
        setServices(response.items);
      } else {
        console.error("Response is not an array:", response);
      }
    };
    fetchServices();
  }, [accountId]);

  return (
    <>
      <h1>Các dịch vụ</h1>
      <div className="gallery p-0">
        {services.length === 0 ? (
          isCreator ? (
            <>
              <Card className="add-service-card cursor-pointer flex flex-column justify-content-center align-items-center">
                <i className="pi pi-plus-circle icon m-3" />
                <Button
                  label="Tạo dịch vụ"
                  onClick={() => {
                    setVisible(true);
                  }}
                ></Button>
              </Card>
            </>
          ) : (
            <div> Tác giả chưa có dịch vụ nào </div>
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
                editHandler={() => {
                  setSelectedService(service);
                  handleEditService();
                }}
              />
            </div>
          ))
        )}
      </div>
      <Dialog
        className="dialog"
        showHeader={false}
        contentClassName="service-dialog-content"
        visible={visible}
        modal
        dismissableMask={true}
        closable={false}
        onHide={() => setVisible(false)}
      >
        <>
          {selectedService && (
            <ServiceInformationSection
              props={selectedService}
              setClose={setVisible}
              handleDelete={() => handleDeleteService(selectedService.id)}
            />
          )}
        </>
      </Dialog>
    </>
  );
};

export default ServicesView;

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { CreateNewRequestData, DeleteServiceData, GetServicesData } from "./ServicesService";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

import "./ServicesView.scss";
import ServiceCard, { ServiceProps } from "../../../components/ServiceCard";
import ServiceInformationSection from "./ServiceInformationSection/ServiceInformationSection";
import { RequestProps } from "../../../components/RequestPopup";

const ServicesView: React.FC = () => {
  const toast = useRef<Toast>(null);
  let [accountId, isCreator, accountAvatar, accountFullname] =
    useOutletContext() as [string, boolean, string, string];
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
    thumbnail: "",
    accountFullname: "",
    accountAvatar: "",
    hireHandler: () => {},
    artworkReferences: []
  });

  const showSuccess = (
    summary: string,
    detail: string
  ) => {
    toast.current?.show({
      severity: "success",
      summary: summary,
      detail: detail,
      life: 3000,
    });
  };

  const showError = (
    summary: string,
    detail: string
  ) => {
    toast.current?.show({
      severity: "error",
      summary: summary,
      detail: detail,
      life: 3000,
    });
  };

  const handleHireRequest = async (request: RequestProps, service: ServiceProps) => {
    try {
      const response  = await CreateNewRequestData(service.id, request.message, request.timeline || "", request.budget || 0);
      console.log(response);
      if (response === true) {
        showSuccess("Thành công", "Gửi yêu cầu thành công");
      }
    } catch (error) {
      showError("Lỗi", "Gửi yêu cầu thất bại");
    }
  };

  const handleEditService = () => {
    setVisible(true);
  };

  const fetchServices = useCallback(async () => {
    const response = await GetServicesData(accountId);
    if (Array.isArray(response.items)) {
      setServices(response.items);
    } else {
      showError("Lỗi", "Lấy dữ liệu dịch vụ thất bại");
    }
  }, [accountId]);

  const handleDeleteService = async (serviceId: string) => {
    try {
      const response = await DeleteServiceData(serviceId);
      if (response) {
        showSuccess("Thành công", "Xóa dịch vụ thành công");
        setVisible(false);
      }
    } catch (error) {
      showError("Lỗi", "Xóa dịch vụ thất bại");
    } finally {
      fetchServices();
      setSelectedService({} as ServiceProps);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <>
      <h1>Các dịch vụ</h1>
      <div className="gallery p-0">
        {isCreator || services.length > 0 ? (
          <>
            <div className="gallery__item flex flex-wrap flex-row justify-content-start align-items-start">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  serviceName={service.serviceName}
                  description={service.description}
                  deliveryTime={service.deliveryTime}
                  numberOfConcept={service.numberOfConcept}
                  numberOfRevision={service.numberOfRevision}
                  startingPrice={service.startingPrice}
                  thumbnail={service.thumbnail}
                  accountFullname={accountFullname}
                  accountAvatar={accountAvatar}
                  artworkReferences={service.artworkReferences}
                  isCreator={isCreator}
                  editHandler={() => {
                    setSelectedService(service);
                    handleEditService();
                  }}
                  hireHandler={(request) => handleHireRequest(request, service)}
                />
              ))}
              <Card className="add-service-card cursor-pointer flex flex-column justify-content-center align-items-center">
                <i className="pi pi-plus-circle icon m-3" />
                <Button
                  label="Tạo dịch vụ"
                  onClick={() => {
                    setVisible(true);
                  }}
                ></Button>
              </Card>
            </div>
          </>
        ) : (
          <div> Tác giả chưa có dịch vụ nào </div>
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
        onHide={() => {
          setVisible(false);
        }}
      >
        <>
          {selectedService && (
            <ServiceInformationSection
              props={selectedService}
              setClose={() => {
                setVisible(false);
                setSelectedService({} as ServiceProps);
              }}
              handleDelete={() => handleDeleteService(selectedService.id)}
              fetchServiceData={() => {
                localStorage.removeItem("selectedArtworkIds");
                fetchServices();
              }}
            />
          )}
        </>
      </Dialog>
    </>
  );
};

export default ServicesView;

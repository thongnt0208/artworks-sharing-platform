import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import {
  CreateNewRequestData,
  DeleteServiceData,
  GetServicesData,
} from "./ServicesService";
import { Dialog } from "primereact/dialog";

import "./ServicesView.scss";
import ServiceCard, { ServiceProps } from "../../../components/ServiceCard";
import ServiceInformationSection from "./ServiceInformationSection/ServiceInformationSection";
import { RequestProps } from "../../../components/RequestPopup";
import { CatchAPICallingError } from "../..";
import { toast } from "react-toastify";

const ServicesView: React.FC = () => {
  const navigate = useNavigate();
  const paramAccountId = useParams()?.id; 
  let [accountId, isCreator, accountAvatar, accountFullname] =
    useOutletContext() as [string, boolean, string, string];
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(false);
  
  const [selectedService, setSelectedService] = useState<ServiceProps>({
    id: "",
    serviceName: "",
    description: "",
    deliveryTime: "",
    numberOfConcept: 0,
    numberOfRevision: 0,
    startingPrice: 0,
    thumbnail: "",
    accountId: paramAccountId || "",
    accountFullname: "",
    accountAvatar: "",
    isCreator: isCreator,
    hireHandler: () => {},
  });

  const handleHireRequest = async (
    request: RequestProps,
    service: ServiceProps
  ) => {
    try {
      const response = await CreateNewRequestData(
        service.id,
        request.message,
        request.timeline || "",
        request.budget || 0
      );
      if (response) {
        toast.success("Gửi yêu cầu thành công");
      }
    } catch (error) {
      CatchAPICallingError(error, navigate);
    }
  };

  const handleEditService = () => {
    setVisible(true);
  };

  const handleArtworkReferences = (artworkReferences: any) => {
    const artworkReferencesIds = artworkReferences.map(
      (artwork: any) => artwork.id
    );
    localStorage.setItem(
      "artworksRefIds",
      JSON.stringify(artworkReferencesIds)
    );
  };

  const fetchServices = useCallback(async () => {
    if (!accountId) return;
    const response = await GetServicesData(accountId);
    if (Array.isArray(response.items)) {
      setServices(response.items);
    } else {
      CatchAPICallingError(response, navigate);
    }
  }, [accountId, navigate]);

  const handleDeleteService = async (serviceId: string) => {
    try {
      const response = await DeleteServiceData(serviceId);
      if (response) {
        toast.success("Xóa dịch vụ thành công");
        setVisible(false);
      }
    } catch (error) {
      toast.error("Xóa dịch vụ thất bại");
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
                  accountId={accountId}
                  accountFullname={accountFullname}
                  accountAvatar={accountAvatar}
                  isCreator={isCreator}
                  editHandler={() => {
                    setSelectedService(service);
                    handleArtworkReferences(service.artworkReferences);
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
                    setIsNew(true);
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
          localStorage.removeItem("artworksRef");
          localStorage.removeItem("selectedArtworkIds");
          setVisible(false);
          setIsNew(false);
        }}
      >
        <>
          {selectedService && (
            <ServiceInformationSection
              props={selectedService}
              setClose={() => {
                setVisible(false);
                setIsNew(false);
                setSelectedService({} as ServiceProps);
              }}
              handleDelete={() => handleDeleteService(selectedService.id)}
              fetchServiceData={() => {
                localStorage.removeItem("artworksRef");
                localStorage.removeItem("selectedArtworkIds");
                fetchServices();
              }}
              isNew={isNew}
            />
          )}
        </>
      </Dialog>
    </>
  );
};

export default ServicesView;

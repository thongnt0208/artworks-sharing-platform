import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import {
  CreateNewRequestData,
  DeleteServiceData,
  GetServicesData,
} from "./ServicesService";
import { RequestProps } from "../../../components/RequestPopup";
import { CatchAPICallingError } from "../..";
import { toast } from "react-toastify";
import ServiceCard, { ServiceProps } from "../../../components/ServiceCard";
import ServiceInformationSection from "./ServiceInformationSection/ServiceInformationSection";
import ServiceReviewPopup from "../../../components/ServiceReviewPopup";
import "./ServicesView.scss";

const ServicesView: React.FC = () => {
  const navigate = useNavigate();
  const paramAccountId = useParams()?.id;
  let [accountId, isCreator, accountAvatar, accountFullname] =
    useOutletContext() as [string, boolean, string, string];
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [serviceInfoDialogVisible, setServiceInfoDialogVisible] =
    useState<boolean>(false);
  const [serviceReviewDialogVisible, setServiceReviewDialogVisible] =
    useState<boolean>(false);
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
    averageRating: 0,
    hireHandler: () => {},
  });

  const handleHireRequest = async (
    request: RequestProps,
    service: ServiceProps
  ) => {
    console.log("Request budget: ", request.budget);
    try {
      const response = await CreateNewRequestData(
        service.id,
        request.message,
        request.timeline || "",
        request.budget || 0
      );
      if (response) {
        toast.success("Gửi yêu cầu thành công");
      } else {
        toast.error("Gửi yêu cầu thất bại");
      }
    } catch (error) {
      CatchAPICallingError(error, navigate);
    }
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
        setServiceInfoDialogVisible(false);
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

  const dialogModelFields = {
    modal: true,
    dismissableMask: true,
    closable: false,
  };

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
                  averageRating={service.averageRating}
                  isCreator={isCreator}
                  editHandler={() => {
                    setSelectedService(service);
                    handleArtworkReferences(service.artworkReferences);
                    setServiceInfoDialogVisible(true);
                  }}
                  hireHandler={(request) => handleHireRequest(request, service)}
                  reviewHandler={() => {
                    setSelectedService(service);
                    setServiceReviewDialogVisible(true);
                  }}
                />
              ))}
              {isCreator && (
                <Card className="add-service-card cursor-pointer flex flex-column justify-content-center align-items-center">
                  <i className="pi pi-plus-circle icon m-3" />
                  <Button
                    label="Tạo dịch vụ"
                    onClick={() => {
                      setServiceInfoDialogVisible(true);
                      setIsNew(true);
                    }}
                  ></Button>
                </Card>
              )}
            </div>
          </>
        ) : (
          <div> Tác giả chưa có dịch vụ nào </div>
        )}
      </div>
      <Dialog
        className="service-info-dialog"
        showHeader={false}
        style={{ width: "60vw" }}
        contentClassName="service-dialog-content"
        visible={serviceInfoDialogVisible}
        onHide={() => {
          localStorage.removeItem("artworksRef");
          localStorage.removeItem("selectedArtworkIds");
          setServiceInfoDialogVisible(false);
          setIsNew(false);
        }}
        {...dialogModelFields}
      >
        <>
          {selectedService && (
            <ServiceInformationSection
              props={selectedService}
              setClose={() => {
                setServiceInfoDialogVisible(false);
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
      <Dialog
        className="service-review-dialog"
        showHeader={false}
        contentClassName="service-dialog-content"
        visible={serviceReviewDialogVisible}
        onHide={() => {
          setServiceReviewDialogVisible(false);
        }}
        {...dialogModelFields}
      >
        <ServiceReviewPopup
          service={selectedService}
          averageRating={selectedService.averageRating}
        />
      </Dialog>
    </>
  );
};

export default ServicesView;

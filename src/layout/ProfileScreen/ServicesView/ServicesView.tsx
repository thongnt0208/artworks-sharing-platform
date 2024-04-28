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
import RequestPopup, { RequestProps } from "../../../components/RequestPopup";
import { CatchAPICallingError, ProgressSpinner } from "../..";
import { toast } from "react-toastify";
import ServiceCard, { ServiceProps } from "../../../components/ServiceCard";
import ServiceInformationSection from "./ServiceInformationSection/ServiceInformationSection";
import ServiceReviewPopup from "../../../components/ServiceReviewPopup";
import "./ServicesView.scss";
import { ConfirmDialog } from "primereact/confirmdialog";

const ServicesView: React.FC = () => {
  const navigate = useNavigate();
  const paramAccountId = useParams()?.id;
  let [accountId, isCreator, accountAvatar, accountFullname] =
    useOutletContext() as [string, boolean, string, string];
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [serviceInfoDialogVisible, setServiceInfoDialogVisible] =
    useState<boolean>(false);
  const [serviceReviewDialogVisible, setServiceReviewDialogVisible] =
    useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isShowRequestPopup, setIsShowRequestPopup] = useState(false);
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
    handleShowRequestPopup: () => {},
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
        setTimeout(() => {
          setIsShowRequestPopup(false);
        }, 1000);
      } else {
        toast.error("Gửi yêu cầu thất bại: /n" + response);
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
    const response = await GetServicesData(accountId);
    if (Array.isArray(response.items)) {
      setServices(response.items);
    } else {
      CatchAPICallingError(response, navigate);
    }
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId]);

  const handleDeleteService = async (serviceId: string) => {
    setIsLoading(true);
    try {
      const response = await DeleteServiceData(serviceId);
      if (response) {
        toast.success("Xóa dịch vụ thành công");
      }
    } catch (error) {
      toast.error("Xóa dịch vụ thất bại");
    } finally {
      fetchServices();
      setSelectedService({} as ServiceProps);
      setTimeout(() => {
        setServiceInfoDialogVisible(false);
      }, 1000);
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
        {isLoading && <ProgressSpinner />}
        {!isLoading &&
          (isCreator || services.length > 0 ? (
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
                    setSelectedService={(service: ServiceProps) => {
                      setSelectedService(service);
                    }}
                    reviewHandler={() => {
                      setSelectedService(service);
                      setServiceReviewDialogVisible(true);
                    }}
                    handleShowRequestPopup={() => setIsShowRequestPopup(true)}
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
                        setSelectedService({
                          id: "",
                          serviceName: "",
                          description: "",
                          deliveryTime: "",
                          numberOfConcept: 0,
                          numberOfRevision: 0,
                          startingPrice: 0,
                          thumbnail: "",
                          accountId: accountId,
                          accountFullname: accountFullname,
                          accountAvatar: accountAvatar,
                          isCreator: isCreator,
                          averageRating: 0,
                          handleShowRequestPopup: () => {},
                        });
                      }}
                    ></Button>
                  </Card>
                )}
              </div>
            </>
          ) : (
            <div> Tác giả chưa có dịch vụ nào </div>
          ))}
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
      <RequestPopup
        visible={isShowRequestPopup}
        onHide={() => {
          setIsShowRequestPopup(false);
        }}
        startingPrice={selectedService.startingPrice}
        accountAvatar={selectedService.accountAvatar}
        accountName={selectedService.accountFullname}
        isHire={true}
        onSubmit={(request) => {
          handleHireRequest(request, selectedService);
        }}
      />
      <ConfirmDialog />
    </>
  );
};

export default ServicesView;

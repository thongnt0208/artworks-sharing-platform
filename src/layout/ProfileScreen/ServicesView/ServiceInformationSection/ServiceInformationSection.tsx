import React, { useEffect, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";

import { useFormik } from "formik";
import { validationSchema } from "./FormikData";
import { ServiceProps } from "../../../../components/ServiceCard";
import { ArtworkProps } from "../../../../components/ArtworkCard";
import { getAuthInfo } from "../../../../util/AuthUtil";
import { GetArtworksData } from "../../ArtworksView/ArtworksService";
import { deliveryTime } from "../../../../const/bizConstants";
import { CreateServiceData, UpdateServiceData } from "../ServicesService";
import { toast } from "react-toastify";
import { CatchAPICallingError } from "../../..";
import { useNavigate } from "react-router-dom";

import ReferenceArtworksSection from "../ReferenceArtworksSection/ReferenceArtworksSection";
import defaultCoverImage from "../../../../assets/defaultImage/default-card-blur-image.png";
import "./ServiceInformationSection.scss";
import { ConfirmDialog } from "primereact/confirmdialog";

interface ServiceInformationProps {
  props: ServiceProps;
  isNew: boolean;
  setClose: (close: boolean) => void;
  handleDelete: (serviceId: string) => void;
  fetchServiceData: () => void;
}
const ServiceInformationSection: React.FC<ServiceInformationProps> = ({
  props,
  isNew,
  setClose,
  handleDelete,
  fetchServiceData,
}) => {
  let id = props?.id;
  const accountId = getAuthInfo()?.id;
  const navigate = useNavigate();
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [artworks, setArtworks] = useState<ArtworkProps[]>(props?.artworkReferences || []);
  const [pageNumber, setPageNumber] = useState(1);
  const [thumbnail, setThumbnail] = useState<File | string>(props?.thumbnail);
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    const handleGetArtworks = async () => {
      try {
        const response = await GetArtworksData(4, pageNumber, accountId, 1, 0);
        if (Array.isArray(response)) {
          setArtworks((prevArtworks) => {
            const uniqueArtworkIds = new Set(prevArtworks.map((artwork) => artwork.id));
            const newArtworks = response.filter((artwork: { id: string }) => !uniqueArtworkIds.has(artwork.id));
            return [...prevArtworks, ...newArtworks];
          });
        }
      } catch (error) {
        toast.error("Lấy dữ liệu tác phẩm thất bại");
        CatchAPICallingError(error, navigate);
      }
    };
    handleGetArtworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, pageNumber]);

  const loadMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handleThumbnailChange = (event: any) => {
    formik.setValues({
      ...formik.values,
      thumbnail: event.files[0] || defaultCoverImage,
    });
    setThumbnail(event.files[0]);
  };

  const handleSelectArtwork = (selectedArtworkList: string[]) => {
    formik.setValues({
      ...formik.values,
      referenceArtworks: selectedArtworkList || [],
    });
    setShow(false);
  };

  const handleSubmit = (values: any) => {
    if (id) {
      UpdateServiceData(values, id)
        .then((response) => {
          toast.success("Cập nhật dịch vụ thành công");
          fetchServiceData();
          setClose(false);
        })
        .catch((err) => {
          toast.error("Cập nhật dịch vụ thất bại");
          CatchAPICallingError(err, navigate);
        });
    } else {
      CreateServiceData(values)
        .then((response) => {
          formik.resetForm();
          toast.success("Tạo dịch vụ thành công");
          fetchServiceData();
          setClose(false);
        })
        .catch((err) => {
          toast.error("Tạo dịch vụ thất bại");
          CatchAPICallingError(err, navigate);
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      serviceName: props?.serviceName || "",
      description: props?.description || "",
      deliveryTime: props?.deliveryTime || "",
      numberOfConcept: props?.numberOfConcept || 0,
      numberOfRevision: props?.numberOfRevision || 0,
      startingPrice: props?.startingPrice || 0,
      thumbnail: thumbnail || defaultCoverImage,
      referenceArtworks: localStorage.getItem("artworksRefIds") || [""],
    },
    validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const accept = (id: string) => {
    handleDelete(id);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {artworks.length === 0 ? (
        <>
          <div className="w-full">
            <h1>Hãy đăng tác phẩm của bạn để tạo dịch vụ nhé!</h1>
          </div>
        </>
      ) : (
        <>
          <ConfirmDialog
            visible={confirmDialogVisible}
            onHide={() => setConfirmDialogVisible(false)}
            message="Bạn có muốn xóa dịch vụ này?"
            header="Xóa dịch vụ"
            headerStyle={{ border: "none", textAlign: "center" }}
            icon="pi pi-exclamation-triangle"
            dismissableMask
            accept={() => accept(id)}
            reject={() => setConfirmDialogVisible(false)}
          />
          <div className="header-container mt-2 mb-2">
            {id ? (
              <>
                <h1 className="p-1 m-1 pl-0 ml-0 ">Chỉnh sửa dịch vụ</h1>
              </>
            ) : (
              <>
                <h1 className="p-1 m-1 pl-0 ml-0 font-bold">Thông tin dịch vụ</h1>
                <p className="text-lg">
                  Thêm dịch vụ để cho khách hàng tiềm năng biết bạn sẵn sàng làm gì và giúp họ dễ dàng thuê bạn.
                </p>
              </>
            )}
          </div>
          <div className="form-container grid">
            <div className="thumbnail-container col-4 pr-5 w-fit flex flex-column justify-content-start align-items-center mt-3">
              <img
                className="thumbnail"
                src={(thumbnail instanceof File ? URL.createObjectURL(thumbnail) : thumbnail) || defaultCoverImage}
                alt="thumbnail"
              />
              {formik.errors.thumbnail && formik.touched.thumbnail && (
                <div className="error-message text-red-500">{formik.errors.thumbnail}</div>
              )}
              <div className="w-full upload-file flex flex-row justify-content-center mt-3">
                <FileUpload
                  mode="basic"
                  name="demo[]"
                  accept="image/*"
                  maxFileSize={10000000}
                  onSelect={handleThumbnailChange}
                />
              </div>
              <div className="flex justify-content-center mt-3">
                <Button
                  label="Thêm tác phẩm minh họa"
                  className="p-button-rounded"
                  type="button"
                  onClick={() => setShow(true)}
                />
              </div>
              <Dialog
                showHeader={false}
                className="w-10"
                visible={isShow}
                contentStyle={{ padding: "0px", borderRadius: "12px" }}
                dismissableMask={true}
                modal
                closable={false}
                onHide={() => {}}
              >
                <ReferenceArtworksSection
                  artworks={artworks}
                  loadData={() => loadMoreData()}
                  setShow={setShow}
                  selectArtworks={handleSelectArtwork}
                />
              </Dialog>
            </div>

            <div className="profile-info-container col-8 h-fit mt-3 flex flex-column justify-content-center">
              <div
                className="profile-info-form w-full h-fit flex flex-column justify-content-start align-items-start"
                onSubmit={handleSubmit}
              >
                <div className="service-name-container w-full h-fit  flex flex-row justify-content-start align-content-between pb-3">
                  <div className="service-name-label w-full h-fit flex flex-column justify-content-start align-items-start">
                    <label className="text-base font-bold" htmlFor="serviceName">
                      Tên dịch vụ
                    </label>
                    <InputText
                      type="text"
                      id="service-name"
                      className={`text-base w-full ${
                        formik.errors.serviceName && formik.touched.serviceName && "error"
                      }`}
                      name="serviceName"
                      placeholder={formik.values.serviceName || ""}
                      value={formik.values.serviceName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.serviceName && formik.touched.serviceName && (
                      <div className="error-message text-red-500">{formik.errors.serviceName}</div>
                    )}
                  </div>
                </div>

                <div className="description-container w-full h-fit  flex flex-row justify-content-start align-content-between pb-3">
                  <div className="description-label w-full h-fit flex flex-column justify-content-start align-items-start">
                    <label className="text-base font-bold" htmlFor="description">
                      Mô tả dịch vụ
                    </label>
                    <InputTextarea
                      id="description"
                      className={`text-base w-full ${
                        formik.errors.description && formik.touched.description && "error"
                      }`}
                      name="description"
                      placeholder={formik.values.description || ""}
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.description && formik.touched.description && (
                      <div className="error-message">{formik.errors.description}</div>
                    )}
                  </div>
                </div>

                <div className="delivery-time-container w-full h-fit  flex flex-row justify-content-start align-content-between pb-3">
                  <div className="delivery-time-label w-full h-fit flex flex-column justify-content-start align-items-start">
                    <label className="text-base font-bold" htmlFor="deliveryTime">
                      Thời gian hoàn thành
                    </label>
                    <Dropdown
                      id="deliveryTime"
                      className={`text-base w-full ${
                        formik.errors.deliveryTime && formik.touched.deliveryTime && "error"
                      }`}
                      name="deliveryTime"
                      placeholder={formik.values.deliveryTime || ""}
                      value={formik.values.deliveryTime}
                      options={deliveryTime}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.deliveryTime && formik.touched.deliveryTime && (
                      <div className="error-message">{formik.errors.deliveryTime}</div>
                    )}
                  </div>
                </div>

                <div className="concept-container w-full h-fit  flex flex-row justify-content-start align-content-between pb-3">
                  <div className="concept-label w-full h-fit flex flex-column justify-content-start align-items-start">
                    <label className="text-base font-bold" htmlFor="concept">
                      Số lượng ý tưởng
                    </label>
                    <InputNumber
                      id="concept"
                      className={`text-base w-full ${
                        formik.errors.numberOfConcept && formik.touched.numberOfConcept && "error"
                      }`}
                      name="numberOfConcept"
                      value={formik.values.numberOfConcept}
                      onValueChange={(e) => formik.setFieldValue("numberOfConcept", e.value)}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.numberOfConcept && formik.touched.numberOfConcept && (
                      <div className="error-message">{formik.errors.numberOfConcept}</div>
                    )}
                  </div>
                </div>

                <div className="revision-container w-full h-fit  flex flex-row justify-content-start align-content-between pb-3">
                  <div className="revision-label w-full h-fit flex flex-column justify-content-start align-items-start">
                    <label className="text-base font-bold" htmlFor="revision">
                      Số lần chỉnh sửa
                    </label>
                    <InputNumber
                      id="revision"
                      className={`text-base w-full ${
                        formik.errors.numberOfRevision && formik.touched.numberOfRevision && "error"
                      }`}
                      name="numberOfRevision"
                      value={formik.values.numberOfRevision}
                      onValueChange={(e) => formik.setFieldValue("numberOfRevision", e.value)}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.numberOfRevision && formik.touched.numberOfRevision && (
                      <div className="error-message">{formik.errors.numberOfRevision}</div>
                    )}
                  </div>
                </div>

                <div className="price-container w-full h-fit  flex flex-row justify-content-start align-content-between pb-3">
                  <div className="price-label w-full h-fit flex flex-column justify-content-start align-items-start">
                    <label className="text-base font-bold" htmlFor="price">
                      Giá khởi điểm (XU)
                    </label>
                    <InputNumber
                      id="price"
                      className={`text-base w-full ${
                        formik.errors.startingPrice && formik.touched.startingPrice && "error"
                      }`}
                      name="startingPrice"
                      value={formik.values.startingPrice}
                      onValueChange={(e) => formik.setFieldValue("startingPrice", e.value)}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.startingPrice && formik.touched.startingPrice && (
                      <div className="error-message">{formik.errors.startingPrice}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="btn-container w-full h-fit flex flex-row justify-content-between align-items-start">
                <div className="submission-container w-full h-fit flex flex-row justify-content-start align-items-center">
                  <div className="submit-btn w-fit h-fit mr-2 flex flex-row justify-content-center text-300">
                    <Button label={id ? "Cập nhật" : "Tạo"} className="p-button" type="submit" />
                  </div>
                  <div className="cancel-btn w-fit h-fit flex flex-row justify-content-center">
                    <Button
                      type="button"
                      label="Hủy"
                      className="p-button"
                      onClick={() => {
                        formik.resetForm();
                        setClose(false);
                      }}
                    />
                  </div>
                </div>
                {!isNew && (
                  <div className="delete-account-btn w-full h-fit flex flex-row justify-content-center">
                    <Button
                      label="Xóa dịch vụ"
                      className="p-button"
                      type="button"
                      onClick={() => {
                        setConfirmDialogVisible(true);
                        formik.resetForm();
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default ServiceInformationSection;

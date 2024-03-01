import React, { useEffect, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";

import { validationSchema } from "./FormikData";
import defaultCoverImage from "../../../../assets/defaultImage/default-card-blur-image.png";
import { ServiceProps } from "../../../../components/ServiceCard";
import "./ServiceInformationSection.scss";

interface ServiceInformationProps {
  props: ServiceProps;
  setClose: (close: boolean) => void;
  handleDelete: (serviceId: string) => void;
}
const ServiceInformationSection: React.FC<ServiceInformationProps> = ({
  props,
  setClose,
  handleDelete,
}) => {
  const [id, setId] = useState(props?.id || "");
  // const [serviceName, setServiceName] = useState(props?.serviceName || "");
  // const [description, setDescription] = useState(props?.description || "");
  // const [deliveryTime, setDeliveryTime] = useState(props?.deliveryTime || "");
  // const [numberOfConcept, setNumberOfConcept] = useState(
  //   props?.numberOfConcept
  // );
  // const [numberOfRevision, setNumberOfRevision] = useState(
  //   props?.numberOfRevision
  // );
  // const [startingPrice, setStartingPrice] = useState(props?.startingPrice);
  const [thumbnail, setThumbnail] = useState<File | string>(
    props?.coverLocation
  );

  useEffect(() => {
    setId(props?.id || "");
    // setServiceName(props?.serviceName || "");
    // setDescription(props?.description || "");
    // setDeliveryTime(props?.deliveryTime || "");
    // setNumberOfConcept(props?.numberOfConcept);
    // setNumberOfRevision(props?.numberOfRevision);
    // setStartingPrice(props?.startingPrice);
    setThumbnail(props?.coverLocation);
  }, [props]);

  const handleThumbnailChange = (event: any) => {
    setThumbnail(event.files[0]);
  };

  const handleSubmit = (values: any) => {
    if (id) {
      console.log("Update service: ", values);
    } else {
      console.log("Create new service", values);
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
    },
    validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="header-container m-4">
        {id ? (
          <>
            <h2 className="p-1 m-1">Chỉnh sửa dịch vụ</h2>
          </>
        ) : (
          <>
            <h2 className="p-1 m-1">Thông tin dịch vụ</h2>
            <p>
              Thêm dịch vụ để cho khách hàng tiềm năng biết bạn sẵn sàng làm gì
              và giúp họ dễ dàng thuê bạn.
            </p>
          </>
        )}
      </div>
      <div className="form-container grid">
        <div className="thumbnail-container col-4 pr-5 w-fit flex flex-column justify-content-start align-items-center mt-3">
          <img
            className="thumbnail"
            src={
              (thumbnail instanceof File
                ? URL.createObjectURL(thumbnail)
                : thumbnail) || defaultCoverImage
            }
            alt="avatar"
          />
          <div className="upload-file flex justify-content-center mt-3">
            <FileUpload
              mode="basic"
              name="demo[]"
              accept="image/*"
              maxFileSize={1000000}
              onSelect={handleThumbnailChange}
            />
          </div>
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
                    formik.errors.serviceName &&
                    formik.touched.serviceName &&
                    "error"
                  }`}
                  name="serviceName"
                  placeholder={formik.values.serviceName || ""}
                  value={formik.values.serviceName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.serviceName && formik.touched.serviceName && (
                  <div className="error-message">
                    {formik.errors.serviceName}
                  </div>
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
                    formik.errors.description &&
                    formik.touched.description &&
                    "error"
                  }`}
                  name="description"
                  placeholder={formik.values.description || ""}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.description && formik.touched.description && (
                  <div className="error-message">
                    {formik.errors.description}
                  </div>
                )}
              </div>
            </div>

            <div className="delivery-time-container w-full h-fit  flex flex-row justify-content-start align-content-between pb-3">
              <div className="delivery-time-label w-full h-fit flex flex-column justify-content-start align-items-start">
                <label className="text-base font-bold" htmlFor="deliveryTime">
                  Thời gian hoàn thành
                </label>
                <InputText
                  id="deliveryTime"
                  className={`text-base w-full ${
                    formik.errors.deliveryTime &&
                    formik.touched.deliveryTime &&
                    "error"
                  }`}
                  name="deliveryTime"
                  placeholder={formik.values.deliveryTime || ""}
                  value={formik.values.deliveryTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.deliveryTime && formik.touched.deliveryTime && (
                  <div className="error-message">
                    {formik.errors.deliveryTime}
                  </div>
                )}
              </div>
            </div>

            <div className="concept-container w-full h-fit  flex flex-row justify-content-start align-content-between pb-3">
              <div className="concept-label w-full h-fit flex flex-column justify-content-start align-items-start">
                <label className="text-base font-bold" htmlFor="concept">
                  Số lượng thể loại
                </label>
                <InputNumber
                  id="concept"
                  className={`text-base w-full ${
                    formik.errors.numberOfConcept &&
                    formik.touched.numberOfConcept &&
                    "error"
                  }`}
                  name="numberOfConcept"
                  value={formik.values.numberOfConcept}
                  onValueChange={(e) =>
                    formik.setFieldValue("numberOfConcept", e.value)
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.errors.numberOfConcept &&
                  formik.touched.numberOfConcept && (
                    <div className="error-message">
                      {formik.errors.numberOfConcept}
                    </div>
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
                    formik.errors.numberOfRevision &&
                    formik.touched.numberOfRevision &&
                    "error"
                  }`}
                  name="numberOfRevision"
                  value={formik.values.numberOfRevision}
                  onValueChange={(e) =>
                    formik.setFieldValue("numberOfRevision", e.value)
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.errors.numberOfRevision &&
                  formik.touched.numberOfRevision && (
                    <div className="error-message">
                      {formik.errors.numberOfRevision}
                    </div>
                  )}
              </div>
            </div>

            <div className="price-container w-full h-fit  flex flex-row justify-content-start align-content-between pb-3">
              <div className="price-label w-full h-fit flex flex-column justify-content-start align-items-start">
                <label className="text-base font-bold" htmlFor="price">
                  Giá khởi điểm (VNĐ)
                </label>
                <InputNumber
                  id="price"
                  className={`text-base w-full ${
                    formik.errors.startingPrice &&
                    formik.touched.startingPrice &&
                    "error"
                  }`}
                  name="startingPrice"
                  value={formik.values.startingPrice}
                  onValueChange={(e) =>
                    formik.setFieldValue("startingPrice", e.value)
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.errors.startingPrice &&
                  formik.touched.startingPrice && (
                    <div className="error-message">
                      {formik.errors.startingPrice}
                    </div>
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
                  label="Hủy"
                  className="p-button"
                  onClick={() => setClose(false)}
                />
              </div>
            </div>

            <div className="delete-account-btn w-full h-fit flex flex-row justify-content-center">
              <Button
                label="Xóa dịch vụ"
                className="p-button"
                onClick={() => {
                  handleDelete(id);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ServiceInformationSection;

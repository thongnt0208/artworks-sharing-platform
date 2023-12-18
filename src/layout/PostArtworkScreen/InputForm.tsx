import React from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Chips } from "primereact/chips";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import * as Yup from "yup";

type Props = {};
export default function InputForm({ ...props }: Props) {
  const initialValues = {
    Id: "", // Initial value for Id
    CreatedBy: "", // Initial value for CreatedBy
    Title: "",
    Images: null,
    Description: "",
    Privacy: "Public",
    Tags: [],
    Category: null,
    Assets: null,
  };

  const validationSchema = Yup.object().shape({
    Title: Yup.string().required(" không được bỏ trống"),
    Images: Yup.mixed()
      .test(
        "fileType",
        "Loại file không hợp lệ. Chỉ chấp nhận jpg/png.",
        (value: any) => {
          if (value && value.name) {
            const extension = value.name.split(".").pop().toLowerCase();
            return extension === "jpg" || extension === "png";
          }
          return true; // If no file is selected, assume validation pass
        }
      )
      .required(" không được bỏ trống"),
    Description: Yup.string().required(" không được bỏ trống"),
    Privacy: Yup.string().required(" không được bỏ trống"),
    Tags: Yup.array().min(1, "Phải có ít nhất 1 thẻ."),
    Category: Yup.string().required(" không được bỏ trống"),
    Assets: Yup.mixed().notRequired(),
  });

  const privacyOptions = [
    { label: "Công khai", value: "Public" },
    { label: "Riêng tư", value: "Private" },
  ];

  const categoryOptions = [
    { label: "Category 1", value: "Category 1" },
    { label: "Category 2", value: "Category 2" },
    { label: "Category 3", value: "Category 3" },
  ];

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      // Handle form submission here
      console.log(values);
      actions.setSubmitting(false);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="p-fluid">
          {/* Title field */}
          <div className="p-field">
            <label htmlFor="Title">Title</label>
            {formik.errors.Title && formik.touched.Title && (
              <small className="p-error">{formik.errors.Title}</small>
            )}
            <br />
            <InputText
              id="Title"
              name="Title"
              onChange={formik.handleChange}
              value={formik.values.Title}
            />
          </div>

          {/* Images field */}
          <div className="p-field">
            <label htmlFor="Images">Hình ảnh</label>

            {formik.errors.Images && formik.touched.Images && (
              <small className="p-error">{formik.errors.Images}</small>
            )}
            <br />
            <FileUpload
              id="Images"
              name="Images"
              mode="basic"
              accept="image/jpeg,image/png"
              maxFileSize={10000000} // 10MB
              onSelect={(e) => formik.setFieldValue("Images", e.files[0])}
            />
          </div>

          {/* Description field */}
          <div className="p-field">
            <label htmlFor="Description">Miêu tả dự án</label>
            <br />
            {formik.errors.Description && formik.touched.Description && (
              <small className="p-error">{formik.errors.Description}</small>
            )}
            <br />
            <InputTextarea
              id="Description"
              name="Description"
              onChange={formik.handleChange}
              value={formik.values.Description}
            />
          </div>

          {/* Privacy field */}
          <div className="p-field">
            <label htmlFor="Privacy">Hiển thị với</label>
            {formik.errors.Privacy && formik.touched.Privacy && (
              <small className="p-error">{formik.errors.Privacy}</small>
            )}
            <br />
            <Dropdown
              id="Privacy"
              name="Privacy"
              options={privacyOptions}
              onChange={formik.handleChange}
              value={formik.values.Privacy}
            />
          </div>

          {/* Tags field */}
          <div className="p-field">
            <label htmlFor="Tags">Thẻ (từ 1 đến 10 thẻ)</label>
            {formik.errors.Tags && formik.touched.Tags && (
              <small className="p-error">{formik.errors.Tags}</small>
            )}
            <br />
            <Chips
              id="Tags"
              name="Tags"
              value={formik.values.Tags}
              onChange={(e) => formik.setFieldValue("Tags", e.value)}
            />
          </div>

          {/* Category field */}
          <div className="p-field">
            <label htmlFor="Category">Thể loại</label>
            {formik.errors.Category && formik.touched.Category && (
              <small className="p-error">{formik.errors.Category}</small>
            )}
            <br />
            <Dropdown
              id="Category"
              name="Category"
              options={categoryOptions}
              onChange={formik.handleChange}
              value={formik.values.Category}
            />
          </div>

          {/* Assets field */}
          <div className="p-field">
            <label htmlFor="Assets">Nguồn đính kèm</label>
            <FileUpload
              id="Assets"
              name="Assets"
              mode="basic"
              accept="*"
              maxFileSize={50000000} // 50MB
              onSelect={(e) => formik.setFieldValue("Assets", e.files[0])}
            />
          </div>

          <div className="p-field">
            <Button
              type="submit"
              label="Submit"
              disabled={!formik.isValid}
              className="p-button-success"
            />
          </div>
        </div>
      </form>
    </>
  );
}

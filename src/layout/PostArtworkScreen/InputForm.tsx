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
    Images: null,
    Description: "",
    Privacy: "Public",
    Tags: [],
    Category: null,
    Assets: null,
  };

  const validationSchema = Yup.object().shape({
    Images: Yup.mixed()
      .test(
        "fileType",
        "Invalid file type. Only jpg/png allowed.",
        (value: any) => {
          if (value && value.name) {
            const extension = value.name.split(".").pop().toLowerCase();
            return extension === "jpg" || extension === "png";
          }
          return true; // If no file is selected, assume validation pass
        }
      )
      .required("Images are required"),
    Description: Yup.string().required("Description is required"),
    Privacy: Yup.string().required("Privacy is required"),
    Tags: Yup.array().min(1, "Please enter at least one tag"),
    Category: Yup.string().required("Category is required"),
    Assets: Yup.mixed(),
  });

  const privacyOptions = [
    { label: "Public", value: "Public" },
    { label: "Private", value: "Private" },
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
          <div className="p-field">
            <label htmlFor="Images">Images</label>

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

          <div className="p-field">
            <label htmlFor="Description">Description</label>
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

          <div className="p-field">
            <label htmlFor="Privacy">Privacy</label>
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

          <div className="p-field">
            <label htmlFor="Tags">Tags</label>
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

          <div className="p-field">
            <label htmlFor="Category">Category</label>
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

          <div className="p-field">
            <label htmlFor="Assets">Assets</label>
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

import "./InputForm.scss";
import { maxNumberOfCategories, maxNumberOfTags } from "../../../const/bizConstants";
import {
  InputText,
  InputTextarea,
  Dropdown,
  Chips,
  Button,
  MultiSelect,
  useFormik,
} from "../../index";
import MultipleFileUpload from "../MultipleFileUpload/MultipleFileUpload";
import { initialValues, validationSchema } from "./FormikData";
import React from "react";

// type Props = {
//   privacyOptions: [option];
//   categoryOptions: [option];
//   submitFormCallback: (values: any) => void;
// };
type Props = {
  uploadedFiles: any;
  setUploadedFiles: (data: any) => void;
  data: {};
  setData: (data: any) => void;
};
export default function InputForm({ uploadedFiles, setUploadedFiles, data, setData }: Props) {
  const privacyOptions = [
    { label: "Công khai", value: "Public" },
    { label: "Riêng tư", value: "Private" },
  ];

  const categoryOptions = [
    { label: "category 1", value: "category 1" },
    { label: "category 2", value: "category 2" },
    { label: "category 3", value: "category 3" },
    { label: "category 4", value: "category 4" },
  ];

  const formik: any = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const renderError = (field: any) => {
    return formik.touched[field] && formik.errors[field] ? (
      <small className="p-error">{formik.errors[field]}</small>
    ) : null;
  };

  React.useEffect(() => {
    setData(formik.values); // Update the data whenever formik values change
  }, [formik.values, setData]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="inner-form-container">
          {/* images field */}
          <div className="p-field">
            {renderError("images")}
            <br />
            <MultipleFileUpload
              isImagesOnly={true}
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
            />
          </div>

          {/* title field */}
          <div className="p-field">
            <label htmlFor="title">Tiêu đề</label>
            {renderError("title")}
            <br />
            <InputText
              {...formik.getFieldProps("title")}
              placeholder="Đây là ..."
              className="w-full"
            />
          </div>

          {/* description field */}
          <div className="p-field">
            <label htmlFor="description">Miêu tả dự án</label>
            {renderError("description")}
            <br />
            <InputTextarea
              {...formik.getFieldProps("description")}
              placeholder="Nói về ..."
              className="w-full"
            />
          </div>

          {/* privacy field */}
          <div className="p-field">
            <label htmlFor="privacy">Hiển thị với</label>
            {renderError("privacy")}
            <br />
            <Dropdown
              id="privacy"
              name="privacy"
              options={privacyOptions}
              {...formik.getFieldProps("privacy")}
              onChange={formik.handleChange}
              value={formik.values.privacy}
              className="w-full"
            />
          </div>

          {/* tags field */}
          <div className="p-field">
            <label htmlFor="tags">Thẻ (từ 1 đến {maxNumberOfTags} thẻ)</label>
            {renderError("tags")}
            <br />
            <Chips
              id="tags"
              name="tags"
              max={maxNumberOfTags}
              value={formik.values.tags}
              onChange={(e) => formik.setFieldValue("tags", e.value)}
              {...formik.getFieldProps("tags")}
              placeholder='Nhấn phím "Enter" để phân tách giữa các thẻ'
              className="w-full"
            />
          </div>

          {/* category field */}
          <div className="p-field">
            <label htmlFor="category">Thể loại</label>
            {renderError("category")}
            <br />
            <MultiSelect
              id="category"
              name="category"
              options={categoryOptions}
              value={formik.values.category}
              selectionLimit={maxNumberOfCategories}
              onChange={(e) => formik.setFieldValue("category", e.value)}
              {...formik.getFieldProps("category")}
              className="w-full"
            />
          </div>

          {/* Assets field */}
          <div className="p-field">
            <label htmlFor="Assets">Nguồn đính kèm</label>
            <MultipleFileUpload
              isImagesOnly={false}
              uploadedFiles={{}}
              setUploadedFiles={() => {}}
            />
          </div>

          <div className="p-field">
            <Button type="submit" label="Lưu" disabled={!formik.isValid} className="w-4" rounded />
          </div>
        </div>
      </form>
    </>
  );
}

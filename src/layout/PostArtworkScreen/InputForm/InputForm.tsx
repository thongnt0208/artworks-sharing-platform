import { useEffect, useRef, useState } from "react";
import { getCategoriesList, postArtwork } from "../Service";
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
  Toast,
} from "../../index";
import MultipleFileUpload from "../MultipleFileUpload/MultipleFileUpload";
import { initialValues, validationSchema } from "./FormikData";
import MultipleAssetUpload from "../MultipleAssetUpload/MultipleAssetUpload";

type Props = {
  uploadedFiles: any;
  setUploadedFiles: (data: any) => void;
  data: {};
  setData: (data: any) => void;
};
export default function InputForm({ uploadedFiles, setUploadedFiles, data, setData }: Props) {
  const [categoriesOptions, setcategoriesOptions] = useState([] as any);
  const [isLoading, setisLoading] = useState(false);
  const toast: any = useRef(null);

  const privacyOptions = [
    { label: "Công khai", value: 0 },
    { label: "Riêng tư", value: 1 },
  ];

  const formik: any = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const modifiedValues = values;
      modifiedValues.thumbnail = values.images[0];
      console.log(modifiedValues);
      setisLoading(true);

      // Call API to post
      postArtwork(modifiedValues)
        .then((response) => {
          console.log(response);
          formik.resetForm();
          setUploadedFiles([]);
          toast.current.show({
            severity: "success",
            summary: "Đăng bài thành công",
            detail: "Bài đăng đã được đăng tải lên hệ thống.",
          });
        })
        .catch((err) => {
          console.log("Post err: ", err);
          toast.current.show({
            severity: "error",
            summary: "Đã xảy ra lỗi",
            detail: "Vui lòng thử lại sau ít phút.",
          });
        })
        .finally(() => {
          setisLoading(false);
        });
    },
  });

  const renderError = (field: any) => {
    return formik.touched[field] && formik.errors[field] ? (
      <small className="p-error">{formik.errors[field]}</small>
    ) : null;
  };

  useEffect(() => {
    setData(formik.values); // Update the data whenever formik values change
  }, [formik.values, setData]);

  useEffect(() => {
    getCategoriesList().then((res) => {
      console.log("cate", res);
      setcategoriesOptions(res);
    });
  }, []);

  return (
    <>
      <Toast ref={toast} />
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
              onFormChange={(file: any) => formik.setFieldValue("images", file)}
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
              placeholder='Nhấn phím "Enter" để phân tách giữa các thẻ'
              className="w-full"
            />
          </div>

          {/* categories field */}
          <div className="p-field">
            <label htmlFor="categories">Thể loại</label>
            {renderError("categories")}
            <br />
            <MultiSelect
              id="categories"
              name="categories"
              options={categoriesOptions}
              value={formik.values.categories}
              selectionLimit={maxNumberOfCategories}
              onChange={(e) => formik.setFieldValue("categories", e.value)}
              {...formik.getFieldProps("categories")}
              className="w-full"
            />
          </div>

          {/* Assets field */}
          <div className="p-field">
            <label htmlFor="Assets">Nguồn đính kèm</label>
            <MultipleAssetUpload
              onFormChange={(assets: any) => formik.setFieldValue("assets", assets)}
            />
          </div>

          <div className="p-field">
            <Button
              type="submit"
              label="Lưu"
              disabled={!formik.isValid}
              loading={isLoading}
              className="w-4"
              rounded
            />
          </div>
        </div>
      </form>
    </>
  );
}

import { Checkbox } from "primereact/checkbox";
import {
  useFormik,
  Button,
  Calendar,
  Dropdown,
  InputNumber,
  InputText,
  InputTextarea,
  Slider,
} from "../../../index";
import { ProposalFormProps } from "../../ChatRelatedTypes";
import { useEffect, useState } from "react";
import { getCategoriesList } from "../../../PostArtworkScreen/Service";
import { CategoryProps } from "../../../HomeScreen/HomeScreen";
import { initialValues, validationSchema } from "./ProposalFormUtils";
import "./ProposalForm.scss";
import FeesInfo from "../../../../components/FeesInfo";

export default function ProposalForm({ createProposalCallback }: ProposalFormProps) {
  const [categoriesOptions, setcategoriesOptions] = useState([] as CategoryProps[]);
  let today = new Date();
  today.setDate(today.getDate() + 1);
  const serviceId = localStorage.getItem("serviceId");
  // Added type annotation for Proposal component
  const formik: any = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission logic here
      createProposalCallback({ ...values, serviceId });
    },
  });

  const renderError = (field: any) => {
    return formik.touched[field] && formik.errors[field] ? (
      <small className="p-error">{formik.errors[field]}</small>
    ) : null;
  };

  useEffect(() => {
    getCategoriesList().then((res) => setcategoriesOptions(res));
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className="create-proposal-form flex flex-column gap-3">
      {/* title field */}
      <div className="p-field">
        <label htmlFor="title">Tên dự án</label>
        {renderError("title")}
        <br />
        <InputText id="title" {...formik.getFieldProps("title")} className="w-full" />
      </div>

      {/* description field */}
      <div className="p-field">
        <label htmlFor="description">Mô tả dự án</label>
        {renderError("description")}
        <br />
        <InputTextarea
          id="description"
          {...formik.getFieldProps("description")}
          className="w-full"
        />
      </div>

      {/* category field */}
      <div className="p-field">
        <label htmlFor="category">Thể loại</label>
        {renderError("category")}
        <br />
        <Dropdown
          id="category"
          {...formik.getFieldProps("category")}
          options={categoriesOptions}
          optionLabel="label"
          placeholder="Chọn một thể loại"
          className="w-full"
        />
      </div>

      {/* targetDelivery field */}
      <div className="p-field">
        <label htmlFor="targetDelivery">Thời gian nhận</label>
        <Calendar
          id="targetDelivery"
          {...formik.getFieldProps("targetDelivery")}
          showIcon
          className="w-full"
          minDate={today}
        />
      </div>

      {/* totalPrice field */}
      <div className="p-field">
        <label htmlFor="totalPrice">Chi phí</label>
        {renderError("totalPrice")}
        <br />
        <InputNumber
          id="totalPrice"
          value={formik.values.totalPrice}
          onChange={(e: any) => {
            formik.setFieldValue("totalPrice", e.value);
          }}
          className="w-full"
        />
      </div>

      {/* depositPercent field */}
      <div className="p-field">
        <label htmlFor="depositPercent">Phần trăm đặt cọc</label>
        {renderError("depositPercent")}
        <br />
        <InputNumber
          id="depositPercent"
          value={formik.values.depositPercent * 100}
          onChange={(e: any) => {
            formik.setFieldValue("depositPercent", e.value / 100);
          }}
          min={10}
          max={100}
          className="w-full"
        />
        <Slider
          id="depositPercent"
          value={formik.values.depositPercent * 100}
          onChange={(e: any) => {
            formik.setFieldValue("depositPercent", e.value / 100);
          }}
          min={10}
          max={100}
          className="w-full"
        />
      </div>

      {/* Fees */}
      {formik.values.totalPrice > 0 && (
        <div className="p-field">
          <label>Biểu phí</label>
          <FeesInfo totalAmount={formik.values.totalPrice} />
        </div>
      )}

      {/* Must choose checkboxes to accept platform rules */}
      <div className="p-field flex gap-1 align-items-center">
        <Checkbox
          inputId="acceptRules"
          checked={formik.values.acceptRules}
          onChange={() => formik.setFieldValue("acceptRules", !formik.values.acceptRules)}
        />
        <label htmlFor="acceptRules">
          Tôi đồng ý với các <a href="/rules">quy định</a> của nền tảng
        </label>
      </div>

      <div className="p-field flex justify-content-center pb-3">
        <Button type="submit" label="Xác nhận" disabled={!formik.isValid} className="w-4" rounded />
      </div>
    </form>
  );
}

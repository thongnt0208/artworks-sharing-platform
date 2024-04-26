import * as Yup from "yup";

export const initialValues = {
  title: "",
  category: "string",
  description: "",
  targetDelivery: new Date(),
  numberOfConcept: 0,
  numberOfRevision: 0,
  depositPercent: 0.1,
  totalPrice: 0,
  acceptRules: false,
};

export const validationSchema = Yup.object().shape({
  title: Yup.string().required(" không được bỏ trống"),
  category: Yup.string().required(" không được bỏ trống"),
  description: Yup.string().required(" không được bỏ trống"),
  targetDelivery: Yup.date()
    .required(" không được bỏ trống")
    .min(new Date(), "Ngày giao hàng phải là trong tương lai"),
  numberOfConcept: Yup.number()
    .min(0, "Số lượng không được âm")
    .integer("Số lượng phải là số nguyên")
    .required(" không được bỏ trống"),
  numberOfRevision: Yup.number()
    .min(0, "Số lượng không được âm")
    .integer("Số lượng phải là số nguyên")
    .required(" không được bỏ trống"),
  depositPercent: Yup.number()
    .min(0, "Phần trăm không được âm")
    .max(1, "Phần trăm không thể lớn hơn 100%")
    .required(" không được bỏ trống"),
  totalPrice: Yup.number().min(0, "Giá không được âm").required(" không được bỏ trống"),
  acceptRules: Yup.boolean().oneOf([true], "Bạn phải đồng ý với quy định của nền tảng"),
});

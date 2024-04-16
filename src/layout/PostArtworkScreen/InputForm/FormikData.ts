import * as Yup from "yup";

export const initialValues = {
  title: "",
  images: [],
  thumbnail: null,
  description: "",
  privacy: 0,
  tags: [],
  categories: [],
  assets: [],
  licenseTypeId: "",
  softwareUseds: [],
  isAIGenerated: false,
};

export const validationSchema = Yup.object().shape({
  title: Yup.string().required(" không được bỏ trống"),
  description: Yup.string().required(" không được bỏ trống"),
  privacy: Yup.string().required(" không được bỏ trống"),
  tags: Yup.array().min(1, "Phải có ít nhất 1 thẻ."),
  categories: Yup.array().required(" không được bỏ trống"),  
});

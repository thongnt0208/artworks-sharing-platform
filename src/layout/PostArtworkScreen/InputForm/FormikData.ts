import * as Yup from "yup";

export const initialValues = {
  id: "", // Initial value for id
  createdBy: "", // Initial value for createdBy
  title: "",
  // images: [],
  description: "",
  privacy: "Public",
  tags: [],
  category: [],
  // assets: [],
};

export const validationSchema = Yup.object().shape({
  title: Yup.string().required(" không được bỏ trống"),
  // images: Yup.array()
  //   .test("fileType", "Loại file không hợp lệ. Chỉ chấp nhận jpg/png.", (value: any) => {
  //     if (value && value.name) {
  //       const extension = value.name.split(".").pop().toLowerCase();
  //       return extension === "jpg" || extension === "png";
  //     }
  //     return true; // If no file is selected, assume validation pass
  //   })
  //   .required(" không được bỏ trống"),
  description: Yup.string().required(" không được bỏ trống"),
  privacy: Yup.string().required(" không được bỏ trống"),
  tags: Yup.array().min(1, "Phải có ít nhất 1 thẻ."),
  category: Yup.array().required(" không được bỏ trống"),
  // assets: Yup.array().notRequired(),
});

import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  serviceName: Yup.string().required("Tên dịch vụ là bắt buộc"),
  description: Yup.string().required("Mô tả dịch vụ là bắt buộc"),
  deliveryTime: Yup.string().required("Thời gian hoàn thành là bắt buộc"),
  numberOfConcept: Yup.number().required("Số lượng thể loại là bắt buộc"),
  numberOfRevision: Yup.number().required("Số lần chỉnh sửa là bắt buộc"),
  startingPrice: Yup.number().required("Giá khởi điểm là bắt buộc"),
  // referenceArtworks: Yup.array().of(Yup.string()).required("Tác phẩm tham khảo là bắt buộc"),
});

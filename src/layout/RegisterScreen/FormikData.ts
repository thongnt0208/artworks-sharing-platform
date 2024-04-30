/* eslint-disable no-useless-escape */
import * as Yup from "yup";

export const initalValues = {
  username: "",
  password: "",
  confirmPassword: "",
  fullname: "",
  birthdate: null,
  acceptRules: false,
}

export const yupObject = Yup.object({
  username: Yup.string()
    .required("Tên đăng nhập không được bỏ trống")
    .min(6, "Tên đăng nhập phải có ít nhất 6 ký tự")
    .max(20, "Tên đăng nhập không được vượt quá 20 ký tự"),
  password: Yup.string()
    .required("Mật khẩu không được bỏ trống")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(20, "Mật khẩu không được vượt quá 20 ký tự"),
  confirmPassword: Yup.string()
    .required("Xác nhận mật khẩu là bắt buộc")
    .oneOf([Yup.ref("password"), ""], "Mật khẩu xác nhận phải khớp với mật khẩu đã nhập"),
  email: Yup.string().email("Địa chỉ email không hợp lệ").required("Email không được bỏ trống"),
  fullname: Yup.string()
    .required("Họ và tên không được bỏ trống")
    .matches(/^[^\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, "Họ và tên chỉ được chứa ký tự"),
  birthdate: Yup.date()
    .required("Ngày sinh không được bỏ trống")
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 12)), "Bạn phải trên 12 tuổi"),
  acceptRules: Yup.boolean().oneOf([true], "Bạn phải đồng ý với quy định của nền tảng"),
});

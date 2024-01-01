import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
// import { Register } from "../../auth/AuthService";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterScreen.scss";
import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import logo from "../../assets/logo/logo_notext.svg";
import logotext from "../../assets/logo/logo.png";
import { Card } from "primereact/card";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Password } from "primereact/password";
import { Calendar } from "primereact/calendar";
import { getAuthInfo } from "../../util/AuthUtil";

const RegisterScreen = () => {
  const  authenticationInfo = getAuthInfo();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  let today = new Date();

  const navigate = useNavigate();
  const toast: any = useRef(null);

  const handleRegister = (values: any) => {
    console.log(values);
    //   navigate("/");

    //   Register(username, password)
    //     .then((response) => {

    //     })
    //     .catch((error) => {

    //     });
  };

  const formik: any = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      fullname: "",
      birthday: null,
    },
    validationSchema: Yup.object({
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
        .oneOf(
          [Yup.ref("password"), ""],
          "Mật khẩu xác nhận phải khớp với mật khẩu đã nhập"
        ),
      email: Yup.string()
        .email("Địa chỉ email không hợp lệ")
        .required("Email không được bỏ trống"),
      fullname: Yup.string()
        .required("Họ và tên không được bỏ trống")
        .matches(/^[^\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, "Họ và tên chỉ được chứa ký tự"),
      birthday: Yup.date().required("Ngày sinh không được bỏ trống"),
    }),
    onSubmit: (values) => {
      // Omit confirmPassword from the submitted values
      const { confirmPassword, ...submittedValues } = values;
      console.log("Form submitted with values:", submittedValues);
      handleRegister(values);
    },
  });

  const pwFooter = (
    <>
      <Divider />
      <p className="mt-2">Kiến nghị</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>Ít nhất một chữ thường</li>
        <li>Ít nhất một chữ hoa</li>
        <li>Ít nhất một chữ số</li>
        <li>Tối thiểu 8 ký tự</li>
      </ul>
    </>
  );
  useEffect(() => {
    console.log(authenticationInfo);
  }, [authenticationInfo]);

  return (
    <>
      <Toast ref={toast} />
      <div className="register-container flex w-100">
        <div className="background-overlay"></div>
        <div className="logo-container p-4 hidden lg:block">
          <Image alt="logo" src={logotext} height="100" />
        </div>
        <Card className="register-card">
          <div className="header-container pb-4">
            <div className="logo flex justify-content-start lg:hidden">
              <Image alt="logo" src={logo} height="40" />
              <h3 className="m-0">Artworkia</h3>
            </div>
            <h1>Đăng ký</h1>
            <span>Người dùng cũ?</span> <Link to={"/login"}>Đăng nhập</Link>
          </div>
          <div className="normal-register">
            {/* Form begin */}
            <form onSubmit={formik.handleSubmit}>
              <div className="username-container">
                {formik.touched.username && formik.errors.username ? (
                  <small className="p-error">{formik.errors.username}</small>
                ) : null}
                <br />
                <InputText
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Tên đăng nhập"
                  maxLength={20}
                />
              </div>
              <div className="password-container">
                {formik.touched.password && formik.errors.password ? (
                  <small className="p-error">{formik.errors.password}</small>
                ) : null}
                <br />
                <Password
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  footer={pwFooter}
                  placeholder="Mật khẩu"
                  toggleMask
                />
              </div>
              <div className="confirm-password-container">
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <small className="p-error">
                    {formik.errors.confirmPassword}
                  </small>
                ) : null}
                <br />
                <Password
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  placeholder="Nhập lại mật khẩu"
                  onBlur={formik.handleBlur}
                  feedback={false}
                  lang="vi"
                />
              </div>
              <Divider />
              {/* Email InputText */}
              <div className="email-container">
                {formik.touched.email && formik.errors.email ? (
                  <small className="p-error">{formik.errors.email}</small>
                ) : null}
                <br />
                <InputText
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Email"
                />
              </div>
              {/* Fullname InputText */}
              <div className="fullname-container">
                {formik.touched.fullname && formik.errors.fullname ? (
                  <small className="p-error">{formik.errors.fullname}</small>
                ) : null}
                <br />
                <InputText
                  id="fullname"
                  name="fullname"
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Full Name"
                />
              </div>
              {/* Birthday InputText */}
              <div className="birthday-container">
                {formik.touched.birthday && formik.errors.birthday ? (
                  <small className="p-error">{formik.errors.birthday}</small>
                ) : null}
                <br />
                <Calendar
                  id="birthday"
                  name="birthday"
                  value={formik.values.birthday}
                  onChange={(e) => formik.setFieldValue("birthday", e.value)}
                  onBlur={formik.handleBlur}
                  placeholder="Birthday"
                  dateFormat="dd/mm/yy"
                  maxDate={today}
                />
              </div>
              <Button
                label="Tiếp tục"
                type="submit"
                className="mt-3"
                disabled={!formik.isValid}
              />
            </form>
            {/* Form end */}
          </div>

          <Divider />
          <div className="3party-register">
            <div className="google-register"></div>
            <div className="facebook-register"></div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default RegisterScreen;

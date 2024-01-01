import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterScreen.scss";
import logo from "../../assets/logo/logo_notext.svg";
import logotext from "../../assets/logo/logo.png";
import {  InputText,  Button,  Toast,  Divider,  Image,  Card,  useFormik,  Password,  Calendar} from "../index";
import { getAuthInfo } from "../../util/AuthUtil";
import { initalValues, yupObject } from "./FormikData";
// import { Register } from "../../auth/AuthService";

const RegisterScreen = () => {
  const authenticationInfo = getAuthInfo();
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
    initialValues: initalValues,
    validationSchema: yupObject,
    onSubmit: (values) => {
      // Omit confirmPassword from the submitted values
      const { confirmPassword, ...submittedValues } = values;
      console.log("Form submitted with values:", submittedValues);
      handleRegister(values);
    },
  });

  const renderError = (field: string) => {
    return formik.touched[field] && formik.errors[field] ? (
      <> <small className="p-error">{formik.errors[field]}</small> <br /> </>
    ) : <br />;
  };

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
                {renderError("username")}
                <InputText
                  id="username"
                  {...formik.getFieldProps("username")}
                  placeholder="Tên đăng nhập"
                  maxLength={20}
                />
              </div>
              <div className="password-container">
                {renderError("password")}
                <Password
                  id="password"
                  {...formik.getFieldProps("password")}
                  footer={pwFooter}
                  placeholder="Mật khẩu"
                  toggleMask
                />
              </div>
              <div className="confirm-password-container">
                {renderError("confirmPassword")}
                <Password
                  id="confirmPassword"
                  {...formik.getFieldProps("confirmPassword")}
                  placeholder="Nhập lại mật khẩu"
                  feedback={false}
                />
              </div>
              <Divider />
              {/* Email InputText */}
              <div className="email-container">
                {renderError("email")}
                <InputText id="email" {...formik.getFieldProps("email")} placeholder="Email" />
              </div>
              {/* Fullname InputText */}
              <div className="fullname-container">
                {renderError("fullname")}
                <InputText
                  id="fullname"
                  {...formik.getFieldProps("fullname")}
                  placeholder="Full Name"
                />
              </div>
              {/* Birthday InputText */}
              <div className="birthday-container">
                {renderError("birthday")}
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
              <Button label="Tiếp tục" type="submit" className="mt-3" disabled={!formik.isValid} />
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

import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterScreen.scss";
import logotext from "../../assets/logo/logo.png";
import { InputText, Button, Toast, Divider, Image, useFormik, Password, Calendar } from "../index";
import { getAuthInfo } from "../../util/AuthUtil";
import { initalValues, yupObject } from "./FormikData";
import { register } from "../../auth/AuthService";
import { translate2Vietnamese } from "../../util/TextHandle";

const RegisterScreen = () => {
  const authenticationInfo = getAuthInfo();
  let today = new Date();

  const navigate = useNavigate();
  const toast: any = useRef(null);

  let showToastErr = (msg: string) =>
    toast.current.show({
      severity: "error",
      summary: "Đăng ký thất bại",
      detail: msg,
    });

  const handleRegister = (formdata: any) => {
    register(formdata)
      .then((response) => {
        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Đăng ký thành công",
            detail: "Bạn đang được chuyển hướng đến trang đăng nhập!",
            life: 1500,
          });
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          console.log(response);
          // Translate the response message to Vietnamese
          translate2Vietnamese(response.response.data.errorMessage).then((errMsg) => {
            console.log(errMsg);
            if (!errMsg) errMsg = "Vui lòng thử lại sau giây lát!";
            showToastErr(errMsg);
          });
        }
      })
      .catch((err) => showToastErr("Vui lòng thử lại sau giây lát!"));
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
      <>
        {" "}
        <small className="p-error">{formik.errors[field]}</small> <br />{" "}
      </>
    ) : (
      <br />
    );
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
      <div className="register-container">
        <div className="background-overlay"></div>

        <div className="register-card-container">
          <Image alt="logo" src={logotext} height="50" />
          <div className="register-card">
            <div className="register-left">
              <h1 className="m-0">Đăng ký</h1>
              <h3 className="">Nhập thông tin để đăng ký tài khoản</h3>
            </div>
            <div className="hidden lg:block">
              <Divider layout="vertical" />
            </div>
            <div className="register-right">

              <div className="normal-register">
                {/* Form begin */}
                <form onSubmit={formik.handleSubmit}>
                  <div className="username-container -mt-3">
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
                      placeholder="Tên đầy đủ"
                    />
                  </div>
                  {/* birthdate InputText */}
                  <div className="birthdate-container">
                    {renderError("birthdate")}
                    <Calendar
                      id="birthdate"
                      name="birthdate"
                      value={formik.values.birthdate}
                      onChange={(e) => formik.setFieldValue("birthdate", e.value)}
                      onBlur={formik.handleBlur}
                      placeholder="Ngày sinh"
                      dateFormat="dd/mm/yy"
                      maxDate={today}
                    />
                  </div>
                  <div className="mt-3">
                    <span>Người dùng cũ?</span> <Link to={"/login"}>Đăng nhập</Link>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;

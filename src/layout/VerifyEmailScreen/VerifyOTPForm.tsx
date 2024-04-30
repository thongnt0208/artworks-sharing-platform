// VerifyOTPForm.tsx
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { VerifyOTP } from "./Service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const validationSchema = Yup.object({
  otp: Yup.string().required("Không được để trống mã xác thực"),
});

type Props = {
  email: string;
};

const VerifyOTPForm = ({ email }: Props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values: FormikValues) => {
    setIsLoading(true);
    VerifyOTP(email, values.otp)
      .then(() => {
        toast.success("Xác nhận email thành công");
        navigate("/register", { state: { email } });
      })
      .catch((e): void => {
        toast.error(
          <>
            <strong>Đã xảy ra lỗi</strong> <br /> <span>{JSON.stringify(e)}</span>
          </>
        );
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Formik
      initialValues={{ otp: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="flex flex-column gap-1">
          <p>Mã xác thực đã được gửi đến email của bạn</p>
          <InputText
            placeholder="Nhập mã xác thực"
            name="otp"
            value={values.otp}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.otp && errors.otp && (
            <small style={{ color: "red" }}>{errors.otp}</small>
          )}
          <Button type="submit" loading={isLoading}>Xác nhận</Button>
        </form>
      )}
    </Formik>
  );
};

export default VerifyOTPForm;
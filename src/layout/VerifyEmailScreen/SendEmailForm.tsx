// SendEmailForm.tsx
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { SendEmailToVerify } from "./Service";
import { toast } from "react-toastify";
import { useState } from "react";

const validationSchema = Yup.object({
  email: Yup.string().email("Địa chỉ email không hợp lệ").required("Không được để trống email"),
});

type Props = {
  onEmailSent: (email: string) => void;
};

const SendEmailForm = ({ onEmailSent }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (values: FormikValues) => {
    SendEmailToVerify(values.email)
      .then(() => {
        onEmailSent(values.email);
        toast.success("Mã xác thực đã được gửi đến email của bạn");
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
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-column gap-1">
            <InputText
              placeholder="Nhập email của bạn"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              keyfilter="email"
            />
            {touched.email && errors.email && (
              <small style={{ color: "red" }}>{errors.email}</small>
            )}
            <Button type="submit" loading={isLoading}>Gửi mã xác thực</Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SendEmailForm;

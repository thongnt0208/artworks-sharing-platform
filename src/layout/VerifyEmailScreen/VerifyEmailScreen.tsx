import { useState } from "react";
import SendEmailForm from "./SendEmailForm";
import VerifyOTPForm from "./VerifyOTPForm";

type Props = {};

export default function VerifyEmailScreen({ ...props }: Props) {
  const [email, setEmail] = useState("");

  const handleEmailSent = (sentEmail: string) => {
    setEmail(sentEmail);
  };

  return (
    <div className="w-full h-full flex flex-column align-items-center justify-content-center">
      <h1>Xác nhận email</h1>
      <p>Vui lòng nhập email của bạn để nhận mã xác thực</p>
      {email === "" ? (
        <SendEmailForm onEmailSent={handleEmailSent} />
      ) : (
        <VerifyOTPForm email={email} />
      )}
    </div>
  );
}
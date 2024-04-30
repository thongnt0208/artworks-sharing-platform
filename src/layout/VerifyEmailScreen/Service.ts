import axios from "axios";
import { BASE_URL } from "../../service";

/**
 * This function is used to send an email to verify the email address
 * 
 * @param email - The email address to send the verification email
 * @returns The response data
 * @throws Error
 * @author @thongnt0208
 * @version 1.0.0
 */
export async function SendEmailToVerify(email: string) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/send-email-verification`, { email: email });
    return response.data;
  } catch (e) {
    console.log("Error at SendEmailToVerify: ", e);
  }
}

/**
 * This function is used to verify the OTP code
 * 
 * @param email - The email address to verify
 * @param otp - The OTP code
 * @returns The response data
 * @throws Error
 * @author @thongnt0208
 * @version 1.0.0
 */
export async function VerifyOTP(email: string, otp: string) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/verify-email`, {
      email: email,
      verificationCode: otp,
    });
    return response.data;
  } catch (e) {
    console.log("Error at VerifyOTP: ", e);
  }
}

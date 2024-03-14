import axios from "axios";
import { getAuthInfo } from "../../util/AuthUtil";
import { axiosPrivate } from "../../hooks/useAxios";
const API_URL = process.env.REACT_APP_REAL_API_BASE_URL;

const accessToken = getAuthInfo()?.accessToken || "";
const refreshToken = getAuthInfo()?.refreshToken || "";

/**
 *
 * Retrieves profile data for a given account ID.
 *
 * @param accountId - The ID of the account to retrieve profile data for.
 * @returns A Promise that resolves to the profile data, or an empty array if there was an error.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetProfileData(accountId: string) {
  try {
    const response = await axios.get(`${API_URL}/accounts/${accountId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken || refreshToken}`,
      },
    });
    if (response.status !== 200) {
      console.log("Error fetching profile data");
      return [];
    }
    return response.data;
  } catch (error) {
    console.log("Error fetching profile data:", error);
    return [];
  }
}

/**
 * 
 * Sends a request message to a receiver.
 * 
 * @param receiverId - The ID of the message receiver.
 * @param text - The content of the message.
 * @returns A Promise that resolves to the response data if the request is successful, otherwise an empty object.
 * @author AnhDH
 * @version 1.0.0
 */
export async function SendRequestMessage(receiverId: string, text: string) {
  try {
    const response = await axiosPrivate.post(`${API_URL}/messages`, {
      receiverId,
      text,
    });
    if (response.status !== 200) {
      console.log("Error sending request message");
      return {};
    }
    return response.data;
  } catch (error) {
    console.log("Error sending request message:", error);
  }
}

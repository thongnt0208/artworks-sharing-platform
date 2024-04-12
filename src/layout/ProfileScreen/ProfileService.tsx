import { axiosPrivate } from "../../hooks/useAxios";

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
    const response = await axiosPrivate.get(`/accounts/${accountId}`);
    if (response.status !== 200) {
      console.log("Error fetching profile data");
      return {};
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
export async function SendRequestMessage(receiverId: string, text: string): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("receiverId", receiverId);
    formData.append("text", text);
    return axiosPrivate.post("/messages", formData);
  } catch (error) {
    return Promise.reject("Error sending request message");
  }
}

import axios from "axios";
import { getAuthInfo } from "../../../util/AuthUtil";
const API_URL = process.env.REACT_APP_REAL_API_BASE_URL;

const accessToken = getAuthInfo()?.accessToken || "";
const refreshToken = getAuthInfo()?.refreshToken || "";

/**
 * Get Services from database by accountId
 *
 * @description This function get Services from database by accountId
 * @returns response - Response of axios request
 * @example
 * @author AnhDh
 * @version 1.0.0
 */
export async function GetServicesData(accountId: string) {
    try {
      const response = await axios.get(`${API_URL}/accounts/${accountId}/services`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken || refreshToken}`,
        },
      });
      if (response.status !== 200) {
        console.log("Error fetching artworks data");
        return [];
      }
      console.log("Success fetching collection data", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching artworks data:", error);
      return [];
    }
  }

/**
 * Delete a Service
 *
 * @description This function delete a Service 
 * @returns response - Response of axios request
 * @example
 * @author AnhDh
 * @version 1.0.0
 */
export async function DeleteServiceData(serviceId: string) {
  try {
    await axios.delete(
      `${API_URL}/services/${serviceId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken || refreshToken}`,
        },
      }
    );
    return true;
  } catch (error) {
    return false;
  }
}
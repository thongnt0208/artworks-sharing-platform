import axios from "axios";
import { getAuthInfo } from "../../../util/AuthUtil";
import { axiosPrivate } from "../../../hooks/useAxios";
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
    const response = await axios.get(
      `${API_URL}/accounts/${accountId}/services`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken || refreshToken}`,
        },
      }
    );
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
 * Create a Service
 *
 * @description This function create a new Service
 * @param service - Service object
 * @returns response - Response of axios request
 * @example
 * @author AnhDh
 * @version 1.0.0
 */
export async function CreateServiceData(formValue: any): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("serviceName", formValue.serviceName);
    formData.append("description", formValue.description);
    formData.append("deliveryTime", formValue.deliveryTime);
    formData.append("numberOfConcept", formValue.numberOfConcept);
    formData.append("numberOfRevision", formValue.numberOfRevision);
    formData.append("startingPrice", formValue.startingPrice);
    formData.append("thumbnail", formValue.thumbnail);
    formData.append("ArtworkReference", formValue.referenceArtworks);
    return axiosPrivate.post("/services", formData);
  } catch {
    return Promise.reject("Error fetching categories");
  }
}

/**
 * 
 * Updates the service data with the provided form values.
 * 
 * @param formValue - The form values containing the updated service data.
 * @param serviceId - The ID of the service to be updated.
 * @returns A promise that resolves to the updated service data, or rejects with an error message.
 * @author AnhDH 
 * @version 1.0.0
 */
export async function UpdateServiceData(formValue: any, serviceId: string): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("serviceName", formValue.serviceName);
    formData.append("description", formValue.description);
    formData.append("deliveryTime", formValue.deliveryTime);
    formData.append("numberOfConcept", formValue.numberOfConcept);
    formData.append("numberOfRevision", formValue.numberOfRevision);
    formData.append("startingPrice", formValue.startingPrice);
    formData.append("thumbnail", formValue.thumbnail);
    return axiosPrivate.put(
      `/services/${serviceId}`,
      formData
    );
  } catch (error) {
    return Promise.reject("Error updating service");
  }
}

/**
 * Delete a Service
 *
 * @description This function delete a Service
 * @param serviceId - Id of service
 * @returns response - Response of axios request
 * @example
 * @author AnhDh
 * @version 1.0.0
 */
export async function DeleteServiceData(serviceId: string) {
  try {
    await axios.delete(`${API_URL}/services/${serviceId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken || refreshToken}`,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
}

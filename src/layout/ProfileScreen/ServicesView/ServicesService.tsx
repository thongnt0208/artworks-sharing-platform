import axios, { axiosPrivate } from "../../../hooks/useAxios";
import { ServiceReviewProps } from "../../../components/ServiceReviewPopup";

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
    const response = await axiosPrivate.get(`/accounts/${accountId}/services`);
    if (response.status !== 200) {
      console.log("Error fetching artworks data");
      return [];
    }
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
    formValue.referenceArtworks.map((id: string) =>
      formData.append("ArtworkReference", id)
    );
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
export async function UpdateServiceData(
  formValue: any,
  serviceId: string
): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("serviceName", formValue.serviceName);
    formData.append("description", formValue.description);
    formData.append("deliveryTime", formValue.deliveryTime);
    formData.append("numberOfConcept", formValue.numberOfConcept);
    formData.append("numberOfRevision", formValue.numberOfRevision);
    formData.append("startingPrice", formValue.startingPrice);
    formData.append("thumbnail", formValue.thumbnail);
    formValue.referenceArtworks.map((id: string) =>
      formData.append("ArtworkReference", id)
    );
    return axiosPrivate.put(`/services/${serviceId}`, formData);
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
    await axiosPrivate.delete(`/services/${serviceId}`);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 *
 * Creates a new request data.
 *
 * @param serviceId - The ID of the service.
 * @param message - The message for the request.
 * @param timeline - The timeline for the request.
 * @param budget - The budget for the request.
 * @returns A boolean indicating whether the request was successfully sent.
 * @author AnhDH
 * @version 1.0.0
 */
export async function CreateNewRequestData(
  serviceId: string,
  message: string,
  timeline: string,
  budget: number
) {
  try {
    const response = await axiosPrivate.post(`/requests`, {
      serviceId,
      message,
      timeline,
      budget,
    });
    if (response.status !== 200) {
      console.log("Error sending request message");
      return {};
    }
    return true;
  } catch (error) {
    console.log("Error sending request message:", error);
    return error;
  }
}

export async function GetReviewOfServiceData(
  serviceId: string
): Promise<ServiceReviewProps[]> {
  try {
    const response = await axios.get(`/services/${serviceId}/reviews`);
    if (response.status !== 200) {
      return [];
    } else {
      let serviceReview: ServiceReviewProps[] = [];
      if (Array.isArray(response.data.items)) {
        serviceReview = response.data.items.map((review: any) => ({
          id: review.id,
          proposalId: review.proposalId,
          vote: review.vote,
          detail: review.detail,
          createdOn: review.createdOn,
          account: {
            id: review.account.id,
            username: review.account.username,
            email: review.account.email,
            fullname: review.account.fullname,
            avatar: review.account.avatar,
          },
        }));
      }
      return serviceReview;
    }
  } catch (error) {
    throw new Error("Error fetching service reviews");
  }
}
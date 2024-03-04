import { notificationItemType } from "../../../components/Notification";
import useAxios, { axiosPrivate } from "../../../hooks/useAxios";

export type RequestItemType = {
  id: string;
  serviceId: string;
  message: string;
  timeline: string;
  price: string;
  requestStatus: string;
  createdBy: string;
  createdOn: string;
  service?: string;
};

function mapRequestData(response: any): RequestItemType {
  return {
    id: response?.data?.id,
    serviceId: response?.data?.serviceId,
    message: response?.data?.message,
    timeline: response?.data?.timeline,
    price: response?.data?.price,
    requestStatus: response?.data?.requestStatus,
    createdBy: response?.data?.createdBy,
    createdOn: response?.data?.createdOn,
    service: response?.data?.service,
  };
}

/**
 * This function is used to get all requests made from others to current account
 *
 * @returns {Promise<notificationItemType[]>} an array of requests
 * @throws {Error} an error from the API request
 * @example
 *  const messages = await GetRequestsByCreator();
 *  console.log(messages);
 * @author ThongNT
 * @version 1.0.0
 */
export async function GetRequestsByCreator(): Promise<notificationItemType[]> {
  return axiosPrivate
    .get(`/requests/creator`)
    .then((response) => {
      return response.data.map((item: any) => ({
        notificationId: item.id || "",
        content: item.message || "",
        notifyType: "request",
        isSeen: false,
        creationDate: item.createdOn || "",
      }));
    })
    .catch((error) => {
      console.error("Error fetching messages:", error);
      throw error;
    });
}

/**
 * This function is used to get all requests made by current account
 *
 * @returns {Promise<notificationItemType[]>} an array of requests
 * @throws {Error} an error from the API request
 * @example
 *  const messages = await GetRequestsByCreator();
 *  console.log(messages);
 * @author ThongNT
 * @version 1.0.0
 */
export async function GetRequestsByAudience(): Promise<notificationItemType[]> {
  return axiosPrivate
    .get(`/requests/audience`)
    .then((response) => {
      return response.data.map((item: any) => ({
        notificationId: item.id || "",
        content: item.message || "",
        notifyType: "request",
        isSeen: false,
        creationDate: item.createdOn || "",
      }));
    })
    .catch((error) => {
      console.error("Error fetching messages:", error);
      throw error;
    });
}

/**
 * This function is used to get a request by its id
 *
 * @param requestId - the id of the request
 * @returns {Promise<RequestItemType>} - the request detail
 * @throws {Error} an error from the API request
 * @example
 * const request = await GetRequestById("123");
 * console.log(request);
 * @author ThongNT
 * @version 1.0.0
 */
export async function GetRequestById(requestId: string): Promise<RequestItemType> {
  return useAxios
    .get(`/requests/${requestId}`)
    .then((response) => {
      return mapRequestData(response);
    })
    .catch((error) => {
      console.error("Error fetching request:", error);
      throw error;
    });
}

/**
 * This function is used to update the status of a request
 *
 * @param requestId: string - the id of the request
 * @param status: number - the status of the request (0: waiting, 1: accepted, 2: denied)
 * @returns {Promise<RequestItemType>} - the updated request detail
 * @throws {Error} an error from the API request
 * @example
 * const updatedRequest = await UpdateRequestStatus("123", 1);
 * console.log(updatedRequest);
 * @author ThongNT
 * @version 1.0.0
 */
export async function UpdateRequestStatus(
  requestId: string,
  status: number
): Promise<RequestItemType> {
  return axiosPrivate
    .put(`/requests/status/${requestId}`, status, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return mapRequestData(response);
    })
    .catch((error) => {
      console.error("Error updating request status:", error);
      throw error;
    });
}

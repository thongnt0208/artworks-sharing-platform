import { notificationItemType } from "../../../components/Notification";
import useAxios, { axiosPrivate } from "../../../hooks/useAxios";
import { ProposalType, RequestItemType } from "../ChatRelatedTypes";

function mapRequestData(response: any): RequestItemType {
  return {
    id: response?.id,
    serviceId: response?.serviceId,
    message: response?.message,
    timeline: response?.timeline,
    price: response?.price || response?.budget,
    requestStatus: response?.requestStatus,
    createdBy: response?.createdBy,
    createdOn: response?.createdOn,
    service: response?.service,
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
      return response.data.map((item: any) => mapRequestData(item));
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
      return response.data.map((item: any) => (mapRequestData(item)));
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
    .then((response) => response?.data?.mapRequestData(response))
    .catch((error) => {
      console.error("Error fetching request:", error);
      throw error;
    });
}

/**
 * This function is used to get all requests of a chatbox
 * 
 * @param chatboxId - the id of the chatbox
 * @returns {Promise<RequestItemType[]>} - an array of requests
 * @throws {Error} an error from the API request
 * @example
 * const requests = await GetRequestsByChatboxId("123");
 * console.log(requests);
 * @version 1.0.0
 * @author ThongNT
 */
export async function GetRequestsByChatboxId(chatboxId: string): Promise<RequestItemType[]> {
  return axiosPrivate
    .get(`/chatboxs/${chatboxId}/requests`)
    .then((response) => {
      if (Array.isArray(response?.data)) {
        return response.data.map((item: any) => mapRequestData(item));
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error("Error fetching requests:", error);
      throw error;
    });
}

export async function GetProposalsByChatboxId(chatboxId: string): Promise<ProposalType[]> {
  return axiosPrivate
    .get(`/chats/${chatboxId}/proposals`)
    .then((response) => {
      if (Array.isArray(response?.data)) {
        return response.data.map((item: any) => {
          return {
            id: item.id,
            chatBoxId: item.chatBoxId,
            serviceId: item.serviceId,
            projectTitle: item.projectTitle,
            category: item.category,
            description: item.description,
            targetDelivery: item.targetDelivery,
            initialPrice: item.initialPrice,
            totalPrice: item.total,
            status: item.proposalStatus,
            createdBy: item.createdBy,
            createdOn: item.createdOn,
          };
        });
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error("Error fetching proposals:", error);
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

/**
 * This function is used to create a proposal for a request
 *
 * @param createdByRequest - the id of the user who creates the request
 * @param serviceId - the id of the service
 * @param proposalInfo - the information of the proposal (e.g. price, timeline, message)
 * @returns {Promise<any>}
 * @throws {Error} an error from the API request
 * @example
 * const proposal = await CreateProposal("123", "456", { message: "I can do it", price: "1000", timeline: "1 week" });
 * console.log(proposal);
 * @author ThongNT
 * @version 1.0.0
 */
export async function CreateProposal(
  createdByRequest: string,
  serviceId: string,
  proposalInfo: any
): Promise<any> {
  return axiosPrivate
    .post(`/proposals`, {
      createdByRequest,
      serviceId,
      ...proposalInfo,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating proposal:", error);
      throw error;
    });
}

import { notificationItemType } from "../../../components/Notification";
import useAxios, { axiosPrivate } from "../../../hooks/useAxios";
import { ProposalFormType, ProposalType, RequestItemType } from "../ChatRelatedTypes";

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
      return response.data.map((item: any) => mapRequestData(item));
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

/**
 * This function is used to get all proposals of a chatbox
 *
 * @param chatboxId - the id of the chatbox
 * @returns {Promise<ProposalType[]>} - an array of proposals
 * @throws {Error} an error from the API request
 * @example
 * const proposals = await GetProposalsByChatboxId("123");
 * console.log(proposals);
 * @version 1.0.0
 * @author ThongNT
 */
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
export async function CreateProposal(value: ProposalFormType): Promise<any> {
  return axiosPrivate
    .post(`/proposals`, {
      ...value,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating proposal:", error);
      throw error;
    });
}

/**
 * This function is used to update the status of a proposal
 *
 * @param proposalId - the id of the proposal
 * @param status - the status of the proposal (Waiting = 0, Accepted = 1, Declined = 2, InitPayment = 3, CompletePayment = 4, Cancel = 5)
 * @returns {Promise<ProposalType>} - the updated proposal detail
 * @throws {Error} an error from the API request
 * @example
 * const updatedProposal = await UpdateProposalStatus("123", 1);
 * console.log(updatedProposal);
 * @version 1.0.0
 * @author ThongNT
 */
export async function UpdateProposalStatus(
  proposalId: string,
  status: number
): Promise<ProposalType> {
  return axiosPrivate
    .put(
      `/proposals/${proposalId}`,
      { status: status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return {
        id: response?.data?.id,
        chatBoxId: response?.data?.chatBoxId,
        serviceId: response?.data?.serviceId,
        projectTitle: response?.data?.projectTitle,
        category: response?.data?.category,
        description: response?.data?.description,
        targetDelivery: response?.data?.targetDelivery,
        initialPrice: response?.data?.initialPrice,
        totalPrice: response?.data?.total,
        status: response?.data?.proposalStatus,
        createdBy: response?.data?.createdBy,
        createdOn: response?.data?.createdOn,
      };
    })
    .catch((error) => {
      console.error("Error updating proposal status:", error);
      throw error;
    });
}

/**
 * This functon is used to pay the initial price of a proposal
 *
 * @param proposalId - the id of the proposal
 * @returns {Promise<any>} - the response from the API
 * @throws {Error} an error from the API request
 * @example
 * const response = await InitPaymentProposal("123");
 * console.log(response);
 * @version 1.0.0
 * @author ThongNT
 */
export async function InitPaymentProposal(proposalId: string): Promise<any> {
  return axiosPrivate
    .post(`/proposals/init-payment/${proposalId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error initializing payment:", error);
      throw error;
    });
}

/**
 * This function is used to upload an asset (concept, revision or final product) for a proposal
 * 
 * @param id - the id of the proposal
 * @param type - the type of the asset (0: concept, 1: final product, 2: revision)
 * @param file - the file to upload
 * @returns {Promise<any>} - the response from the API
 * @throws {Error} an error from the API request
 * @example
 * const response = await UploadProposalAsset("123", 0, file);
 * console.log(response);
 * @version 1.0.0
 * @author ThongNT
 */
export async function UploadProposalAsset(id: string, type: number, file: File) {
  const formData = new FormData();
  formData.append("ProposalId", id);
  formData.append("Type", type.toString());
  formData.append("File", file);
  return axiosPrivate
    .post(`/proposalassets/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error uploading asset:", error);
      throw error;
    });
}

import { notificationItemType } from "../../../components/Notification";
import useAxios, { axiosPrivate } from "../../../hooks/useAxios";
import {
  MilestoneItemType,
  ProposalAssetItemType,
  ProposalFormType,
  ProposalType,
  RequestItemType,
  ReviewItemType,
} from "../ChatRelatedTypes";
// -------------------------------------------------------------------

export function mapRequestData(response: any): RequestItemType {
  return {
    id: response?.id || response?.Id,
    serviceId: response?.serviceId || response?.ServiceId,
    message: response?.message || response?.Message,
    timeline: response?.timeline || response?.Timeline,
    price: response?.budget || response?.Budget,
    requestStatus: response?.requestStatus || response?.RequestStatus,
    createdBy: response?.createdBy || response?.CreatedBy,
    createdOn: response?.createdOn || response?.CreatedOn,
    service: response?.service || response?.Service,
  };
}

export function mapProposalData(response: any): ProposalType {
  return {
    id: response?.Id || response?.id,
    chatBoxId: response?.ChatBoxId || response?.chatBoxId,
    serviceId: response?.ServiceId || response?.serviceId,
    projectTitle: response?.ProjectTitle || response?.projectTitle,
    category: response?.Category || response?.category,
    description: response?.Description || response?.description,
    targetDelivery: response?.TargetDelivery || response?.targetDelivery,
    initialPrice: response?.InitialPrice || response?.initialPrice,
    totalPrice: response?.Total || response?.total,
    status: response?.ProposalStatus || response?.proposalStatus,
    createdBy: response?.CreatedBy || response?.createdBy,
    createdOn: response?.CreatedOn || response?.createdOn,
    isReviewed: response?.IsReviewed || response?.isReviewed,
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
 * @author @thongnt0208
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
 * @author @thongnt0208
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
 * @author @thongnt0208
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
 * @author @thongnt0208
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
 * @author @thongnt0208
 */
export async function GetProposalsByChatboxId(chatboxId: string): Promise<ProposalType[]> {
  return axiosPrivate
    .get(`/chats/${chatboxId}/proposals`)
    .then((response) => {
      if (Array.isArray(response?.data)) {
        return response.data.reverse().map((item: any) => mapProposalData(item));
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
 * @author @thongnt0208
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
 * @author @thongnt0208
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
 * @author @thongnt0208
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
 * @author @thongnt0208
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
 * This function is used to complete the payment of a proposal
 *
 * @param proposalId - the id of the proposal
 * @returns {Promise<any>} - the response from the API
 * @throws {Error} an error from the API request
 * @example
 * const response = await CompletePaymentProposal("123");
 * console.log(response);
 * @version 1.0.0
 * @author @thongnt0208
 */
export async function CompletePaymentProposal(proposalId: string): Promise<any> {
  return axiosPrivate
    .post(`/proposals/complete-payment/${proposalId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error completing payment:", error);
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
 * @author @thongnt0208
 */
export async function UploadProposalAsset(id: string, type: number, file: File): Promise<any> {
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

/**
 * This function is used to get all milestones of a proposal
 *
 * @param proposalId - the id of the proposal
 * @returns {Promise<MilestoneItemType[]>} - an array of milestones
 * @throws {Error} an error from the API request
 * @example
 * const milestones = await GetProposalMilestone("123");
 * console.log(milestones);
 * @version 1.0.0
 * @author @thongnt0208
 */
export async function GetProposalMilestone(proposalId: string): Promise<MilestoneItemType[]> {
  return axiosPrivate
    .get(`/proposals/milestones/${proposalId}`)
    .then((response) => {
      return response.data?.map((item: any) => ({
        id: item?.id,
        proposalId: item?.proposalId,
        milestoneName: item?.milestoneName,
        createdBy: item?.createdBy,
        createdOn: item?.createdOn,
        createdAccount: {
          id: item?.createdAccount?.id,
          username: item?.createdAccount?.username,
          email: item?.createdAccount?.email,
          fullname: item?.createdAccount?.fullname,
          avatar: item?.createdAccount?.avatar,
        },
      }));
    })
    .catch((error) => {
      console.error("Error fetching milestones:", error);
      throw error;
    });
}

/**
 * This function is used to get all assets of a proposal
 *
 * @param proposalId - the id of the proposal
 * @returns {Promise<ProposalAssetItemType[]>} - an array of assets
 * @throws {Error} an error from the API request
 * @example
 * const assets = await GetProposalAssets("123");
 * console.log(assets);
 * @version 1.0.0
 * @author @thongnt0208
 */
export async function GetProposalAssets(proposalId: string): Promise<ProposalAssetItemType[]> {
  return axiosPrivate
    .get(`/proposalassets/${proposalId}`)
    .then((response) => {
      return response.data?.map((item: any) => ({
        id: item.id,
        proposalId: item.proposalId,
        type: item.type,
        name: item.proposalAssetName,
        url: item.location,
        createdOn: item.createdOn,
      }));
    })
    .catch((error) => {
      console.error("Error fetching assets:", error);
      throw error;
    });
}

/**
 * This function is used to get the link of a proposal asset
 *
 * @param proposalId - the id of the proposal
 * @returns {Promise<string>} - the link of the asset
 * @throws {Error} an error from the API request
 * @example
 * const link = await GetPropoAssetLink("123");
 * console.log(link);
 * @version 1.0.0
 * @author @thongnt0208
 */
export async function GetPropoAssetLink(proposalId: string): Promise<string> {
  return axiosPrivate
    .get(`/proposalassets/download/${proposalId}`)
    .then((response) => {
      return response.data?.link;
    })
    .catch((error) => {
      console.error("Error fetching proposal asset link:", error);
      throw error;
    });
}

/**
 * This function is used to confirm a proposal
 * 
 * @param proposalId - the id of the proposal
 * @returns {Promise<any>} - the response from the API
 * @throws {Error} an error from the API request
 * @example
 * const response = await ConfirmProposal("123");
 * console.log(response);
 * @version 1.0.0
 * @author @thongnt0208
 */
export async function ConfirmProposal(proposalId: string): Promise<any> {
  return axiosPrivate
    .post(`/proposals/${proposalId}/confirm`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error confirming proposal:", error);
      throw error;
    });
}

/**
 * This function is used to get all reviews of a proposal
 *
 * @param proposalId - the id of the proposal
 * @param vote - the vote of the review
 * @param detail - the detail of the review
 * @returns {Promise<any>} - the response from the API
 * @throws {Error} an error from the API request
 * @example
 * const response = await AddReviewToProposal("123", 5, "Good job");
 * console.log(response);
 * @version 1.0.0
 * @author @thongnt0208
 */
export async function AddReviewToProposal(
  proposalId: string,
  vote: number,
  detail: string
): Promise<any> {
  return axiosPrivate
    .post("/reviews", { proposalId: proposalId, vote: vote, detail: detail })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding review:", error);
      throw error;
    });
}

/**
 * This function is used to get all reviews of a proposal
 *
 * @param proposalId - the id of the proposal
 * @returns {Promise<ReviewItemType>} - the review detail
 * @throws {Error} an error from the API request
 * @example
 * const review = await GetReviewsByProposalId("123");
 * console.log(review);
 * @version 1.0.0
 * @author @thongnt0208
 */
export async function GetReviewsByProposalId(proposalId: string): Promise<ReviewItemType> {
  return axiosPrivate
    .get(`/proposals/${proposalId}/review`)
    .then((response) => {
      let _tmp = response?.data;
      return {
        id: _tmp?.id,
        proposalId: _tmp?.proposalId,
        rating: _tmp?.vote,
        detail: _tmp?.detail,
        createdBy: _tmp?.createdBy,
        createdOn: _tmp?.createdOn,
        createdAccount: {
          id: _tmp?.account?.id,
          username: _tmp?.account?.username,
          email: _tmp?.account?.email,
          fullname: _tmp?.account?.fullname,
          avatar: _tmp?.account?.avatar,
        },
        proposal: {
          id: _tmp?.proposal?.id,
          chatBoxId: _tmp?.proposal?.chatBoxId,
          serviceId: _tmp?.proposal?.serviceId,
          projectTitle: _tmp?.proposal?.projectTitle,
          category: _tmp?.proposal?.category,
          description: _tmp?.proposal?.description,
          targetDelivery: _tmp?.proposal?.targetDelivery,
          initialPrice: _tmp?.proposal?.initialPrice,
          totalPrice: _tmp?.proposal?.total,
          status: _tmp?.proposal?.proposalStatus,
          createdBy: _tmp?.proposal?.createdBy,
          createdOn: _tmp?.proposal?.createdOn,
        },
      };
    })
    .catch((error) => {
      console.error("Error fetching reviews:", error);
      throw error;
    });
}

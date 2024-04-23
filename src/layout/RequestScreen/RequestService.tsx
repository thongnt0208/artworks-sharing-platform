import { axiosPrivate } from "../../hooks/useAxios";
import { ProposalType, RequestItemType } from "../ChatScreen/ChatRelatedTypes";

/**
 * Retrieves receive request data from the server.
 * @returns A promise that resolves to an array of RequestItemType.
 * @throws An error if there is an issue retrieving the data.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetReceiveRequestData(): Promise<RequestItemType[]> {
  try {
    const response = await axiosPrivate.get("/requests/creator");

    return response.data.map((item: any) => {
      return {
        id: item.id,
        serviceId: item.serviceId,
        chatBoxId: item.chatBoxId,
        message: item.message,
        timeline: item.timeline,
        price: item.budget,
        requestStatus: item.requestStatus,
        createdBy: item.createdBy,
        createdOn: item.createdOn,
        account: item.account,
        service: {
          id: item.service.id,
          serviceName: item.service.serviceName,
          description: item.service.description,
          deliveryTime: item.service.deliveryTime,
          numberOfConcept: item.service.numberOfConcept,
          numberOfRevision: item.service.numberOfRevision,
          startingPrice: item.service.startingPrice,
          thumbnail: item.service.thumbnail,
          averageRating: item.service.averageRating,
          createdBy: item.service.createdBy,
          createdOn: item.service.createdOn,
          lastModificatedBy: item.service.lastModificatedBy,
          lastModificatedOn: item.service.lastModificatedOn,
          deletedBy: item.service.deletedBy,
          deletedOn: item.service.deletedOn,
          account: item.service.account,
          categories: item.service.categories,
          artworkReferences: item.service.artworkReferences,
        },
      };
    });
  } catch (error) {
    throw new Error("Có lỗi xảy ra khi lấy dữ liệu yêu cầu");
  }
}

/**
 * Retrieves data for sending requests.
 * @returns A promise that resolves to an array of RequestItemType.
 * @throws An error if there is an issue retrieving the data.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetSendRequestData(): Promise<RequestItemType[]> {
  try {
    const response = await axiosPrivate.get("/requests/audience");
    return response.data.map((item: any) => {
      return {
        id: item.id,
        serviceId: item.serviceId,
        chatBoxId: item.chatBoxId,
        message: item.message,
        timeline: item.timeline,
        price: item.budget,
        requestStatus: item.requestStatus,
        createdBy: item.createdBy,
        createdOn: item.createdOn,
        account: item.account,
        service: {
          id: item.service.id,
          serviceName: item.service.serviceName,
          description: item.service.description,
          deliveryTime: item.service.deliveryTime,
          numberOfConcept: item.service.numberOfConcept,
          numberOfRevision: item.service.numberOfRevision,
          startingPrice: item.service.startingPrice,
          thumbnail: item.service.thumbnail,
          averageRating: item.service.averageRating,
          createdBy: item.service.createdBy,
          createdOn: item.service.createdOn,
          lastModificatedBy: item.service.lastModificatedBy,
          lastModificatedOn: item.service.lastModificatedOn,
          deletedBy: item.service.deletedBy,
          deletedOn: item.service.deletedOn,
          account: item.service.account,
          categories: item.service.categories,
          artworkReferences: item.service.artworkReferences,
        },
      };
    });
  } catch (error) {
    throw new Error("Có lỗi xảy ra khi lấy dữ liệu yêu cầu");
  }
}

export async function GetCreatedProposalData(accountId: string): Promise<ProposalType[]> {
  try {
    const response = await axiosPrivate.get(`/accounts/${accountId}/proposals`);

    return response.data.map((item: any) => {
      return {
        id: item.id,
        ordererId: item.ordererId,
        chatBoxId: item.chatBoxId,
        serviceId: item.serviceId,
        projectTitle: item.projectTitle,
        category: item.category,
        description: item.description,
        targetDelivery: item.targetDelivery,
        actualDelivery: item.actualDelivery,
        numberOfConcept: item.numberOfConcept,
        numberOfRevision: item.numberOfRevision,
        initialPrice: item.initialPrice,
        totalPrice: item.total,
        status: item.proposalStatus,
        createdBy: item.createdBy,
        createdOn: item.createdOn,
        isReviewed: item.isReviewed,
      };
    });
  } catch (error) {
    throw new Error("Có lỗi xảy ra khi lấy dữ liệu thỏa thuận");
  }
}

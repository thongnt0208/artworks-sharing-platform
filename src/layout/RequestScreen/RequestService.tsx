import { axiosPrivate } from "../../hooks/useAxios";
import { RequestItemType } from "../ChatScreen/ChatRelatedTypes";

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
        budget: item.budget,
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

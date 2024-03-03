import { axiosPrivate } from "../../hooks/useAxios";
import { notificationItemType } from "../Notification";

/**
 * This function is used to get messages of current account
 * 
 * @returns {Promise<notificationItemType[]>} an array of current account's messages
 * @throws {Error} an error from the API request
 * @example
 *  const messages = await GetMessagesCurrentAccount();
 *  console.log(messages);
 * @author ThongNT
 * @version 1.0.0
 */
export async function GetMessagesCurrentAccount(): Promise<notificationItemType[]> {
    return axiosPrivate.get(`/requests/creator`)
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
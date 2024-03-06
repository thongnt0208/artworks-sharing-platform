import { GetRequestsByCreator } from "../../layout/ChatScreen/services/ProposalServices";
import { notificationItemType } from "../Notification";

/**
 * This function is used to get messages of current account
 * Thiếu API dành riêng cho notification -> dùng đỡ get all request by creator
 * 
 * @returns {Promise<notificationItemType[]>} an array of current account's messages
 * @throws {Error} an error from the API request
 * @example
 *  const messages = await GetMessagesCurrentAccount();
 *  console.log(messages);
 * @author ThongNT
 * @version 2.0.0
 */
export async function GetMessagesCurrentAccount(): Promise<notificationItemType[]> {
    return await GetRequestsByCreator();
  }
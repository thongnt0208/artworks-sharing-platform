import { ChatboxItemType } from "../ChatScreen";
import { GetRequestsByAudience, GetRequestsByCreator } from "./ProposalServices";


/**
 * This function is used to get all chatboxs of current user
 *
 * @returns {Promise<ChatboxItemType[]>} an array of requests
 * @throws {Error} an error from the API request
 * @example
 * const chatboxs = await GetChatboxs();
 * console.log(chatboxs);
 * @author ThongNT
 * @version 1.0.0
 */
export async function GetChatboxs(): Promise<ChatboxItemType[]> {
  const requestsByCreator = await GetRequestsByCreator();
  const requestsByAudience = await GetRequestsByAudience();
  let _tmp = requestsByCreator.concat(requestsByAudience);
  return _tmp.map((item) => ({
    id: item.notificationId,
    avatar: "",
    text: item.content,
    author: "request",
    isSeen: item.isSeen,
    time: item.creationDate,
  }));
}

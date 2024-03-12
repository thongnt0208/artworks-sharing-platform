import { ChatboxItemType } from "../ChatRelatedTypes"; 
import { notificationItemType } from "../../../components/Notification";
import { axiosPrivate } from "../../../hooks/useAxios";
import { getAuthInfo } from "../../../util/AuthUtil";

/**
 * This function is used to get all chatboxes of current account
 *
 * @returns {Promise<ChatboxItemType[]>} an array of current account's messages
 * @throws {Error} an error from the API request
 * @example
 *  const messages = await GetChatboxesCurrentAccount();
 *  console.log(messages);
 * @author ThongNT
 * @version 3.1.0
 */
export async function GetChatboxesCurrentAccount(): Promise<ChatboxItemType[]> {
  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";
  return axiosPrivate
    .get("/accounts/chatboxs")
    .then((response) =>
      response.data.map((item: any) => {
        const _acc1 = item?.account_1;
        const _acc2 = item?.account_2;

        const _avt = _acc1.id === currentUserId ? _acc2?.avatar : _acc1.avatar;
        const _content = `Bạn có tin nhắn mới từ ${
          _acc1.id === currentUserId ? _acc2?.fullname : _acc1.fullname
        }`;
        const _author =
          _acc1.id === currentUserId
            ? { id: _acc2?.id, fullname: _acc2?.fullname }
            : { id: _acc1?.id, fullname: _acc1?.fullname };

        return {
          id: item.id || "",
          avatar: _avt,
          text: _content,
          author: _author,
          time: item.createdOn || "",
          isSeen: false,
        };
      })
    )
    .catch((error) => {
      throw error;
    });
}

export type ChatMessageType = {
  chatBoxId: string;
  text: string;
  fileLocation?: string;
  createdOn: string;
  createdBy: string;
};
/**
 * This function is used to retrieves messages by chatbox ID.
 * @param chatboxId - The ID of the chatbox.
 * @returns A promise that resolves to an array of ChatMessageType.
 * @throws An error from the API request.
 * @example
 * const messages = await GetMessagesByChatboxId("chatboxId");
 * console.log(messages);
 * @version 1.0.1
 * @author ThongNT
 */
export async function GetMessagesByChatboxId(chatboxId: string): Promise<ChatMessageType[]> {
  return axiosPrivate
    .get(`/chatbox/${chatboxId}/messages`)
    .then((response) =>
      response?.data?.reverse().map((item: any) => {
        return {
          chatBoxId: item.chatBoxId || "",
          text: item.text || "",
          fileLocation: item.fileLocation,
          createdOn: item.createdOn || "",
          createdBy: item.createdBy || "",
        };
      })
    )
    .catch((error) => {
      throw error;
    });
}

/**
 * This function is used to send a message to an account.
 * @param accountId - The ID of the recieved user.
 * @param text - The content of the message.
 * @returns A promise that resolves to the message sent.
 * @throws An error from the API request.
 * @example
 * const message = await SendMessageToAccount("Id", "Hello");
 * console.log(message);
 * @version 1.0.1
 * @author ThongNT
 */
export async function SendMessageToAccount(
  accountId: string,
  text: string
): Promise<ChatMessageType> {
  return axiosPrivate
    .post(`/messages`, {
      receiverId: accountId,
      text: text,
      fileLocation: null,
    })
    .then((response) => {
      return {
        chatBoxId: response.data.chatBoxId || "",
        text: response.data.text || "",
        fileLocation: response.data.fileLocation,
        createdOn: response.data.createdOn || "",
        createdBy: response.data.createdBy || "",
      };
    })
    .catch((error) => {
      throw error;
    });
}

/**
 * Retrieves the notification items for chatboxes.
 * @returns A promise that resolves to an array of notification items.
 * @throws An error from the API request.
 * @example
 * const notifications = await GetChatboxesNoti();
 * console.log(notifications);
 * @version 1.0.0
 * @author ThongNT
 */
export async function GetChatboxesNoti(): Promise<notificationItemType[]> {
  const chatboxes = await GetChatboxesCurrentAccount();
  if (chatboxes.length === 0) {
    return [];
  }
  return chatboxes?.map((chatbox) => {
    return {
      notificationId: chatbox.id || "",
      content: `Hộp tin với ${chatbox.author.fullname}`,
      notifyType: "request",
      isSeen: chatbox.isSeen || false,
      creationDate: chatbox.time || "",
      avatar: chatbox.avatar,
    };
  });
}

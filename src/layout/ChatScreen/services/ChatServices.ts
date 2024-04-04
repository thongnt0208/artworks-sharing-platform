import { ChatboxItemType } from "../ChatRelatedTypes";
import { notificationItemType } from "../../../components/Notification";
import { axiosPrivate } from "../../../hooks/useAxios";
import { getAuthInfo } from "../../../util/AuthUtil";
import { Dispatch, SetStateAction } from "react";
import { arraysChatboxEqual, arraysEqual } from "../../../util/ArrayUtil";
const WS_URL = process.env.REACT_APP_REAL_API_WS_BASE_URL || "https://dummyjson.com";

const authenticationInfo = getAuthInfo();

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
        const _content = `Tin nhắn từ ${
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

/**
 * This function is used to get all chatboxes of current account in real-time
 *
 * @param setState - The state to set the chatboxes
 * @returns {Promise<() => void>} a function to close the WebSocket connection
 * @throws {Error} an error from the API request
 * @example
 * GetChatboxesCurrentAccountRealtime(setState)
 *  .then((close) => {
 *   close();
 * })
 * .catch((error) => {
 *  console.error(error);
 * });
 * @version 1.0.0
 * @author @thongnt0208
 */
export async function GetChatboxesCurrentAccountRealtime(
  setState: Dispatch<React.SetStateAction<ChatboxItemType[]>>
): Promise<() => void> {
  const url = `${WS_URL}/accounts/chatboxs/ws`;
  const socket = new WebSocket(url);

  let _tmpChatboxes: ChatboxItemType[] = [];

  return new Promise<() => void>((resolve, reject) => {
    socket.onopen = () => {
      console.log("WebSocket connection established" + authenticationInfo?.accessToken);
      socket.send(authenticationInfo?.accessToken);
      setState([]);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const chatboxes = data.map((item: any) => {
        return {
          id: item.Id || "",
          name: item.Name || "",
          participants: item.Participants || [],
          lastMessageOn: item.LastMessageOn || "",
          lastMessageText: item.LastMessageText || "",
        };
      });

      console.log(chatboxes);

      if (Array.isArray(chatboxes) && !arraysChatboxEqual(_tmpChatboxes, chatboxes)) {
        _tmpChatboxes = chatboxes;
        setState(chatboxes);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      reject(error);
    };

    resolve(() => {
      socket.close();
    });
  });
}

export type ChatMessageType = {
  chatBoxId: string;
  text: string;
  fileLocation?: string;
  createdOn: string;
  createdBy: string;
};

interface PaginatedChatMessages {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  items: ChatMessageType[];
}

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
 * This function is used to retrieve messages by chatbox ID with pagination.
 * @param chatboxId - The ID of the chatbox.
 * @param pageNumber - The page number to retrieve.
 * @param pageSize - The number of items per page.
 * @returns A promise that resolves to an object containing the paginated chat messages.
 * @throws An error from the API request.
 * @example
 * const { items, totalPages } = await GetMessagesByChatboxId("chatboxId", 1, 10);
 * console.log(items);
 * console.log(totalPages);
 * @version 2.0.0
 * @author ThongNT
 */
export async function GetMessagesByChatboxIdPagin(
  chatboxId: string,
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<PaginatedChatMessages> {
  return axiosPrivate
    .get(`/v2/chatbox/${chatboxId}/messages?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .then((response) => {
      const data = response.data;
      const items = data.items.map((item: any) => {
        return {
          chatBoxId: item.chatBoxId || "",
          text: item.text || "",
          fileLocation: item.fileLocation,
          createdOn: item.createdOn || "",
          createdBy: item.createdBy || "",
        };
      });

      return {
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        pageSize: data.pageSize,
        totalCount: data.totalCount,
        hasPrevious: data.hasPrevious,
        hasNext: data.hasNext,
        items,
      };
    })
    .catch((error) => {
      throw error;
    });
}

/**
 * This function is used to retrieve real-time messages by chatbox ID.
 * @param chatboxId - The ID of the chatbox.
 * @returns A promise that resolves to an array of chat messages.
 * @throws An error if the API request fails.
 * @example
 * GetMessagesByChatboxIdRealTime("chatboxId")
 *   .then((messages) => {
 *     console.log(messages);
 *   })
 *   .catch((error) => {
 *     console.error(error);
 *   });
 * @version 1.0.0
 * @author ThongNT
 */
export function GetMessagesByChatboxIdRealTime(
  chatboxId: string,
  messagesList: ChatMessageType[],
  setState: Dispatch<SetStateAction<ChatMessageType[]>>
): () => void {
  const url = `${WS_URL}/chatbox/${chatboxId}/messages/ws`;
  const socket = new WebSocket(url);
  let _tmpMessages: ChatMessageType[] = [];
  socket.onopen = () => {
    console.log("WebSocket connection established");
    setState([]);
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const message = data?.reverse()?.map((item: any) => {
      return {
        chatBoxId: item.ChatBoxId || "",
        text: item.Text || "",
        fileLocation: item.FileLocation,
        createdOn: item.CreatedOn || "",
        createdBy: item.CreatedBy || "",
      };
    });

    console.log(message);

    if (Array.isArray(message) && arraysEqual(_tmpMessages, message) === false) {
      _tmpMessages = message;
      setState(message);
    }
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return () => {
    socket.close();
  };
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
 * @version 1.1.0
 * @author ThongNT
 */
export async function SendMessageToAccount(
  accountId: string,
  text: string
): Promise<ChatMessageType> {
  const formData = new FormData();
  formData.append("receiverId", accountId);
  formData.append("text", text);

  return axiosPrivate
    .post(`/messages`, formData)
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
 * Sends an image to a specified account.
 * @param accountId - The ID of the account to send the image to.
 * @param file - The image file to send.
 * @returns A Promise that resolves to a ChatMessageType object representing the sent message.
 * @throws An error if the request fails.
 * @example
 * const message = await SendImageToAccount("accountId", file);
 * console.log(message);
 * @version 1.1.0
 * @author ThongNT
 */
export async function SendImageToAccount(
  accountId: string,
  file: File[]
): Promise<ChatMessageType> {
  const formData = new FormData();
  formData.append("receiverId", accountId);
  file.map((f) => formData.append("file", f));

  return axiosPrivate
    .post(`/messages`, formData)
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

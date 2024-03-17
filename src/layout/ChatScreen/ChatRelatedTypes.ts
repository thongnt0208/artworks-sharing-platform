export type ChatboxItemType = {
    id: string;
    avatar: string;
    text?: string;
    author: {
      id: string;
      fullname: string;
    };
    time: string;
    isSeen: boolean;
  };

  export type RequestItemType = {
    id: string;
    serviceId: string;
    message: string;
    timeline: string;
    price: string;
    requestStatus: string;
    createdBy: string;
    createdOn: string;
    service?: string;
  };

  export type requestStateToolsType = {
    requestsList: RequestItemType[];
    acceptRequest: (id: string) => void;
    denyRequest: (id: string) => void;
  };
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
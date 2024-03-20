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

export type proposalStateToolsType = {
  proposalsList: ProposalType[];
  acceptProposal: (id: string) => void;
  denyProposal: (id: string) => void;
};

export type ProposalType = {
  id: string;
  chatBoxId: string;
  serviceId: string;
  projectTitle: string;
  category: string;
  description: string;
  targetDelivery: string;
  initialPrice: number;
  totalPrice: number;
  status: string;
  createdBy: string;
  createdOn: string;
};

export type ProposalCardType = ProposalType & {
  acceptCallback?: (id: string) => void;
  denyCallback?: (id: string) => void;
  editCallback?: (id: string) => void;
  cancelCallback?: (id: string) => void;
};

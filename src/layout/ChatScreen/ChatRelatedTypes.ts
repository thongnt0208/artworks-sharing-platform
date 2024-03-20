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
  service?: any;
};

export type RequestStateToolsType = {
  requestsList: RequestItemType[];
  handleAcceptRequest: (id: string) => void;
  handleDenyRequest: (id: string) => void;
};

export type RequestCardProps = RequestItemType & {
  acceptCallback?: (id: string) => void;
  denyCallback?: (id: string) => void;
  showFormCallback?: (data: boolean) => void;
};

export type ProposalType = {
  id: string;
  chatBoxId?: string;
  serviceId: string;
  projectTitle: string;
  category: string;
  description: string;
  targetDelivery: string;
  initialPrice: number;
  totalPrice: number;
  status: string;
  numberOfConcept?: number;
  numberOfRevision?: number;
  createdBy?: string;
  createdOn?: string;
};

export type ProposalStateToolsType = {
  proposalsList: ProposalType[];
  acceptProposal: (id: string) => void;
  denyProposal: (id: string) => void;
  editCallback?: (id: string) => void;
  cancelCallback?: (id: string) => void;
};

export type ProposalCardProps = ProposalType & {
  acceptCallback?: (id: string) => void;
  denyCallback?: (id: string) => void;
  editCallback?: (id: string) => void;
  cancelCallback?: (id: string) => void;
};

export type ProposalFormProps = {
  createProposalCallback: (data: any) => void;
};

export type ProposalFormType = {
  ordererId: string;
  serviceId: string;
  projectTitle: string;
  category: string;
  description: string;
  targetDelivery: string;
  numberOfConcept: number;
  numberOfRevision: number;
  initialPrice: number;
  total: number;
};

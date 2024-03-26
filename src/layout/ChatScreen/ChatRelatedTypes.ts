export type ChatboxItemType = {
  id: string;
  avatar: string;
  text?: string;
  author: {
    id: string;
    fullname: string;
    bio?: string;
    email?: string;
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
  uploadProposalAsset: (id: string, type: number, file: File) => void;
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
  uploadAssetCallback?: (id: string, type: number, file: File) => void;
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

export type MilestoneItemType = {
  id: string;
  proposalId: string;
  milestoneName: string;
  fileUrl?: string;
  fileName?: string;
  createdBy: string;
  createdOn: string;
  createdAccount: {
    id: string;
    username: string;
    email: string;
    fullname: string;
    avatar: string;
  };
};

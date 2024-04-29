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

export type ChatMessageItemType = {
  id: string;
  chatBoxId: string;
  text: string;
  fileLocation?: string;
  createdOn: string;
  createdBy: string;
  request: RequestItemType;
  proposal: ProposalType;
}

export type RequestItemType = {
  id: string;
  chatBoxId?: string;
  serviceId: string;
  message: string;
  timeline: string;
  price: string;
  requestStatus: string;
  createdBy: string;
  createdOn: string;
  service?: any;
  account?: {
    id: string;
    username: string;
    email: string;
    fullname: string;
    avatar: string;
  };
};

export type RequestStateToolsType = {
  requestsList: RequestItemType[];
  handleAcceptRequest: (id: string) => void;
  handleDenyRequest: (id: string) => void;
  handleUploadProposalAsset: (id: string, type: number, file: File) => void;
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
  isReviewed?: boolean;
};

export type ProposalStateToolsType = {
  proposalsList: ProposalType[];
  selectingProposal: ProposalType;
  setSelectingProposal: (proposal: ProposalType) => void;
  handleGetAllProposals?: () => void;
  handleAcceptProposal?: (id: string) => void;
  handleDenyProposal?: (id: string) => void;
  handleCancelProposal?: (id: string) => void;
  handleCompletePayment?: (id: string) => void;
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

export type ProposalAssetItemType = {
  id: string;
  proposalId: string;
  type: string;
  name: string;
  url: string;
  createdOn: string;
};

export type ReviewItemType = {
  id: string;
  proposalId: string;
  rating: number;
  detail: string;
  createdBy: string;
  createdOn: string;
  createdAccount: {
    id: string;
    username: string;
    email: string;
    fullname: string;
    avatar: string;
  };
  proposal: {
    id: string;
    chatBoxId?: string;
    serviceId?: string;
    projectTitle?: string;
    category?: string;
    description?: string;
    targetDelivery?: string;
    initialPrice?: number;
    totalPrice?: number;
    status?: string;
    numberOfConcept?: number;
    numberOfRevision?: number;
    createdBy?: string;
    createdOn?: string;
    isReviewed?: boolean;
  };
};

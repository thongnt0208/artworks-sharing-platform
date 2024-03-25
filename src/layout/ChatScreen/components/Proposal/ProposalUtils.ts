import { useNavigate } from "react-router-dom";
import { ChatboxItemType, ProposalFormType } from "../../ChatRelatedTypes";
import { CreateProposal, GetProposalsByChatboxId } from "../../services/ProposalServices";
import { CatchAPICallingError, Toast } from "../../..";

export const GetAllProposals = (
  selectingChatbox: ChatboxItemType,
  setProposalsList: (proposalsList: any[]) => void,
  navigate: ReturnType<typeof useNavigate>
) => {
  selectingChatbox?.id &&
    GetProposalsByChatboxId(selectingChatbox?.id)
      .then((res) => {
        setProposalsList(res);
      })
      .catch((error) => {
        setProposalsList([]);
        CatchAPICallingError(error, navigate);
      });
};

export const CreateAProposal = (
  values: any,
  selectingChatbox: ChatboxItemType,
  setIsShowProposalForm: (isShowProposalForm: boolean) => void,
  toast: React.RefObject<Toast>,
  GetAllProposals: Function,
  navigate: ReturnType<typeof useNavigate>
) => {
  const formattedData: ProposalFormType = {
    ordererId: selectingChatbox?.author?.id || "",
    serviceId: values.serviceId || "",
    projectTitle: values.title || "",
    category: values.category || "",
    description: values.description || "",
    targetDelivery: values.targetDelivery || "",
    numberOfConcept: values.numberOfConcept || 0,
    numberOfRevision: values.numberOfRevision || 0,
    initialPrice: values.depositPercent || 0,
    total: values.totalPrice || 0,
  };

  CreateProposal(formattedData)
    .then(() => {
      setIsShowProposalForm(false);
      toast.current?.show({
        severity: "success",
        summary: "Tạo thành công",
        detail: "Đã tạo thỏa thuận thành công.",
        life: 3000,
      });
      GetAllProposals();
    })
    .catch((error) => {
      CatchAPICallingError(error, navigate);
      toast.current?.show({
        severity: "error",
        summary: "Tạo thất bại",
        detail: error?.message,
        life: 3000,
      });
    });
};

export const acceptProposal = (id: string) => {
  // Implement the acceptProposal logic here
};

export const denyProposal = (id: string) => {
  // Implement the denyProposal logic here
};

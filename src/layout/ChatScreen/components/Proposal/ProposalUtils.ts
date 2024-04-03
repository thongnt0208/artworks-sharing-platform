import { useNavigate } from "react-router-dom";
import {
  ChatboxItemType,
  MilestoneItemType,
  ProposalAssetItemType,
  ProposalFormType,
  ProposalType,
} from "../../ChatRelatedTypes";
import {
  CreateProposal,
  GetProposalAssets,
  GetProposalMilestone,
  GetProposalsByChatboxId,
  InitPaymentProposal,
  UpdateProposalStatus,
  UploadProposalAsset,
} from "../../services/ProposalServices";
import { CatchAPICallingError, Toast } from "../../..";
import { toast as toastify } from "react-toastify";

export const GetAllProposals = (
  selectingChatbox: ChatboxItemType,
  setProposalsList: (proposalsList: ProposalType[]) => void,
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

export const AcceptProposal = (
  id: string,
  GetAllProposals: Function,
  navigate: ReturnType<typeof useNavigate>
) => {
  InitPaymentProposal(id)
    .then(() => {
      UpdateProposalStatus(id, 1)
        .then(() => GetAllProposals())
        .catch((error) => {
          CatchAPICallingError(error, navigate);
          toastify.error("Có lỗi xảy ra khi cập nhật trạng thái của Yêu cầu" + error.message);
        });
    })
    .catch((error) => {
      CatchAPICallingError(error, navigate);
      toastify.error("Có lỗi xảy ra khi đặt cọc: " + error.message);
    });
};

export const DenyProposal = (
  id: string,
  GetAllProposals: Function,
  navigate: ReturnType<typeof useNavigate>
) => {
  UpdateProposalStatus(id, 2)
    .then(() => GetAllProposals())
    .catch((error) => {
      CatchAPICallingError(error, navigate);
    });
};

export const UploadProposalAssetUtil = (
  id: string,
  type: number,
  file: File,
  GetAllProposals: Function,
  navigate: ReturnType<typeof useNavigate>
) => {
  console.log("uploadProposalAsset", id, type, file);
  toastify.success("uploadProposalAsset" + id + type + file);
  UploadProposalAsset(id, type, file)
    .then(() => GetAllProposals())
    .catch((error) => {
      CatchAPICallingError(error, navigate);
    });
};

export const GetMilestone = (
  id: string,
  setCurrentMilestone: (milestone: MilestoneItemType[]) => void,
  navigate: ReturnType<typeof useNavigate>
) => {
  GetProposalMilestone(id)
    .then((res) => {
      setCurrentMilestone(res);
    })
    .catch((error) => {
      CatchAPICallingError(error, navigate);
    });
};

export const GetAssets = (
  id: string,
  setCurrentAsset: (asset: ProposalAssetItemType[]) => void,
  navigate: ReturnType<typeof useNavigate>
) => {
  GetProposalAssets(id)
    .then((res) => {
      setCurrentAsset(res);
    })
    .catch((error) => {
      CatchAPICallingError(error, navigate);
    });
};

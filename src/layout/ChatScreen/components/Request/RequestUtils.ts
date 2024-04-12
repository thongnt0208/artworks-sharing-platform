import { useNavigate } from "react-router-dom";
import { ChatboxItemType, RequestItemType } from "../../ChatRelatedTypes";
import { GetRequestsByChatboxId, UpdateRequestStatus } from "../../services/ProposalServices";
import { CatchAPICallingError } from "../../..";

export const GetAllRequests = (
  selectingChatbox: ChatboxItemType,
  setRequestsList: (requestsList: RequestItemType[]) => void,
  navigate: ReturnType<typeof useNavigate>
) => {
  selectingChatbox?.id &&
    GetRequestsByChatboxId(selectingChatbox?.id)
      .then((res) => setRequestsList(res))
      .catch((error) => {
        setRequestsList([]);
        CatchAPICallingError(error, navigate);
      });
};

export const acceptRequest = (
  id: string,
  GetAllRequests: Function,
  navigate: ReturnType<typeof useNavigate>
) => {
  UpdateRequestStatus(id, 1)
    .then(() => GetAllRequests())
    .catch((error) => CatchAPICallingError(error, navigate));
};

export const denyRequest = (
  id: string,
  GetAllRequests: Function,
  navigate: ReturnType<typeof useNavigate>
) => {
  UpdateRequestStatus(id, 2)
    .then(() => GetAllRequests())
    .catch((error) => CatchAPICallingError(error, navigate));
};

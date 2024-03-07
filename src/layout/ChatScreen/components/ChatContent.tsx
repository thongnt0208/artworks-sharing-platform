import { RequestItemType } from "../services/ProposalServices";
import SystemNotificationItem from "./SystemNotificationCard/SystemNotificationCard";

import "./ChatContent.scss";

export type requestStateToolsType = {
  requestDetail: RequestItemType;
  setRequestDetail: (detail: any) => void;
  acceptRequest: () => void;
  denyRequest: () => void;
};

type Props = {
  selectingId: string;
  content: any;
  requestStateTools: requestStateToolsType;
};

export default function ChatContent({ selectingId, content, requestStateTools }: Props) {
  return (
    <div className="chat-content">
      ChatContent: {selectingId}
      <SystemNotificationItem requestStateTools={requestStateTools} />
    </div>
  );
}

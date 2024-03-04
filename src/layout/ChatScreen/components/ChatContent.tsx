import { RequestItemType } from "../services/ProposalServices";
import SystemNotificationItem from "./SystemNotificationCard/SystemNotificationCard";

import "./ChatContent.scss";

type Props = { selectingId: string; content: any; requestDetail: RequestItemType };

export default function ChatContent({ selectingId, content, requestDetail }: Props) {
  return (
    <div className="chat-content">
      ChatContent: {selectingId}
      <SystemNotificationItem data={requestDetail} />
    </div>
  );
}

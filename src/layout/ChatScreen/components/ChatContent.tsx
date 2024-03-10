import { RequestItemType } from "../services/ProposalServices";
import SystemNotificationItem from "./SystemNotificationCard/SystemNotificationCard";

import "./ChatContent.scss";
import { Button } from "primereact/button";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import ProposalForm from "./Proposal/ProposalForm";
import MessageItem from "./MessageItem/MessageItem";
import { getAuthInfo } from "../../../util/AuthUtil";

export type requestStateToolsType = {
  requestDetail: RequestItemType;
  setRequestDetail: (detail: any) => void;
  acceptRequest: () => void;
  denyRequest: () => void;
};

type Props = {
  selectingChatboxId: string;
  content: any;
  requestStateTools: requestStateToolsType;
  setProposalFormData: (data: any) => void;
};

const tmpAvt = require("../../../assets/defaultImage/default-avatar.png");

export default function ChatContent({ selectingChatboxId, content, requestStateTools }: Props) {
  const { requestDetail } = requestStateTools;
  const [isShowProposalForm, setIsShowProposalForm] = useState(false);
  const renderNormalContent = (
    <>
      <h3>GIỜ MÌNH TẠO THOẢ TUẬN NGAY NÈ</h3>
      <p>Bạn đã chấp nhận yêu cầu của người dùng. </p>
      <p>Các bạn giờ đây có thể trao đổi và tạo thoả thuận cho công việc.</p>
      <Button
        label="Tạo thoả thuận"
        rounded
        severity="info"
        onClick={() => setIsShowProposalForm(true)}
      />
      <Button label="Huỷ dự án" rounded severity="danger" />
    </>
  );
  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  return (
    <div className="chat-content">
      <Dialog
        visible={isShowProposalForm}
        onHide={() => {
          setIsShowProposalForm(false);
        }}
        dismissableMask
        headerStyle={{ padding: "3px 6px 0 0", border: 0 }}
      >
        <ProposalForm />
      </Dialog>
      ChatContent: {selectingChatboxId}
      <SystemNotificationItem requestStateTools={requestStateTools} />
      {requestDetail?.requestStatus?.toUpperCase() === "ACCEPTED" && (
        <>
          <SystemNotificationItem normalContent={renderNormalContent} />
        </>
      )}

      {content.map((item: any) => {
        return (
          <MessageItem
            isMyMessage={item.createdBy === currentUserId}
            avatar={tmpAvt}
            createdOn={item.createdOn}
            text={item.text}
          />
        );
      })}
    </div>
  );
}

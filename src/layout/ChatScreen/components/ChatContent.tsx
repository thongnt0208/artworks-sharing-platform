import { RequestItemType } from "../services/ProposalServices";
import SystemNotificationItem from "./SystemNotificationCard/SystemNotificationCard";

import "./ChatContent.scss";
import { Button } from "primereact/button";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import ProposalForm from "./Proposal/ProposalForm";
import MessageItem from "./MessageItem/MessageItem";

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
  setProposalFormData: (data: any) => void;
};

const tmpAvt = require("../../../assets/defaultImage/default-avatar.png");

export default function ChatContent({ selectingId, content, requestStateTools }: Props) {
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
      ChatContent: {selectingId}
      <SystemNotificationItem requestStateTools={requestStateTools} />
      {requestDetail?.requestStatus?.toUpperCase() === "ACCEPTED" && (
        <>
          <SystemNotificationItem normalContent={renderNormalContent} />
        </>
      )}
      <MessageItem
        isMyMessage={false}
        avatar={tmpAvt}
        createdOn="1/1/2024"
        text="Tôi có ấn tượng về phong cách thiết kế của bạn.
Tôi đang có nhu cầu tìm họa sĩ để thiết kế PitchDeck cho dự án hệ thống bán sen đá cho phép tuỳ chỉnh chậu cây."
      />
      <MessageItem
        isMyMessage={true}
        avatar=""
        createdOn="1/1/2024"
        text="Tôi có ấn tượng về phong cách thiết kế của bạn.
Tôi đang có nhu cầu tìm họa sĩ để thiết kế PitchDeck cho dự án hệ thống bán sen đá cho phép tuỳ chỉnh chậu cây."
      />
    </div>
  );
}

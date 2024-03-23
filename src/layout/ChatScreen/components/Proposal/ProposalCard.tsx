import { useState } from "react";
import "./styles/ProposalCard.scss";
import { Button } from "primereact/button";
import { getAuthInfo } from "../../../../util/AuthUtil";
import { ProposalCardProps } from "../../ChatRelatedTypes";
import { translateProposalStatus } from "../../../../util/Enums";
import { ConfirmDialog } from "primereact/confirmdialog";

export default function ProposalCard({ ...props }: ProposalCardProps) {
  const {
    id,
    projectTitle,
    description,
    targetDelivery,
    initialPrice,
    totalPrice,
    status,
    createdBy,
    acceptCallback,
    denyCallback,
    editCallback,
    cancelCallback,
  } = props;
  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  const [confirmVisible, setConfirmVisible] = useState(false);

  const showConfirmPopup = () => {
    setConfirmVisible(true);
  };

  const handleAcceptConfirmation = () => {
    acceptCallback && acceptCallback(id);
    setConfirmVisible(false);
  };

  return (
    <div className="system-noti-card">
      <ConfirmDialog
        visible={confirmVisible}
        onHide={() => setConfirmVisible(false)}
        message={`Bạn sẽ bị trừ ${
          initialPrice * totalPrice
        } Xu để đặt cọc khi chấp nhận Bản thỏa thuận, bạn chắc chứ?`}
        headerStyle={{ border: "none", padding: "8px" }}
        icon="pi pi-exclamation-triangle"
        accept={handleAcceptConfirmation}
        reject={() => setConfirmVisible(false)}
      />

      <p className="text-cus-h1-bold">ProposalCard</p>
      <p>Tên dự án: {projectTitle}</p>
      <p>Mô tả dự án: {description}</p>
      <p>Thời gian hoàn thành: {targetDelivery}</p>
      <p>Tổng chi phí: {totalPrice}</p>
      <p>Đã đặt cọc: {initialPrice}</p>
      <p>Trạng thái: {translateProposalStatus(status)}</p>
      <p>Tuân theo mọi điều khoản của hệ thống.</p>

      {createdBy !== currentUserId && status?.toUpperCase() === "WAITING" && (
        <div className="btns-container flex gap-3">
          <Button className="btn-accept" rounded onClick={showConfirmPopup}>
            Chấp nhận
          </Button>
          <Button className="btn-decline" rounded onClick={() => denyCallback && denyCallback(id)}>
            Từ chối
          </Button>
        </div>
      )}

      {createdBy === currentUserId && status?.toUpperCase() === "WAITING" && (
        <div className="btns-container flex gap-3">
          Bạn đang chờ đối tác chấp nhận thỏa thuận.
          <Button className="btn-accept" rounded onClick={() => editCallback && editCallback(id)}>
            Chỉnh sửa
          </Button>
          <Button
            className="btn-decline"
            rounded
            onClick={() => cancelCallback && cancelCallback(id)}
          >
            Hủy thỏa thuận
          </Button>
        </div>
      )}

      {status?.toUpperCase() === "ACCEPTED" && (
        <div className="btns-container flex gap-3">
          Thỏa thuận đã được chấp nhận.
          {createdBy === currentUserId && (
            <Button className="upload-draft-btn" rounded onClick={() => {}}>
              Tải lên bản thảo
            </Button>
          )}
          {createdBy !== currentUserId && (
            <p>Từ giờ, nhà sáng tạo sẽ làm việc và gửi bản thảo đến bạn!</p>
          )}
        </div>
      )}
    </div>
  );
}

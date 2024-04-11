import { useState } from "react";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { getAuthInfo } from "../../../../util/AuthUtil";
import { ProposalCardProps } from "../../ChatRelatedTypes";
import { translateProposalStatus } from "../../../../util/Enums";
import "./styles/ProposalCard.scss";
import { numberToXu } from "../../../../util/CurrencyHandle";
import { Badge } from "primereact/badge";
import { Divider } from "primereact/divider";
import { formatTime } from "../../../../util/TimeHandle";
// ---------------------------------------------------------

export default function ProposalCard({ ...props }: ProposalCardProps) {
  const { id, projectTitle, description, targetDelivery, initialPrice, totalPrice, status, createdBy, createdOn, acceptCallback, denyCallback, editCallback, cancelCallback } = props;
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

      <p className="sys-noti-title text-cus-h1-bold pt-2">Thỏa thuận</p>
      <span style={{ color: "gray", fontSize: "12px" }}>
        Tạo lúc {formatTime(createdOn || "", "HH:mm ngày dd-MM-yyyy")}
      </span>
      <div className="propo-noti-container">
        <p>
          Tên dự án: <strong>{projectTitle}</strong>
        </p>
        <p>
          Mô tả dự án: <strong>{description}</strong>
        </p>
        <p>
          Thời gian hoàn thành: <strong>{formatTime(targetDelivery, "HH:mm ngày dd-MM-yyyy")}</strong>
        </p>
        <p>
          Tổng chi phí: <strong>{numberToXu(totalPrice || 0)}</strong>
        </p>
        <p>
          Đã đặt cọc: <strong>{numberToXu(initialPrice * totalPrice)}</strong>
        </p>
        <p>
          Trạng thái:{" "}
          <Badge
            value={translateProposalStatus(status)}
            severity={status === "Waiting" ? "info" : status === "Accepted" ? "success" : null}
          />
        </p>
        <p>Tuân theo mọi điều khoản của hệ thống.</p>

        {createdBy !== currentUserId && status?.toUpperCase() === "WAITING" && (
          <div className="btns-container flex gap-3">
            <Button className="btn-accept" rounded onClick={showConfirmPopup}>
              Chấp nhận
            </Button>
            <Button
              className="btn-decline"
              rounded
              onClick={() => denyCallback && denyCallback(id)}
            >
              Từ chối
            </Button>
          </div>
        )}

        {createdBy === currentUserId && status?.toUpperCase() === "WAITING" && (
          <div className="btns-container flex flex-column gap-3 pt-0">
            <Divider />
            <strong>Bạn đang chờ đối tác chấp nhận thỏa thuận.</strong>
            <div className="flex gap-2">
              <Button
                className="btn-accept"
                rounded
                onClick={() => editCallback && editCallback(id)}
              >
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
          </div>
        )}
      </div>
    </div>
  );
}

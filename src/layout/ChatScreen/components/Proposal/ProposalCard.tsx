import "./styles/ProposalCard.scss";
import { Button } from "primereact/button";
import { getAuthInfo } from "../../../../util/AuthUtil";
import { ProposalCardProps } from "../../ChatRelatedTypes";

export default function ProposalCard({ ...props }: ProposalCardProps) {
  const { id, projectTitle, description, targetDelivery, initialPrice, totalPrice, status, createdBy, acceptCallback, denyCallback, editCallback, cancelCallback } = props;
  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  return (
    <div className="system-noti-card">
      <p className="text-cus-h1-bold">ProposalCard</p>
      <p>Tên dự án: {projectTitle}</p>
      <p>Mô tả dự án: {description}</p>
      <p>Thời gian hoàn thành: {targetDelivery}</p>
      <p>Tổng chi phí: {totalPrice}</p>
      <p>Đã đặt cọc: {initialPrice}</p>
      <p>Trạng thái: {status}</p>
      <p>Tuân theo mọi điều khoản của hệ thống.</p>
      {createdBy !== currentUserId && status?.toUpperCase() === "WAITING" && (
        <div className="btns-container flex gap-3">
          <Button
            className="btn-accept"
            rounded
            onClick={() => acceptCallback && acceptCallback(id)}
          >
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
    </div>
  );
}

import { useState } from "react";
import { Button } from "primereact/button";
import { getAuthInfo } from "../../../../util/AuthUtil";
import { ProposalCardProps } from "../../ChatRelatedTypes";
import { translateProposalStatus } from "../../../../util/Enums";
import "./styles/ProposalCard.scss";
import { numberToXu } from "../../../../util/CurrencyHandle";
import { Badge } from "primereact/badge";
import { Divider } from "primereact/divider";
import { formatTime } from "../../../../util/TimeHandle";
import PaymentConfirmation from "../../../../components/PaymentConfirmation";
// ---------------------------------------------------------

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
    createdOn,
    acceptCallback,
    denyCallback,
    editCallback,
    cancelCallback,
  } = props;
  const [confirmVisible, setConfirmVisible] = useState(false);
  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id
    ? authenticationInfo?.id
    : "unknown";

  const handleAcceptConfirmation = () => {
    acceptCallback && acceptCallback(id);
    setConfirmVisible(false);
  };

  return (
    <div className="system-noti-card">
      <PaymentConfirmation
        visible={confirmVisible}
        setVisible={setConfirmVisible}
        paymentAmount={initialPrice * totalPrice}
        acceptCallback={handleAcceptConfirmation}
      />

      <p className="sys-noti-title text-cus-h1-bold pt-2">Thỏa thuận</p>
      <span style={{ color: "gray", fontSize: "12px" }}>
        Tạo lúc {formatTime(createdOn || "", "HH:mm ngày dd-MM-yyyy")}
        <br />
        Bởi: {createdBy === currentUserId ? "Bạn" : "Đối tác"}
      </span>
      <div className="propo-noti-container">
        <p>
          <strong>Tên dự án:</strong> {projectTitle}
        </p>
        <p>
          <strong>Mô tả dự án:</strong> {description}
        </p>
        <p>
          <strong>Thời gian hoàn thành:</strong>{" "}
          {formatTime(targetDelivery, "HH:mm ngày dd-MM-yyyy")}
        </p>
        <p>
          <strong>Tổng chi phí:</strong> {numberToXu(totalPrice || 0)}
        </p>
        <p>
          <strong>Đã đặt cọc:</strong> {numberToXu(initialPrice * totalPrice)}
        </p>

        <p>
          <strong>Trạng thái: </strong>
          <Badge
            value={translateProposalStatus(status)}
            severity={
              status === "Waiting"
                ? "info"
                : status === "Accepted"
                ? "success"
                : null
            }
          />
        </p>
        <p>Tuân theo mọi điều khoản của hệ thống.</p>
        {props.acceptCallback &&
          props.denyCallback &&
          props.editCallback &&
          props.cancelCallback && (
            <>
              {createdBy !== currentUserId &&
                status?.toUpperCase() === "WAITING" && (
                  <div className="btns-container flex gap-3">
                    <Button
                      className="btn-accept"
                      rounded
                      onClick={() => setConfirmVisible(true)}
                    >
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

              {createdBy === currentUserId &&
                status?.toUpperCase() === "WAITING" && (
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
            </>
          )}
      </div>
    </div>
  );
}

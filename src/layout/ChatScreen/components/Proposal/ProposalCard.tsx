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
import { GetWalletData } from "../../../ProfileScreen/WalletView/WalletService";
import { CatchAPICallingError } from "../../..";
import { useNavigate } from "react-router-dom";
import { WalletProps } from "../../../ProfileScreen/WalletView/WalletView";
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
  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [walletData, setWalletData] = useState({} as WalletProps);
  const navigate = useNavigate();

  const getWalletData = () => {
    GetWalletData(currentUserId)
      .then((data) => setWalletData(data))
      .catch((error) => CatchAPICallingError(error, navigate));
  };

  const showConfirmPopup = () => {
    getWalletData();
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
        message={
          <>
            <p>Thanh toán đặt cọc.</p>
            <p>
              Bạn đang có <strong>{numberToXu(walletData?.balance || 0)}</strong> trong ví, số tiền
              cần thanh toán là <strong>{numberToXu(initialPrice * totalPrice)}</strong>.
            </p>
            <p> Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?</p>
          </>
        }
        headerStyle={{ border: "none", padding: "8px" }}
        icon="pi pi-exclamation-triangle"
        accept={handleAcceptConfirmation}
        reject={() => setConfirmVisible(false)}
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

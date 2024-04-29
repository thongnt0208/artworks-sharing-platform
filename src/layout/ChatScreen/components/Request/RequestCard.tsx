import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { Divider } from "primereact/divider";
import { RequestCardProps } from "../../ChatRelatedTypes";
import { formatTime } from "../../../../util/TimeHandle";
import { getAuthInfo } from "../../../../util/AuthUtil";
import { numberToXu } from "../../../../util/CurrencyHandle";
import { translateRequestStatus } from "../../../../util/Enums";
import "./styles/RequestCard.scss";
import { useLocation } from "react-router-dom";
// ---------------------------------------------------------

export default function RequestCard({ ...props }: RequestCardProps) {
  const {
    id,
    serviceId,
    message,
    timeline,
    price,
    requestStatus,
    createdBy,
    createdOn,
    acceptCallback,
    denyCallback,
    showFormCallback,
  } = props;
  const location = useLocation();
  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";
  const currentUrl = location.pathname + location.search + location.hash;

  return (
    <div className="system-noti-card">
      <p className="sys-noti-title text-cus-h1-bold pt-2">Yêu cầu</p>
      <span style={{ color: "gray", fontSize: "12px" }}>
        Tạo lúc {formatTime(createdOn, "HH:mm ngày dd-MM-yyyy")}
        <br />
        Bởi: {createdBy === currentUserId ? "Bạn" : "Đối tác"}
      </span>
      <div className="request-noti-container" key={id}>
        <p>
          <strong>Nội dung yêu cầu:</strong> {message}
        </p>
        <p>
          <strong>Thời gian:</strong> {timeline}
        </p>
        <p>
          <strong>Ngân sách:</strong> {numberToXu(price || 0)}
        </p>
        <p>
          Trạng thái:{" "}
          <Badge
            value={translateRequestStatus(requestStatus)}
            severity={
              requestStatus === "Waiting" ? "info" : requestStatus === "Accepted" ? "success" : null
            }
          />
        </p>
        {!currentUrl.includes("/my-requests") &&
          createdBy !== currentUserId &&
          requestStatus?.toUpperCase() === "WAITING" && (
            <div className="btns-container flex gap-3">
              <Button
                className="btn-accept"
                rounded
                onClick={() => acceptCallback && acceptCallback(id)}
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

        {!currentUrl.includes("/my-requests") &&
          createdBy !== currentUserId &&
          requestStatus?.toUpperCase() === "ACCEPTED" && (
            <div className="create-proposal-container">
              <Divider />
              <span className="create-proposal-title text-cus-h3-bold pt-2">
                Giờ hãy tạo thỏa thuận
              </span>
              <strong>Bạn đã chấp nhận yêu cầu của người dùng. </strong>
              <span>Các bạn giờ đây có thể trao đổi và tạo thoả thuận cho công việc.</span>
              <div className="btns-container">
                <Button
                  className="btn-accept"
                  label="Tạo thoả thuận"
                  rounded
                  onClick={() => {
                    showFormCallback && showFormCallback(true);
                    localStorage.setItem("serviceId", serviceId);
                  }}
                />
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

import { RequestCardProps } from "../../ChatRelatedTypes";
import { Button } from "primereact/button";
import { getAuthInfo } from "../../../../util/AuthUtil";

export default function RequestCard({ ...props }: RequestCardProps) {
  const { id, serviceId, message, timeline, price, requestStatus, createdBy, acceptCallback, denyCallback, showFormCallback } = props;
  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  return (
    <div className="system-noti-card">
      <p className="text-cus-h1-bold">Yêu cầu</p>
      <div className="request-noti-container" key={id}>
        <p>Nội dung yêu cầu: {message}</p>
        <p>Thời gian: {timeline}</p>
        <p>Ngân sách: {price}</p>
        <p>Trạng thái: {requestStatus}</p>
        {createdBy !== currentUserId && requestStatus?.toUpperCase() === "WAITING" && (
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

        {createdBy !== currentUserId && requestStatus?.toUpperCase() === "ACCEPTED" && (
          <>
            <h3>GIỜ MÌNH TẠO THOẢ TUẬN NGAY NÈ</h3>
            <p>Bạn đã chấp nhận yêu cầu của người dùng. </p>
            <p>Các bạn giờ đây có thể trao đổi và tạo thoả thuận cho công việc.</p>
            <Button
              label="Tạo thoả thuận"
              rounded
              severity="info"
              onClick={() => {
                showFormCallback && showFormCallback(true);
                localStorage.setItem("serviceId", serviceId);
              }}
            />
            <Button
              label="Từ chối yêu cầu"
              rounded
              severity="danger"
              onClick={() => denyCallback && denyCallback(id)}
            />
          </>
        )}
      </div>
    </div>
  );
}

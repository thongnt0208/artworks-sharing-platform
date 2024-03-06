/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./SystemNotificationCard.scss";
import { RequestItemType, UpdateRequestStatus } from "../../services/ProposalServices";
import { Button } from "primereact/button";
import { getAuthInfo } from "../../../../util/AuthUtil";
import { useNavigate } from "react-router-dom";
import { translate2Vietnamese } from "../../../../util/TextHandle";

type Props = { data: any };

export default function SystemNotificationItem({ data }: Props) {
  const navigate = useNavigate();

  const [requestDetail, setRequestDetail] = useState<RequestItemType>({} as RequestItemType);
  const [tmpStatus, setTmpStatus] = useState("");
  const currentUserInfo = getAuthInfo();

  function catchError(error: any) {
    if (error.response?.status === 401) {
      navigate("/login");
    } else {
      console.log(error);
    }
  }
  function isOfRequest(variable: any): variable is RequestItemType {
    return variable.id !== undefined;
  }

  function acceptRequest() {
    UpdateRequestStatus(requestDetail.id, 1)
      .then((response) => {
        console.log(response);
        setRequestDetail(response);
      })
      .catch((error) => {
        catchError(error);
      });
  }
  function denyRequest() {
    UpdateRequestStatus(requestDetail.id, 2)
      .then((response) => {
        console.log(response);
        setRequestDetail(response);
      })
      .catch((error) => {
        catchError(error);
      });
  }

  const render = () => {
    if (isOfRequest(data)) {
      // Render request system notification
      // Vì data hiện là gộp từ GetRequestsByCreator và GetRequestsByAudience
      // nên phân biệt Creator và Audience bằng trường createdBy trong response của GetRequestsById.
      // Nếu createdBy !== currentUserId thì đó là request mà user đang đăng nhập nhận được, ngược lại là request mà user đang đăng nhập đã tạo.

      return (
        <div className="request-noti-container">
          <p>Nội dung yêu cầu: {requestDetail.message}</p>
          <p>Thời gian: {requestDetail.timeline}</p>
          <p>Ngân sách: {requestDetail.price}</p>
          <p>Trạng thái: {tmpStatus}</p>
          {requestDetail.createdBy !== currentUserInfo?.id &&
            requestDetail.requestStatus?.toUpperCase() === "WAITING" && (
              <div className="btns-container flex gap-3">
                <Button className="btn-accept" rounded onClick={acceptRequest}>
                  Chấp nhận
                </Button>
                <Button className="btn-decline" rounded onClick={denyRequest}>
                  Từ chối
                </Button>
              </div>
            )}
        </div>
      );
    }
  };

  useEffect(() => {
    if (isOfRequest(data)) {
      setRequestDetail(data);
    }
  }, [data]);

  useEffect(() => {
    translate2Vietnamese(requestDetail.requestStatus).then((res) => {
      return setTmpStatus(res || "");
    });
  }, [requestDetail]);

  return <div className="system-noti-card">SystemNotificationItem {render()}</div>;
}

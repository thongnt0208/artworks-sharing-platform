/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./SystemNotificationCard.scss";
import { RequestItemType } from "../../services/ProposalServices";
import { Button } from "primereact/button";
import { getAuthInfo } from "../../../../util/AuthUtil";
import { translate2Vietnamese } from "../../../../util/TextHandle";
import { requestStateToolsType } from "../ChatContent";

type Props = { normalContent?: any; requestStateTools?: requestStateToolsType };

export default function SystemNotificationItem({normalContent, requestStateTools }: Props) {
  const { requestDetail, acceptRequest, denyRequest } = requestStateTools || {};
  const [tmpStatus, setTmpStatus] = useState("");
  const currentUserInfo = getAuthInfo();

  /**
   * This function is used to check if the variable is of RequestItemType
   * @param variable
   * @returns boolean
   */
  function isOfRequest(variable: any): variable is RequestItemType {
    return variable?.id !== undefined;
  }

  const render = () => {
    if (isOfRequest(requestDetail)) {
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
    // if (isOfProposal(content)) {}
    else {
      // Render normal system notification
      return <div>{normalContent}</div>;
    }
  };

  useEffect(() => {
    translate2Vietnamese(requestDetail?.requestStatus || "").then((res) => {
      return setTmpStatus(res || "");
    });
  }, [requestDetail]);

  return <div className="system-noti-card">SystemNotificationItem {render()}</div>;
}

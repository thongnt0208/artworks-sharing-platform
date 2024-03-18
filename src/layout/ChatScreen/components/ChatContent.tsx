/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Dialog } from "./../../index";
import { getAuthInfo } from "../../../util/AuthUtil";
import { ChatboxItemType, requestStateToolsType } from "../ChatRelatedTypes";

import "./ChatContent.scss";
import MemoizedMessageItem from "./MessageItem/MessageItem";
import { Suspense, useEffect, useRef, useState } from "react";
import LazyProposalForm from "./Proposal/LazyProposalForm";
import { translate2Vietnamese } from "../../../util/TextHandle";
// ---------------------------------------------------------

type Props = {
  selectingChatbox: ChatboxItemType;
  content: any;
  requestStateTools: requestStateToolsType;
  isShowProposalForm: boolean;
  setIsShowProposalForm: (value: boolean) => void;
  setProposalFormData: (data: any) => void;
  fetchNextPage: () => void;
};

const tmpAvt = require("../../../assets/defaultImage/default-avatar.png");

export default function ChatContent({
  selectingChatbox,
  content,
  requestStateTools,
  isShowProposalForm,
  setIsShowProposalForm,
  fetchNextPage,
}: Props) {
  const [tmpStatus, setTmpStatus] = useState<{ [key: string]: any }>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const observer = useRef<IntersectionObserver | null>(null);
  const topMessageRef = useRef<HTMLDivElement>(null);
  const [shouldFetchNextPage, setShouldFetchNextPage] = useState(false);
  const { acceptRequest, denyRequest, requestsList } = requestStateTools;
  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  useEffect(() => {
    if (requestsList?.length !== 0) {
      requestsList.forEach((request) => {
        translate2Vietnamese(request.requestStatus || "").then((res) => {
          setTmpStatus((prevStatus) => ({ ...prevStatus, [request.id]: res }));
        });
      });
    }
  }, [requestsList, acceptRequest, denyRequest]);

  useEffect(() => {
    const scrollArea = scrollRef.current;
    if (scrollArea) {
      const lastChild = scrollArea.lastElementChild;
      if (lastChild) {
        lastChild.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [content]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // fetchNextPage();
          // alert("fetch next page");
        }
      },
      { threshold: 0.5 }
    );

    if (topMessageRef.current && observer.current) {
      observer.current.observe(topMessageRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [topMessageRef]);

  useEffect(() => {
    if (shouldFetchNextPage) {
      setTimeout(() => {
        setShouldFetchNextPage(false);
      }, 1000);
    }
  }, [shouldFetchNextPage]);

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
        <Suspense fallback={<div>Đang tải...</div>}>
          <LazyProposalForm />
        </Suspense>
      </Dialog>

      <div className="chat-scroll-area" ref={scrollRef}>
        {requestsList?.length !== 0 && (
          <div className="system-noti-card">
            <h3>Thông báo hệ thống</h3>
            {requestsList?.map((request) => (
              <div className="request-noti-container" key={request.id}>
                <p>Nội dung yêu cầu: {request.message}</p>
                <p>Thời gian: {request.timeline}</p>
                <p>Ngân sách: {request.price}</p>
                <p>Trạng thái: {tmpStatus[request.id]}</p>
                {request.createdBy !== currentUserId &&
                  request.requestStatus?.toUpperCase() === "WAITING" && (
                    <div className="btns-container flex gap-3">
                      <Button
                        className="btn-accept"
                        rounded
                        onClick={() => acceptRequest(request.id)}
                      >
                        Chấp nhận
                      </Button>
                      <Button
                        className="btn-decline"
                        rounded
                        onClick={() => denyRequest(request.id)}
                      >
                        Từ chối
                      </Button>
                    </div>
                  )}

                {request.createdBy !== currentUserId &&
                  request.requestStatus?.toUpperCase() === "ACCEPTED" && (
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
                      <Button
                        label="Từ chối yêu cầu"
                        rounded
                        severity="danger"
                        onClick={() => denyRequest(request.id)}
                      />
                    </>
                  )}
              </div>
            ))}
          </div>
        )}
        <div ref={topMessageRef}></div>
        {content.map((item: any, index: number) => {
          return (
            <MemoizedMessageItem
              key={`msg-item-${index}`}
              isMyMessage={item.createdBy === currentUserId}
              avatar={selectingChatbox?.avatar || tmpAvt}
              createdOn={item.createdOn}
              text={item.text}
            />
          );
        })}
      </div>
    </div>
  );
}

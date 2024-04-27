import { useEffect, useRef, useState } from "react";
import { getAuthInfo } from "../../../util/AuthUtil";
import {
  ChatboxItemType,
  ChatMessageItemType,
  ProposalStateToolsType,
  RequestStateToolsType,
} from "../ChatRelatedTypes";
import MemoizedMessageItem from "./MessageItem/MessageItem";
import ProposalCard from "./Proposal/ProposalCard";
import RequestCard from "./Request/RequestCard";

import "./ChatContent.scss";
// ---------------------------------------------------------

type Props = {
  selectingChatbox: ChatboxItemType;
  content: ChatMessageItemType[];
  requestStateTools: RequestStateToolsType;
  proposalStateTools: ProposalStateToolsType;
  setIsShowProposalForm: (value: boolean) => void;
  fetchNextPage: () => void;
};

const tmpAvt = require("../../../assets/defaultImage/default-avatar.png");

export default function ChatContent({
  selectingChatbox,
  content,
  requestStateTools,
  proposalStateTools,
  setIsShowProposalForm,
  fetchNextPage,
}: Props) {
  const { handleAcceptRequest, handleDenyRequest, handleUploadProposalAsset } = requestStateTools;
  const { handleAcceptProposal, handleDenyProposal, handleCancelProposal } = proposalStateTools;

  const [shouldFetchNextPage, setShouldFetchNextPage] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const topMessageRef = useRef<HTMLDivElement>(null);

  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  const renderMessage = (item: ChatMessageItemType) => {
    if (item?.request?.id) {
      return (
        <RequestCard
          key={"request" + item?.request?.id}
          {...item?.request}
          acceptCallback={handleAcceptRequest}
          denyCallback={handleDenyRequest}
          showFormCallback={setIsShowProposalForm}
        />
      );
    } else if (item?.proposal?.id) {
      return (
        <ProposalCard
          key={"proposal" + item?.proposal?.id}
          {...item?.proposal}
          acceptCallback={handleAcceptProposal}
          denyCallback={handleDenyProposal}
          editCallback={() => {
            // setProposalFormData(proposal);
            // setIsShowProposalForm(true);
          }}
          cancelCallback={handleCancelProposal}
          uploadAssetCallback={handleUploadProposalAsset}
        />
      );
    } else {
      return (
        <MemoizedMessageItem
          key={"msg" + item.id}
          isMyMessage={item.createdBy === currentUserId}
          avatar={selectingChatbox?.avatar || tmpAvt}
          createdOn={item.createdOn}
          text={item.text}
          fileUrl={item.fileLocation}
        />
      );
    }
  };

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
      <div className="chat-scroll-area" ref={scrollRef}>
        <div ref={topMessageRef}></div>
        {content.map((item: any, index: number) => renderMessage(item))}
      </div>
    </div>
  );
}

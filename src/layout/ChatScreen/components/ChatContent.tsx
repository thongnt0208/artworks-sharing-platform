import { getAuthInfo } from "../../../util/AuthUtil";
import {
  ChatboxItemType,
  ProposalStateToolsType,
  RequestStateToolsType,
} from "../ChatRelatedTypes";

import "./ChatContent.scss";
import MemoizedMessageItem from "./MessageItem/MessageItem";
import { useEffect, useRef, useState } from "react";
import ProposalCard from "./Proposal/ProposalCard";
import RequestCard from "./Request/RequestCard";
// ---------------------------------------------------------

type Props = {
  selectingChatbox: ChatboxItemType;
  content: any;
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
  const { requestsList, handleAcceptRequest, handleDenyRequest, uploadProposalAsset } =
    requestStateTools;
  const { proposalsList, acceptProposal, denyProposal } = proposalStateTools;

  const [shouldFetchNextPage, setShouldFetchNextPage] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const topMessageRef = useRef<HTMLDivElement>(null);

  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

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
        {requestsList?.length !== 0 &&
          requestsList?.map((request) => (
            <RequestCard
              key={request.id}
              {...request}
              acceptCallback={handleAcceptRequest}
              denyCallback={handleDenyRequest}
              showFormCallback={setIsShowProposalForm}
            />
          ))}

        {proposalsList?.length !== 0 &&
          proposalsList?.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              {...proposal}
              acceptCallback={acceptProposal}
              denyCallback={denyProposal}
              editCallback={() => {
                // setProposalFormData(proposal);
                // setIsShowProposalForm(true);
              }}
              cancelCallback={denyProposal}
              uploadAssetCallback={uploadProposalAsset}
            />
          ))}
        <div ref={topMessageRef}></div>
        {content.map((item: any, index: number) => {
          return (
            <MemoizedMessageItem
              key={`msg-item-${index}`}
              isMyMessage={item.createdBy === currentUserId}
              avatar={selectingChatbox?.avatar || tmpAvt}
              createdOn={item.createdOn}
              text={item.text}
              fileUrl={item.fileLocation}
            />
          );
        })}
      </div>
    </div>
  );
}

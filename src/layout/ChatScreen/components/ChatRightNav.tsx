/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MilestoneItemType, ProposalType } from "../ChatRelatedTypes";
import "./ChatRightNav.scss";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { formatTime } from "../../../util/TimeHandle";
import { Splitter } from "primereact/splitter";

type Props = {
  userInfo: {
    id: string;
    username?: string;
    bio?: string;
    email?: string;
    fullname: string;
    avatar: string;
  };
  proposalsList: ProposalType[];
  currentMilestone: MilestoneItemType[];
  getMilestoneCallback: (id: string) => void;
};

export default function ChatRightNav({
  userInfo,
  proposalsList,
  currentMilestone,
  getMilestoneCallback,
}: Props) {
  const [selectingProposal, setSelectingProposal] = useState<ProposalType>({} as ProposalType);
  useEffect(() => {
    proposalsList[0] && getMilestoneCallback(proposalsList[0]?.id);
  }, [proposalsList]);

  useEffect(()=> {
    selectingProposal?.id && getMilestoneCallback(selectingProposal.id);
  }, [selectingProposal])

  return (
    <div className="chat-right-nav">
      ChatRightNav
      <div className="user-info-container">
        <Avatar size="xlarge" image={userInfo.avatar} shape="circle" />
        <p className="text-cus-h1-bold">{userInfo.fullname}</p>
        <p className="text-cus-normal">{userInfo.username}</p>
        <p className="text-cus-normal">{userInfo.bio}</p>
      </div>
      <Splitter />
      <div className="milestone-view-container">
        <div className="milestone-view-header">
          <p className="text-cus-h2-bold">Theo dõi quá trình</p>
        </div>
        <div className="milestone-view-content">
          {currentMilestone?.map((milestone) =>
            milestone?.fileUrl ? (
              // proposal has file
              <div key={milestone.id} className="milestone-item milestone-item-file flex">
                <Button
                  label={milestone.milestoneName}
                  icon="pi pi-download"
                  iconPos="right"
                  onClick={() => {
                    //TODO: download file from milestone?.fileUrl
                  }}
                />
                <p className="text-cus-normal">
                  {formatTime(milestone.createdOn, "dd/MM/yyyy HH:mm")}
                </p>
              </div>
            ) : (
              // proposal has no file
              <div key={milestone.id} className="milestone-item">
                <p className="text-cus-normal-bold">{milestone.milestoneName}</p>
                <p className="text-cus-normal">
                  {formatTime(milestone.createdOn, "dd/MM/yyyy HH:mm")}
                </p>
              </div>
            )
          )}
        </div>
      </div>
      <div className="proposals-list-container">
        <div className="proposals-list-header">
          <p className="text-cus-h2-bold">Các thỏa thuận</p>
        </div>
        <div className="proposals-list-content">
          {proposalsList?.map((proposal) => (
            <div
              key={proposal.id}
              className="proposal-item"
              onClick={() => {
                //TODO: change current milestone
              }}
            >
              <div className="name-date-frame">
                <p className="text-cus-normal-bold">{proposal.projectTitle}</p>
                <p className="text-cus-normal">
                  Đến hạn: {formatTime(proposal.targetDelivery, "dd/MM/yyyy")}
                </p>
              </div>
              <div className="status-price-frame">
                <p className="text-cus-normal">{proposal.status}</p>
                <p className="text-cus-normal">{proposal.totalPrice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

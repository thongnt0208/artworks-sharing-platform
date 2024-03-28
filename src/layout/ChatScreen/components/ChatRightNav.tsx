/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MilestoneItemType, ProposalAssetItemType, ProposalType } from "../ChatRelatedTypes";
import "./ChatRightNav.scss";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { formatTime } from "../../../util/TimeHandle";
import { translateProposalStatus } from "../../../util/Enums";
import { Timeline } from "primereact/timeline";
import { Badge } from "primereact/badge";

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
  currentAsset: ProposalAssetItemType[];
  getMilestoneCallback: (id: string) => void;
  getAssetsCallback: (id: string) => void;
};

export default function ChatRightNav({
  userInfo,
  proposalsList,
  currentMilestone,
  currentAsset,
  getMilestoneCallback,
  getAssetsCallback,
}: Props) {
  const [selectingProposal, setSelectingProposal] = useState<ProposalType>({} as ProposalType);

  useEffect(() => {
    proposalsList.length > 0 && setSelectingProposal(proposalsList[0]);
  }, []);

  useEffect(() => {
    if (selectingProposal?.id) {
      getMilestoneCallback(selectingProposal.id);
      getAssetsCallback(selectingProposal.id);
    }
  }, [proposalsList, selectingProposal]);

  return (
    <div className="chat-right-nav">
      <div className="user-info-container">
        <Avatar size="xlarge" image={userInfo.avatar} shape="circle" />
        <p className="text-cus-h1-bold">{userInfo.fullname}</p>
        <p className="text-cus-normal">{userInfo.username}</p>
        <p className="text-cus-normal">{userInfo.bio}</p>
      </div>
      {/* Proposal area start */}
      <div className="proposals-list-container">
        <div className="proposals-list-header">
          <p className="text-cus-h2-bold">Các thỏa thuận</p>
        </div>
        <div className="proposals-list-content">
          {proposalsList?.map((proposal) => (
            <div
              key={proposal.id}
              className={"proposal-item" + (proposal.id === selectingProposal.id ? " active" : "")}
              onClick={() => setSelectingProposal(proposal)}
            >
              <div className="first-collumn-frame">
                <p className="text-cus-normal-bold">{proposal.projectTitle}</p>
                <p className="text-cus-normal">
                  Đến hạn: {formatTime(proposal.targetDelivery, "dd/MM/yyyy")}
                </p>
              </div>
              <div className="second-collumn-frame">
                <p className="text-cus-normal highlight-btn-100">
                  {translateProposalStatus(proposal.status)}
                </p>
                <p className="text-cus-normal highlight-btn-200">{proposal.totalPrice}Xu</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Proposal area end */}
      {/* Milestone area start */}
      <div className="milestone-view-container">
        <div className="milestone-view-header pb-4">
          <p className="text-cus-h2-bold">Theo dõi quá trình</p>
        </div>
        <div className="milestone-view-content">
          <Timeline
            value={currentMilestone}
            opposite={(milestone) => <Badge value={milestone.milestoneName} severity="info" />}
            content={(milestone) => (
              <small className="text-cus-normal">
                {formatTime(milestone.createdOn, "dd/MM/yyyy HH:mm")}
              </small>
            )}
          />
        </div>
      </div>
      {/* Milestone area end */}
      {/* Asset area start */}
      <div className="proposal-assets-container">
        <div className="proposal-assets-header">
          <p className="text-cus-h2-bold">Tài nguyên liên quan</p>
        </div>
        <div className="proposal-assets-content">
          {currentAsset?.map((asset) => (
            <div className="proposal-asset-item">
              <Button
                label={asset.id}
                icon="pi pi-download"
                iconPos="right"
                onClick={() => {
                  //download file from asset?.url
                  window.open(asset?.url, "_blank");
                }}
                className="first-collumn-frame"
              />
              <p className="text-cus-normal second-collumn-frame">
                {formatTime(asset.createdOn, "dd/MM/yyyy HH:mm")}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Asset area end */}
    </div>
  );
}

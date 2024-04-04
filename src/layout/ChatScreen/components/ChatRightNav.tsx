/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Avatar } from "primereact/avatar";
import "./ChatRightNav.scss";
import MilestoneView from "./MilestoneView/MilestoneView";
import ProposalAssetsView from "./ProposalAssetsView/ProposalAssetsView";
import ProposalsListView from "./Proposal/ProposalsListView";
import {
  MilestoneItemType,
  ProposalAssetItemType,
  ProposalStateToolsType,
} from "../ChatRelatedTypes";
import { useNavigate } from "react-router-dom";
import UploadProposalAssetView from "./UploadProposalAsset/UploadProposalAssetView";

type Props = {
  userInfo: {
    id: string;
    username?: string;
    bio?: string;
    email?: string;
    fullname: string;
    avatar: string;
  };
  proposalStateTools: ProposalStateToolsType;
  currentMilestone: MilestoneItemType[];
  currentAssets: ProposalAssetItemType[];
  getMilestoneCallback: (id: string) => void;
  getAssetsCallback: (id: string) => void;
  uploadAssetCallback: (proposalId: string, type: number, file: File) => void;
};

export default function ChatRightNav({
  userInfo,
  proposalStateTools,
  currentMilestone,
  currentAssets,
  getMilestoneCallback,
  getAssetsCallback,
  uploadAssetCallback,
}: Props) {
  const navigate = useNavigate();
  const { proposalsList, selectingProposal, setSelectingProposal } = proposalStateTools;
  useEffect(() => {
    if (selectingProposal?.id) {
      getMilestoneCallback(selectingProposal.id);
      getAssetsCallback(selectingProposal.id);
    }
  }, [proposalsList, selectingProposal]);

  return (
    <div className="chat-right-nav">
      <div
        className="user-info-container"
        onClick={() => navigate(`/account/${selectingProposal.createdBy}`)}
      >
        <Avatar size="xlarge" image={userInfo.avatar} shape="circle" />
        <p className="text-cus-h1-bold">{userInfo.fullname}</p>
        <p className="text-cus-normal">{userInfo.username}</p>
        <p className="text-cus-normal">{userInfo.bio}</p>
      </div>
      <ProposalsListView
        data={proposalsList}
        selectingProposal={selectingProposal}
        setSelectingProposal={setSelectingProposal}
      />
      <MilestoneView data={currentMilestone} />
      <ProposalAssetsView data={currentAssets} proposalStateTools={proposalStateTools} />
      <UploadProposalAssetView selectingProposal={selectingProposal} uploadAssetCallback={uploadAssetCallback} />
    </div>
  );
}

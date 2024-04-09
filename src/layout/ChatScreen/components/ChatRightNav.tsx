/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./ChatRightNav.scss";
import MilestoneView from "./MilestoneView/MilestoneView";
import ProposalAssetsView from "./ProposalAssetsView/ProposalAssetsView";
import ProposalsListView from "./Proposal/ProposalsListView";
import {
  MilestoneItemType,
  ProposalAssetItemType,
  ProposalStateToolsType,
  ReviewItemType,
} from "../ChatRelatedTypes";
import UploadProposalAssetView from "./UploadProposalAsset/UploadProposalAssetView";
import { GetReviewsByProposalId } from "../services/ProposalServices";
import { Rating } from "primereact/rating";

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
  proposalStateTools,
  currentMilestone,
  currentAssets,
  getMilestoneCallback,
  getAssetsCallback,
  uploadAssetCallback,
}: Props) {
  const { proposalsList, selectingProposal, setSelectingProposal } = proposalStateTools;
  const [reviews, setReviews] = useState<ReviewItemType>({} as ReviewItemType);
  useEffect(() => {
    if (selectingProposal?.id) {
      getMilestoneCallback(selectingProposal.id);
      getAssetsCallback(selectingProposal.id);
      GetReviewsByProposalId(selectingProposal.id)
        .then((res) => setReviews(res))
        .catch((err) => console.log(err));
    }
  }, [proposalsList, selectingProposal]);

  return (
    <div className="chat-right-nav">
      <ProposalsListView
        data={proposalsList}
        selectingProposal={selectingProposal}
        setSelectingProposal={setSelectingProposal}
      />
      <MilestoneView data={currentMilestone} />
      <ProposalAssetsView data={currentAssets} proposalStateTools={proposalStateTools} />
      {selectingProposal?.status !== "Waiting" && (
        <UploadProposalAssetView
          selectingProposal={selectingProposal}
          uploadAssetCallback={uploadAssetCallback}
        />
      )}
      {reviews?.id && (
        <div className="review-container">
          <p className="text-cus-h2-bold">Đánh giá</p>
          <p>{reviews?.createdAccount?.fullname} đã đánh giá dự án này: </p>
          <Rating value={reviews?.rating} readOnly cancel={false} />
          <p className="text-cus-normal">{reviews?.detail}</p>
        </div>
      )}
    </div>
  );
}

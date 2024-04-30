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
import AddReviewView from "./Review/AddReviewView";
import { getAuthInfo } from "../../../util/AuthUtil";
import AddConfirmProposal from "./ConfirmProposal/AddConfirmProposal";

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
  const { proposalsList, selectingProposal, setSelectingProposal, handleGetAllProposals } =
    proposalStateTools;
  const [reviews, setReviews] = useState<ReviewItemType>({} as ReviewItemType);
  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";
  const isCreator = selectingProposal?.createdBy === currentUserId;
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
      {
        // check if proposal status is CompletePayment && current user is not the creator -> Start to add review
        selectingProposal?.status === "CompletePayment" && !isCreator && <AddConfirmProposal 
        selectingProposal={selectingProposal} 
        refreshProposalList={handleGetAllProposals}/>
      }
      {
        // check if proposal status is ConfirmPayment && current user is not the creator -> Start to add confirmation proposal
        selectingProposal?.status === "ConfirmPayment" &&
          !selectingProposal?.isReviewed &&
          !isCreator && (
            <AddReviewView
              selectingProposal={selectingProposal}
              refreshProposalList={handleGetAllProposals}
            />
          )
      }
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

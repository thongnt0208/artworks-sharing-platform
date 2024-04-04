import React from "react";
import { ProposalType } from "../../ChatRelatedTypes";
import { formatTime } from "../../../../util/TimeHandle";
import { translateProposalStatus } from "../../../../util/Enums";

type Props = {
  data: ProposalType[];
  selectingProposal: ProposalType;
  setSelectingProposal: (proposal: ProposalType) => void;
};

export default function ProposalsListView({
  data,
  selectingProposal,
  setSelectingProposal,
}: Props) {
  return (
    <div className="proposals-list-container">
      <div className="proposals-list-header">
        <p className="text-cus-h2-bold">Các thỏa thuận</p>
      </div>
      <div className="proposals-list-content">
        {data?.map((proposal) => (
          <div
            key={proposal.id}
            className={"proposal-item" + (proposal.id === selectingProposal?.id ? " active" : "")}
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
  );
}

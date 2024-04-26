import { ProposalType } from "../../ChatRelatedTypes";
import { formatTime } from "../../../../util/TimeHandle";
import { translateProposalStatus } from "../../../../util/Enums";
import { Panel } from "primereact/panel";
import { numberToXu } from "../../../../util/CurrencyHandle";

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
  const headerTemplate = (options: any) => {
    const className = `${options.className} justify-content-space-between`;

    return (
      <div className={className}>
        <div className="proposals-list-header w-full" style={{textAlign: "center"}}>
          <p className="text-cus-h3-bold pl-5">Các thỏa thuận</p>
        </div>
        <div>{options.togglerElement}</div>
      </div>
    );
  };
  return (
    <Panel headerTemplate={headerTemplate} toggleable>
      <div className="proposals-list-container">
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
                <p className="text-cus-normal highlight-btn-200">{numberToXu(proposal.totalPrice)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

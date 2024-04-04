import { Button } from "primereact/button";
import { formatTime } from "../../../../util/TimeHandle";
import { ProposalAssetItemType, ProposalStateToolsType } from "../../ChatRelatedTypes";
import "./ProposalAssetsView.scss";
import { getAuthInfo } from "../../../../util/AuthUtil";
import AddReviewView from "../Review/AddReviewView";

type Props = { data: ProposalAssetItemType[]; proposalStateTools: ProposalStateToolsType };

export default function ProposalAssetsView({ data, proposalStateTools }: Props) {
  const { selectingProposal, handleCompletePayment } = proposalStateTools;
  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  return (
    <div className="proposal-assets-container">
      <div className="proposal-assets-header">
        <p className="text-cus-h2-bold">Tài nguyên liên quan</p>
      </div>
      <div className="proposal-assets-content">
        {data?.map((asset) => (
          <div className="proposal-asset-item">
            <Button
              label="Tệp đính kèm"
              icon="pi pi-download"
              iconPos="right"
              disabled={
                // check if asset is final && proposal status is not CompletePayment && current user is not the creator
                asset.type === "Final" &&
                selectingProposal?.status !== "CompletePayment" &&
                selectingProposal?.createdBy !== currentUserId
              }
              onClick={() => {
                window.open(asset?.url, "_blank");
              }}
              className="w-full mr-3"
            />
            <p className="text-cus-normal second-collumn-frame">
              {formatTime(asset.createdOn, "dd/MM/yyyy HH:mm")}
            </p>
          </div>
        ))}
      </div>

      <div className="complete-payment-container">
        {
          // check if there is a final asset and proposal status is not Complete the Final Payment -> Start to complete payment
          data.some((asset) => asset.type === "Final") &&
            selectingProposal?.status !== "CompletePayment" &&
            selectingProposal?.createdBy !== currentUserId && (
              <Button
                label="Trả tiền đủ"
                icon="pi pi-check"
                className="w-full"
                onClick={() => {
                  //complete payment
                  // alert("complete payment");
                  handleCompletePayment && handleCompletePayment(selectingProposal?.id);
                }}
              />
            )
        }
      </div>

      <AddReviewView selectingProposal={selectingProposal} />
    </div>
  );
}

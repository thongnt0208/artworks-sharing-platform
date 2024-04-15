import { useState } from "react";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Badge } from "primereact/badge";
import { formatTime } from "../../../../util/TimeHandle";
import { getAuthInfo } from "../../../../util/AuthUtil";
import PaymentConfirmation from "../../../../components/PaymentConfirmation";
import { ProposalAssetItemType, ProposalStateToolsType } from "../../ChatRelatedTypes";
import "./ProposalAssetsView.scss";
import { numberToXu } from "../../../../util/CurrencyHandle";
// ---------------------------------------------------------

type Props = { data: ProposalAssetItemType[]; proposalStateTools: ProposalStateToolsType };

export default function ProposalAssetsView({ data, proposalStateTools }: Props) {
  const { selectingProposal, handleCompletePayment } = proposalStateTools;

  const [confirmVisible, setConfirmVisible] = useState(false);

  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  let completePrice = selectingProposal?.totalPrice * (1 - selectingProposal?.initialPrice);
  const isCreator = selectingProposal?.createdBy === currentUserId;

  const handleAcceptConfirmation = () => {
    handleCompletePayment && handleCompletePayment(selectingProposal?.id);
    setConfirmVisible(false);
  };

  const headerTemplate = (options: any) => {
    const className = `${options.className} justify-content-space-between`;

    return (
      <div className={className}>
        <div className="proposal-assets-header w-full" style={{ textAlign: "center" }}>
          <p className="text-cus-h3-bold pl-5">Tài nguyên liên quan</p>
        </div>
        <div>{options.togglerElement}</div>
      </div>
    );
  };

  const badgeSeverity = (type: string) => {
    switch (type) {
      case "Cuối cùng":
        return "success";
      case "Sửa đổi":
        return "warning";
      default:
        return null;
    }
  };
  return (
    <>
      <PaymentConfirmation
        visible={confirmVisible}
        setVisible={setConfirmVisible}
        paymentAmount={completePrice}
        acceptCallback={handleAcceptConfirmation}
      />

      <Panel headerTemplate={headerTemplate} toggleable>
        <div className="proposal-assets-container">
          <div className="proposal-assets-content">
            {data?.map((asset) => (
              <div key={asset.id} className="proposal-asset-item flex flex-column">
                <p className="text-cus-normal pb-1">
                  <Badge value={asset.type} severity={badgeSeverity(asset.type)} /> tải vào{" "}
                  <span style={{ color: "gray" }}>
                    {formatTime(asset.createdOn, "HH:mm ngày dd/MM/yyyy")}
                  </span>
                </p>{" "}
                <Button
                  label={asset.name.slice(0, 10) + asset.name.slice(asset.name.lastIndexOf("."))}
                  icon="pi pi-download"
                  iconPos="right"
                  disabled={
                    // check if asset is final && proposal status is not CompletePayment && current user is not the creator
                    (asset.type === "Final" || asset.type === "Revision") &&
                    selectingProposal?.status !== "CompletePayment" &&
                    selectingProposal?.createdBy !== currentUserId
                  }
                  onClick={() => {
                    window.open(asset?.url, "_blank");
                  }}
                  className="w-full mr-3"
                />
              </div>
            ))}
          </div>

          {
            // check if there is a final asset and proposal status is not Complete the Final Payment -> Start to complete payment
            selectingProposal?.status === "Completed" && !isCreator && (
              <div className="complete-payment-container">
                <Button
                  severity="info"
                  label={`Thanh toán ${numberToXu(completePrice)} còn lại`}
                  icon="pi pi-check"
                  className="w-full"
                  onClick={() => setConfirmVisible(true)}
                />
              </div>
            )
          }
        </div>
      </Panel>
    </>
  );
}

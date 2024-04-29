import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { ProposalType } from "../../ChatScreen/ChatRelatedTypes";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import ProposalCard from "../../ChatScreen/components/Proposal/ProposalCard";
import "./ProposalSection.scss";
import { formatTime } from "../../../util/TimeHandle";
import { numberToXu } from "../../../util/CurrencyHandle";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const ProposalSection: React.FC<{ data: ProposalType[] }> = ({ data }) => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState<ProposalType[]>(data);
  const [selectedProposal, setSelectedProposal] = useState<ProposalType>();
  const [showProposalDetail, setShowProposalDetail] = useState(false);
  useEffect(() => {
    setProposals(data);
  }, [data]);

  const rowStatus = (rowData: ProposalType) => {
    let backgroundColor;
    let color = "white";
    let status;
    switch (rowData.status) {
      case "Waiting":
        backgroundColor = "lightyellow";
        color = "grey";
        status = "Đang chờ";
        break;
      case "Accepted":
        backgroundColor = "lightgreen";
        status = "Đã chấp nhận";
        break;
      case "Declined":
        backgroundColor = "red";
        status = "Đã từ chối";
        break;
      case "Canceled":
        backgroundColor = "orange";
        status = "Đã bị hủy";
        break;
      case "InitPayment":
        backgroundColor = "blue";
        status = "Đã thanh toán cọc";
        break;
      case "CompletePayment":
        backgroundColor = "green";
        status = "Đã hoàn tất thanh toán";
        break;
      case "Complete":
        backgroundColor = "green";
        status = "Đã hoàn thành";
        break;
      default:
        backgroundColor = "yellow";
        color = "black";
        status = "Đang chờ";
    }

    return (
      <span
        style={{
          width: "fit-content",
          height: "100%",
          backgroundColor,
          padding: "0.25rem 0.5rem",
          borderRadius: "1rem",
          color,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {status}
      </span>
    );
  };

  const rowDeliveryTime = (rowData: ProposalType) => {
    return <>{formatTime(rowData.targetDelivery)}</>;
  };

  const rowCreatedTime = (rowData: ProposalType) => {
    return <>{formatTime(rowData.createdOn ?? "")}</>;
  };

  const rowPrice = (rowData: ProposalType) => {
    return <>{numberToXu(rowData.totalPrice)}</>;
  };

  const onRowSelect = () => {
    setShowProposalDetail(true);
  };

  return (
    <>
      <DataTable
        value={proposals}
        selectionMode={"single"}
        selection={selectedProposal!}
        onSelectionChange={(e) => setSelectedProposal(e.value)}
        dataKey="id"
        onRowSelect={onRowSelect}
        metaKeySelection={false}
        tableStyle={{ width: "90vw" }}
      >
        <Column field="projectTitle" header="Tên dự án" />
        <Column field="category" header="Thể loại" />
        <Column field="totalPrice" header="Tổng chi phí" body={rowPrice} />
        <Column field="targetDelivery" header="Ngày giao hàng" body={rowDeliveryTime} />
        <Column field="status" header="Trạng thái" body={rowStatus} />
        <Column field="createdOn" header="Ngày tạo" body={rowCreatedTime}/>
      </DataTable>
      <Dialog
        showHeader={false}
        visible={showProposalDetail}
        style={{ width: "30vw" }}
        dismissableMask
        onHide={() => setShowProposalDetail(false)}
        contentStyle={{ borderRadius: "20px", padding: "10px" }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <ProposalCard {...selectedProposal!} />
          <Button
            label="Đi tới cuộc trò chuyện"
            className="btn"
            onClick={() => navigate(`/chat/${selectedProposal?.chatBoxId}`)}
          />
        </div>
      </Dialog>
    </>
  );
};

export default ProposalSection;

import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatTime } from "../../../util/TimeHandle";
import { Dialog } from "primereact/dialog";
import RequestCard from "../../ChatScreen/components/Request/RequestCard";
import { RequestItemType } from "../../ChatScreen/ChatRelatedTypes";
import { numberToXu } from "../../../util/CurrencyHandle";
import "./RequestSection.scss";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const RequestSection: React.FC<{ data: RequestItemType[] }> = ({ data }) => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<RequestItemType[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RequestItemType>();
  const [showRequestDetail, setShowRequestDetail] = useState(false);
  useEffect(() => {
    setRequests(data);
  }, [data]);

  const rowServiceInfo = (rowData: RequestItemType) => {
    return (
      <div className="flex justify-content-start align-items-center">
        <img
          src={rowData.service.thumbnail}
          alt="service"
          className="object-cover rounded-full"
          style={{ width: "80px", height: "70px", objectFit: "cover" }}
        />
        <div className="ml-4">
          <h3>{rowData.service.serviceName}</h3>
        </div>
      </div>
    );
  };

  const rowFrom = (rowData: RequestItemType) => {
    return (
      <div className="flex items-center">
        <div>
          <p className="font-semibold">{rowData.account?.fullname}</p>
        </div>
      </div>
    );
  };

  const rowTime = (rowData: RequestItemType) => {
    return <>{formatTime(rowData.createdOn)}</>;
  };

  const rowStatus = (rowData: RequestItemType) => {
    let backgroundColor;
    let status;
    switch (rowData.requestStatus) {
      case "Waiting":
        backgroundColor = "orange";
        status = "Đang chờ";
        break;
      case "Accepted":
        backgroundColor = "green";
        status = "Đã chấp nhận";
        break;
      case "Declined":
        backgroundColor = "red";
        status = "Đã từ chối";
        break;
      default:
        backgroundColor = "orange";
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
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {status}
      </span>
    );
  };

  const rowPrice = (rowData: RequestItemType) => {
    return <>{numberToXu(rowData.price)}</>;
  }

  const onRowSelect = () => {
    setShowRequestDetail(true);
  };

  return (
    <>
      <DataTable
        value={requests}
        selectionMode={"single"}
        selection={selectedRequest!}
        onSelectionChange={(e) => setSelectedRequest(e.value)}
        dataKey="id"
        onRowSelect={onRowSelect}
        metaKeySelection={false}
        tableStyle={{ width: "90vw" }}
      >
        <Column
          field="service"
          header="Thông tin dịch vụ"
          body={rowServiceInfo}
        />
        <Column field="account" header="Người yêu cầu" body={rowFrom} />
        <Column field="price" header="Ngân sách" body={rowPrice}/>
        <Column field="timeline" header="Thời gian" />
        <Column field="requestStatus" header="Trạng thái" body={rowStatus} />
        <Column field="createdOn" header="Ngày tạo" body={rowTime} />
      </DataTable>
      <Dialog
        showHeader={false}
        visible={showRequestDetail}
        style={{ width: "30vw" }}
        dismissableMask
        onHide={() => setShowRequestDetail(false)}
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
        <RequestCard {...selectedRequest!} />
        <Button
            label="Đi tới cuộc trò chuyện"
            className="btn"
            onClick={() => navigate(`/chat/${selectedRequest?.chatBoxId}`)}
          />
        </div>
      </Dialog>
    </>
  );
};

export default RequestSection;

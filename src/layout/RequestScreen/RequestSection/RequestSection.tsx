import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatTime } from "../../../util/TimeHandle";
import { Dialog } from "primereact/dialog";
import RequestCard from "../../ChatScreen/components/Request/RequestCard";
import { RequestItemType } from "../../ChatScreen/ChatRelatedTypes";

const RequestSection: React.FC<{ data: RequestItemType[] }> = ({ data }) => {
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
          <p className="font-semibold">{rowData.createdBy}</p>
        </div>
      </div>
    );
  };

  const rowTime = (rowData: RequestItemType) => {
    return <>{formatTime(rowData.createdOn)}</>;
  };

  const rowStatus = (rowData: RequestItemType) => {
    let status;
    switch (rowData.requestStatus) {
      case "Waiting":
        status = "Đang chờ";
        break;
      case "Accepted":
        status = "Đã chấp nhận";
        break;
      case "Declined":
        status = "Đã từ chối";
        break;
      default:
        status = "Đang chờ";
    }
    return <>{status}</>;
  };

  const onRowSelect = () => {
    setShowRequestDetail(true);
  };

  return (
    <>
      <DataTable
        className="report-table"
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
        <Column field="from" header="Người yêu cầu" body={rowFrom} />
        <Column field="price" header="Ngân sách" />
        <Column field="timeline" header="Thời gian" />
        <Column field="requestStatus" header="Trạng thái" body={rowStatus} />
        <Column field="createdOn" header="Ngày tạo" body={rowTime} />
      </DataTable>
      <Dialog
        header="Chi tiết yêu cầu"
        visible={showRequestDetail}
        style={{ width: "50vw" }}
        dismissableMask
        onHide={() => setShowRequestDetail(false)}
      >
        <RequestCard {...selectedRequest!} />
      </Dialog>
    </>
  );
};

export default RequestSection;

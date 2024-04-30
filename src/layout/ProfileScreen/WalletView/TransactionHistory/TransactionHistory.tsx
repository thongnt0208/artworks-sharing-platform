import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { getAuthInfo } from "../../../../util/AuthUtil";

export type TransactionHistoryProps = {
  id: string;
  createdAccount: {
    id: string;
    username: string;
    email: string;
    fullname: string;
    avatar: string;
  };
  otherAccount: {
    id: string;
    username: string;
    email: string;
    fullname: string;
    avatar: string;
  };
  assetId: string;
  proposalId: string;
  detail: string;
  price: number;
  walletBalance: number;
  fee: number;
  transactionStatus: string;
  createdBy: string;
  createdOn: string;
};

interface TransactionHistoryList {
  transactions: TransactionHistoryProps[];
}

const TransactionHistory: React.FC<TransactionHistoryList> = (transactionHistory) => {
  const fromAccRowTemplate = (rowData: TransactionHistoryProps) => (
    <div className="flex flex-row align-items-center">
      <img
        src={rowData.createdAccount.avatar}
        alt={rowData.createdAccount.fullname}
        style={{ width: "32px", height: "32px", borderRadius: "50%" }}
      />
      <span className="ml-1">{rowData.createdAccount.fullname}</span>
    </div>
  );

  const toAccRowTemplate = (rowData: TransactionHistoryProps) => (
    <div className="flex flex-row align-items-center">
      <img
        src={rowData.otherAccount.avatar}
        alt={rowData.otherAccount.fullname}
        style={{ width: "32px", height: "32px", borderRadius: "50%" }}
      />
      <span className="ml-1">{rowData.otherAccount.fullname}</span>
    </div>
  );

  const priceRowTemplate = (rowData: TransactionHistoryProps) => {
    return (
      <span className={rowData.createdBy !== getAuthInfo()?.id ? "text-blue-600" : "text-red-500"}>
        {rowData.createdBy !== getAuthInfo()?.id ? (
          <>+{rowData.price.toLocaleString()}</>
        ) : (
          <>{rowData.price.toLocaleString()}</>
        )}
      </span>
    );
  };

  const walletBalanceRowTemplate = (rowData: TransactionHistoryProps) => {
    return (
      <span className={rowData.createdBy !== getAuthInfo()?.id ? "text-blue-600" : "text-red-500"}>
        {rowData.walletBalance.toLocaleString()}
      </span>
    );
  };

  const feeRowTemplate = (rowData: TransactionHistoryProps) => {
    return <span>{rowData.fee.toLocaleString()}</span>;
  };

  const statusRowTemplate = (rowData: TransactionHistoryProps) => {
    return (
      <div
        style={{
          width: "w-full",
          textAlign: "center",
          backgroundColor: rowData.transactionStatus === "Thành công" ? "green" : "red",
          padding: "0.25rem 0.5rem",
          borderRadius: "1rem",
          color: "white",
        }}
      >
        {rowData.transactionStatus}
      </div>
    );
  };

  return (
    <DataTable
      value={transactionHistory.transactions}
      className="w-full"
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      emptyMessage="Hãy tham gia vào các dịch vụ của Artworkia nhé!"
    >
      <Column field="fromAccount" header="Người gửi" body={fromAccRowTemplate} />
      <Column body={<i className="pi pi-arrow-right ml-1" />} />
      <Column field="toAccount" header="Người nhận" body={toAccRowTemplate} />
      <Column field="detail" header="Chi tiết"></Column>
      <Column field="price" header="Số lượng (XU)" body={priceRowTemplate} sortable></Column>
      <Column field="walletBalance" header="Số dư ví (XU)" body={walletBalanceRowTemplate} sortable></Column>
      <Column field="fee" header="Tổng phí (XU)" body={feeRowTemplate} sortable></Column>
      <Column
        field="transactionStatus"
        header="Trạng thái"
        body={statusRowTemplate}
        sortable
      ></Column>
      <Column field="createdOn" header="Ngày tạo"></Column>
    </DataTable>
  );
};

export default TransactionHistory;

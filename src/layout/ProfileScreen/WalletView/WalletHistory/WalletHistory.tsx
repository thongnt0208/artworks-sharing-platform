import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export type WalletHistoryProps = {
  id: string;
  account: {
    id: string;
    username: string;
    email: string;
    fullname: string;
    avatar: string; 
  };
  amount: number;
  type: string;
  walletBalance: number;
  paymentMethod: string;
  transactionStatus: string;
  createdOn: string;
};

export type walletHistoryList = {
  walletHistory: WalletHistoryProps[];
};

const WalletHistory: React.FC<walletHistoryList> = (walletHistoryList) => {
  const typeRowTemplate = (rowData: WalletHistoryProps) => {
    return (
      <span className={rowData.type === "Nạp tiền" ? "text-blue-600" : "text-red-500"}>
        {rowData.type === "Nạp tiền" ? <i className="pi pi-arrow-down mr-1" /> : <i className="pi pi-arrow-up mr-1" />}
        {rowData.type}
      </span>
    );
  };

  const amountRowTemplate = (rowData: WalletHistoryProps) => {
    return (
      <span className={rowData.type === "Nạp tiền" ? "text-blue-600" : "text-red-500"}>
        {rowData.type === "Nạp tiền" ? `+${rowData.amount.toLocaleString()}` : `${rowData.amount.toLocaleString()}`}
      </span>
    );
  };

  const walletBalanceRowTemplate = (rowData: WalletHistoryProps) => {
    return (
      <span className={rowData.type === "Nạp tiền" ? "text-blue-600" : "text-red-500"}>
        {rowData.walletBalance.toLocaleString()}
      </span>
    );
  };

  const statusRowTemplate = (rowData: WalletHistoryProps) => {
    return (
      <span
        style={{
          width: "fit-content",
          backgroundColor: rowData.transactionStatus === "Thành công" ? "green" : "red",
          padding: "0.25rem 0.5rem",
          borderRadius: "1rem",
          color: "white",
          textAlign: "center",
        }}
      >
        {rowData.transactionStatus}
      </span>
    );
  };

  return (
    <DataTable
      value={walletHistoryList.walletHistory}
      className="w-full"
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      emptyMessage="Hãy nạp thêm Xu để trải nghiệm các dịch vụ của Artworkia nhé!"
    >
      <Column field="type" header="Loại" body={typeRowTemplate} sortable></Column>
      <Column field="paymentMethod" header="Phương thức" sortable></Column>
      <Column field="amount" header="Số lượng (Xu)" body={amountRowTemplate} sortable></Column>
      <Column field="walletBalance" header="Số dư ví" body={walletBalanceRowTemplate} sortable></Column>
      <Column
        field="transactionStatus"
        header="Trạng thái"
        body={statusRowTemplate}
        style={{ display: "flex" }}
        sortable
      ></Column>
      <Column field="createdOn" header="Ngày tạo" sortable></Column>
    </DataTable>
  );
};

export default WalletHistory;

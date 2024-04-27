import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { TransactionHistoryProps } from "../TransactionHistory/TransactionHistory";
import { WalletHistoryProps } from "../WalletHistory/WalletHistory";

export type GeneralTransactionHistoryProps = {
  transactionHistory?: TransactionHistoryProps;
  walletHistory?: WalletHistoryProps;
  createdOn: string;
};

interface GeneralTransactionHistoryList {
  generalTransactionHistory: GeneralTransactionHistoryProps[];
}

const GeneralTransactionHistory: React.FC<GeneralTransactionHistoryList> = (generalTransactionHistory) => {
  const detailRowTemplate = (rowData: GeneralTransactionHistoryProps) => {
    return (
      <>
        {rowData.transactionHistory && (
          <span className={rowData.transactionHistory.price > 0 ? "text-blue-600" : "text-red-500"}>
            {rowData.transactionHistory.price > 0 ? (
              <i className="pi pi-arrow-down mr-1" />
            ) : (
              <i className="pi pi-arrow-up mr-1" />
            )}
            {rowData.transactionHistory.detail}
          </span>
        )}
        {rowData.walletHistory && (
          <span className={rowData.walletHistory?.amount > 0 ? "text-blue-600" : "text-red-500"}>
            {rowData.walletHistory?.amount > 0 ? (
              <i className="pi pi-arrow-down mr-1" />
            ) : (
              <i className="pi pi-arrow-up mr-1" />
            )}
            {rowData.walletHistory?.type}
          </span>
        )}
      </>
    );
  };

  const methodRowTemplate = (rowData: GeneralTransactionHistoryProps) => {
    return (
      <>
        {rowData.transactionHistory && "Artworkia"}
        {rowData.walletHistory && rowData.walletHistory.paymentMethod}
      </>
    );
  };

  const amountRowTemplate = (rowData: GeneralTransactionHistoryProps) => {
    return (
      <>
        {rowData.transactionHistory && (
          <span className={rowData.transactionHistory.price > 0 ? "text-blue-600" : "text-red-500"}>
            {rowData.transactionHistory.price > 0
              ? `+${rowData.transactionHistory.price.toLocaleString()}`
              : `${rowData.transactionHistory.price.toLocaleString()}`}
          </span>
        )}
        {rowData.walletHistory && (
          <span className={rowData.walletHistory?.amount > 0 ? "text-blue-600" : "text-red-500"}>
            {rowData.walletHistory?.amount > 0
              ? `+${rowData.walletHistory?.amount.toLocaleString()}`
              : `${rowData.walletHistory?.amount.toLocaleString()}`}
          </span>
        )}
      </>
    );
  };

  const walletBalanceRowTemplate = (rowData: GeneralTransactionHistoryProps) => {
    return (
      <>
        {rowData.transactionHistory && <span>{rowData.transactionHistory.walletBalance.toLocaleString()}</span>}
        {rowData.walletHistory && <span>{rowData.walletHistory?.walletBalance.toLocaleString()}</span>}
      </>
    );
  };

  const platformFeeRowTemplate = (rowData: GeneralTransactionHistoryProps) => {
    return (
      <>
        {rowData.transactionHistory && <span>{rowData.transactionHistory.fee.toLocaleString()}</span>}
        {rowData.walletHistory && <span>{0}</span>}
      </>
    );
  };

  const statusRowTemplate = (rowData: GeneralTransactionHistoryProps) => {
    return (
      <>
        {rowData.transactionHistory && (
          <span
            style={{
              width: "fit-content",
              backgroundColor: rowData.transactionHistory.transactionStatus === "Thành công" ? "green" : "red",
              padding: "0.25rem 0.5rem",
              borderRadius: "1rem",
              color: "white",
              textAlign: "center",
            }}
          >
            {rowData.transactionHistory.transactionStatus}
          </span>
        )}
        {rowData.walletHistory && (
          <span
            style={{
              width: "fit-content",
              backgroundColor: rowData.walletHistory?.transactionStatus === "Thành công" ? "green" : "red",
              padding: "0.25rem 0.5rem",
              borderRadius: "1rem",
              color: "white",
              textAlign: "center",
            }}
          >
            {rowData.walletHistory?.transactionStatus}
          </span>
        )}
      </>
    );
  };

  return (
    <DataTable
      value={generalTransactionHistory.generalTransactionHistory}
      className="w-full"
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      emptyMessage="Hãy tham gia vào các dịch vụ của Artworkia nhé!"
    >
      <Column field="generalTransactionHistory" header="Thông tin" body={detailRowTemplate} />
      <Column field="generalTransactionHistory" header="Phương thức" body={methodRowTemplate} />
      <Column field="generalTransactionHistory" header="Số Xu" body={amountRowTemplate} />
      <Column field="generalTransactionHistory" header="Số dư ví" body={walletBalanceRowTemplate} />
      <Column field="generalTransactionHistory" header="Phí nền tảng" body={platformFeeRowTemplate} />
      <Column field="generalTransactionHistory" header="Trạng thái" body={statusRowTemplate} />
      <Column field="createdOn" header="Ngày tạo" />
    </DataTable>
  );
};

export default GeneralTransactionHistory;

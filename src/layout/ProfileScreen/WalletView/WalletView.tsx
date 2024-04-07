import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { TabMenu } from "primereact/tabmenu";

import {
  GetTransactionHistoryData,
  GetWalletData,
  GetWalletHistoryData,
} from "./WalletService";
import { getAuthInfo } from "../../../util/AuthUtil";
import DepositCoin from "./DepositCoin/DepositCoin";
import WithdrawCoin from "./WithdrawCoin/WithdrawCoin";
import WalletInformation from "./WalletInformation/WalletInformation";
import "./WalletView.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
const zalopayLogo = require("../../../assets/logo/zalopay-logo.png");

export type WalletProps = {
  balance: number;
  withdrawMethod: string;
  withdrawInformation: string;
};

export type WalletHistoryProps = {
  id: string;
  amount: number;
  type: string;
  paymentMethod: string;
  transactionStatus: string;
  createdOn: string;
};

export type TransactionHistoryProps = {
  id: string;
  accountId: string;
  fromFullname: string;
  detail: string;
  assetId: string;
  proposalId: string;
  transactionStatus: string;
  price: number;
  createdOn: string;
};

const WalletView: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [wallet, setWallet] = useState<WalletProps>();
  const [walletHistory, setWalletHistory] = useState<WalletHistoryProps[]>([]);
  const [transactionHistory, setTransactionHistory] = useState<
    TransactionHistoryProps[]
  >([]);
  const [isWalletInformationVisible, setIsWalletInformationVisible] =
    useState(false);
  const [isDepositDialogVisible, setIsDepositDialogVisible] = useState(false);
  const [isWithdrawDialogVisible, setIsWithdrawDialogVisible] = useState(false);

  const items = [
    { label: "Lịch sử rút nạp xu" },
    { label: "Lịch sử giao dịch xu" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wallet = await GetWalletData(getAuthInfo()?.id);
        setWallet(wallet);
        if (activeTab === 0) {
          const walletHistory = await GetWalletHistoryData(getAuthInfo()?.id);
          setWalletHistory(walletHistory);
        } else {
          const transactionHistory = await GetTransactionHistoryData(
            getAuthInfo()?.id
          );
          setTransactionHistory(transactionHistory);
        }
      } catch (error) {
        console.log("Error fetching wallet history data:", error);
      } finally {
        setRefresh(false);
      }
    };
    fetchData();
  }, [refresh, activeTab]);

  const typeRowTemplate = (rowData: WalletHistoryProps) => {
    return (
      <span
        className={
          rowData.type === "Nạp tiền" ? "text-blue-600" : "text-red-500"
        }
      >
        {rowData.type === "Nạp tiền" ? (
          <i className="pi pi-arrow-up mr-1" />
        ) : (
          <i className="pi pi-arrow-down mr-1" />
        )}
        {rowData.type}
      </span>
    );
  };

  const statusRowTemplate = (rowData: WalletHistoryProps) => {
    return (
      <span
        style={{
          backgroundColor:
            rowData.transactionStatus === "Thành công" ? "green" : "red",
          padding: "0.25rem 0.5rem",
          borderRadius: "1rem",
          color: "white",
        }}
      >
        {rowData.transactionStatus}
      </span>
    );
  };

  const fromAccRowTemplate = (rowData: TransactionHistoryProps) => {
    return (
      <span
        className={
          rowData.accountId !== getAuthInfo()?.id
            ? "text-blue-600"
            : "text-red-500"
        }
      >
        {rowData.accountId !== getAuthInfo()?.id ? (
          <>
            <i className="pi pi-arrow-up mr-1" />{rowData.fromFullname}
          </>
        ) : (
          <>
            <i className="pi pi-arrow-down mr-1" />Tôi
          </>
        )}
      </span>
    );
  };

  return (
    <div className="wallet-view">
      <div className="wallet-info-section">
        <h1 className="wallet-title">Thông tin ví</h1>
        <h2 className="w-full text-center">
          Phương thức:{" "}
          {wallet?.withdrawMethod === "Zalopay" ? (
            <img style={{ width: "100px" }} src={zalopayLogo} alt="" />
          ) : (
            <></>
          )}
        </h2>
        <h2 className="w-full text-center">
          Số điện thoại:{" "}
          <strong className="underline">{wallet?.withdrawInformation}</strong>
        </h2>
        <div className="w-full flex justify-content-center align-items-center">
          <Button
            label="Cập nhật thông tin ví"
            className="p-button-raised p-button-rounded"
            onClick={() => setIsWalletInformationVisible(true)}
          />
        </div>
      </div>

      <div className="balance-info-section">
        <h1 className="m-0">Số dư</h1>
        <h1 className="balance-info">
          {wallet?.balance?.toLocaleString() || 0} Xu
        </h1>
        <div className="action-section">
          {wallet?.withdrawInformation && wallet?.withdrawMethod ? (
            <>
              <Button
                label="Nạp tiền"
                className="deposit-btn p-button-raised p-button-rounded"
                onClick={() => setIsDepositDialogVisible(true)}
              />
              <DepositCoin
                isVisible={isDepositDialogVisible}
                onHide={() => setIsDepositDialogVisible(false)}
              />

              <Button
                label="Rút tiền"
                className="withdraw-btn p-button-raised p-button-rounded"
                onClick={() => setIsWithdrawDialogVisible(true)}
              />
              <WithdrawCoin
                balance={wallet?.balance}
                isVisible={isWithdrawDialogVisible}
                hideCallback={() => setIsWithdrawDialogVisible(false)}
                refreshCallback={() => {
                  setRefresh(true);
                }}
                phoneNumber={wallet?.withdrawInformation}
              />
            </>
          ) : (
            <>
              <Button
                label="Thêm phương thức thanh toán"
                className="p-button-raised p-button-rounded"
                onClick={() => setIsWalletInformationVisible(true)}
              />
            </>
          )}
        </div>
      </div>

      <WalletInformation
        isVisible={isWalletInformationVisible}
        refreshCallback={() => setRefresh(true)}
        onHide={() => setIsWalletInformationVisible(false)}
      />

      <div className="history-section">
        <h1 className="history-title">Giao dịch</h1>
        <TabMenu
          model={items}
          activeIndex={activeTab}
          onTabChange={(e) => setActiveTab(e.index)}
          className="tab-menu w-max mb-3 text-black-alpha-90"
        />

        {activeTab === 0 ? (
          <DataTable
            value={walletHistory}
            className="w-full"
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            emptyMessage="Hãy nạp thêm Xu để trải nghiệm các dịch vụ của Artworkia nhé!"
          >
            <Column
              field="type"
              header="Loại"
              body={typeRowTemplate}
              sortable
            ></Column>
            <Column
              field="paymentMethod"
              header="Phương thức"
              sortable
            ></Column>
            <Column field="amount" header="Số lượng (Xu)" sortable></Column>
            <Column
              field="transactionStatus"
              header="Trạng thái"
              body={statusRowTemplate}
              sortable
            ></Column>
            <Column field="createdOn" header="Ngày tạo" sortable></Column>
          </DataTable>
        ) : (
          <DataTable
            value={transactionHistory}
            className="w-full"
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            emptyMessage="Hãy tham gia vào các dịch vụ của Artworkia nhé!"
          >
            <Column
              field="fromFullname"
              header="Tài khoản đối tác"
              body={fromAccRowTemplate}
            ></Column>
            <Column field="detail" header="Chi tiết"></Column>
            <Column field="price" header="Giá (XU)"></Column>
            <Column
              field="transactionStatus"
              header="Trạng thái"
              body={statusRowTemplate}
              sortable
            ></Column>
            <Column field="createdOn" header="Ngày tạo"></Column>
          </DataTable>
        )}
      </div>
    </div>
  );
};

export default WalletView;

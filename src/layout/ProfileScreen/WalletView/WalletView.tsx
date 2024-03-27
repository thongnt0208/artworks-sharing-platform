import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { TabMenu } from "primereact/tabmenu";

import {
  GetTransactionHistoryData,
  GetWalletData,
  GetWalletHistoryData,
} from "./WalletService";
import { formatTime } from "../../../util/TimeHandle";
import { getAuthInfo } from "../../../util/AuthUtil";
import DepositCoin from "./DepositCoin/DepositCoin";
import WithdrawCoin from "./WithdrawCoin/WithdrawCoin";
import "./WalletView.scss";
import WalletInformation from "./WalletInformation/WalletInformation";
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
  transactionStatus: boolean;
  createdOn: string;
};

export type TransactionHistoryProps = {
  id: string;
  accountId: string;
  assetId: string;
  proposalId: string;
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

  const walletHistoryRow = (walletHistory: WalletHistoryProps) => {
    return (
      <>
        <div className="wallet-history-section">
          <i
            className={`wallet-icon ${
              walletHistory.type === "Deposit"
                ? "pi pi-arrow-up"
                : "pi pi-arrow-down"
            }`}
            style={{
              color: walletHistory.type === "Deposit" ? "#F12B2B" : "#00668C",
            }}
          />
          <div className="wallet-info">
            <p
              className="m-0"
              style={{
                color: walletHistory.type === "Deposit" ? "#F12B2B" : "#00668C",
              }}
            >
              {walletHistory.type === "Deposit"
                ? "+" + walletHistory.amount.toLocaleString() + " Xu"
                : "-" + walletHistory.amount.toLocaleString() + " Xu"}
            </p>
            <p className="m-0">{walletHistory.id}</p>
          </div>

          <p className="method">
            <strong>Phương thức:</strong> {walletHistory.paymentMethod}
          </p>
          <p>{formatTime(walletHistory.createdOn)}</p>
          <p className="status">
            <strong>Trạng thái:</strong> {walletHistory.transactionStatus}
          </p>
        </div>
      </>
    );
  };

  const transactionHistoryRow = (
    transationHistory: TransactionHistoryProps
  ) => {
    return (
      <>
        <div className="transaction-history-section">
          <i
            className={`transaction-icon ${
              transationHistory.proposalId !== null
                ? "pi pi-arrow-up"
                : "pi pi-arrow-down"
            }`}
            style={{
              color:
                transationHistory.proposalId !== null ? "#F12B2B" : "#00668C",
            }}
          />
          <div className="transaction-info">
            <p
              className="m-0"
              style={{
                color:
                  transationHistory.proposalId !== null ? "#F12B2B" : "#00668C",
              }}
            >
              {transationHistory.proposalId !== null
                ? "+" + transationHistory.price + " Xu"
                : "-" + transationHistory.price + " Xu"}
            </p>
            <p className="m-0">{transationHistory.id}</p>
          </div>

          <div className="type flex flex-column">
            {transationHistory.proposalId !== null ? (
              <>
                <strong>Công việc:</strong>
                <p className="m-0"> {transationHistory.proposalId}</p>
              </>
            ) : (
              <>
                <strong>Tài nguyên:</strong>
                <p className="m-0"> {transationHistory.assetId}</p>
              </>
            )}
          </div>

          <p>{transationHistory.createdOn}</p>
        </div>
      </>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wallet = await GetWalletData(getAuthInfo()?.id);
        setWallet(wallet);
        const walletHistory = await GetWalletHistoryData(getAuthInfo()?.id);
        setWalletHistory(walletHistory);
        const transactionHistory = await GetTransactionHistoryData(
          getAuthInfo()?.id
        );
        setTransactionHistory(transactionHistory);
      } catch (error) {
        console.log("Error fetching wallet history data:", error);
      } finally {
        setRefresh(false);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <div className="wallet-view">
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
        Số điện thoại: <strong>{wallet?.withdrawInformation}</strong>
      </h2>
      <div className="w-full flex justify-content-center align-items-center">
        <Button
          label="Cập nhật thông tin ví"
          className="p-button-raised p-button-rounded"
          onClick={() => setIsWalletInformationVisible(true)}
        />
      </div>
      <h1>Số dư</h1>
      <h1 className="balance-info w-full text-center">
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
      <WalletInformation
        isVisible={isWalletInformationVisible}
        refreshCallback={() => setRefresh(true)}
        onHide={() => setIsWalletInformationVisible(false)}
      />
      <TabMenu
        model={items}
        activeIndex={activeTab}
        onTabChange={(e) => setActiveTab(e.index)}
        className="w-max mb-3 text-black-alpha-90"
      />

      {activeTab === 0 ? (
        walletHistory.length !== 0 ? (
          walletHistory.map((historyRow) => walletHistoryRow(historyRow))
        ) : (
          <div className="empty-section w-full h-full flex justify-content-center align-items-start p-5">
            <h1>
              Hãy nạp thêm Xu để trải nghiệm các dịch vụ của Artworkia nhé!
            </h1>
          </div>
        )
      ) : (
        transactionHistory.map((historyRow) =>
          transactionHistoryRow(historyRow)
        )
      )}
    </div>
  );
};

export default WalletView;

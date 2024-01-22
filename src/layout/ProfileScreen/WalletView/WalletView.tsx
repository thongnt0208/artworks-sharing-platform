import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { TabMenu } from "primereact/tabmenu";

import "./WalletView.scss";
import DepositCoin from "./DepositCoin/DepositCoin";
import { GetWalletData, GetWalletHistoryData } from "./WalletService";
import { getAuthInfo } from "../../../util/AuthUtil";

type WalletProps = {
  balance: number;
  withdrawMethod: string;
  withdrawInformation: string;
};

type WalletHistoryProps = {
  id: string;
  amount: number;
  type: string;
  paymentMethod: string;
  transactionStatus: boolean;
  createdOn: string;
};

const WalletView: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [depositCoinDialog, setDepositCoinDialog] = useState(false);
  const [wallet, setWallet] = useState<WalletProps>();
  const [walletHistory, setWalletHistory] = useState<WalletHistoryProps[]>([]);

  const items = [
    { label: "Lịch sử rút nạp xu" },
    { label: "Lịch sử giao dịch xu" },
  ];

  const walletHistoryRow = (walletHistory: WalletHistoryProps) => {
    return (
      <>
        <div className="transaction-history-section">
          <i
            className={`transaction-icon ${
              walletHistory.type === "deposit" ? "pi pi-arrow-up" : "pi pi-arrow-down"
            }`}
            style={{
              color: walletHistory.type === "deposit" ? "#8c0000" : "#00668C",
            }}
          />
          <div className="transaction-info">
            <p
              className="m-0"
              style={{
                color: walletHistory.type === "deposit" ? "#8c0000" : "#00668C",
              }}
            >
              {walletHistory.type === "deposit"
                ? "+" + walletHistory.amount
                : "-" + walletHistory.amount}
            </p>
            <p className="m-0">{walletHistory.id}</p>
          </div>
          {walletHistory.paymentMethod && (
            <p className="method">Phương thức: {walletHistory.paymentMethod}</p>
          )}
          <p>{walletHistory.createdOn}</p>
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
      } catch (error) {
        console.log("Error fetching wallet history data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h1>Số dư</h1>
      <h1 className="balance-info w-full text-center">{wallet?.balance} Xu</h1>
      <div className="action-section">
        <Button
          label="Nạp tiền"
          className="deposit-btn p-button-raised p-button-rounded"
          onClick={ () => setDepositCoinDialog(true) }
        />
        <DepositCoin onShow={depositCoinDialog} />
        <Button
          label="Rút tiền"
          className="withdraw-btn p-button-raised p-button-rounded"
        />
      </div>

      <TabMenu
        model={items}
        activeIndex={activeTab}
        onTabChange={(e) => setActiveTab(e.index)}
        className="w-max mb-3 text-black-alpha-90"
      />

      {activeTab === 0 ? (
        walletHistory.map((historyRow) => walletHistoryRow(historyRow))
      ) : (
        <>
          <h1>Sắp ra mắt</h1>
        </>
      )}
    </>
  );
};

export default WalletView;

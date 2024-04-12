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
import WalletHistory, {
  WalletHistoryProps,
} from "./WalletHistory/WalletHistory";
import TransactionHistory, {
  TransactionHistoryProps,
} from "./TransactionHistory/TransactionHistory";

import "./WalletView.scss";

const zalopayLogo = require("../../../assets/logo/zalopay-logo.png");

export type WalletProps = {
  balance: number;
  withdrawMethod: string;
  withdrawInformation: string;
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
      } finally {
        setRefresh(false);
      }
    };
    fetchData();
  }, [refresh, activeTab]);

  return (
    <div className="wallet-view">
      <div className="wallet-info-section">
        <h1 className="wallet-title">Thông tin ví</h1>
        {wallet ? (
          <>
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
              <strong className="underline">
                {wallet?.withdrawInformation}
              </strong>
            </h2>
          </>
        ) : (
          <>
            <h2 className="text-center font-bold">Hãy cập nhật thông tin ví của bạn để trải nghiệm các dịch vụ có trong Artworkia nhé!</h2>
          </>
        )}

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
          <WalletHistory walletHistory={walletHistory} />
        ) : (
          <TransactionHistory transactions={transactionHistory} />
        )}
      </div>
    </div>
  );
};

export default WalletView;

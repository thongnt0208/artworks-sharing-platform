import { Button } from "primereact/button";
import React from "react";

import "./WalletView.scss";

const WalletView: React.FC = () => {
  return (
    <>
      <h1>Số dư</h1>
      <h2 className="balance-info w-full text-center">1.000.000 Xu</h2>
      <div className="action-section">
        <Button
          label="Nạp tiền"
          className="deposit-btn p-button-raised p-button-rounded"
        />
        <Button
          label="Rút tiền"
          className="withdraw-btn p-button-raised p-button-rounded"
        />
      </div>
      <h1>Lịch sử giao dịch</h1>
      <div className="transaction-history-section">
        <i className="pi pi-arrow-down transaction-icon" />
        <div className="transaction-info">
            <p className="m-0">-500.000</p>
            <p className="m-0">Magiaodich0123949382</p>
        </div>
        <p>Phương thức: Momo</p>
        <p>12/02/2024</p>
      </div>
    </>
  );
};

export default WalletView;

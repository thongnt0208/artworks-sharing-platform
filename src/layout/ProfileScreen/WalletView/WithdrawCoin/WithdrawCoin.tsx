import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

import "./WithdrawCoin.scss";

const WithdrawCoin: React.FC<{ isVisible: boolean, onHide: () => void }> = ({ isVisible, onHide }) => {
  const handlewithdraw = () => {
    // Integrate
  };
  return (
    <>
      <Dialog
        closable={false}
        visible={isVisible}
        onHide={onHide}
        className="withdraw-dialog"
        headerClassName="withdraw-dialog-header"
      >
        <div className="withdraw-dialog-content">
          <h1>Rút Xu</h1>
          <div className="amount-input">
            <label className="amount-label">Số Xu cần rút</label>
            <InputNumber className="w-full md:w-14rem" />
          </div>
          <div className="action-button">
            <Button
              rounded
              className="confirm-btn"
              label="Nạp"
              onClick={handlewithdraw}
            />
            <Button
              rounded
              className="cancel-btn"
              label="Hủy"
              onClick={onHide}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default WithdrawCoin;

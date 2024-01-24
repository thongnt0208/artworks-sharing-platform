import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

import "./DepositCoin.scss";

interface Method {
  name: string;
  code: string;
}

const DepositCoin: React.FC<{ isVisible: boolean; onHide: () => void }> = ({
  isVisible,
  onHide,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<Method | null>(null);
  const methodList: Method[] = [
    { name: "ZaloPay", code: "ZALOPAY" },
    { name: "Momo", code: "MOMO" },
    { name: "PayPal", code: "PAYPAL" },
    { name: "Tài khoản ngân hàng", code: "BANK" },
  ];

  const handleDeposit = () => {
    // Integrate
  };

  return (
    <>
      <Dialog
        closable={false}
        visible={isVisible}
        onHide={onHide}
        className="deposit-dialog"
        headerClassName="deposit-dialog-header"
      >
        <div className="deposit-dialog-content">
          <h1>Nạp Xu</h1>
          <div className="method-input h-fit">
            <label className="method-label">Phương thức thanh toán</label>
            <Dropdown
              value={selectedMethod}
              onChange={(e: DropdownChangeEvent) => setSelectedMethod(e.value)}
              options={methodList}
              optionLabel="name"
              placeholder="Hãy chọn một phương thức"
              className="w-fit md:w-14rem"
            />
          </div>
          <div className="amount-input">
            <label className="amount-label">Số Xu cần nạp</label>
            <InputNumber className="w-full md:w-14rem" />
          </div>
          <div className="action-button">
            <Button
              rounded
              className="confirm-btn"
              label="Nạp"
              onClick={handleDeposit}
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

export default DepositCoin;

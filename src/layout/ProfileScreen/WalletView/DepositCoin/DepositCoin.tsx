import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import "./DepositCoin.scss";

interface Method {
  name: string;
  code: string;
}

const DepositCoin: React.FC<{ onShow: boolean }> = ({ onShow }) => {
  const [visible, setVisible] = useState<boolean>(onShow);
  const [selectedMethod, setSelectedMethod] = useState<Method | null>(null);
  const methodList: Method[] = [
    { name: "ZaloPay", code: "ZALOPAY" },
    { name: "Momo", code: "MOMO" },
    { name: "PayPal", code: "PAYPAL" },
    { name: "Tài khoản ngân hàng", code: "BANK" },
  ];

  useEffect(() => {
    setVisible(onShow);
  }, [onShow]);

  const handleDeposit = () => {
    // Integrate
  };
  return (
    <>
      <Dialog
        closable={false}
        visible={visible}
        onHide={() => setVisible(false)}
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
            <InputText type="number" className="w-full md:w-14rem" />
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
              onClick={() => setVisible(false)}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DepositCoin;

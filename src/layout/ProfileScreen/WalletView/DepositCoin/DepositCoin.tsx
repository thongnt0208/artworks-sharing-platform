import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

import { DepositCoins } from "../WalletService";
import "./DepositCoin.scss";
import { toast } from "react-toastify";
import { CatchAPICallingError } from "../../..";
import { useNavigate } from "react-router-dom";
interface Method {
  name: string;
  code: string;
}

const DepositCoin: React.FC<{ isVisible: boolean; onHide: () => void }> = ({
  isVisible,
  onHide,
}) => {
  const navigate = useNavigate();
  let currentUrl = window.location.href;
  const [selectedMethod, setSelectedMethod] = useState<Method>({
    name: "ZaloPay",
    code: "ZALOPAY",
  });
  const [amount, setAmount] = useState(0);
  const [methodValidationMessage, setMethodAmountValidationMessage] = useState<
    string | null
  >(null);
  const methodList: Method[] = [{ name: "ZaloPay", code: "ZALOPAY" }];

  const handleDeposit = async () => {
    if (selectedMethod === null) {
      setMethodAmountValidationMessage("Hãy chọn phương thức thanh toán");
      return;
    }
    if (selectedMethod?.code === "ZALOPAY") {
      try {
        const response = await DepositCoins(amount, currentUrl);
        if (response.returnCode === 1) {
          window.location.href = response.orderUrl;
        } else {
          toast.error(response.returnMessage);
        }
      } catch (error) {
        CatchAPICallingError(error, navigate);
      }
    }
    setMethodAmountValidationMessage(null);
    setAmount(0);
    onHide();
  };

  return (
    <Dialog
      closable={false}
      visible={isVisible}
      onHide={onHide}
      dismissableMask={true}
      className="deposit-dialog"
      headerClassName="deposit-dialog-header"
    >
      <div className="deposit-dialog-content">
        <h1>Nạp Xu</h1>
        <div className="method-input h-fit">
          <label className="method-label">Phương thức thanh toán</label>
          <Dropdown
            value={selectedMethod}
            onChange={(e: DropdownChangeEvent) => {
              setSelectedMethod(e.value);
              setMethodAmountValidationMessage(null);
            }}
            options={methodList}
            optionLabel="name"
            placeholder="Hãy chọn một phương thức"
            className="w-fit md:w-14rem"
          />
          {methodValidationMessage && (
            <span className="validation-message text-red-500">
              {methodValidationMessage}
            </span>
          )}
        </div>
        <div className="amount-input">
          <label className="amount-label">Số Xu cần nạp</label>
          <InputNumber
            className="w-full md:w-14rem"
            value={amount}
            onValueChange={(e) => {
              setAmount(e.value || 1000);
            }}
            min={40000}
            max={10000000}
          />
        </div>
        <p className="flex align-items-center mb-4">
          <i className="pi pi-info-circle mr-1" /> Số XU nạp tối thiểu:{" "}
          <strong>40.000 Xu</strong>, tối đa: <strong>10.000.000 Xu</strong>
        </p>
        <div className="action-button">
          <Button
            rounded
            className="confirm-btn"
            label="Nạp"
            onClick={handleDeposit}
          />
          <Button rounded className="cancel-btn" label="Hủy" onClick={onHide} />
        </div>
      </div>
    </Dialog>
  );
};

export default DepositCoin;

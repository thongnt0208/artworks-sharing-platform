import React, { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from 'primereact/toast';

import { DepositCoins } from "../WalletService";
import "./DepositCoin.scss";
interface Method {
  name: string;
  code: string;
}

const DepositCoin: React.FC<{ isVisible: boolean; onHide: () => void }> = ({
  isVisible,
  onHide,
}) => {
  let currentUrl = window.location.href;
  const toast = useRef<Toast>(null);
  const [selectedMethod, setSelectedMethod] = useState<Method>({ name: "ZaloPay", code: "ZALOPAY" });
  const [amount, setAmount] = useState(0);
  const [methodValidationMessage, setMethodAmountValidationMessage] = useState<
    string | null
  >(null);
  const methodList: Method[] = [
    { name: "ZaloPay", code: "ZALOPAY" }
  ];

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
          showError();
        }
      } catch (error) {
        showError();
      }
    }
    setMethodAmountValidationMessage(null);
    setAmount(0);
    onHide();
  };

  const showError = () => {
    toast.current?.show({severity:'error', summary: 'Nạp Xu thất bại', detail:'Xảy ra lỗi trong quá trình nạp Xu', life: 3000});
  }

  return (
    <>
      <Toast ref={toast} />
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
              min={1000}
            />
            <p className="flex align-items-center">
              <i className="pi pi-info-circle mr-1" /> Số XU nạp tối thiểu: 1.000 Xu
            </p>
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

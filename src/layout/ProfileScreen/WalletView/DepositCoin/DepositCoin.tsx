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
  const [selectedMethod, setSelectedMethod] = useState<Method | null>(null);
  const [amount, setAmount] = useState(0);
  const [amountValidationMessage, setAmountValidationMessage] = useState<
    string | null
  >(null);
  const [methodValidationMessage, setMethodAmountValidationMessage] = useState<
    string | null
  >(null);
  const methodList: Method[] = [
    { name: "ZaloPay", code: "ZALOPAY" },
    { name: "Momo", code: "MOMO" },
    { name: "PayPal", code: "PAYPAL" },
    { name: "Tài khoản ngân hàng", code: "BANK" },
  ];

  const handleDeposit = async () => {
    if (amount < 1000 && selectedMethod === null) {
      setAmountValidationMessage("Số Xu cần nạp ít nhất là 1000 Xu");
      setMethodAmountValidationMessage("Hãy chọn phương thức thanh toán");
      return;
    }
    if (selectedMethod?.code === "ZALOPAY") {
      console.log("ZALOPAY");
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
    setSelectedMethod(null);
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
              onValueChange={(e) => {
                setAmount(e.value || 0);
                setAmountValidationMessage(
                  e.value && e.value < 1000
                    ? "Số Xu cần nạp ít nhất là 1000 Xu"
                    : null
                );
              }}
            />
            {amountValidationMessage && (
              <span className="validation-message text-red-500">
                {amountValidationMessage}
              </span>
            )}
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

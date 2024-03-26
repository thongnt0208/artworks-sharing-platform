import React, { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { InputMask } from "primereact/inputmask";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import {
  UpdateWalletInformation,
  VerifyZaloPayAccount,
} from "../WalletService";
import { AccountVerificationData } from "../WithdrawCoin/WithdrawCoin";
import "./WalletInformation.scss";

const zalopayLogo = require("../../../../assets/logo/zalopay-logo.png");

interface WalletInformationProps {
  isVisible: boolean;
  refreshCallback: () => void;
  onHide: () => void;
}

const WalletInformation: React.FC<WalletInformationProps> = ({
  isVisible,
  refreshCallback,
  onHide,
}) => {
  const toast = useRef<Toast>(null);
  const [selectedMethod, setSelectedMethod] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const showSuccess = () => {
    toast.current?.show({severity:'success', summary: 'Thành công', detail:'Cập nhật thông tin ví thành công', life: 2000});
  }

  const showError = () => {
    toast.current?.show({severity:'error', summary: 'Thất bại', detail:'Cập nhật thông tin ví không thành công', life: 2000});
  }

  const showWarning = () => {
    toast.current?.show({severity:'warn', summary: 'Cảnh báo', detail:'Tài khoản ZaloPay chưa được xác thực', life: 2000});
  }

  let content = (
    <div className="wallet-history-section">
      <h1 className="mb-6 text-center">Phương thức thanh toán</h1>
      <div className="method-list">
        <div className="method-item">
          <div
            className="flex flex-row justify-content-start align-items-center"
            onClick={() => setSelectedMethod(true)}
          >
            <img
              src={zalopayLogo}
              alt="ZaloPay"
              className="logo zalopay-logo"
            />
            <label htmlFor="method1" className="label">
              ZaloPay
            </label>
          </div>
          <RadioButton
            inputId="method1"
            name="Zalopay"
            checked={selectedMethod}
            onChange={() => setSelectedMethod(true)}
          />
        </div>
      </div>
      <div className="input-container">
        <label htmlFor="phoneNumber" className="label text-base">
          Số điện thoại
        </label>
        <InputMask
          placeholder="Số điện thoại"
          value={phoneNumber}
          mask="9999999999"
          onChange={(e) => setPhoneNumber(e.value || "")}
        />
      </div>
      <div className="btn-container">
        <Button
          label="Lưu"
          className="p-button-raised p-button-rounded text-base pl-5 pr-5"
          onClick={() => {
            handleSave(phoneNumber);
          }}
        />
        <Button
          label="Hủy"
          className="p-button-raised p-button-rounded text-base pl-5 pr-5"
          onClick={onHide}
        />
      </div>
    </div>
  );

  const handleSave = async (phoneNumber: string) => {
    console.log("handleSave", phoneNumber);
    try {
      const accountVerificationData: AccountVerificationData =
        await VerifyZaloPayAccount(phoneNumber);
      if (accountVerificationData.returnCode === 1) {
        UpdateWalletInformation(phoneNumber).then((response) => {
          console.log("UpdateWalletInformation", response);
          if (response) {
            showSuccess();
            refreshCallback();
            onHide();
          } else {
            showError();
          }
        });
      } else {
        showWarning();
      }
    } catch (error) {
      showError();
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        showHeader={false}
        visible={isVisible}
        className="wallet-information-dialog"
        contentStyle={{ borderRadius: "12px" }}
        style={{ width: "30vw" }}
        modal={true}
        dismissableMask={true}
        onHide={onHide}
      >
        {content}
      </Dialog>
    </>
  );
};

export default WalletInformation;

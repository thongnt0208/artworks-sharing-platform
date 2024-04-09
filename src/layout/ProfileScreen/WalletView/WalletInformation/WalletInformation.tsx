import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputMask } from "primereact/inputmask";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";

import {
  UpdateWalletInformation,
  VerifyZaloPayAccount,
} from "../WalletService";
import { AccountVerificationData } from "../WithdrawCoin/WithdrawCoin";
import "./WalletInformation.scss";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  let content = (
    <div className="wallet-info">
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
          label="Cập nhật"
          className="update-btn  p-button-rounded text-base pl-5 pr-5"
          loading={loading}
          onClick={() => {
            setLoading(true);
            handleSave(phoneNumber);
          }}
        />
        <Button
          label="Hủy"
          className="p-button p-button-rounded text-base pl-5 pr-5"
          onClick={onHide}
        />
      </div>
    </div>
  );

  const handleSave = async (phoneNumber: string) => {
    try {
      const accountVerificationData: AccountVerificationData =
        await VerifyZaloPayAccount(phoneNumber);
      if (accountVerificationData.returnCode === 1) {
        UpdateWalletInformation(phoneNumber).then((response) => {
          if (response) {
            toast.success("Cập nhật thông tin ví thành công");
            setLoading(false);
            refreshCallback();
            onHide();
          } else {
            toast.error("Cập nhật thông tin ví không thành công");
          }
        });
      } else {
        toast.warning("Tài khoản ZaloPay chưa được xác thực");
      }
    } catch (error) {
      toast.error("Cập nhật thông tin ví không thành công");
    }
  };

  return (
    <>
      <Dialog
        showHeader={false}
        visible={isVisible}
        className="wallet-information-dialog"
        contentStyle={{ borderRadius: "12px" }}
        style={{ width: "fit-content" }}
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

import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";

import "./WithdrawCoin.scss";
import { VerifyZaloPayAccount, WithdrawCoins } from "../WalletService";
import { CatchAPICallingError } from "../../..";
import { useNavigate } from "react-router-dom";

export type AccountVerificationData = {
  returnCode: number;
  returnMessage: string;
  subReturnCode: number;
  subReturnMessage: string;
  data: {
    referenceId: string;
    muId: string;
    name: string;
    phone: string;
  };
};

const WithdrawCoin: React.FC<{
  isVisible: boolean;
  hideCallback: () => void;
  phoneNumber: string;
  refreshCallback: () => void;
}> = ({ isVisible, hideCallback, phoneNumber, refreshCallback }) => {
  const [amount, setAmount] = useState<number>(0);
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);
  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Thành công",
      detail: "Rút xu thành công",
      life: 2000,
    });
  };
  const showError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Thất bại",
      detail: "Rút xu không thành công",
      life: 2000,
    });
  };
  const handleWithdrawBtn = () => {
    VerifyZaloPayAccount(phoneNumber).then((data: AccountVerificationData) => {
      WithdrawCoins(
        amount,
        data.data.muId,
        data.data.phone,
        data.data.referenceId
      )
        .then((response) => {
          if (response.returnCode === 1) {
            setLoading(false);
            showSuccess();
            refreshCallback();
            hideCallback();
          } else {
            showError();
            setLoading(false);
          }
        })
        .catch((error) => CatchAPICallingError(error, navigate));
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        closable={false}
        visible={isVisible}
        onHide={hideCallback}
        className="withdraw-dialog"
        headerClassName="withdraw-dialog-header"
      >
        <div className="withdraw-dialog-content">
          <h1>Rút Xu</h1>
          <div className="amount-input">
            <label className="amount-label">Số Xu cần rút</label>
            <InputNumber
              className="w-full md:w-14rem"
              value={amount}
              onValueChange={(e: InputNumberValueChangeEvent) =>
                e?.value && setAmount(e.value)
              }
            />
          </div>

          <div className="action-button">
            <Button
              rounded
              className="confirm-btn"
              label="Rút"
              onClick={() => {
                setLoading(true);
                handleWithdrawBtn();
              }}
              loading={loading}
            />
            <Button
              rounded
              className="cancel-btn"
              label="Hủy"
              onClick={hideCallback}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default WithdrawCoin;

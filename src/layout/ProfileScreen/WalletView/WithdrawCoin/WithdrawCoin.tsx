import React, { useState } from "react";
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
import { toast } from "react-toastify";

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
  balance: number;
  isVisible: boolean;
  hideCallback: () => void;
  phoneNumber: string;
  refreshCallback: () => void;
}> = ({ balance, isVisible, hideCallback, phoneNumber, refreshCallback }) => {
  const [amount, setAmount] = useState<number>(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleWithdrawBtn = () => {
    VerifyZaloPayAccount(phoneNumber)
      .then((data: AccountVerificationData) => {
        WithdrawCoins(
          amount,
          data.data.muId,
          data.data.phone,
          data.data.referenceId
        )
          .then((returnCode) => {
            if (returnCode === 1) {
              setLoading(false);
              toast.success("Rút Xu thành công");
              refreshCallback();
              hideCallback();
            } else {
              toast.error("Rút Xu thất bại");
              setLoading(false);
            }
          })
          .catch((error) => {
            setLoading(false);
            CatchAPICallingError(error, navigate);
          });
      })
      .catch((error) => {
        setLoading(false);
        CatchAPICallingError(error, navigate);
      });
  };

  return (
    <>
      <Dialog
        closable={false}
        visible={isVisible}
        onHide={hideCallback}
        dismissableMask={true}
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
              min={50000}
              max={balance}
            />
            <p className="flex align-items-center">
              <i className="pi pi-info-circle mr-1" /> Số XU rút tối thiểu:
              50.000 Xu
            </p>
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

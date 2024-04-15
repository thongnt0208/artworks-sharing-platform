/* eslint-disable react-hooks/exhaustive-deps */
import { ConfirmDialog } from "primereact/confirmdialog";
import React, { useEffect, useState } from "react";
import { numberToXu } from "../util/CurrencyHandle";
import { WalletProps } from "../layout/ProfileScreen/WalletView/WalletView";
import { GetWalletData } from "../layout/ProfileScreen/WalletView/WalletService";
import { getAuthInfo } from "../util/AuthUtil";
import { CatchAPICallingError } from "../layout";
import { useNavigate } from "react-router-dom";

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  paymentAmount: number;
  acceptCallback: () => void;
};

export default function PaymentConfirmation({ ...props }: Props) {
  const { visible, setVisible, paymentAmount, acceptCallback } = props;
  const [walletData, setWalletData] = useState({} as WalletProps);
  const navigate = useNavigate();

  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  const getWalletData = () => {
    GetWalletData(currentUserId)
      .then((data) => setWalletData(data))
      .catch((error) => CatchAPICallingError(error, navigate));
  };

  useEffect(() => {
    getWalletData();
  }, []);
  return (
    <ConfirmDialog
      visible={visible}
      onHide={() => setVisible(false)}
      message={
        <>
          <p>Xác nhận thanh toán</p>
          <p>
            Bạn đang có <strong>{numberToXu(walletData?.balance || 0)}</strong> trong ví, số tiền
            cần thanh toán là <strong>{numberToXu(paymentAmount)}</strong>.
          </p>
          <p> Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?</p>
        </>
      }
      headerStyle={{ border: "none", padding: "8px" }}
      icon="pi pi-exclamation-triangle"
      accept={acceptCallback}
      reject={() => setVisible(false)}
    />
  );
}

import { useState } from "react";
import { Button, InputNumber, Dialog } from "../../index";
import { numberToVND } from "../../../util/CurrencyHandle";
import { platformFee } from "../../../const/bizConstants";
import { Link } from "react-router-dom";
import "./SetupSubscribeArea.scss";

type Props = {};

export default function SetupSubscribeArea({ ...props }: Props) {
  const [visible, setVisible] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [monthlyFee, setMonthlyFee] = useState(platformFee); // Initial monthly fee in Vietnamese Dongs
  const handleContinue = () => {
    // Implement actions for the "Tiếp tục" button here
    console.log("Price setup confirmed with", monthlyFee);
    setVisible(false);
  };

  let handleInput = (amount: any) => {
    if (amount >= platformFee) {
      setIsValid(true);
      setMonthlyFee(amount);
    }
  };

  return (
    <>
      <Dialog
        header=<p className="text-cus-h1 m-0">Thiết lập giá</p>
        visible={visible}
        onHide={() => setVisible(false)}
        className="setup-subscribe-area-dialog"
        dismissableMask
        draggable={false}
      >
        <div className="grid nested-grid">
          <div className="col-12 flex flex-column gap-4">
            <label
              htmlFor="monthlyFee"
              className="text-cus-small"
              style={{ textAlign: "center" }}
            >
              Vui lòng thiết lập giá hàng tháng cho dịch vụ{" "}
              <strong>Vùng cho người đăng kí</strong>
            </label>
            <InputNumber
              id="monthlyFee"
              value={monthlyFee}
              onChange={(e: any) => handleInput(e.value)}
              currency="VND"
              allowEmpty={false}
            />
          </div>
          <div className="grid w-full">
            <div className="col-6 pr-4">
              <p className="text-cus-normal text-right">Phí nền tảng:</p>
            </div>
            <div className="col-6 pl-4">
              <p>{numberToVND(platformFee)}</p>
            </div>
          </div>
          <div className="grid w-full">
            <div className="col-6 pr-4">
              <p className="text-cus-normal text-right">Bạn sẽ nhận:</p>
              <p className="text-cus-small text-right">
                Mỗi người đăng kí, mỗi tháng
              </p>
            </div>
            <div className="col-6 pl-4">
              <p>{numberToVND(monthlyFee - platformFee)}</p>
            </div>
          </div>
          <div className="grid w-full justify-content-center">
            <p className="text-cus-small m-0" style={{ textAlign: "center" }}>
              Giá trên đã bao gồm 20% phí nền tảng, không bao gồm phí chuyển
              tiền.
            </p>
            <Link className="text-cus-small" to={""}>
              Xem thêm
            </Link>
          </div>
        </div>
        <footer className="footer">
          <Button
            label="Tiếp tục"
            disabled={!isValid}
            onClick={handleContinue}
            rounded
          />
        </footer>
      </Dialog>
    </>
  );
}

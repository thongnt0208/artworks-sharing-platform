import { Avatar } from "primereact/avatar";
import { platformFee } from "../const/bizConstants";
import { numberToXu } from "../util/CurrencyHandle";
import "./FeesInfo.scss";
import { Divider } from "primereact/divider";

import avt1 from "../assets/icons/component-fees-info-01.svg";
import avt2 from "../assets/icons/component-fees-info-02.svg";

type Props = {
  totalAmount: number;
};

export default function FeesInfo({ totalAmount }: Props) {
  return (
    <div className="fees-info-container justify-content-between">
      <div className="fee-item-container">
        <div className="flex align-items-center">
          <Avatar image={avt1} size="normal" shape="circle" />
          <div className="fee-item-title w-max flex flex-column pl-1">
            <span>Phí nền tảng</span>
            <span>{platformFee * 100}%</span>
          </div>
        </div>

        <p className="text-cus-normal highlight-btn-100">
          {numberToXu((platformFee * totalAmount).toFixed(0))}{" "}
        </p>
      </div>

      <Divider className="mt-2 mb-2" />

      <div className="fee-item-container">
        <div className="flex align-items-center">
          <Avatar image={avt2} size="normal" shape="circle" />
          <div className="fee-item-title w-max flex flex-column pl-1">
            <span>Bạn nhận</span>
            <span>Đã trừ phí</span>
          </div>
        </div>

        <p className="text-cus-normal highlight-btn-200">
          {numberToXu((totalAmount * (1 - platformFee)).toFixed(0))}
        </p>
      </div>

      <p className="note">
        *Các khoản phí được quy định khác nhau theo từng ngữ cảnh. <a href="/policy">Xem thêm</a>
      </p>
    </div>
  );
}

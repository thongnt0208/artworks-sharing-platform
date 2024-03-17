import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { deliveryTime } from "../const/bizConstants";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";

import "./RequestPopup.scss";
import { Button } from "primereact/button";

export type RequestPopupProps = {
  visible: boolean;
  accountAvatar: string;
  accountName: string;
  isHire: boolean;
  onHide: () => void;
  onSubmit: (request: RequestProps) => void;
}

export type RequestProps = {
  message: string;
  timeline?: string;
  budget?: number;
};

const RequestPopup: React.FC<RequestPopupProps> = ({
  visible,
  accountAvatar,
  accountName,
  isHire,
  onHide,
  onSubmit
}) => {
  const [message, setMessage] = useState("");
  const [estimateDeliveryTime, setEstimateDeliveryTime] = useState("");
  const [startingPrice, setStartingPrice] = useState(0);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  useEffect(() => {
    const fieldsFilled =
      message.trim() !== "" &&
      (!isHire || (estimateDeliveryTime.trim() !== "" && startingPrice > 0));
    setAllFieldsFilled(fieldsFilled);
  }, [message, estimateDeliveryTime, startingPrice, isHire]);

  const handleSubmit = () => {
    const request: RequestProps = {
      message,
      timeline: estimateDeliveryTime,
      budget: startingPrice,
    };
    onSubmit(request);
    if (allFieldsFilled) {
      setAllFieldsFilled(false);
      setMessage("");
      setEstimateDeliveryTime("");
      setStartingPrice(0);
      setTimeout(() => {
        onHide();
      }, 3000);
    }
  };

  return (
    <>
      <Dialog
        className="request-popup"
        showHeader={false}
        visible={visible}
        modal
        dismissableMask={true}
        style={{ width: "40vw" }}
        contentStyle={{ padding: "30px", borderRadius: "12px" }}
        onHide={onHide}
      >
        <div className="request-popup-container w-full flex flex-column justify-content-center align-items-center">
          <div className="account-info w-full flex flex-column justify-content-center align-items-center">
            <div className="avatar-container">
              <img
                alt={`Ảnh đại diện của ${accountName}`}
                src={accountAvatar}
                className="avatar-image"
              />
            </div>
            <div className="information-container">
              <h2>{accountName}</h2>
            </div>
          </div>
          <div className="w-full flex flex-column justify-content-center align-items-center">
            <InputTextarea
              id="message"
              rows={8}
              cols={60}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          {isHire && (
            <div className="w-full mt-4 flex flex-column justify-content-center align-items-center">
              <div className="delivery-time-label w-6 mb-2 h-fit flex flex-column justify-content-start align-items-center">
                <label
                  className="w-full text-left text-base font-bold"
                  htmlFor="deliveryTime"
                >
                  Thời gian hoàn thành
                </label>
                <Dropdown
                  name="deliveryTime"
                  className="text-base w-full"
                  options={deliveryTime}
                  placeholder={"Chọn thời gian hoàn thành"}
                  onChange={(e) => setEstimateDeliveryTime(e.value)}
                  value={estimateDeliveryTime}
                />
              </div>

              <div className="price-label w-6 h-fit flex flex-column justify-content-start align-items-center">
                <label
                  className="w-full text-left text-base font-bold"
                  htmlFor="price"
                >
                  Giá khởi điểm
                </label>
                <InputNumber
                  id="price"
                  className="text-base w-full"
                  name="startingPrice"
                  placeholder="100.000 Xu"
                  onValueChange={(e) => setStartingPrice(e.value || 0)}
                  value={startingPrice}
                />
              </div>
            </div>
          )}
          <div className="w-full flex flex-row justify-content-center align-items-center mt-4">
            <Button
              className={`w-5 ${
                allFieldsFilled ? "p-button-primary" : "disabled-button"
              }`}
              rounded
              style={{
                padding: "10px 20px",
                background: allFieldsFilled ? "" : "#e1e1e2",
                color: allFieldsFilled ? "" : "white",
              }}
              onClick={() => handleSubmit()}
            >
              <p
                className="w-full text-center p-0 m-0"
                style={{ fontSize: "0.9rem", fontWeight: "border" }}
              >
                Gửi yêu cầu
              </p>
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default RequestPopup;

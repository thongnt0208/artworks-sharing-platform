import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { deliveryTime } from "../const/bizConstants";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

import "./RequestPopup.scss";

export type RequestPopupProps = {
  visible: boolean;
  startingPrice?: number;
  accountAvatar: string;
  accountName: string;
  isHire: boolean;
  onHide: () => void;
  onSubmit: (request: RequestProps) => void;
};

export type RequestProps = {
  message: string;
  timeline?: string;
  budget?: number;
};

const RequestPopup: React.FC<RequestPopupProps> = ({
  visible,
  startingPrice,
  accountAvatar,
  accountName,
  isHire,
  onHide,
  onSubmit,
}) => {
  const [message, setMessage] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState(0);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  useEffect(() => {
    const fieldsFilled =
      message.trim() !== "" &&
      (!isHire ||
        (timeline.trim() !== "" && (budget ?? 0) >= (startingPrice ?? 0)));
    setAllFieldsFilled(fieldsFilled);
  }, [message, timeline, budget, isHire, startingPrice]);

  const handleSubmit = () => {
    const request: RequestProps = { message, timeline, budget: startingPrice };
    onSubmit(request);
    if (allFieldsFilled) {
      setAllFieldsFilled(false);
      setMessage("");
      setTimeline("");
      setBudget(0);
      setTimeout(onHide, 3000);
    }
  };

  return (
    <Dialog
      className="request-popup"
      showHeader={false}
      visible={visible}
      modal
      dismissableMask
      style={{ width: "40vw" }}
      contentStyle={{ padding: "30px", borderRadius: "12px" }}
      onHide={onHide}
    >
      <div className="request-popup-container w-full flex flex-column justify-content-center align-items-center">
        <div className="account-info w-full flex flex-column justify-content-center align-items-center">
          <div className="avatar-container">
            <img
              alt={`Avatar of ${accountName}`}
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
          {message.length < 10 && <span>Phải nhiều hơn 10 kí tự</span>}
        </div>
        {isHire && (
          <div className="w-full mt-4 flex flex-column justify-content-center align-items-center">
            <div className="delivery-time-label w-6 mb-2 h-fit flex flex-column justify-content-start align-items-center">
              <label
                className="w-full text-left text-base font-bold"
                htmlFor="deliveryTime"
              >
                Delivery Time
              </label>
              <Dropdown
                name="deliveryTime"
                className="text-base w-full"
                options={deliveryTime}
                placeholder="Select Delivery Time"
                onChange={(e) => setTimeline(e.value)}
                value={timeline}
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
                placeholder="100,000 Xu"
                onValueChange={(e) => setBudget(e.value || 0)}
                value={startingPrice}
                min={startingPrice}
              />
              {(budget ?? 0) >= (startingPrice ?? 0) && (
                <span className="text-red-500">
                  Giá khởi điểm phải lớn hơn giá hiện tại
                </span>
              )}
            </div>
          </div>
        )}
        <div className="w-full flex flex-row justify-content-center align-items-center mt-4">
          <Button
            className={`w-5 ${
              allFieldsFilled ? "p-button-primary" : "disabled-button"
            }`}
            rounded
            onClick={handleSubmit}
            disabled={!allFieldsFilled}
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
  );
};

export default RequestPopup;

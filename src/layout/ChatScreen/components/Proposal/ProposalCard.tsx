import { useState } from "react";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { FileUpload } from "primereact/fileupload";
import { RadioButton } from "primereact/radiobutton";
import { getAuthInfo } from "../../../../util/AuthUtil";
import { ProposalCardProps } from "../../ChatRelatedTypes";
import { translateProposalStatus } from "../../../../util/Enums";
import { maxSizeImagesUpload } from "../../../../const/bizConstants";
import "./styles/ProposalCard.scss";
// ---------------------------------------------------------

export default function ProposalCard({ ...props }: ProposalCardProps) {
  const { id, projectTitle, description, targetDelivery, initialPrice, totalPrice, status, createdBy, acceptCallback, denyCallback, editCallback, cancelCallback, uploadAssetCallback } = props;
  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const typeOptions = [
    { label: "Concept", value: 0 },
    { label: "Final", value: 1 },
    { label: "Revision", value: 2 },
  ];

  const showConfirmPopup = () => {
    setConfirmVisible(true);
  };

  const handleAcceptConfirmation = () => {
    acceptCallback && acceptCallback(id);
    setConfirmVisible(false);
  };

  const handleUploadAsset = () => {
    console.log("handleUploadAsset", id, selectedType, uploadedFile);

    if (selectedType !== null && uploadedFile) {
      uploadAssetCallback && uploadAssetCallback(id, selectedType, uploadedFile);
      setUploadedFile(null);
      setSelectedType(null);
    }
  };

  return (
    <div className="system-noti-card">
      <ConfirmDialog
        visible={confirmVisible}
        onHide={() => setConfirmVisible(false)}
        message={`Bạn sẽ bị trừ ${
          initialPrice * totalPrice
        } Xu để đặt cọc khi chấp nhận Bản thỏa thuận, bạn chắc chứ?`}
        headerStyle={{ border: "none", padding: "8px" }}
        icon="pi pi-exclamation-triangle"
        accept={handleAcceptConfirmation}
        reject={() => setConfirmVisible(false)}
      />

      <p className="text-cus-h1-bold">ProposalCard</p>
      <p>Tên dự án: {projectTitle}</p>
      <p>Mô tả dự án: {description}</p>
      <p>Thời gian hoàn thành: {targetDelivery}</p>
      <p>Tổng chi phí: {totalPrice}</p>
      <p>Đã đặt cọc: {initialPrice}</p>
      <p>Trạng thái: {translateProposalStatus(status)}</p>
      <p>Tuân theo mọi điều khoản của hệ thống.</p>

      {createdBy !== currentUserId && status?.toUpperCase() === "WAITING" && (
        <div className="btns-container flex gap-3">
          <Button className="btn-accept" rounded onClick={showConfirmPopup}>
            Chấp nhận
          </Button>
          <Button className="btn-decline" rounded onClick={() => denyCallback && denyCallback(id)}>
            Từ chối
          </Button>
        </div>
      )}

      {createdBy === currentUserId && status?.toUpperCase() === "WAITING" && (
        <div className="btns-container flex gap-3">
          Bạn đang chờ đối tác chấp nhận thỏa thuận.
          <Button className="btn-accept" rounded onClick={() => editCallback && editCallback(id)}>
            Chỉnh sửa
          </Button>
          <Button
            className="btn-decline"
            rounded
            onClick={() => cancelCallback && cancelCallback(id)}
          >
            Hủy thỏa thuận
          </Button>
        </div>
      )}

      {status?.toUpperCase() === "ACCEPTED" && (
        <div className="btns-container">
          Thỏa thuận đã được chấp nhận.
          {createdBy === currentUserId && (
            <div className="upload-proposal-assets-container">
              <FileUpload
                mode="basic"
                chooseLabel="Chọn tệp"
                accept="*"
                maxFileSize={maxSizeImagesUpload}
                onSelect={(event) => setUploadedFile(event.files[0])}
              />
              <div className="radio-buttons flex gap-2 justify-content-center">
                {typeOptions.map((option) => (
                  <div key={option.label} className="radio-button-container flex gap-1 align-items-center">
                    <RadioButton
                      value={option.value}
                      checked={selectedType === option.value}
                      onChange={(e) => setSelectedType(e.value)}
                    />
                    <label>{option.label}</label>
                  </div>
                ))}
              </div>
              <Button
                disabled={selectedType === null && uploadedFile === null}
                onClick={handleUploadAsset}
                rounded
              >
                Gửi tệp
              </Button>
            </div>
          )}
          {createdBy !== currentUserId && (
            <p>Từ giờ, nhà sáng tạo sẽ làm việc và gửi bản thảo đến bạn!</p>
          )}
        </div>
      )}
    </div>
  );
}

import { useRef, useState } from "react";
import { getAuthInfo } from "../../../../util/AuthUtil";
import { ProposalType } from "../../ChatRelatedTypes";
import { maxSizeImagesUpload } from "../../../../const/bizConstants";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import "./UploadProposalAssetView.scss";

type Props = {
  selectingProposal: ProposalType;
  uploadAssetCallback: (proposalId: string, type: number, file: File) => void;
};

export default function UploadProposalAssetView({ selectingProposal, uploadAssetCallback }: Props) {
  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const typeOptions = [
    { name: "Phác thảo", label: "Concept", value: 0 },
    { name: "Làm lại", label: "Revision", value: 2 },
    { name: "Cuối", label: "Final", value: 1 },
  ];
  const handleUploadAsset = () => {
    if (selectedType !== null && uploadedFile) {
      uploadAssetCallback && uploadAssetCallback(selectingProposal?.id, selectedType, uploadedFile);
      setUploadedFile(null);
      setSelectedType(null);
    }

    // Reset the inputs
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Assign an empty string instead of null
    }
  };
  return (
    <div className="upload-proposal-container">
      {selectingProposal?.createdBy === currentUserId && (
        <div className="upload-proposal-assets-container">
          <div className="radio-buttons flex gap-2 justify-content-center">
            {typeOptions.map((option) => (
              <div
                key={option.label}
                className="radio-button-container flex gap-1 align-items-center"
              >
                <RadioButton
                  inputId={`upload-asset-${option.label}`}
                  value={option.value}
                  checked={selectedType === option.value}
                  onChange={(e) => setSelectedType(e.value)}
                />
                <label htmlFor={`upload-asset-${option.label}`}>{option.name}</label>
              </div>
            ))}
          </div>

          <div className="file-inut-container">
            <label htmlFor="upload-asset-file" className="custom-file-label">
              Chọn file
            </label>
            <label htmlFor="upload-asset-file" className="custom-file-label-path">
              {fileInputRef.current?.value ? fileInputRef.current?.value : "Chưa chọn file nào"}
            </label>

            <input
              type="file"
              id="upload-asset-file"
              ref={fileInputRef}
              accept="*"
              max={1}
              max-file-size={maxSizeImagesUpload}
              onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
              className="custom-file-input"
            />
          </div>

          <Button
            className="btn-upload-asset"
            disabled={
              selectedType === null || uploadedFile === null || fileInputRef.current?.value === ""
            }
            onClick={handleUploadAsset}
            rounded
          >
            Gửi tệp
          </Button>
        </div>
      )}
      {selectingProposal?.status === "InitPayment" &&
        selectingProposal?.createdBy !== currentUserId && (
          <p>Từ giờ, nhà sáng tạo sẽ làm việc và gửi bản thảo đến bạn!</p>
        )}
    </div>
  );
}

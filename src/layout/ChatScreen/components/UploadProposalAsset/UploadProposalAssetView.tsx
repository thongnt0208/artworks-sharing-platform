import { useState } from "react";
import { getAuthInfo } from "../../../../util/AuthUtil";
import { FileUpload } from "primereact/fileupload";
import { ProposalType } from "../../ChatRelatedTypes";
import { maxSizeImagesUpload } from "../../../../const/bizConstants";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";

type Props = {
  selectingProposal: ProposalType;
  uploadAssetCallback: (proposalId: string, type: number, file: File) => void;
};

export default function UploadProposalAssetView({ selectingProposal, uploadAssetCallback }: Props) {
  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedType, setSelectedType] = useState<number | null>(null);

  const typeOptions = [
    { name: "Phát thảo", label: "Concept", value: 0 },
    { name: "Làm lại", label: "Revision", value: 2 },
    { name: "Cuối", label: "Final", value: 1 },
  ];
  const handleUploadAsset = () => {
    console.log("handleUploadAsset", selectingProposal?.id, selectedType, uploadedFile);

    if (selectedType !== null && uploadedFile) {
      uploadAssetCallback && uploadAssetCallback(selectingProposal?.id, selectedType, uploadedFile);
      setUploadedFile(null);
      setSelectedType(null);
    }
  };
  return (
    <div>
      <div className="btns-container">
        {selectingProposal?.createdBy === currentUserId && (
          <div className="upload-proposal-assets-container">
            <FileUpload
              mode="basic"
              chooseLabel="Chọn tệp"
              accept="*"
              auto
              maxFileSize={maxSizeImagesUpload}
              onSelect={(event) => setUploadedFile(event.files[0])}
            />
            <div className="radio-buttons flex gap-2 justify-content-center">
              {typeOptions.map((option) => (
                <div
                  key={option.label}
                  className="radio-button-container flex gap-1 align-items-center"
                >
                  <RadioButton
                    value={option.value}
                    checked={selectedType === option.value}
                    onChange={(e) => setSelectedType(e.value)}
                  />
                  <label>{option.name}</label>
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
        {selectingProposal?.status === "InitPayment" && selectingProposal?.createdBy !== currentUserId && (
          <p>Từ giờ, nhà sáng tạo sẽ làm việc và gửi bản thảo đến bạn!</p>
        )}
      </div>
    </div>
  );
}

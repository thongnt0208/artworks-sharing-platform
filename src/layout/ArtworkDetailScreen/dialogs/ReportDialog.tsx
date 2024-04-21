import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, InputTextarea, RadioButton, Toast, CatchAPICallingError } from "../..";
import { MakeReport } from "./Service";
import { maxCommentCharacter, minTextLength } from "../../../const/bizConstants";
import { reportTypeEnums } from "../../../util/Enums";
// --------------------------------------------------

type Props = {
  visible: boolean;
  setVisibility: (value: boolean) => void;
  targetId: string;
  entityName: string;
};

export type ReportType = {
  id: number;
  name: string;
};

export default function ReportDialog({ visible, setVisibility, targetId, entityName }: Props) {
  const [selectedType, setSelectedType] = useState(0);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const toast: any = useRef(null);

  const onSubmit = () => {
    MakeReport(entityName.toUpperCase(), targetId, selectedType, description)
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Báo cáo thành công",
          detail: "Cảm ơn bạn đã báo cáo vấn đề này!",
          life: 3000,
        });
        setVisibility(false);
      })
      .catch((error) => CatchAPICallingError(error, navigate));
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={visible}
        onHide={() => setVisibility(false)}
        header="Báo cáo bài viết"
        headerStyle={{ border: "none", padding: "24px" }}
        dismissableMask
      >
        <div className="flex flex-column gap-2 pb-3">
          <div className="field-radiobutton flex flex-column align-items-start gap-2">
            {reportTypeEnums.map((type) => (
              <div key={`report-type-enum-${type}`}>
                <RadioButton
                  inputId={"rpType" + type.name}
                  key={type.name}
                  value={type.id}
                  checked={selectedType === type.id}
                  onChange={(e) => setSelectedType(e.value)}
                />
                <label htmlFor={"rpType" + type.name} className="ml-2">
                  {type.vietnamese}
                </label>
              </div>
            ))}
          </div>

          <InputTextarea
            value={description}
            autoResize
            required
            onChange={(e) => setDescription(e.target.value)}
            maxLength={maxCommentCharacter}
            rows={3}
            cols={20}
            placeholder="Mô tả chi tiết về lý do báo cáo của bạn..."
            tooltip={`Phải có ít nhất ${minTextLength} ký tự. Tối đa ${maxCommentCharacter} ký tự.`}
          />

          <Button
            label="Gửi"
            onClick={onSubmit}
            disabled={description === "" || description.length < minTextLength}
          />
        </div>
      </Dialog>
    </>
  );
}

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { InputTextarea } from "primereact/inputtextarea";
import { useState, useEffect, useRef } from "react";
import { GetReportTypes, MakeReport } from "./Service";
import { Toast } from "primereact/toast";

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
  const [reportTypes, setReportTypes] = useState<ReportType[]>([]);
  const [selectedType, setSelectedType] = useState(0);
  const [description, setDescription] = useState("");
  const toast: any = useRef(null);

  useEffect(() => {
    GetReportTypes().then((types) => setReportTypes(types));
  }, [visible]);

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
      .catch((error) => {
        console.error(error);
        toast.current.show({
          severity: "error",
          summary: "Báo cáo thất bại",
          detail: "Có lỗi xảy ra, vui lòng thử lại sau!" + error?.message,
          life: 3000,
        });
      });
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={visible}
        onHide={() => setVisibility(false)}
        header="Báo cáo bài viết"
        dismissableMask
      >
        <div className="flex flex-column gap-2 pb-3">
          <div className="field-radiobutton flex flex-column align-items-start gap-2">
            {reportTypes.map((type) => (
              <div>
                <RadioButton
                  inputId={"rpType" + type.id.toString()}
                  key={type.id}
                  value={type.id}
                  checked={selectedType === type.id}
                  onChange={(e) => setSelectedType(e.value)}
                />
                <label htmlFor={"rpType" + type.id.toString()} className="ml-2">
                  {type.name}
                </label>
              </div>
            ))}
          </div>

          <InputTextarea
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            cols={20}
            placeholder="Mô tả chi tiết về lý do báo cáo của bạn..."
          />

          <Button label="Gửi" onClick={onSubmit} />
        </div>
      </Dialog>
    </>
  );
}

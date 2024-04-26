import "./NewAssetSection.scss";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import FeesInfo from "../../../components/FeesInfo";

type Props = {
  isVisible: boolean;
  currentFiles: any;
  setIsVisible: (data: boolean) => void;
  assets: any;
  setAssets: (data: any) => void;
  onFormChange: (data: any) => void;
};

export default function NewAssetSection({
  isVisible,
  currentFiles,
  setIsVisible,
  assets,
  setAssets,
  onFormChange,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  let files = currentFiles;

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const _file = files[files.length - 1]; //
    console.log(_file);

    let newAsset = {
      AssetTitle: title,
      Description: description,
      Price: price,
      File: _file,
    };
    // setUploadedAssets((prevState: any) => [...prevState, newAsset]);
    const currentAssets = assets;
    let _assets = [...currentAssets, newAsset];
    setAssets(_assets);
    onFormChange(_assets);

    // Reset the inputs
    setTitle("");
    setDescription("");
    setPrice(0);
    setIsVisible(false); // Close the dialog after submission
  };

  let footerContent = (
    <div>
      <Button
        className="m-3"
        rounded
        label="Lưu"
        type="submit"
        onClick={onSubmit}
        severity="info"
        autoFocus
      />
      <Button
        className="m-3"
        rounded
        label="Hủy"
        type="button"
        onClick={() => setIsVisible(false)}
      />
    </div>
  );

  return (
    <Dialog
      className="new-asset-section-dialog"
      visible={isVisible}
      onHide={() => {
        setIsVisible(false);
      }}
      header="Thông tin tài nguyên"
      footer={footerContent}
      closable
    >
      <div className="upload-asset-note-container">
        <span>
          * Đăng tài nguyên có trả phí đồng nghĩa với việc bạn đồng ý mọi điều khoản của nền tảng.
        </span>
        <br />
        <span>
          * Tác phẩm sẽ cần được duyệt bởi Quản trị viên hệ thống trước khi được hiển thị.
        </span>
        <br />
        <span>* Tài nguyên không phù hợp sẽ bị xóa cùng tác phẩm chứa tài nguyên đó.</span>
        <br />
        <br />
      </div>

      <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
        <div className="asset-inputs w-full flex flex-column gap-3">
          <div className="input-container">
            <label htmlFor="AssetTitle">Tên tài nguyên</label>
            <InputText
              id="AssetTitle"
              name="AssetTitle"
              required
              value={title}
              placeholder="tên tài nguyên"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label htmlFor="Description">Mô tả tài nguyên</label>
            <InputText
              id="Description"
              name="Description"
              required
              value={description}
              placeholder="tài nguyên gồm..."
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label htmlFor="Price">Giá (Xu)</label>
            <InputNumber
              id="Price"
              name="Price"
              value={price}
              onChange={(e: InputNumberChangeEvent) => {
                setPrice(e.value as number);
              }}
            />
          </div>
          {price > 0 && (
            <div className="p-field" style={{ textAlign: "left" }}>
              <label>Biểu phí</label>
              <FeesInfo totalAmount={price} />
            </div>
          )}
        </div>
      </form>
    </Dialog>
  );
}

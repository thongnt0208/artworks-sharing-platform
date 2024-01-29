import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

type Props = {
  isVisible: boolean;
  currentFiles: any;
  setIsVisible: (data: boolean) => void;
  setUploadedAssets: (data: any) => void;
  assets: any;
  setAssets: (data: any) => void;
  onFormChange: (data: any) => void;
};

export default function NewAssetSection({
  isVisible,
  currentFiles,
  setIsVisible,
  setUploadedAssets,
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

  return (
    <Dialog
      visible={isVisible}
      onHide={() => {
        setIsVisible(false);
      }}
      closable
    >
      <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
        <p className="text-cus-h2-bold">Thêm tài nguyên mới</p>
        <div className="flex gap-1">
          {files?.length > 0 && (
            <Image
              src={URL.createObjectURL(files[files.length - 1])}
              alt={`Uploaded ${files[files.length - 1].name}`}
              width="100px"
            />
          )}
          <div className="asset-inputs flex flex-column">
            <div className="flex">
              <label htmlFor="AssetTitle">Tên tài nguyên</label>
              <InputText
                id="AssetTitle"
                name="AssetTitle"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="">
              <label htmlFor="Description">Mô tả tài nguyên</label>
              <InputText
                id="Description"
                name="Description"
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="">
              <label htmlFor="Price">Giá (Xu)</label>
              <InputNumber
                id="Price"
                name="Price"
                value={price}
                onValueChange={(e: InputNumberValueChangeEvent) => {
                  setPrice(e.value as number);
                }}
              />
            </div>
          </div>
        </div>
        <Button label="Lưu" type="submit" onClick={onSubmit} />
      </form>
    </Dialog>
  );
}

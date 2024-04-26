import { useRef, useState } from "react";
import "./MultipleAssetUpload.scss";
// ------------------------------------------------------

import { Toast } from "primereact/toast";
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  ItemTemplateOptions,
} from "primereact/fileupload";
import { Button, ProgressBar, Tooltip, Tag } from "../../index";
// ------------------------------------------------------

import { maxSizeAssetsUpload } from "../../../const/bizConstants";
import { getFileExtension } from "../../../util/FileNameUtil";
import NewAssetSection from "../NewAssetSection/NewAssetSection";
// ------------------------------------------------------

type Props = {
  assets: any;
  setAssets: (data: any) => void;
  onFormChange: (data: any) => void;
};

// Logic flow:
// 1. User select file
// 2. Add infomation Dialog appear to add title, description, price of the asset at `NewAssetSection`
// 3. User click "Lưu" button, generate an array then add this {title, description, price, file_url} object to state by `setAssets`
// 4. After user click "Lưu" button, the array will be saved to the `assets` state at `InputForm`
// 5. After user click "Đăng bài" button, the array will be uploaded to the server
// 4.1. If the user click "Xoá" button in the list on `MultipleAssetUpload`, check if the file is in the `assets` state, if yes, remove it throught `setAssets` function

export default function MultipleAssetUpload({ assets, setAssets, onFormChange }: Props) {
  const [totalSize, setTotalSize] = useState(0);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [currentFiles, setCurrentFiles] = useState({} as any);
  const toast = useRef<Toast>(null);
  const fileUploadRef = useRef<FileUpload>(null);
  const maxSize = maxSizeAssetsUpload;

  const onTemplateSelect = (e: { files: any; originalEvent: any }) => {
    let _totalSize = totalSize;
    let files = e.files;
    for (let i = 0; i < files.length; i++) {
      _totalSize += files[i].size || 0;
    }

    setTotalSize(_totalSize);
    setCurrentFiles(e.files);
    setIsDialogVisible(true);
  };

  const onTemplateRemove = (file: File, callback: Function) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onRemove = (event: any) => {
    const removedFile = event.file; // Get the file being removed
    console.log("removedFile: ", removedFile);
    
    const updatedFiles = assets.filter((file: any) => file !== removedFile); // Filter out the removed file
    console.log("updatedFiles: ", updatedFiles);
    
    setAssets([]); // Update the assets state
    onFormChange([]); // Update the form state
  };

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton } = options;
    const value = (totalSize / maxSize) * 100;
    const formatedValue =
      fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : "0 B";

    return (
      <div
        className={className + " flex justify-content-center"}
        style={{ backgroundColor: "transparent" }}
      >
        {chooseButton}
        <div className="flex align-items-center gap-3">
          <span>
            {formatedValue} / {maxSize / 1000000} MB{" "}
          </span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
    const file = inFile as File;

    return (
      <div className="item-container flex align-items-center flex-wrap">
        <div
          className="item-name-conatiner flex flex-column flex-wrap align-content-start"
          style={{ width: "50%" }}
        >
          {/* Thumbnail */}
          <i className="pi pi-paperclip" style={{ fontSize: '3rem', width: "fit-content" }}/>
          <p className="text-cus-normal-bold m-0"> {file.name} </p>
          <span className="max-w-max text-cus-normal">{props.formatSize}</span>
        </div>
        <Tag
          rounded
          value={"." + getFileExtension(file.name).toUpperCase()}
          className="text-cus-normal"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="empty-template-container flex align-items-center flex-column">
        <i className="pi pi-image mt-3 p-5"></i>
        <p className="m-0">Kéo thả file vào đây để tải lên.</p>
      </div>
    );
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    className: "custom-choose-btn p-button-rounded w-8",
    label: "Thêm file",
  };

  return (
    <div>
      <Toast ref={toast} />
      <Tooltip target=".custom-choose-btn" content="Chọn files" position="bottom" />
      <NewAssetSection
        isVisible={isDialogVisible}
        setIsVisible={setIsDialogVisible}
        currentFiles={currentFiles}
        assets={assets}
        setAssets={setAssets}
        onFormChange={onFormChange}
      />
      <FileUpload
        ref={fileUploadRef}
        name="demo"
        multiple
        accept={"*"}
        maxFileSize={maxSize}
        invalidFileSizeMessageDetail={`Kích thước file không được vượt quá ${maxSize / 1000000} MB`}
        invalidFileSizeMessageSummary={"Kích thước tệp không hợp lệ"}
        onSelect={onTemplateSelect}
        onRemove={onRemove}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
      />
    </div>
  );
}

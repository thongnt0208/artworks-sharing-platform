import { useRef, useState } from "react";
import "./MultipleFileUpload.scss";
import { Toast } from "primereact/toast";
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  ItemTemplateOptions,
} from "primereact/fileupload";
import { Button, ProgressBar, Tooltip, Tag } from "../../index";
import { maxSizeAssetsUpload, maxSizeImagesUpload } from "../../../const/bizConstants";
import { getFileExtension } from "../../../util/FileNameUtil";

type Props = {
  isImagesOnly: boolean;
  uploadedFiles: any;
  setUploadedFiles: (data: any) => void;
  onFormChange: (data: any) => void;
};

export default function MultipleFileUpload({
  isImagesOnly,
  uploadedFiles,
  setUploadedFiles,
  onFormChange,
}: Props) {
  const toast = useRef<Toast>(null);
  const maxSize = isImagesOnly ? maxSizeImagesUpload : maxSizeAssetsUpload;
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef<FileUpload>(null);

  const onTemplateSelect = (e: { files: any; originalEvent: any }) => {
    let _totalSize = totalSize;
    let files = e.files;
    for (let i = 0; i < files.length; i++) {
      _totalSize += files[i].size || 0;
    }

    setTotalSize(_totalSize);
    setUploadedFiles(e.files);
    onFormChange(e.files);
  };

  const onTemplateRemove = (file: File, callback: Function) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onRemove = (event: any) => {
    const removedFile = event.file; // Get the file being removed
    const updatedFiles = uploadedFiles.filter((file: any) => file !== removedFile); // Filter out the removed file
    setUploadedFiles(updatedFiles); // Update the uploadedFiles state
    onFormChange(updatedFiles);
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
          {isImagesOnly && (
            <img alt={file.name} role="presentation" src={URL.createObjectURL(file)} width={100} />
          )}
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
      <FileUpload
        ref={fileUploadRef}
        name="demo"
        multiple
        accept={isImagesOnly ? "image/*" : "*"}
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

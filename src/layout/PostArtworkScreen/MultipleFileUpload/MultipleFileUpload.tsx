import { useRef, useState } from "react";
// ---------------------------------------------------------------
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  ItemTemplateOptions,
} from "primereact/fileupload";
import { Button, ProgressBar, Tooltip, Tag, Toast } from "../../index";
import * as nsfwjs from "nsfwjs";
// ---------------------------------------------------------------
import { maxSizeAssetsUpload, maxSizeImagesUpload } from "../../../const/bizConstants";
import { getFileExtension } from "../../../util/FileNameUtil";

import "./MultipleFileUpload.scss";
// ---------------------------------------------------------------
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
  const [validationProgress, setValidationProgress] = useState<{ [key: string]: number }>({});
  const [validationResults, setValidationResults] = useState<{ [key: string]: boolean }>({});
  const fileUploadRef = useRef<FileUpload>(null);

  const validateImage = async (file: File) => {
    const _img = new Image();
    _img.src = URL.createObjectURL(file);
    console.log(_img);

    const model = await nsfwjs.load();
    console.log("model loaded", model);

    const predictions = await model.classify(_img);
    console.log(predictions);

    const isNSFW = predictions.some(
      (prediction) =>
        (prediction.className === "Porn" ||
          prediction.className === "Sexy" ||
          prediction.className === "Hentai") &&
        prediction.probability > 0.3
    );
    setValidationResults((prevResults) => ({ ...prevResults, [file.name]: !isNSFW }));
  };

  const onTemplateSelect = async (e: { files: File[]; originalEvent: any }) => {
    let _totalSize = totalSize;
    let files = e.files;
    const validatedFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      _totalSize += file.size || 0;
      setValidationProgress((prevProgress) => ({ ...prevProgress, [file.name]: 0 }));

      try {
        await validateImage(file);
        validatedFiles.push(file);
      } catch (error) {
        console.error(`Error validating ${file.name}:`, error);
        console.log(error);

        toast.current?.show({
          severity: "error",
          summary: `Error validating ${file.name}`,
          detail: "An error occurred while validating the image.",
        });
      } finally {
        setValidationProgress((prevProgress) => ({ ...prevProgress, [file.name]: 100 }));
      }
    }

    setTotalSize(_totalSize);
    setUploadedFiles(validatedFiles);
    onFormChange(validatedFiles);
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
    const isValid = validationResults[file.name];
    const _validationProgress = validationProgress[file.name];

    return (
      <div className="item-container flex align-items-center flex-wrap">
        <div
          className="item-name-conatiner flex flex-column flex-wrap align-content-start"
          style={{ width: "50%" }}
        >
          {isImagesOnly && (
            <img
              id={`img-item-${file.name}`}
              alt={file.name}
              role="presentation"
              src={URL.createObjectURL(file)}
              width={100}
            />
          )}
          <p className="text-cus-normal-bold m-0"> {file.name} </p>
          <span className="max-w-max text-cus-normal">{props.formatSize}</span>
          {validationProgress !== undefined && (
            <div className="validation-progress">
              <ProgressBar
                value={_validationProgress}
                showValue={false}
                style={{ width: "10rem", height: "12px" }}
              />
              {_validationProgress === 100 && (
                <span className={`validation-result ${isValid ? "valid" : "invalid"}`}>
                  {isValid ? "Safe" : "NSFW"}
                </span>
              )}
            </div>
          )}
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
          disabled={!isValid}
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

import { useEffect, useRef, useState } from "react";
// ---------------------------------------------------------------
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  ItemTemplateOptions,
} from "primereact/fileupload";
import { Button, ProgressBar, Tooltip, Tag, Toast, ProgressSpinner } from "../../index";
import * as nsfwjs from "nsfwjs";
// ---------------------------------------------------------------
import { maxSizeImagesUpload } from "../../../const/bizConstants";
import { getFileExtension } from "../../../util/FileNameUtil";

import "./MultipleFileUpload.scss";
import { chooseOptions, emptyFileTemplate } from "./Templates";
// ---------------------------------------------------------------
type Props = {
  uploadedFiles: any;
  setUploadedFiles: (data: any) => void;
  onFormChange: (data: any) => void;
  sendValidationResults: (data: any) => void;
};

export default function MultipleFileUpload({
  uploadedFiles,
  setUploadedFiles,
  onFormChange,
  sendValidationResults,
}: Props) {
  const toast = useRef<Toast>(null);
  const maxSize = maxSizeImagesUpload;
  const [totalSize, setTotalSize] = useState(0);
  const [validationProgress, setValidationProgress] = useState<{ [key: string]: number }>({});
  const [validationResults, setValidationResults] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);
  const fileUploadRef = useRef<FileUpload>(null);

  const validateImage = async (file: File) => {
    setIsLoading(true);
    const _img = new Image();
    _img.src = URL.createObjectURL(file);
    const model = await nsfwjs.load();
    const predictions = await model.classify(_img);
    const isNSFW = predictions.some(
      (prediction) =>
        (prediction.className === "Porn" ||
          prediction.className === "Sexy" ||
          prediction.className === "Hentai") &&
        prediction.probability > 0.7
    );
    setValidationResults((prevResults) => ({ ...prevResults, [file.name]: !isNSFW }));
    setIsLoading(false);
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
        setUploadedFiles(validatedFiles);
      }
    }

    setTotalSize(_totalSize);
  };

  const onTemplateRemove = (file: File, callback: Function) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onRemove = (event: any) => {
    const removedFile = event.file; // Get the file being removed
    const updatedFiles = uploadedFiles.filter((file: any) => file !== removedFile); // Filter out the removed file
    setValidationResults((prevResults) => {
      const updatedResults = { ...prevResults };
      delete updatedResults[removedFile.name];
      return updatedResults;
    });
    setUploadedFiles(updatedFiles); // Update the uploadedFiles state
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
            color="info"
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
        <div className="item-name-conatiner flex flex-column flex-wrap align-content-start">
          <img
            id={`img-item-${file.name}`}
            alt={file.name}
            role="presentation"
            src={URL.createObjectURL(file)}
            width={100}
          />
          <p className="text-cus-normal-bold m-0"> {file.name} </p>
          <span className="max-w-max text-cus-normal">{props.formatSize}</span>
          {validationProgress !== undefined && (
            <div className="validation-progress">
              {_validationProgress === 100 && (
                <span className={`validation-result ${isValid ? "valid" : "invalid"}`}>
                  {isValid ? "Đạt chuẩn" : "Không phù hợp"}
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
        />
      </div>
    );
  };

  useEffect(() => {
    console.log("validatedFiles", uploadedFiles);
    console.log("validationResults", validationResults);
    sendValidationResults(validationResults);
    onFormChange(uploadedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles, validationResults]);

  return (
    <div style={{ position: "relative" }}>
      {isLoading && (
        <div className="nsfw-spiner-container">
          <ProgressSpinner
            className="nsfw-spinner"
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            animationDuration=".5s"
          />
        </div>
      )}
      <Toast ref={toast} />
      <Tooltip target=".custom-choose-btn" content="Chọn files" position="bottom" />
      <FileUpload
        ref={fileUploadRef}
        name="demo"
        multiple
        accept="image/*"
        maxFileSize={maxSize}
        invalidFileSizeMessageDetail={`Kích thước file không được vượt quá ${maxSize / 1000000} MB`}
        invalidFileSizeMessageSummary={"Kích thước tệp không hợp lệ"}
        onSelect={onTemplateSelect}
        onRemove={onRemove}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyFileTemplate}
        chooseOptions={chooseOptions}
      />
    </div>
  );
}

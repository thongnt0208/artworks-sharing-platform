import { useEffect, useRef, useState } from "react";
// ---------------------------------------------------------------
import { FileUpload, FileUploadHeaderTemplateOptions } from "primereact/fileupload";
import { ProgressBar, Tooltip, Toast, ProgressSpinner } from "../../index";
import * as nsfwjs from "nsfwjs";
// ---------------------------------------------------------------
import { maxSizeImagesUpload } from "../../../const/bizConstants";

import "./MultipleFileUpload.scss";
import { chooseOptions, emptyFileTemplate, itemTemplateFunc } from "./Templates";
import WatermarkedImage, { imageToFile } from "../WatermarkImg";
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
  const [validationDetails, setValidationDetails] = useState<
    { fileName: string; porn?: number; sexy?: number; hentai?: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileUploadRef = useRef<FileUpload>(null);
  // let [test, setTest] = useState<HTMLImageElement>();

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
    let _validationDetails = validationDetails;

    _validationDetails.push({
      fileName: file.name,
      porn: predictions.find((prediction) => prediction.className === "Porn")?.probability || 0,
      sexy: predictions.find((prediction) => prediction.className === "Sexy")?.probability || 0,
      hentai: predictions.find((prediction) => prediction.className === "Hentai")?.probability || 0,
    });
    setValidationDetails(_validationDetails);

    setIsLoading(false);
  };

  const onTemplateSelect = async (e: { files: File[]; originalEvent: any }) => {
    let _totalSize = totalSize;
    let files = e.files;
    const validatedFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const _img = new Image();
      _img.src = URL.createObjectURL(file);
      _totalSize += file.size || 0;
      setValidationProgress((prevProgress) => ({ ...prevProgress, [file.name]: 0 }));

      try {
        await validateImage(file);
        console.log("Non watermarked file:", file);
        
        try {
          const _markedImg = await WatermarkedImage(_img);
          console.log("Watermarked image:", _markedImg);
          // setTest(_markedImg)
          
          const _file = await imageToFile(_markedImg, file.name, file.type);
          console.log("Watermarked file:", _file);
          // TODO: Add the watermarked file to the list of uploaded files
          
          validatedFiles.push(file);
        } catch (error) {
          console.error(`Error adding watermark to ${file.name}:`, error);
          console.log(error);
          toast.current?.show({
            severity: "error",
            summary: `Error adding watermark to ${file.name}`,
            detail: "An error occurred while adding watermark to the image.",
          });
        }
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

  useEffect(() => {
    console.log("validatedFiles", uploadedFiles);
    console.log("validationResults", validationResults);
    sendValidationResults(validationResults);
    onFormChange(uploadedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles, validationResults]);

  return (
    <div style={{ position: "relative" }}>
      {/* {test && <img src={test.src} alt="test" />} */}
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
        itemTemplate={itemTemplateFunc(
          validationResults,
          validationProgress,
          validationDetails,
          onTemplateRemove
        )}
        emptyTemplate={emptyFileTemplate}
        chooseOptions={chooseOptions}
      />
    </div>
  );
}

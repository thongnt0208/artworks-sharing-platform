import { ItemTemplateOptions } from "primereact/fileupload";
import { getFileExtension } from "../../../util/FileNameUtil";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";

export const emptyFileTemplate = () => {
  return (
    <div className="empty-template-container flex align-items-center flex-column">
      <i className="pi pi-image mt-3 p-5"></i>
      <p className="m-0">Kéo thả file vào đây để tải lên.</p>
    </div>
  );
};

export const itemTemplateFunc =
  (
    validationResults: any,
    validationProgress: any,
    validationDetails: { fileName: string; porn?: number; sexy?: number; hentai?: number }[],
    onTemplateRemove: (file: File, onRemove: any) => void
  ) =>
  (inFile: object, props: ItemTemplateOptions) => {
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
                  {!isValid &&
                    validationDetails.length &&
                    validationDetails.map(
                      (detail) => detail.fileName === file.name && nsfwResultTemplate(detail)
                    )}
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

export const chooseOptions = {
  icon: "pi pi-fw pi-images",
  className: "custom-choose-btn p-button-rounded w-8",
  label: "Thêm file",
};

export const nsfwResultTemplate = (detail: any) => {
  return (
    <div key={detail?.fileName} className="validation-details flex flex-column">
      {detail?.porn && detail?.porn > 0.7 && (
        <span className="text-cus-normal">
          Khiêu dâm: {(detail?.porn * 100)?.toString().substring(0, 5)}%
        </span>
      )}
      {detail?.sexy && detail?.sexy > 0.7 && (
        <span className="text-cus-normal">
          Gợi cảm: {(detail?.sexy * 100)?.toString().substring(0, 5)}%
        </span>
      )}
      {detail?.hentai && detail?.hentai > 0.7 && (
        <span className="text-cus-normal">
          Hentai: {(detail?.hentai * 100)?.toString().substring(0, 5)}%
        </span>
      )}
    </div>
  );
};

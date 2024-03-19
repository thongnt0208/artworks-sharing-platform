import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { maxCommentCharacter, maxSizeImagesUpload } from "../../../../const/bizConstants";
import "./ChatInput.scss";
import { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { emptyFileTemplate } from "../../../PostArtworkScreen/MultipleFileUpload/Templates";
import { Menu } from "primereact/menu";
// ----------------------------------------------------------

type Props = {
  newChatMessage: string;
  setNewChatMessage: (value: string) => void;
  SendChatMessage: () => void;
  newChatImages: File[];
  setNewChatImages: (value: File[]) => void;
  setIsShowProposalForm: (value: boolean) => void;
  SendChatImages: () => void;
  isLoading: boolean;
};

export default function ChatInput({
  newChatMessage,
  setNewChatMessage,
  SendChatMessage,
  newChatImages,
  setNewChatImages,
  setIsShowProposalForm,
  SendChatImages,
  isLoading,
}: Props) {
  const [isShowFilesUpDialog, setIsShowFilesUpDialog] = useState(false);
  const menuRef = useRef<Menu>(null);

  let handleInputChange = (e: any) => {
    if (e.target.value.length <= maxCommentCharacter) {
      setNewChatMessage(e.target.value);
    }
  };

  let handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      SendChatMessage();
    }
  };

  const handleFileUpload = (files: File[]) => {
    setNewChatImages(files);
    SendChatImages();
    setIsShowFilesUpDialog(false);
  };

  const textareaProperties = {
    autoResize: true,
    value: newChatMessage,
    placeholder: "Thêm tin nhắn...",
    className: "w-full",
    tooltip: `Nội dung nên ít hơn ${maxCommentCharacter} ký tự`,
    onChange: (e: any) => handleInputChange(e),
    onKeyDown: (e: any) => handleKeyDown(e),
  };

  const menuItems = [
    {
      label: "Đính kèm tệp",
      icon: "pi pi-paperclip",
      command: () => setIsShowFilesUpDialog(true),
    },
    {
      label: "Tạo thỏa thuận",
      icon: "pi pi-file",
      command: () => setIsShowProposalForm(true),
    },
  ];

  return (
    <>
      <div className="chat-input-container">
        <div className="flex gap-1">
          <>
            <Menu model={menuItems} popup ref={menuRef} id="dropdown-chat-menu" />
            <Button
              rounded
              icon="pi pi-plus"
              onClick={(e) => menuRef.current && menuRef.current.toggle(e)}
            />
          </>
          <InputTextarea {...textareaProperties} />
          <Button
            className="max-w-max align-self-end"
            label="Gửi"
            onClick={SendChatMessage}
            disabled={isLoading || !newChatMessage}
            loading={isLoading}
          />
          {/* <Button icon="pi pi-paperclip" onClick={() => setIsShowFilesUpDialog(true)} /> */}
        </div>
      </div>

      <Dialog
        visible={isShowFilesUpDialog}
        onHide={() => setIsShowFilesUpDialog(false)}
        dismissableMask
        headerStyle={{ padding: "3px 6px 0 0", border: 0 }}
      >
        <FileUpload
          multiple
          accept="*"
          maxFileSize={maxSizeImagesUpload}
          emptyTemplate={emptyFileTemplate}
          onUpload={(event) => handleFileUpload(event.files)}
        />
      </Dialog>
    </>
  );
}

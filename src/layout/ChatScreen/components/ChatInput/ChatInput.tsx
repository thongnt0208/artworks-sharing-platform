import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { maxCommentCharacter } from "../../../../const/bizConstants";
import "./ChatInput.scss";
import { useRef } from "react";
import { Menu } from "primereact/menu";

// ----------------------------------------------------------
type Props = {
  newChatMessage: string;
  setNewChatMessage: (value: string) => void;
  SendChatMessage: () => void;
  setNewChatImages: (value: File[]) => void;
  setIsShowProposalForm: (value: boolean) => void;
  isLoading: boolean;
};

export default function ChatInput({
  newChatMessage,
  setNewChatMessage,
  SendChatMessage,
  setNewChatImages,
  setIsShowProposalForm,
  isLoading,
}: Props) {
  const menuRef = useRef<Menu>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validFiles = Array.from(files).filter((file) => file);
      console.log(validFiles);

      setNewChatImages(validFiles);
    }
  };

  const textareaProperties = {
    autoResize: true,
    value: newChatMessage,
    placeholder: "Thêm tin nhắn...",
    rows: 1,
    tooltip: `Nội dung nên ít hơn ${maxCommentCharacter} ký tự`,
    onChange: (e: any) => handleInputChange(e),
    onKeyDown: (e: any) => handleKeyDown(e),
  };

  const menuItems = [
    {
      label: "Đính kèm tệp",
      icon: "pi pi-paperclip",
      command: () => {
        fileInputRef.current?.click();
      },
    },
  ];

  return (
    <div className="chat-input-bar-container">
      <div className="flex gap-1 align-items-center">
        <>
          <Menu model={menuItems} popup ref={menuRef} id="dropdown-chat-menu" />
          <Button
            rounded
            icon="pi pi-plus"
            onClick={(e) => menuRef.current && menuRef.current.toggle(e)}
          />
        </>
        <InputTextarea {...textareaProperties} className="chat-input-text" />
        <Button
          className="max-w-max"
          label="Gửi"
          onClick={SendChatMessage}
          disabled={isLoading || !newChatMessage}
          loading={isLoading}
        />
      </div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
    </div>
  );
}

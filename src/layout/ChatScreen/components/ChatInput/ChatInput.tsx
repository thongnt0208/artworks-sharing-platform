import { InputTextarea } from "primereact/inputtextarea";
import "./ChatInput.scss";
import { maxCommentCharacter } from "../../../../const/bizConstants";
import { Button } from "primereact/button";

type Props = {
  newChatMessage: string;
  setNewChatMessage: (value: string) => void;
  SendChatMessage: () => void;
  isLoading: boolean;
};

export default function ChatInput({
  newChatMessage,
  setNewChatMessage,
  SendChatMessage,
  isLoading,
}: Props) {
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

  const textareaProperties = {
    autoResize: true,
    value: newChatMessage,
    placeholder: "Thêm tin nhắn...",
    className: "w-full",
    tooltip: `Nội dung nên ít hơn ${maxCommentCharacter} ký tự`,
    onChange: (e: any) => handleInputChange(e),
    onKeyDown: (e: any) => handleKeyDown(e),
  };

  return (
    <>
      {" "}
      <div className="comment-input-container">
        <div className="flex gap-1">
          <InputTextarea {...textareaProperties} />
          <Button
            className="max-w-max align-self-end"
            label="Gửi"
            onClick={SendChatMessage}
            disabled={isLoading || !newChatMessage}
            loading={isLoading}
          />
        </div>
      </div>
    </>
  );
}

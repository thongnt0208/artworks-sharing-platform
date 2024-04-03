import { memo } from "react";
import "./MessageItem.scss";
import { Button, Tooltip, Avatar, Image } from "../../../index";
import { formatTime } from "../../../../util/TimeHandle";
import { isAnImage } from "../../../../util/FileNameUtil";

type Props = {
  isMyMessage: boolean;
  avatar: string;
  text: string;
  fileUrl?: string;
  createdOn: string;
};

function MessageItem({ avatar, text, fileUrl, createdOn, isMyMessage }: Props) {
  return (
    <div className={`message-item ${isMyMessage ? "my-message" : "other-message"}`}>
      {!isMyMessage && (
        <div className="avatar-container">
          <Avatar image={avatar} size="normal" shape="circle" />
        </div>
      )}
      <div className="message-content">
        <div className="message-text">
          {text}
          <Tooltip target=".message-content">{formatTime(createdOn)}</Tooltip>
        </div>
        {fileUrl && isAnImage(fileUrl) && (
          <div className="message-file">
            <Image src={fileUrl} alt="MsgImage" width="250" preview />
          </div>
        )}
        {fileUrl && !isAnImage(fileUrl) && (
          <div className="message-file">
            <Button
              icon="pi pi-download"
              iconPos="right"
              label="Tệp"
              onClick={() => window.open(fileUrl, "_blank")}
              className="w-8rem"
            />
          </div>
        )}
      </div>
    </div>
  );
}

const MemoizedMessageItem = memo(MessageItem);

export default MemoizedMessageItem;

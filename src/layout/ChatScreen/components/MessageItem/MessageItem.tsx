import React, { memo } from "react";
import "./MessageItem.scss";
import { Tooltip } from "primereact/tooltip";
import { Avatar } from "primereact/avatar";
import { Image } from "primereact/image";
import { formatTime } from "../../../../util/TimeHandle";

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
        {fileUrl && (
          <div className="message-file">
            <Image src={fileUrl} alt="MsgImage" width="250" preview/>
          </div>
        )}
      </div>
    </div>
  );
}

const MemoizedMessageItem = memo(MessageItem);

export default MemoizedMessageItem;

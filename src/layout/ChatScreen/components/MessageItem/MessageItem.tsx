import React from 'react';
import "./MessageItem.scss";
import { Tooltip } from 'primereact/tooltip';
import { Avatar } from 'primereact/avatar';

type Props = {
  isMyMessage: boolean;
  avatar: string;
  text: string;
  fileUrl?: string;
  createdOn: string;
};

export default function MessageItem({ avatar, text, fileUrl, createdOn, isMyMessage }: Props) {
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
          <Tooltip target=".message-content" >
            {createdOn}
          </Tooltip>
        </div>
        {fileUrl && <div className="message-file">{fileUrl}</div>}
      </div>
    </div>
  );
}
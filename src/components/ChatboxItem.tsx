import React, { useState, useEffect } from "react";
import "./styles/ChatboxItem.scss";
import { Avatar } from "primereact/avatar";

type ChatboxItem = {
  id: string;
  avatar: string;
  text: string;
  author: string;
  time: string;
  isSeen: boolean;
};

type ChatboxItemTemplateProps = {
  item: ChatboxItem;
  selectingChatboxId: string;
  setSelectingChatboxId: (id: string) => void;
};

const ChatboxItemTemplate: React.FC<ChatboxItemTemplateProps> = (props) => {
  const { item, selectingChatboxId, setSelectingChatboxId } = props;
  const { id, avatar, text, author, time, isSeen } = item;
  const [isSeenLocal, setIsSeenLocal] = useState<boolean>(isSeen);

  useEffect(() => {
    const textElements = document.querySelectorAll(".text-limit");
    textElements.forEach((element) => {
      let text = element.textContent?.trim() || "";
      if (text.length > 30) {
        text = text.slice(0, 30) + "...";
        element.textContent = text;
      }
    });
  }, []);

  const flexAddition = "flex gap-3 align-items-center";
  const messageItemClass =
    selectingChatboxId !== id
      ? `chatbox-item ${flexAddition}`
      : `chatbox-item chatbox-item-selecting ${flexAddition}`;

  const itemClickHandler = () => {
    // Call a function that calls an API to setIsSeen to false
    // setIsSeenLocal(true);
    setSelectingChatboxId(id);
    setIsSeenLocal(true);
  };

  return (
    <div className={messageItemClass} onClick={itemClickHandler}>
      <div className="chatbox-item-avatar flex">
        <Avatar image={avatar} size="large" shape="circle" />
      </div>
      <div className="chatbox-item-content">
        <div className="chatbox-item-header">
          <div className="chatbox-item-author text-cus-normal-bold">{author}</div>
        </div>
        <div
          className={
            !isSeenLocal
              ? "chatbox-item-text text-cus-normal-bold text-limit"
              : "chatbox-item-text text-cus-normal text-limit"
          }
        >
          {text}
        </div>
      </div>
      <div className="message-status-content">
        <div className="chatbox-item-time text-cus-small">{time}</div>
        {!isSeenLocal && <div className="chatbox-item-seen" />}
      </div>
    </div>
  );
};

export default ChatboxItemTemplate;
import React, { useState, useEffect } from "react";
import "./styles/ChatboxItem.scss";
import { Avatar } from "primereact/avatar";
import { ChatboxItemType } from "../layout/ChatScreen/ChatRelatedTypes";
import { useNavigate } from "react-router-dom";

type ChatboxItemTemplateProps = {
  item: ChatboxItemType;
  selectingChatbox: ChatboxItemType;
};

const ChatboxItemTemplate: React.FC<ChatboxItemTemplateProps> = (props) => {
  const { item, selectingChatbox } = props;
  const { id, avatar, text, author, time, isSeen } = item;
  const [isSeenLocal, setIsSeenLocal] = useState<boolean>(isSeen);
  const navigate = useNavigate();

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
    selectingChatbox?.id !== id
      ? `chatbox-item ${flexAddition}`
      : `chatbox-item chatbox-item-selecting ${flexAddition}`;

  const itemClickHandler = () => {
    // Call a function that calls an API to setIsSeen to false
    // setIsSeenLocal(true);
    setIsSeenLocal(true);
    navigate(`/chat/${id}`);
    console.log("ClickedId: ", id);
    
  };

  return (
    <div className={messageItemClass} onClick={itemClickHandler}>
      <div className="chatbox-item-avatar flex">
        <Avatar image={avatar} size="normal" shape="circle" />
      </div>
      <div className="chatbox-item-content">
        <div className="chatbox-item-header">
          <div className="chatbox-item-author text-cus-normal-bold">{author?.fullname}</div>
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
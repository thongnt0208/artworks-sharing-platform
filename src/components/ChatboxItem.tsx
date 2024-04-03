import React, { useEffect } from "react";
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
  const { id, avatar, text, author, time } = item;
  const navigate = useNavigate();

  useEffect(() => {
    const textElements = document.querySelectorAll(".text-limit");
    textElements.forEach((element) => {
      let text = element.textContent?.trim() || "";
      if (text.length > 20) {
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
        <div className="chatbox-item-text text-cus-normal text-limit">{text}</div>
      </div>
      <div className="message-status-content">
        <div className="chatbox-item-time text-cus-small">{time}</div>
      </div>
    </div>
  );
};

export default ChatboxItemTemplate;

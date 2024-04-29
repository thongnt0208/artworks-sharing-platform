import React, { useEffect, useState } from "react";
import { DataScroller } from "primereact/datascroller";
import "./Notification.scss";
import { Avatar } from "primereact/avatar";
import { Link } from "react-router-dom";
import { formatTime } from "../util/TimeHandle";

const blankPic = require("../assets/defaultImage/blank-100.png");

export type notificationItemType = {
  notificationId: string;
  content: string;
  notifyType: string;
  isSeen: boolean;
  creationDate: string;
  createdBy?: string | any;
  avatar?: string;
};

type Props = {
  notifications: notificationItemType[];
  type: "chat" | "noti";
};

const Notification: React.FC<Props> = ({ notifications, type }) => {
  const [notification, setNotification] = useState<notificationItemType[]>([]);
  const itemTemplate = (data: notificationItemType) => {
    return (
      <div className="notification-item">
        {type === "chat" && (
          <Link to={`/chat/${data?.notificationId}`}>
            <div className="avatar">
              <Avatar image={data.avatar || blankPic} size="large" shape="circle" />
            </div>
            <div className={`notification-content ${data.isSeen ? "seen" : ""}`}>
              <p className="notification-message">
                <strong style={{ color: "black", fontWeight: "bold" }}>{data.createdBy}</strong>
                {data.content}
              </p>
              <p className="notification-date" style={{ color: "#71C4EF" }}>
                {data.creationDate}
              </p>
            </div>
          </Link>
        )}

        {type === "noti" && (
          <a href=" ">
            <div className="avatar">
              {
                {
                  0: <div className="avatar pi pi-megaphone" style={{fontSize: '1.8rem', color: 'red' }}></div>,
                  1: <div className="avatar pi pi-exclamation-triangle" style={{fontSize: '1.8rem', color: 'orange' }}></div>,
                  2: <div className="avatar pi pi-info-circle" style={{fontSize: '1.8rem', color: 'green' }}></div>,
                }[data.notifyType]
              }
            </div>
            <div className={`notification-content ${data.isSeen ? "seen" : ""}`}>
              <p className="notification-message">{data.content}</p>
              <p className="notification-date">{formatTime(data.creationDate)}</p>
            </div>
          </a>
        )}
      </div>
    );
  };

  useEffect(() => {
    setNotification(notifications);
  }, [notifications]);

  return (
    <DataScroller
      className="notification-container"
      value={notification}
      itemTemplate={itemTemplate}
      rows={5}
    />
  );
};

export default Notification;

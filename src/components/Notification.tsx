import React, { useEffect, useState } from "react";
import { DataScroller } from "primereact/datascroller";
import "./Notification.scss";
import { Avatar } from "primereact/avatar";
import { Link } from "react-router-dom";

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
        <Link to={`/${type === "chat" ? "chat" : ""}/${data.notificationId}`}>
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

import React, { useEffect, useState } from "react";
import { DataScroller } from "primereact/datascroller";
import "./Notification.scss";
import { Avatar } from "primereact/avatar";

const avatar = require("../assets/defaultImage/default-avatar.png");

interface NotificationProps {
  notifications: {
    notificationId: string;
    content: string;
    notifyType: string;
    isSeen: boolean;
    creationDate: string;
  }[];
  account: {
    accountId: string;
    name: string;
  };
}

const Notification: React.FC<NotificationProps> = ({
  notifications,
  account,
}) => {
  const [notification, setNotification] = useState<
    {
      notificationId: string;
      content: string;
      notifyType: string;
      isSeen: boolean;
      creationDate: string;
    }[]
  >([]);
  const itemTemplate = (data: {
    notificationId: string;
    content: string;
    notifyType: string;
    isSeen: boolean;
    creationDate: string;
  }) => {
    return (
      <div className="notification">
        <div className="avatar">
        <Avatar image={avatar} size="xlarge" />
        </div>
        {data.isSeen ? (
          <div className="notification-content">
          <p className="notification-message">
            <strong style={{color: "black", fontWeight: "bolder"}}>{account.name}</strong> {data.content}
          </p>
          <p className="notification-date" style={{color: "#71C4EF"}}>{data.creationDate}</p>
        </div>
        ) : (
          <div className="notification-content" style={{ color: "grey" }}>
          <p className="notification-message">
            {account.name} {data.content}
          </p>
          <p className="notification-date">{data.creationDate}</p>
        </div>
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

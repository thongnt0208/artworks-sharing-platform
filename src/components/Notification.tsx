import React from "react";
import { DataScroller } from "primereact/datascroller";

const avatar = require("../assets/defaultImage/default-avatar.png");

interface NotificationProps {
  notification: {
    notificationId: string;
    content: string;
    notifyType: string;
    isSeen: boolean;
    creationDate: string;
  };
}
interface AccountProps {
  account: {
    accountId: string;
    name: string;
  };
}

const Notification: React.FC<NotificationProps & AccountProps> = ({ notification, account}) => {
  console.log(notification);
  const itemTemplate = ({
    notification,
    account,
  }: {
    notification: NotificationProps["notification"];
    account: AccountProps["account"];
  }) => {
    return (
      <div className="message-notification">
        <div className="avatar">
          <img src={avatar} alt="Avatar" />
        </div>
        <div className="notification-content">
          <p className="notification-message">
            {account.name} {notification.content}
          </p>
        </div>
        <p className="notification-date">{notification.creationDate}</p>
      </div>
    );
  };

  return (
    // <div className="message-notification">
    <DataScroller value={[notification]} itemTemplate={itemTemplate} />
    // </div>
  );
};

export default Notification;

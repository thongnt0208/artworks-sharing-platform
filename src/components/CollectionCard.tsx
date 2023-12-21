import React from "react";
import { Button } from "primereact/button";
import "./CollectionCard.scss";
import { useNavigate } from "react-router-dom";

const background = require("../assets/defaultImage/default-card-blur-image.png");

type Props = {
  data: {
    id: string;
    // imageUrl: string;
    title: string;
    description: string;
  };
  profileId?: string;
  isSubscribed?: boolean;
  onClick?: () => void;
};

const CollectionCard = ({ ...props }: Props) => {
  const { data, isSubscribed = false, profileId } = props;
  console.log(data);
  const { id, title, description } = data;
  const navigate = useNavigate();

  const handleClick = () => {
    if (isSubscribed) {
      // Navigate to collection/artwork detail page
      console.log("Navigate to collection/artwork detail page");
      navigate(`/artwork/${data.id}`); //Trial
    } else {
      // Navigate to payment page
      console.log("Navigate to payment page");
      navigate(`/payment/${profileId}`);
    }
  };
  return (
    <div className="collection-card-container">
      {!isSubscribed && (
        <div className="need-to-subscribe-btn">
          <Button icon="pi pi-lock" rounded >. Đăng ký để mở</Button>
        </div>
      )}
      <Button
        id="collection-card"
        style={{
          backgroundImage: `url(${background})`,
        }}
        onClick={handleClick}
      >
        <span className="text-cus-h3-bold">{title}</span>
        <span className="text-cus-small">{description}</span>
      </Button>
    </div>
  );
};

export default CollectionCard;

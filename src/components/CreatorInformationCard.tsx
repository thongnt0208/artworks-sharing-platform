import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "./CreatorInformationCard.scss";

const defaultAvatar = require("../assets/defaultImage/default-avatar.png");

type Props = {
    id: string;
    fullname: string;
    avatar: string;
    job: string;
    address: string;
    followHandler?: () => void;
    hireHandler?: () => void;
};

const CreatorInformationCard: React.FC<Props> = (props: Props) => {
  let footer = (
    <>
        <Button rounded className="top-button" label="Theo dõi" onClick={props.followHandler} />
        <Button rounded className="bot-button" label="Thuê" onClick={props.hireHandler} />
    </>
  );
  return (
    <div className="user-information-card-container">
      <Card footer={footer} className="user-information-card">
        <div className="avatar-container">
          <img
            alt={`Ảnh đại diện của ${props.fullname}`}
            src={props.avatar ? props.avatar : defaultAvatar}
            className="avatar-image"
          />
        </div>
        <div className="information-container">
          <h1>{props.fullname}</h1>
          {/* <p>{props.job}</p>
          <p>{props.address}</p> */}
          <p>Nghề nghiệp</p>
          <p>Quận Gò Vấp, Hồ Chí Minh</p>
        </div>
      </Card>
    </div>
  );
};

export default CreatorInformationCard;

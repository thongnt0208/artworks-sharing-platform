import React from "react";
import UserInformationCard, {
  UserInformationProps,
} from "../../../components/UserInformationCard";

import "./CreatorsView.scss";

type CreatorsProps = {
  creators: UserInformationProps[];
};

const CreatorsView: React.FC<CreatorsProps> = ({ creators }) => {
  return (
    <div className="creators-view-container w-full flex flex-column flex-wrap justify-content-center align-items-start">
      <p className="title">
        <i className="pi pi-star text-2xl ml-4" /> Nhà sáng tạo
      </p>
      <div className="creator-list">
        {Array.isArray(creators) &&
          creators.map((creator) => (
            <div className="creator-card" key={creator.id}>
              <UserInformationCard {...creator} hire={true} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CreatorsView;

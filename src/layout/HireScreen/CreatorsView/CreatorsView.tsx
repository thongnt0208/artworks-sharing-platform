import React from "react";
import UserInformationCard, {
  UserInformationProps,
} from "../../../components/UserInformationCard";

import "./CreatorsView.scss";

const CreatorsView: React.FC<{creators: UserInformationProps[], isLogin: boolean}> = ({ creators, isLogin }) => {
  return (
    <div className="creators-view-container w-full flex flex-column flex-wrap justify-content-center align-items-start">
      <p className="title">
        <i className="pi pi-star text-2xl ml-4" /> Nhà sáng tạo
      </p>
      <div className="creator-list">
        {Array.isArray(creators) &&
          creators.map((creator) => (
            <div className="creator-card" key={creator.id}>
              <UserInformationCard {...creator} isLogin={isLogin} hire={true} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CreatorsView;

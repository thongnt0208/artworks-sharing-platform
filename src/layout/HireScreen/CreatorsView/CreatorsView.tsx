import React from "react";
import UserInformationCard, { UserInformationProps } from "../../../components/UserInformationCard";

import "./CreatorsView.scss";

type CreatorsProps = {
  creators: UserInformationProps[];
};

const CreatorsView: React.FC<CreatorsProps> = ({ creators }) => {
  return (
    <div className="creators-view-container w-full flex flex-column flex-wrap justify-content-center align-items-start">
      <p className="title">
        <i className="pi pi-star text-2xl" /> Nhà sáng tạo
      </p>
      <div className="w-fit flex flex-row flex-wrap justify-content-center align-items-center">
        {Array.isArray(creators) &&
          creators.map((creator) => (
            <UserInformationCard
            key={creator.id}
            {...creator}
            hire={true}
            />
          ))}
      </div>
    </div>
  );
};

export default CreatorsView;

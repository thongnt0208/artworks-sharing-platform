import React from "react";
import UserInformationCard from "../../../components/UserInformationCard";

import "./CreatorsView.scss";

type CreatorProps = {
  Id: string;
  Fullname: string;
  Avatar: string;
  Job: string;
  Address: string;
  IsCreator: boolean;
  followHandler?: () => void;
  hireHandler?: () => void;
};

type CreatorsProps = {
  creators: CreatorProps[];
};

const CreatorsView: React.FC<CreatorsProps> = ({ creators }) => {
  return (
    <div className="creators-view-container w-full flex flex-column flex-wrap justify-content-center align-items-start">
      <p className="title">
        <i className="pi pi-star text-2xl" /> Đề xuất
      </p>
      <div className="w-fit flex flex-row flex-wrap justify-content-center align-items-center">
        {Array.isArray(creators) &&
          creators.map((creator) => (
            <UserInformationCard
              key={creator.Id}
              id={creator.Id}
              fullname={creator.Fullname}
              avatar={creator.Avatar}
              job={creator.Job}
              address={creator.Address}
              isCreator={creator.IsCreator}
              followHandler={creator.followHandler}
              hireHandler={creator.hireHandler}
            />
          ))}
      </div>
    </div>
  );
};

export default CreatorsView;

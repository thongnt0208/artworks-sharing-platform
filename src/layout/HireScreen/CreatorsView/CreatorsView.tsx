import React from "react";
import CreatorInformationCard from "../../../components/CreatorInformationCard";

type CreatorProps = {
  Id: string;
  Fullname: string;
  Avatar: string;
  Job: string;
  Address: string;
  followHandler?: () => void;
  hireHandler?: () => void;
};

type CreatorsProps = {
  creators: CreatorProps[];
};

const CreatorsView: React.FC<CreatorsProps> = ({ creators }) => {
  return (
    <div className="creators-view-container w-full flex flex-column flex-wrap justify-content-center align-items-start">
      <h1>
        <i className="pi pi-star text-3xl" /> Các nhà sáng tạo
      </h1>
      <div className="w-fit flex flex-row flex-wrap justify-content-center align-items-center">
        {Array.isArray(creators) &&
          creators.map((creator) => (
            <CreatorInformationCard
              key={creator.Id}
              id={creator.Id}
              fullname={creator.Fullname}
              avatar={creator.Avatar}
              job={creator.Job}
              address={creator.Address}
              followHandler={creator.followHandler}
              hireHandler={creator.hireHandler}
            />
          ))}
      </div>
    </div>
  );
};

export default CreatorsView;

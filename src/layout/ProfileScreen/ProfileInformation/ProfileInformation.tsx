import React from "react";
import UserInformationCard from "../../../components/UserInformationCard";

interface ProfileProps {
  id: string,
  name: string,
  job: string,
  address: string,
  introduction: string,
  profileView: number,
  artworksView: number,
  followerNum: number,
  followingNum: number
}

type Profile = {
  profile: ProfileProps
}

const ProfileInformation: React.FC<Profile> = ({profile}) => {
  return (
    <>
      <UserInformationCard
        id={profile.id}
        name={profile.name}
        isCreator={false}
        job={profile.job}
        address={profile.address}
        introduction={profile.introduction}
        profileView={profile.profileView}
        artworksView={profile.artworksView}
        followerNum={profile.followerNum}
        followingNum={profile.followingNum}
      />
    </>
  );
};

export default ProfileInformation;

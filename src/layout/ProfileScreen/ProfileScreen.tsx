import React, { useEffect, useState } from "react";
import UserInformationCard from "../../components/UserInformationCard";
import { GetProfileData } from "./ProfileService";

type ProfileProps = {
    id: string;
    name: string;
    isCreator: boolean;
    job: string;
    address: string;
    introduction: string;
    profileView: number;
    artworksView: number;
    followerNum: number;
    followingNum: number;
};

const ProfileScreen: React.FC = () => {
    const [profile, setProfile] = useState<ProfileProps>({
        id: "",
        name: "",
        isCreator: false,
        job: "",
        address: "",
        introduction: "",
        profileView: 0,
        artworksView: 0,
        followerNum: 0,
        followingNum: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const profileData = await GetProfileData();
            setProfile(profileData);
        };
    fetchData();
    }, []);

  return (
    <>
      <UserInformationCard
        id={profile.id}
        name={profile.name}
        isCreator={profile.isCreator}
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

export default ProfileScreen;

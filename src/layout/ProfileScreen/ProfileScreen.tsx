import React, { useEffect, useState } from "react";
import UserInformationCard from "../../components/UserInformationCard";
import { GetProfileData } from "./ProfileService";
import MenuTab from "./MenuTab/MenuTab";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "../index";
import { subscribeDataType } from "./SubscribeArea/SubscribeArea";

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
  const navigate = useNavigate();

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

  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [subscribeData, setSubscribeData] = useState<subscribeDataType[]>([
    {
      id: "1",
      title: "Đây là một collection/artwork",
      description: "Miêu tả của collection",
    },
    {
      id: "2",
      title: "Đây là một collection/artwork",
      description: "Miêu tả của collection",
    },
    {
      id: "3",
      title: "Đây là một collection/artwork",
      description: "Miêu tả của collection",
    },
  ]);
  const [isSetup, setIsSetup] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await GetProfileData();
      // MUST-HAVE FUNCTIONS IN THE SERVICE:
      // Function 1: Get subscribe area data -> setSubscribeData
      // Function 2: Check if the current user's id (useAuth) is the profile id or not -> setIsCreator
      // Function 3: (after function 2 && isCreator === false) Check if the current user is subscribed to this profile or not -> setIsSubscribed
      // Function 3: (after function 2 && isCreator === true)  Check if the current user set up the subscribe area or not -> setIsSetup

      setProfile(profileData);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="profile-screen-container grid mt-1">
        <div className="profile-information-container col col-4">
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
        </div>
        <div className="profile-menu-container col col-8">
          <MenuTab />
        </div>
      </div>

      {/* <Button label="Test page" onClick={() => navigate("edit")} />
      <Button
        label="Vùng đăng ký"
        onClick={() =>
          navigate("subscribe", {
            state: { subscribeData, isCreator, isSubscribed, isSetup },
          })
        }
      />
      <Outlet /> */}
    </>
  );
};

export default ProfileScreen;

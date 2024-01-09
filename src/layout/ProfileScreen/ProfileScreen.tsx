import React, { useEffect, useState } from "react";
import UserInformationCard from "../../components/UserInformationCard";
import { GetProfileData } from "./ProfileService";
import MenuTab from "./MenuTab/MenuTab";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../index";
import { subscribeDataType } from "./SubscribeArea/SubscribeArea";
import { getAuthInfo } from "../../util/AuthUtil";

type ProfileProps = {
  id: string;
  username: string;
  fullname: string;
  role: string;
  // job: string;
  // address: string;
  bio: string;
  avatar: string;
  profileView: number;
  artworksView: number;
  followerNum: number;
  followingNum: number;
};

const ProfileScreen: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const navigate = useNavigate();
  const profileId = useParams()?.id;

  const [profile, setProfile] = useState<ProfileProps>({
    id: "",
    username: "n/a",
    fullname: "N/A",
    role: "",
    avatar: "",
    // job: "",
    // address: "",
    bio: "",
    profileView: 0,
    artworksView: 0,
    followerNum: 0,
    followingNum: 0,
  });
  const [isCreator, setIsCreator] = useState<boolean>(isLogin);
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
      const profileData = await GetProfileData(profileId || "");
      // MUST-HAVE FUNCTIONS IN THE SERVICE:
      // Function 1: Get subscribe area data -> setSubscribeData
      // Function 2: Check if the current user's id (useAuth) is the profile id or not -> setIsCreator
      // Function 3: (after function 2 && isCreator === false) Check if the current user is subscribed to this profile or not -> setIsSubscribed
      // Function 3: (after function 2 && isCreator === true)  Check if the current user set up the subscribe area or not -> setIsSetup
      setProfile(profileData);
      if (getAuthInfo().id === profile.id) {
        setIsCreator(true);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="profile-screen-container grid grid-nogutter mt-3">
        <div className="profile-information-container col col-3">
          <UserInformationCard
            id={profile.id}
            username={profile.username}
            fullname={profile.fullname}
            role={profile.role}
            isCreator={isCreator}
            // job={profile.job}
            // address={profile.address}
            bio={profile.bio}
            avatar={profile.avatar}
            profileView={profile.profileView}
            artworksView={profile.artworksView}
            followerNum={profile.followerNum}
            followingNum={profile.followingNum}
          />
        </div>
        <div className="profile-menu-container col col-9 pl-6 ">
          <MenuTab accountId={profile.id} isCreator={isCreator} />
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

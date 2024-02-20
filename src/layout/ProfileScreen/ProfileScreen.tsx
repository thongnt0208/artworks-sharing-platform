import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProfileData } from "./ProfileService";
import { getAuthInfo } from "../../util/AuthUtil";
import { useNavigate } from "react-router-dom";
import UserInformationCard, { UserInformationProps } from "../../components/UserInformationCard";
import MenuTab from "./MenuTab/MenuTab";
// import { subscribeDataType } from "./SubscribeArea/SubscribeArea";


const ProfileScreen: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const profileId = useParams()?.id;
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserInformationProps>({
    id: "",
    fullname: "",
    avatar: "",
    job: "",
    address: "",
    isCreator: false,
    email: "",
    username: "",
    role: "",
    bio: "",
    profileView: 0,
    artworksView: 0,
    followerNum: 0,
    followingNum: 0,
  });
  const [isCreator, setIsCreator] = useState<boolean>(isLogin);
  // const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  // const [subscribeData, setSubscribeData] = useState<subscribeDataType[]>([
  //   {
  //     id: "1",
  //     title: "Đây là một collection/artwork",
  //     description: "Miêu tả của collection",
  //   },
  //   {
  //     id: "2",
  //     title: "Đây là một collection/artwork",
  //     description: "Miêu tả của collection",
  //   },
  //   {
  //     id: "3",
  //     title: "Đây là một collection/artwork",
  //     description: "Miêu tả của collection",
  //   },
  // ]);
  // const [isSetup, setIsSetup] = useState<boolean>(false);

  const editProfileHandler = () => {
    navigate(`/account/settings`, {state: {profile: profile}});
  };

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await GetProfileData(profileId || "");
      setProfile(profileData);
      if (getAuthInfo()?.id === profileId) {
        setIsCreator(true);
      } else {
        setIsCreator(false);
      }
    };
    fetchData();
  }, [profileId]);

  return (
    <>
      {profile ? (
        <div className="profile-screen-container grid grid-nogutter mt-3">
          <div className="profile-information-container col col-3">
            <UserInformationCard
              id={profile.id}
              username={profile.username}
              fullname={profile.fullname}
              email={profile.email}
              role={profile.role}
              isCreator={isCreator}
              job={profile.job}
              address={profile.address}
              bio={profile.bio}
              avatar={profile.avatar}
              profileView={profile.profileView}
              artworksView={profile.artworksView}
              followerNum={profile.followerNum}
              followingNum={profile.followingNum}
              editHandler={() => {editProfileHandler()}}
            />
          </div>
          <div className="profile-menu-container col col-9 pl-6 ">
            <MenuTab
              accountId={profile.id}
              isCreator={isCreator}
              accountAvatar={profile.avatar}
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-content-center align-items-center">
          <h1>Opps! Chúng tôi không tìm thấy người dùng này.</h1>
        </div>
      )}

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
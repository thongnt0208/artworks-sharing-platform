import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getAuthInfo } from "../../util/AuthUtil";
import {
  FollowUser,
  GetIsFollowed,
  GetProfileData,
  SendRequestMessage,
  UnfollowUser,
} from "./ProfileService";
import UserInformationCard, {
  UserInformationProps,
} from "../../components/UserInformationCard";
import MenuTab from "./MenuTab/MenuTab";
import { RequestProps } from "../../components/RequestPopup";
import { toast } from "react-toastify";
import { CatchAPICallingError } from "..";

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
    messageHandler: () => {}, // Add the missing messageHandler property
  });
  const [isCreator, setIsCreator] = useState<boolean>(isLogin);
  const [isFollow, setIsFollow] = useState<boolean>(false);

  const requestMessageHandler = async (request: RequestProps) => {
    try {
      const response = await SendRequestMessage(profile.id, request.message);
      if (response) {
        toast.success("Gửi yêu cầu thành công");
      }
    } catch (error) {
      CatchAPICallingError(error, navigate);
    }
  };

  const editProfileHandler = () => {
    navigate(`/account/settings`, { state: { profile: profile } });
  };

  const handleFollow = (accountId: string) => {
    const response = FollowUser(accountId);
    response.then((res) => {
      console.log(res);
    });
  };

  const handleUnfollow = (accountId: string) => {
    const response = UnfollowUser(accountId);
    response.then((res) => {
      console.log(res);
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await GetProfileData(profileId || "");
      setProfile(profileData);
      const response = GetIsFollowed(profileId || ""); // Fix: Ensure profileId is always of type string
      const data = await response.then((res) => res.data);
      setIsFollow(Boolean(data));
      if (getAuthInfo()?.id === profileId) {
        setIsCreator(true);
      } else {
        setIsCreator(false);
      }
    };
    fetchData();
  }, [profileId, isFollow]);

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
              isFollowed={isFollow}
              profileView={profile.profileView}
              artworksView={profile.artworksView}
              followerNum={profile.followerNum}
              followingNum={profile.followingNum}
              editHandler={() => {
                editProfileHandler();
              }}
              followHandler={handleFollow}
              unFollowHandler={handleUnfollow}
              messageHandler={requestMessageHandler}
            />
          </div>
          <div className="profile-menu-container col col-9 pl-6 ">
            <MenuTab
              accountId={profile.id}
              isCreator={isCreator}
              accountAvatar={profile.avatar}
              accountFullname={profile.fullname}
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-content-center align-items-center">
          <h1>Opps! Chúng tôi không tìm thấy người dùng này.</h1>
        </div>
      )}
    </>
  );
};

export default ProfileScreen;

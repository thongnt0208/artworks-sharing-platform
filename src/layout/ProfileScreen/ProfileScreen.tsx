import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthInfo } from "../../util/AuthUtil";
import { GetProfileData, SendRequestMessage } from "./ProfileService";
import UserInformationCard, {
  UserInformationProps,
} from "../../components/UserInformationCard";
import MenuTab from "./MenuTab/MenuTab";
import { RequestProps } from "../../components/RequestPopup";
import { toast } from "react-toastify";
import { CatchAPICallingError, ProgressSpinner } from "..";
import {
  addFollow,
  fetchFollowers,
  fetchIsFollow,
  removeFollow,
} from "../ArtworkDetailScreen/Service";
import "./ProfileScreen.scss";

const ProfileScreen: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const profileId = getAuthInfo()?.id;
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
    isFollowed: false,
    messageHandler: () => {}, // Add the missing messageHandler property
  });
  const [isCreator, setIsCreator] = useState<boolean>(isLogin);
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const requestMessageHandler = async (request: RequestProps) => {
    try {
      const response = await SendRequestMessage(profile.id, request.message);
      if (response) {
        toast.success("Gửi lời nhắn thành công");
      }
    } catch (error) {
      toast.error("Gửi lời nhắn thất bại");
      CatchAPICallingError(error, navigate);
    }
  };

  const editProfileHandler = () => {
    navigate(`/account/settings`, { state: { profile: profile } });
  };

  const handleFollow = () => {
    const response = addFollow(profileId || "");
    response.then((res) => {
      setIsFollow(true);
    });
  };

  const handleUnfollow = () => {
    const response = removeFollow(profileId || "");
    response.then((res) => {
      setIsFollow(false);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const profileData = await GetProfileData(profileId || "");
        setProfile(profileData);
        if (profile.id) {
          const isFollowed = await fetchIsFollow(profileId || "");
          const followerNum = await fetchFollowers(profileId || "");
          const followingNum = await fetchFollowers(profileId || "");
          setIsFollow(isFollowed);
          setProfile((prev) => ({
            ...prev,
            followerNum: followerNum,
            followingNum: followingNum,
          }));
        }
        if (getAuthInfo()?.id === profileId) {
          setIsCreator(true);
        } else {
          setIsCreator(false);
        }
      } catch (error) {
        CatchAPICallingError(error, navigate);
      } finally {
        setInterval(() => {
        setIsLoading(false);
        }, 500);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFollow, profile.id, profileId]);
  return (
    <>
      {profile.id ? (
        <div className="profile-screen-container grid">
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
              isFollowed={isFollow}
              followHandler={handleFollow}
              unfollowHandler={handleUnfollow}
              editHandler={() => {
                editProfileHandler();
              }}
              messageHandler={requestMessageHandler}
            />
          </div>
          <div className="profile-menu-container col col-9">
            <MenuTab
              accountId={profileId || ""}
              isCreator={isCreator}
              accountAvatar={profile.avatar}
              accountFullname={profile.fullname}
            />
          </div>
        </div>
      ) : (
        !isLoading && (
          <div className="w-full h-screen flex justify-content-center align-items-center">
            <h1>Opps! Chúng tôi không tìm thấy người dùng này.</h1>
          </div>
        )
      )}
      {isLoading && <ProgressSpinner />}
    </>
  );
};

export default ProfileScreen;

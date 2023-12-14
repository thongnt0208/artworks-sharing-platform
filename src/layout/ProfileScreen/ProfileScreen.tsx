import React from "react";
import ProfileInformation from "./ProfileInformation/ProfileInformation";
import UserArtworksSide from "./UserArtworksSide/UserArtworksSide";
import { GetProfileData } from "./ProfileService";

type Artwork = {
  id: string;
  title: string;
  imageUrl: string;
  likeNum: number;
  viewNum: number;
  subTitle: string;
};

type Item = {
  id: string;
  name: string;
  price: number;
  extension: string;
  size: number;
  thumbnail?: string;
  editHandler?: () => void;
  saveHandler?: () => void;
  removeHandler?: () => void;
};

type AssetsProps = {
  id: string;
  thumbnail: string;
  isCreator: boolean;
  itemsList: Item[];
  onClickHandler?: () => void;
};

type CollectionProps = {
  id: string;
  title: string;
  description: string;
};

type ProfileProps = {
  id: string;
  name: string;
  job: string;
  address: string;
  introduction: string;
  profileView: number;
  artworksView: number;
  followerNum: number;
  followingNum: number;
};

const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = React.useState<ProfileProps>({
    id: "",
    name: "",
    job: "",
    address: "",
    introduction: "",
    profileView: 0,
    artworksView: 0,
    followerNum: 0,
    followingNum: 0,
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const profileData = await GetProfileData();
      setProfile(profileData);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
         <ProfileInformation profile={profile} />   
        {/* <UserArtworksSide artworks={artworksSampleProps} assets={assetsProps} collections={collectionSampleProps} /> */}
      </div>
    </>
  );
};


export default ProfileScreen;

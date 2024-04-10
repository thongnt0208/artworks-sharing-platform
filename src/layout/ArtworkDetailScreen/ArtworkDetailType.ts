import { TagProps } from "../../components/Tag";
import { CategoryProps } from "../HomeScreen/HomeScreen";

type Creator = {
  id: string;
  username?: string;
  email: string;
  fullname: string;
  avatar?: string;
  Bio?: string;
  Job?: string;
  Address?: string;
};

export type CommentType = {
  id: string;
  createdBy:
    | string
    | {
        id: string;
        fullname: string;
        avatar: string;
      };
  createdOn: string;
  content: string;
};

export type AssetType = {
  id: string;
  name: string;
  price: number;
  description?: string;
  extension?: string;
  size?: number;
  thumbnail?: string;
  lastModificatedOn?: string | Date;
  assetType?: string;
};

export type ArtworkDetailType = {
  id: string;
  account: Creator; //created account
  title: string;
  images: { location: string; order: number }[];
  tagList: TagProps[];
  description: string | null;
  privacy: string | number;
  createdOn: string | Date;
  lastModificatedBy?: string;
  lastModificatedOn?: string | Date;
  tagDetails: string[] | any[];
  categoryArtworkDetails: CategoryProps[] | any[];
  likes?: string[];
  views?: number;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  comments?: CommentType[];
  assets?: AssetType[];
  isLiked: boolean;
};

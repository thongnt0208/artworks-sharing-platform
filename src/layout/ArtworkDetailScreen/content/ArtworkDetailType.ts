export type Creator = {
  Id: string;
  Fullname: string;
  Avatar: string;
  Bio: string;
  Job: string;
  Address: string;
};

export type Comment = {
  Id: string;
  UserId: string;
  Fullname: string;
  Avatar: string;
  Content: string;
};

export type Asset = {
  Id: string;
  AssetName: string;
  AssetType: string;
  Price: string;
};

export type ArtworkDetailType = {
  Id: string;
  CreatedBy: Creator;
  Title: string;
  Images: string[];
  Description: string;
  Privacy: string;
  CreatedOn: string | Date;
  LastModifiedOn?: string | Date;
  Tags: string[];
  Category: string;
  LikeNum: number;
  ViewNum: number;
  Comments?: Comment[];
  Assets?: Asset[];
  isLiked: boolean;
};

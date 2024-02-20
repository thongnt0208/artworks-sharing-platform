export type Creator = {
  id: string;
  username?: string;
  email: string;
  fullname: string;
  avatar?: string;
  Bio?: string;
  Job?: string;
  Address?: string;
};

export interface CommentType {
  id: string;
  createdBy: string | {
    id: string;
    fullname: string;
    avatar: string;
  };
  content: string;
}

export type Asset = {
  id: string;
  assetName: string;
  assetType?: string;
  price: number;
  lastModificatedOn?: string | Date;
};

export type Category = {
  id: string;
  categoryName: string;
  parent?:string;
}

export type ArtworkDetailType = {
  id: string;
  account: Creator; //created account
  title: string;
  images: {location: string}[];
  description: string | null;
  privacy: string | number;
  createdOn: string | Date;
  lastModificatedOn?: string | Date;
  tagDetails: string[] | any[];
  categoryArtworkDetails: Category[] | any[];
  likes?: string[];
  views?: number;
  comments?: CommentType[];
  assets?: Asset[];
  isLiked: boolean;
};

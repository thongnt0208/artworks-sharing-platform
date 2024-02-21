import axios from "axios";
import { getAuthInfo } from "../../util/AuthUtil";
const API_URl = process.env.REACT_APP_REAL_API_BASE_URL;
const accessToken = getAuthInfo()?.accessToken;
const refreshToken = getAuthInfo()?.refreshToken;

type Artwork = {
  id: string;
  title: string;
  createdBy: string;
  creatorFullName: string;
  thumbnail: string;
  likeCount: number;
  viewCount: number;
};

type CollectionProps = {
  id: string;
  creatorFullName: string;
  collectionName: string;
  privacy: string;
  numberOfArtworks: number;
  accountAvatar?: string;
  artworks: Artwork[];
};

export async function GetCollectionData(collectionId: string) {
  try {
    const response = await axios.get(`${API_URl}/collections/${collectionId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken || refreshToken}`,
      },
    });
    if (response.status !== 200) {
      return { artworks: [] };
    }

    const artworks: Artwork[] = (response.data.artworks || []).map(
      (artworkData: { artwork: Artwork }) => artworkData.artwork
    );
    const collection: CollectionProps = {
      id: response.data.id,
      creatorFullName: response.data.createdBy.username,
      collectionName: response.data.collectionName,
      privacy: response.data.privacy,
      numberOfArtworks: response.data.artworks.length,
      accountAvatar: response.data.createdBy.avatar,
      artworks: artworks,
    };

    return { collection, artworks };
  } catch (error) {
    return { artworks: [] };
  }
}

export async function UpdateCollectionData({
  collectionId,
  collectionName,
  privacy,
}: {
  collectionId: string;
  collectionName: string;
  privacy: boolean;
}) {
  let privacyType = privacy ? 1 : 0;
  try {
    const response = await axios.put(
      `${API_URl}/collections/${collectionId}`,
      JSON.stringify({
        collectionName,
        privacyType,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken || refreshToken}`,
        },
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function DeleteCollectionData(collectionId: string) {
  try {
    await axios.delete(
      `${API_URl}/collections/${collectionId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken || refreshToken}`,
        },
      }
    );
    return true;
  } catch (error) {
    return false;
  }
}

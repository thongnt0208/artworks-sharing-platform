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

/**
 * Get Collection Detail Data
 *
 * @description This function to get Collection Detail from database
 * @returns {collection<CollectionProps>, artworks<Artwork>[]} - Collection Detail and Artwork list
 * @example
 * @author AnhDH
 * @version 1.0.0
 */
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

/**
 * Create a new Collection
 *
 * @description This function to create a new Collection
 * @returns Update status (True: Successfully | False: Failed)
 * @example
 * @author AnhDH
 * @version 1.0.0
 */
export async function CreateCollectionData({
  collectionName,
  privacy,
  artworkId,
}: {
  collectionName: string;
  privacy: boolean;
  artworkId: string;
}) {
  let privacyType = privacy ? 1 : 0;
  try {
    const response = await axios.post(
      `${API_URl}/collections`,
      JSON.stringify({
        collectionName,
        privacyType,
        artworkId,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken || refreshToken}`,
        },
      }
    );
    if (response.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

/**
 * Update Collection Detail Data
 *
 * @description This function to update Collection Detail
 * @returns Update status (True: Successfully | False: Failed)
 * @example
 * @author AnhDH
 * @version 1.0.0
 */
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
      console.log(response);
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * Delete a Collection
 *
 * @description This function to delete a Collection Detail from database
 * @returns Delete status (True: Successfully | False: Failed)
 * @example
 * @author AnhDh
 * @version 1.0.0
 */
export async function DeleteCollectionData(collectionId: string) {
  try {
    await axios.delete(`${API_URl}/collections/${collectionId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken || refreshToken}`,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Add an Artwork to Collection
 *
 * @description This function to Add an Artwork to Collection
 * @returns Adding status (True: Successfully | False: Failed)
 * @example
 * @author AnhDh
 * @version 1.0.0
 */
export async function AddArtworkToCollection({
  collectionId,
  artworkId,
}: {
  collectionId: string;
  artworkId: string;
}) {
  try {
    await axios.post(
      `${API_URl}/collections/${collectionId}/artwork`,
      JSON.stringify({
        artworkId,
      }),
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

/**
 * Remove an Artwork from Collection
 *
 * @description This function to Remove an Artwork from Collection
 * @returns Adding status (True: Successfully | False: Failed)
 * @example
 * @author AnhDh
 * @version 1.0.0
 */
export async function RemoveArtworkFromCollection({
  collectionId,
  artworkId,
}: {
  collectionId: string;
  artworkId: string;
}) {
  try {
    await axios.delete(
      `${API_URl}/collections/${collectionId}/artwork`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken || refreshToken}`,
        },
        data: JSON.stringify({
          artworkId,
        }),
      }
    );
    return true;
  } catch (error) {
    return false;
  }
}

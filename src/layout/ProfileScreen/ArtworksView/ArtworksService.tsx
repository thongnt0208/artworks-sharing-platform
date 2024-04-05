import axios from "axios";
import { getAuthInfo } from "../../../util/AuthUtil";
import { ArtworkProps } from "../../../components/ArtworkCard";
const API_URL = process.env.REACT_APP_REAL_API_BASE_URL;

const accessToken = getAuthInfo()?.accessToken || "";
const refreshToken = getAuthInfo()?.refreshToken || "";

/**
 * 
 * Retrieves artworks data from the server.
 * 
 * @param pageSize - The number of artworks to retrieve per page.
 * @param pageNumber - The page number of the artworks to retrieve.
 * @param accountId - The ID of the account to retrieve artworks for.
 * @returns A promise that resolves to the artworks data.
 * @author AnhDH 
 * @version 1.2.0
 */
export async function GetArtworksData(pageSize: number, pageNumber: number, accountId: string, state?: number) {
  try {
    const response = await axios.get(
      `${API_URL}/accounts/${accountId}/artworks`,
      {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          state: state,
        },
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken || refreshToken}`,
        },
      }
    );
    if (response.status !== 200) {
      return [];
    } else {
      let artworksData: ArtworkProps[] = [];
      if (Array.isArray(response.data.items)) {
          artworksData = response.data.items.map((artwork: any) => ({
          id: artwork.id,
          title: artwork.title,
          thumbnail: artwork.thumbnail,
          viewCount: artwork.viewCount,
          likeCount: artwork.likeCount,
          privacy: artwork.privacy,
          createdBy: artwork.createdBy,
          creatorFullName: artwork.account.fullname,
        }));
      }
      console.log("artworksData", artworksData);
      return artworksData;
    }
  } catch (error) {
    return error;
  }
}

/**
 * 
 * Deletes an artwork from the server.
 * 
 * @param artworkId - The ID of the artwork to delete.
 * @returns A boolean indicating whether the artwork was successfully deleted.
 * @author AnhDH 
 * @version 1.0.0
 */
export async function DeleteArtworkData(artworkId: string) {
  try {
    await axios.delete(
      `${API_URL}/artworks/${artworkId}`,
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

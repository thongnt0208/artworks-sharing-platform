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
 * @version 1.1.0
 */
export async function GetArtworksData(pageSize: number, pageNumber: number, accountId: string) {
  try {
    const response = await axios.get(
      `${API_URL}/accounts/${accountId}/artworks`,
      {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
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
      return artworksData;
    }
  } catch (error) {
    return error;
  }
}

export async function GetArtworksReferenceData(pageSize: number, pageNumber: number, accountId: string) {
  try {
    const response = await axios.get(
      `${API_URL}/accounts/${accountId}/artworks`,
      {
        params: {
          sortColumn: "create",
          pageNumber: pageNumber,
          pageSize: pageSize,
          privacy: 0, // public
          state: 1 // accepted
        },
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken || refreshToken}`,
        },
      }
    );
    if (response.status !== 200) {
      console.log("Error fetching artworks data");
      return [];
    }
    return response.data;
  } catch (error) {
    console.log("Error fetching artworks data:", accountId);
    return [];
  }
}

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

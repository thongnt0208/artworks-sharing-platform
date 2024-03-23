import axios from "axios";
import { getAuthInfo } from "../../../util/AuthUtil";
const API_URL = process.env.REACT_APP_REAL_API_BASE_URL;

const accessToken = getAuthInfo()?.accessToken || "";
const refreshToken = getAuthInfo()?.refreshToken || "";

export async function GetArtworksData(pageSize: number, pageNumber: number, accountId: string) {
  try {
    const response = await axios.get(
      `${API_URL}/accounts/${accountId}/artworks`,
      {
        params: {
          sortColumn: "create",
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
      console.log("Error fetching artworks data");
      return [];
    }
    return response.data;
  } catch (error) {
    console.log("Error fetching artworks data:", accountId);
    return [];
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

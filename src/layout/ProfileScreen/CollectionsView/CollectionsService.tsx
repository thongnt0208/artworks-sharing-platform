import axios from "axios";
import { getAuthInfo } from "../../../util/AuthUtil";
const API_URL = process.env.REACT_APP_REAL_API_BASE_URL;

const accessToken = getAuthInfo()?.accessToken || "";
const refreshToken = getAuthInfo()?.refreshToken || "";

export async function GetCollectionsData(account_id: string) {
  try {
    const response = await axios.get(
      `${API_URL}/account/${account_id}/collections`,
      {
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
    console.log("Success fetching collection data", response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching artworks data:", error);
    return [];
  }
}

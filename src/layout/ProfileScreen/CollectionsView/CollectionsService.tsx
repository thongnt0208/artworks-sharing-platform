import axios from "../../../hooks/useAxios";

export async function GetCollectionsData(account_id: string) {
  try {
    const response = await axios.get(
      `/account/${account_id}/collections`
    );
    if (response.status !== 200) {
      console.log("Error fetching artworks data");
      return [];
    }
    return response.data;
  } catch (error) {
    console.log("Error fetching artworks data:", error);
    return [];
  }
}

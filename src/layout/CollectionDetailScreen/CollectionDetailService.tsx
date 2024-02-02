import axios from "axios";
const API_URl = process.env.REACT_APP_REAL_API_BASE_URL;

export async function GetCollectionData(collectionId: string) {
  try {
    const response = await axios.get(
      `${API_URl}/collections/${collectionId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 200) {
      console.log("Error fetching tags data");
      return [];
    }
    return response.data;
  } catch (error) {
    console.log("Error fetching tags data:", error);
    return [];
  }
}
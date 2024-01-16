import axios from "axios";
export async function GetArtworksData(collectionId: string) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:1880/collection/${collectionId}/artworks`,
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

export async function GetCollectionData(collectionId: string) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:1880/collection/${collectionId}`,
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

import axios from "axios";

export async function GetRecommendArtworksData() {
  try {
    const response = await axios.get("http://127.0.0.1:1880/recommend-artworks", {
      headers: {
        "Content-Type": "application/json",
      },
    });
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

export async function GetTagsData() {
  try {
    const response = await axios.get("http://127.0.0.1:1880/tags", {
      headers: {
        "Content-Type": "application/json",
      },
    });
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

export async function GetCreatorsData() {
  try {
    const response = await axios.get("http://127.0.0.1:1880/account", {
      headers: {
        "Content-Type": "application/json",
      },
    });
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

import axios from "axios";
const API_URL = process.env.REACT_APP_REAL_API_BASE_URL;

export async function GetTagsData() {
  try {
    const response = await axios.get(`${API_URL}/tags`, {
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

export async function GetCategoriesData() {
  try {
    const response = await axios.get(`${API_URL}/categories`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      console.log("Error fetching categories data");
      return [];
    }
    return response.data;
  } catch (error) {
    console.log("Error fetching categories data:", error);
    return [];
  }
}

export async function GetNewArtworksData(pageNumber: number, pageSize: number) {
  try {
    const response = await axios.get(`${API_URL}/artworks`, {
      params: {
        pageNumber,
        pageSize,
      },
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

export async function GetFollowingArtworksData(pageNumber: number, pageSize: number) {
  try {
    const response = await axios.get(`${API_URL}/artworks`, {
      params: {
        pageNumber,
        pageSize,
      },
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

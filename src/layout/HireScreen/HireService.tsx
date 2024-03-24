import axios from "axios";
import { axiosPrivate } from "../../hooks/useAxios";
const API_URL = process.env.REACT_APP_REAL_API_BASE_URL;

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

export async function GetCreatorsData(pageNumber: number, pageSize: number) {
  try {
    const response = await axiosPrivate.get(`${API_URL}/accounts`, {
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
    console.log("Creators data:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching artworks data:", error);
    return [];
  }
}
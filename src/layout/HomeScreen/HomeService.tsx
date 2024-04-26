import axios from "axios";
import { axiosPrivate } from "../../hooks/useAxios";
import { ArtworkProps } from "../../components/ArtworkCard";
const API_URL = process.env.REACT_APP_REAL_API_BASE_URL;

/**
 * Fetches tags data from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of tags data.
 * @author AnhDh
 * @version 1.0.0
 */
export async function GetTagsData(): Promise<Array<any>> {
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

/**
 * Fetches categories data from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of category data.
 * @author AnhDh
 * @version 1.0.0
 */
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

/**
 * Fetches new artworks data from the server.
 *
 * @param pageNumber - The page number of the artworks data to fetch.
 * @param pageSize - The number of artworks per page.
 * @returns An array of ArtworkProps representing the new artworks data.
 * @author AnhDh
 * @version 1.0.0
 */
export async function GetNewArtworksData(pageNumber: number, pageSize: number) {
  try {
    const response = await axios.get(`${API_URL}/artworks`, {
      params: {
        pageNumber,
        pageSize,
        sortColumn: "create",
        sortOrder: "desc",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      console.log("Error fetching artworks data");
      return [];
    } else {
      let newArtworksData: ArtworkProps[] = [];
      if (Array.isArray(response.data.items)) {
        newArtworksData = response.data.items.map((artwork: any) => ({
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

      return newArtworksData;
    }
  } catch (error) {
    console.log("Error fetching artworks data:", error);
    return [];
  }
}

/**
 * Retrieves the data of following artworks from the server.
 * @param pageNumber - The page number of the artworks to retrieve.
 * @param pageSize - The number of artworks per page.
 * @returns An array of following artworks data.
 * @author AnhDh
 * @version 1.0.0
 */
export async function GetFollowingArtworksData(
  pageNumber: number,
  pageSize: number
) {
  try {
    const response = await axiosPrivate.get(`${API_URL}/artworks/followings`, {
      params: {
        pageNumber,
        pageSize,
        sortColumn: "create",
        sortOrder: "desc",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      console.log("Error fetching artworks data");
      return [];
    } else {
      let followingArtworksData: ArtworkProps[] = [];
      if (Array.isArray(response.data.items)) {
        followingArtworksData = response.data.items.map((artwork: any) => ({
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
      return followingArtworksData;
    }
  } catch (error) {
    console.log("Error fetching artworks data:", error);
    return [];
  }
}

import axios from "axios";
const API_URl = process.env.REACT_APP_REAL_API_BASE_URL;
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

type Artwork = {
  id: string;
  title: string;
  createdBy: string;
  creatorFullName: string;
  thumbnail: string;
  likeCount: number;
  viewCount: number;
};

type CollectionProps = {
  id: string;
  creatorFullName: string;
  collectionName: string;
  privacy: string;
  numberOfArtworks: number;
  accountAvatar?: string;
  artworks: Artwork[]; 
};

export async function GetCollectionData(collectionId: string) {
  try {
    const response = await axios.get(
      `${API_URl}/collections/${collectionId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken || refreshToken}`,
        },
      }
    );
    if (response.status !== 200) {
      console.log("Error fetching collection data");
      return { artworks: [] };
    }

    const artworks: Artwork[] = (response.data.artworks || []).map(
      (artworkData: { artwork: Artwork }) => artworkData.artwork
    );
    const collection: CollectionProps = {
      id: response.data.id,
      creatorFullName: response.data.createdBy.username,
      collectionName: response.data.collectionName,
      privacy: response.data.privacy,
      numberOfArtworks: response.data.artworks.length,
      accountAvatar: response.data.createdBy.avatar,
      artworks: artworks,
    };

    return { collection, artworks };
  } catch (error) {
    console.log("Error fetching collection data:", error);
    return { artworks: [] };
  }
}
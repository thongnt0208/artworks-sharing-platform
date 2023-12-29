import axios from "axios";

export async function GetArtworksData() {
    try {
      const response = await axios.get("http://127.0.0.1:1880/artworks", {
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
import axios from "axios";
// import axios from "../../api/axios";

export async function fetchArtworkDetail(id: string | undefined): Promise<any> {
  try {
    const response = await axios.get(`http://127.0.0.1:1880/artwork/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching artwork:", error);
    throw new Error(`Error fetching artwork: ${error}`);
  }
}

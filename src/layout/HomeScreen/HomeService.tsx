import axios from "axios";

export async function GetTagsData() {
  const response = await axios.get("http://127.0.0.1:1880/tags", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status!== 200) {
    console.log("Error fetching tags data");
    return [];
  }
  return response.data;
}

export async function GetCategoriesData() {
  const response = await axios.get("http://127.0.0.1:1880/categories", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status!== 200) {
    console.log("Error fetching tags data");
    return [];
  }
  return response.data;
}

export async function GetArtworksData() {
  const response = await axios.get("http://127.0.0.1:1880/artworks", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status!== 200) {
    console.log("Error fetching artworks data");
    return [];
  }
  console.log("Data ne: " + response.data);
  return response.data;
}
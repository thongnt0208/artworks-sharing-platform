import axios from "axios";

// FILEPATH: /home/hoanganh/Documents/Capstone Project/artworks-sharing-platform/src/layout/ProfileScreen/ProfileService.tsx
export async function GetProfileData() {
  const response = await axios.get(
    "http://127.0.0.1:1880/profile/01HHK4VBHRZYBKTDDWT0FXWRZ2",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status!== 200) {
    console.log("Error fetching tags data");
    return {};
  }
  return response.data;
}

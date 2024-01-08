import axios from "axios";

export async function GetServicesData() {
    try {
      const response = await axios.get("http://127.0.0.1:1880/account/:id/service", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        console.log("Error fetching artworks data");
        return [];
      }
      console.log("Success fetching artworks data", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching artworks data:", error);
      return [];
    }
  }
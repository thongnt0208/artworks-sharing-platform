import axios from "axios";

export async function GetProfileData() {
    try {
        const response = await axios.get("http://127.0.0.1:1880/account/:id", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status !== 200) {
            console.log("Error fetching profile data");
            return [];
        }
        console.log("Profile data:", response.data);
        return response.data;
    }
    catch (error) {
        console.log("Error fetching profile data:", error);
        return [];
    }
}
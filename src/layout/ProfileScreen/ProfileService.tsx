import axios from "axios";

export async function GetProfileData() {
    try {
        const response = await axios.get("http://127.0.0.1:1880/profile/:id", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status !== 200) {
            console.log("Error fetching profile data");
            return [];
        }
        return response.data;
    }
    catch (error) {
        console.log("Error fetching profile data:", error);
        return [];
    }
}
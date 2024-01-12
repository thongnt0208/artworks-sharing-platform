import axios from "axios";

export async function GetProfileData(accountId: string) {
    console.log("Fetching profile data...", accountId);
    try {
        const response = await axios.get(`http://127.0.0.1:1880/account/${accountId}`, {
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
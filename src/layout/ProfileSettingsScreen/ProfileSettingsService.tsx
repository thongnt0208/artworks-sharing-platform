import axios from "axios";
import { getAuthInfo } from "../../util/AuthUtil";
const API_URL = process.env.REACT_APP_REAL_API_BASE_URL;

const accessToken = getAuthInfo()?.accessToken || "";
const refreshToken = getAuthInfo()?.refreshToken || "";

export async function GetProfileData(accountId: string) {
    try {
        const response = await axios.get(`${API_URL}/accounts/${accountId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken || refreshToken}`,
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
import axios from "axios";
import { UserInformationProps } from "../../components/UserInformationCard";
const API_URL = process.env.REACT_APP_REAL_API_BASE_URL;

export async function GetCreatorsData(
  pageNumber: number,
  pageSize: number
): Promise<UserInformationProps[]> {
  try {
    const response = await axios.get(`${API_URL}/accounts/hire`, {
      params: {
        pageNumber,
        pageSize,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    let creatorsData: UserInformationProps[] = response.data.items;
    return creatorsData; 
  } catch (error) {
    throw error;
  }
}

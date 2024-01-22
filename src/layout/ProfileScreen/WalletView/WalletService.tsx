import axios from "axios";

export async function GetWalletData(accountId: string) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:1880/account/${accountId}/wallet`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 200) {
      console.log("Error fetching profile data");
      return [];
    }
    console.log("Success fetching wallet data", response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching profile data:", error);
    return [];
  }
}

export async function GetWalletHistoryData(accountId: string) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:1880/account/${accountId}/wallet-history`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 200) {
      console.log("Error fetching profile data");
      return [];
    }
    console.log("Success fetching wallet history data", response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching profile data:", error);
    return [];
  }
}

export async function GetTransactionHistoryData(accountId: string) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:1880/account/${accountId}/transaction`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 200) {
      console.log("Error fetching profile data");
      return [];
    }
    return response.data;
  } catch (error) {
    console.log("Error fetching profile data:", error);
    return [];
  }
}

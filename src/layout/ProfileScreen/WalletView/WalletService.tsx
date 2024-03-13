import axios from "axios";
// import { getAuthInfo } from "../../../util/AuthUtil";
import { axiosPrivate } from "../../../hooks/useAxios";
const API_URL = process.env.REACT_APP_REAL_API_BASE_URL;

// const accessToken = getAuthInfo()?.accessToken || "";
// const refreshToken = getAuthInfo()?.refreshToken || "";

/**
 *
 * Retrieves wallet data for a given account ID.
 *
 * @param accountId - The ID of the account.
 * @returns A promise that resolves to the wallet data.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetWalletData(accountId: string) {
  try {
    const response = await axiosPrivate.get(
      `${API_URL}/account/${accountId}/wallets`
    );
    if (response.status !== 200) {
      console.log("Error fetching profile data");
      return {};
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

/**
 * Deposits coins into the user's wallet.
 * 
 * @param amount - The amount of coins to deposit.
 * @param redirectUrl - The URL to redirect to after the deposit is completed.
 * @returns A boolean indicating whether the deposit was successful.
 * @param AnhDH
 * @version 1.0.0
 */
export async function DepositCoins(amount: number, redirectUrl: string) {
  try {
    const response: any = await axiosPrivate.post(`${API_URL}/payments`, {
      amount: amount,
      item: "[{}]",
      embedData: `{"preferred_payment_method": [], "redirecturl": "${redirectUrl}"}`,
    });
    if (response.status !== 200) {
      console.log("Error fetching profile data");
      return {};
    }
    return response.data;
  } catch (error) {
    console.log("Error fetching profile data:", error);
    return error;
  }
}

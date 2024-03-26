import axios from "axios";
import { axiosPrivate } from "../../../hooks/useAxios";
import { AccountVerificationData } from "./WithdrawCoin/WithdrawCoin";
const API_URL = process.env.REACT_APP_REAL_API_BASE_URL;
const WS_API_URL = process.env.REACT_APP_WS_API_BASE_URL;

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
      return {};
    }
    return response.data;
  } catch (error) {
    return [];
  }
}

/**
 *
 * Retrieves the wallet history data for a given account ID.
 *
 * @param accountId - The ID of the account.
 * @returns A promise that resolves to the wallet history data.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetWalletHistoryData(accountId: string) {
  try {
    const response = await axiosPrivate.get(
      `${API_URL}/account/${accountId}/wallet-histories`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 200) {
      return [];
    }
    return response.data;
  } catch (error) {
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
      return [];
    }
    return response.data;
  } catch (error) {
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
      return {};
    }
    return response.data;
  } catch (error) {
    return error;
  }
}



/**
 *
 * Retrieves the query order information for a given application transaction ID.
 *
 * @param appTransId - The application transaction ID.
 * @returns A Promise that resolves to the query order data, or an empty object if the response status is not 200.
 * If an error occurs, the Promise will reject with the error object.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetQueryOrder(appTransId: string) {
  try {
    const response = await axiosPrivate.get(
      `${WS_API_URL}/payments/query-order/${appTransId}/ws`
    );
    if (response.status !== 200) {
      return {};
    }
    return response.data;
  } catch (error) {
    return error;
  }
}

/**
 *
 * Verifies a ZaloPay account using the provided phone number.
 *
 * @param phoneNumber - The phone number associated with the ZaloPay account.
 * @returns A Promise that resolves to the response data if the verification is successful, or an empty object if the response status is not 200.
 * @author AnhDH
 * @version 1.0.0
 */
export async function VerifyZaloPayAccount(
  phoneNumber: string
): Promise<AccountVerificationData> {
  try {
    console.log("VerifyZaloPayAccount", phoneNumber);
    
    const response = await axiosPrivate.post(
      `${API_URL}/payments/query-account`,
      { phone: phoneNumber }
    );
    return {
      returnCode: response.data.returnCode,
      returnMessage: response.data.returnMessage,
      subReturnCode: response.data.subReturnCode,
      subReturnMessage: response.data.subReturnMessage,
      data: {
        referenceId: response.data.data.referenceId,
        muId: response.data.data.muId,
        name: response.data.data.name,
        phone: response.data.data.phone,
      },
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Updates the wallet information for a given phone number.
 * @param phoneNumber - The phone number associated with the wallet.
 * @returns A Promise that resolves to a boolean indicating whether the wallet information was successfully updated.
 * @throws An error if the wallet information update fails.
 * @param AnhDH
 * @version 1.0.0
 */
export async function UpdateWalletInformation(phoneNumber: string){
  try {
    const response = await axiosPrivate.post(`${API_URL}/payments/query-account`, {
      phone: phoneNumber,
    });
    if (response.status !== 200) {
      return false;
    }
    return true;
  } catch (error) {
    throw new Error("Failed to update wallet information.");
  }
}

/**
 * Withdraws coins from the wallet.
 * @param amount - The amount of coins to withdraw.
 * @param muId - The user's muId.
 * @param phone - The user's phone number.
 * @param referenceId - The reference ID for the withdrawal.
 * @returns A Promise that resolves to the response data if successful, or an empty object if there was an error.
 */
export async function WithdrawCoins(
  amount: number,
  muId: string,
  phone: string,
  referenceId: string
) {
  try {
    const response = await axiosPrivate.post(`${API_URL}/payments/topup`, {
      amount,
      muId,
      phone,
      referenceId,
    });
    if (response.status !== 200) {
      return {};
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}
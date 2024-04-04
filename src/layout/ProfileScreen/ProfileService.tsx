import axios, { axiosPrivate } from "../../hooks/useAxios";

/**
 *
 * Retrieves profile data for a given account ID.
 *
 * @param accountId - The ID of the account to retrieve profile data for.
 * @returns A Promise that resolves to the profile data, or an empty array if there was an error.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetProfileData(accountId: string) {
  try {
    const response = await axios.get(`/accounts/${accountId}`);
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
 *
 * Sends a request message to a receiver.
 *
 * @param receiverId - The ID of the message receiver.
 * @param text - The content of the message.
 * @returns A Promise that resolves to the response data if the request is successful, otherwise an empty object.
 * @author AnhDH
 * @version 1.0.0
 */
export async function SendRequestMessage(receiverId: string, text: string) {
  try {
    const response = await axiosPrivate.post(`/messages`, {
      receiverId,
      text,
    });
    if (response.status !== 200) {
      console.log("Error sending request message");
      return {};
    }
    return response.data;
  } catch (error) {
    console.log("Error sending request message:", error);
  }
}

export async function GetIsFollowed(accountId: string) {
  try {
    const response = await axiosPrivate.get(`/follows/is-existed${accountId}`);
    if (response.status !== 200) {
      return response;
    }
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function FollowUser(accountId: string) {
  try {
    const response = await axiosPrivate.post("/follows", {
      followedId: accountId,
    });
    if (response.status !== 200) {
      console.log("Error following user");
      return {};
    }
    return response.data;
  } catch (error) {
    console.log("Error following user:", error);
  }
}

export async function UnfollowUser(accountId: string) {
  try {
    const response = await axiosPrivate.delete("/follows", {
      data: {
        followedId: accountId,
      },
    });
    if (response.status !== 200) {
      console.log("Error unfollowing user");
      return {};
    }
    return response.data;
  } catch (error) {
    console.log("Error unfollowing user:", error);
  }
}

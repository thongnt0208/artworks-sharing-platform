import { axiosPrivate } from "../../hooks/useAxios";

/**
 * Retrieves the profile data for a given account ID.
 * @param accountId - The ID of the account.
 * @returns A Promise that resolves to the profile data.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetProfileData(accountId: string) {
  try {
    const response = await axiosPrivate.get(`/accounts/${accountId}`);
    if (response.status !== 200) {
      return [];
    }
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function UpdateProfileData(accountId: string, data: any): Promise<any> {
  try {
    const response = await axiosPrivate.put(`/accounts/${accountId}`, data);
    if (response.status !== 200) {
      return [];
    }
    return response.data;
  } catch (error) {
    throw new Error("Cập nhật thông tin thất bại. Vui lòng thử lại sau.");
  }
}

export async function UpdateProfileAvatar(accountId: string, avatar: File): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);
    const response = await axiosPrivate.put(`/accounts/${accountId}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status !== 200) {
      return [];
    }
    return response.data;
  } catch (error) {
    throw new Error("Cập nhật ảnh đại diện thất bại. Vui lòng thử lại sau.");
  }
}

export async function UpdatePassword(accountId: string, data: any): Promise<any> {
  try {
    const response = await axiosPrivate.put(`/accounts/${accountId}/password`, data);
    if (response.status !== 200) {
      return [];
    }
    return response.data;
  } catch (error) {
    throw new Error("Cập nhật thông tin thất bại. Vui lòng thử lại sau.");
  }
}

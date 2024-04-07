import { getFromLS, saveToLS } from "./LocalStorageUtils";

export type authInfoDataType = {
  id: string;
  username: string;
  email: string;
  fullname: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
  role: string[] | string;
  aTExp: number;
};

/**
 * Save auth data to local storage
 *
 * @description This function saves data of logged-in user to local storage
 * @param data - The data to be saved
 * @returns boolean
 * @example
 * setAuthData({id: "t001", username: "thongnt"});
 * @author ThongNT
 * @version 1.0.0
 */
const setAuthInfo = (data: authInfoDataType): boolean => {
  return saveToLS("authData", data);
};

/**
 * Update the access token in local storage
 *
 * @description This function updates the access token for the logged-in user in local storage
 * @param accessToken - The new access token to be set
 * @returns boolean
 * @example
 * setNewAccessToken("accessToken");
 * @author ThongNT
 * @version 1.0.0
 */
const setNewAccessToken = (accessToken: string) => {
  const authData = getFromLS("authData");
  authData.accessToken = accessToken;
  return saveToLS("authData", authData);
};

/**
 * Retrieve authentication information from local storage
 *
 * @description This function retrieves the authentication information of the logged-in user from local storage
 * @returns
 * {
 *  id: string;
 *  username: string;
 *  email: string;
 *  fullname: string;
 *  accessToken: string;
 *  refreshToken: string;
 *  role: string[] | string;
 *  aTExp: number;
 * }
 * @example
 * getAuthInfo();
 * @author ThongNT
 * @version 1.1.0
 */
const getAuthInfo = (): authInfoDataType => {
  return getFromLS("authData");
};

/**
 * Remove authentication information from local storage
 *
 * @description This function removes the authentication information of the logged-in user from local storage
 * @returns void
 * @example
 * removeAuthInfo();
 * @author ThongNT
 * @version 1.0.0
 */
const removeAuthInfo = () => {
  localStorage.removeItem("authData");
};

export { setAuthInfo, setNewAccessToken, getAuthInfo, removeAuthInfo };

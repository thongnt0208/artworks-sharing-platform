import axios, { axiosPrivate } from "../hooks/useAxios";

/**
 * Login function
 *
 * @param username string - Username
 * @param password string - Password
 * @example
 * @description This function will be used to login the user
 * @returns Promise<any>
 * @author ThongNT
 * @version 1.0.0
 */
export async function login(username: string, password: string) {
  try {
    let response = await axios.post(
      "/auth/login",
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    return response;
  } catch (error: any) {
    throw new Error(error);
  }
}

/**
 * Logout function
 *
 * @example
 * @description This function will be used to logout the user from server
 * @returns Promise<any>
 * @author ThongNT
 * @version 1.0.0
 */
export async function logout() {
  try {
    let response = await axiosPrivate.post(
      "/auth/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {    
    throw new Error(error);
  }
}

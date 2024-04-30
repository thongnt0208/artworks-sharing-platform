import axios from "../hooks/useAxios";

/**
 * Login function
 *
 * @param username string - Username
 * @param password string - Password
 * @example
 * @description This function will be used to login the user
 * @returns Promise<any>
 * @author @thongnt0208
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

    return response;
  } catch (error: any) {
    throw error;
  }
}

/**
 * This function will be used to login the user with Google
 * 
 * @param token - the credential token from Google
 * @returns Promise<any>
 * @author @thongnt0208
 */
export async function loginWithGoogle(token: string) {
  try {
    let response = await axios.post("/auth/login-google", {
      idToken: token,
    });

    return response;
  } catch (error: any) {
    throw error;
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
export async function logout(accessToken: string) {
  try {
    let response = await axios.post(
      "/auth/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  } catch (error: any) {
    console.log(error);

    throw new Error(error);
  }
}

/**
 * Registers a new user
 *
 * @param formData - An object containing user registration data.
 * @returns A Promise.
 * @example
 * // Usage example:
 * const registrationData = {
 *   username: "test",
 *   password: "12345678",
 *   confirmPassword: "12345678",
 *   email: "test@generator.com",
 *   fullname: "Test Test",
 *   birthdate: "1990-01-01",
 * };
 * try {
 *   const isSuccess = await register(registrationData);
 *   if (isSuccess) {
 *     console.log('User registration successful!');
 *   } else {
 *     console.log('User registration failed.');
 *   }
 * } catch (error) {
 *   console.error('Error during user registration:', error.message);
 * }
 * @author ThongNT
 * @version 1.0.0
 */
export async function register(formData: any) {
  try {
    const response = await axios.post("/auth/register", formData);
    return response;
  } catch (error: any) {
    console.log(error);
    return error;
  }
}

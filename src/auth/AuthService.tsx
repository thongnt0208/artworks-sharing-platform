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
export function login(username: string, password: string): Promise<any> {
  return fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res: any) => {
      if (res.token) {
        let fetched_token: string = res.token;
        return fetched_token;
      }
    })
    .catch((err) => {
      throw new Error(err);
    });
}

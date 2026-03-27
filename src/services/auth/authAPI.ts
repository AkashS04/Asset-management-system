import { apiClient } from "../apiClient";
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};
export const LoginAPI = async (email: string, password: string) => {
  const res = await apiClient.get<User[]>("/users", {
    params: {
      email,
      password,
    },
  });
  const users = res.data;
  console.log("Login Response:", users);

  // if (users.length == 0) {
  //   throw new Error("Invalid Credentials");
  // }

  const accessToken = "fake-token-" + Date.now();
  const refreshToken = "fake-refresh-" + Date.now();

  const expiry = Date.now() + 150000;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("expiry", expiry.toString());

  return {
    users: {
      id: "1",
      name: "Admin",
      email: "admin@example.com",
      password: "123456",
      role: "Admin",
    },

    token: accessToken,
  };
};

import { apiClient } from "../apiClient";
export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type LoginResult={
user:User;
token: string
}
export const LoginAPI = async (email: string, password: string): Promise<LoginResult> => {
  const { data } = await apiClient.get<(User & { password: string })[]>("/users");

  const user = data.find(
    (u) => u.email === email.trim() && u.password === password
  );

  if (!user) throw new Error("Invalid Credentials");

  const accessToken = "fake-token-" + Date.now();
  const refreshToken = "fake-refresh-" + Date.now();

  const expiry = Date.now() + 150000;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("expiry", expiry.toString());

  const { password: _, ...safeUser } = user;
  return { user: safeUser, token: accessToken };
};

import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  
  if (config.url === "/users") return config;

  const token = localStorage.getItem("accessToken");
  const expiry = localStorage.getItem("expiry");

  if (expiry && Date.now() > Number(expiry)) {
    console.log("Token expired");

    localStorage.clear();
    window.location.href = "/login";

    return Promise.reject("Token expired");
  }

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized");

      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});
const PUBLIC_URLS = ["/users"];
apiClient.interceptors.request.use((config) => {
  if (PUBLIC_URLS.some((url) => config.url?.includes(url))) return config;

  const expiry = localStorage.getItem("expiry");

  if (expiry && Date.now() > Number(expiry)) {

    if (!window.__AUTH_EXPIRED__) {
      window.__AUTH_EXPIRED__ = true;

      localStorage.clear();
      window.dispatchEvent(new Event("auth:expired"));
    }

     return Promise.reject(new Error("Token expired"));
  }

  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized");

      if (!window.__AUTH_EXPIRED__) {
        window.__AUTH_EXPIRED__ = true;

        localStorage.clear();
        window.dispatchEvent(new Event("auth:expired"));
      }
    }

    return Promise.reject(error);
  },
);

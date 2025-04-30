import axios from "axios";
import userService from "./UserService";
import { toast } from "react-toastify";

const API_GATEWAY_URL = "http://localhost:8091";

const API = axios.create({
  baseURL: API_GATEWAY_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onTokenRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("🔴 API Error Detected:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      responseData: error.response?.data,
    });

    if (!error.response) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // 🔐 Handle 401 Unauthorized (attempt token refresh)
    if (error.response.status === 401) {

      if (originalRequest._retry) {
        userService.logout();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await userService.refreshToken();
          isRefreshing = false;
          onTokenRefreshed();
        } catch (refreshError) {
          isRefreshing = false;
          refreshSubscribers = [];
          toast.error("Session expired. Please log in again.");
          userService.logout();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh(() => {
          resolve(API(originalRequest));
        });
      });
    }

    // 🔒 Handle 403 Forbidden
    if (error.response.status === 403) {
      const message = error.response?.data?.message || error.response?.data?.error || "Access denied.";

      const isBusiness403 =
        message.includes("Only SUPERADMIN") ||
        message.includes("permission") ||
        message.includes("not allowed") ||
        message.includes("access denied");

      if (isBusiness403) {
        return Promise.reject(error);
      }

      toast.error("Your session has expired.");
      userService.logout();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // 💥 Handle 500 Internal Server Error
    if (error.response.status === 500) {
      toast.error("🔥 Server error occurred. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default API;

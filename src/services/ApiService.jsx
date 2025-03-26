import axios from "axios";
import userService from "./UserService";

const API_GATEWAY_URL = "http://localhost:8091"; // Use API Gateway for all requests

const API = axios.create({
    baseURL: API_GATEWAY_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, 
});

let isRefreshing = false;
let refreshSubscribers = [];

// Function to add subscribers to re-execute failed requests
const subscribeTokenRefresh = (callback) => {
    refreshSubscribers.push(callback);
};

// Notify subscribers that token has been refreshed
const onTokenRefreshed = () => {
    refreshSubscribers.forEach((callback) => callback());
    refreshSubscribers = [];
};

// ✅ Improved Global Error Handling
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
            console.error("⚠️ Network Error: Server unreachable.");
            return Promise.reject(error);
        }

        const originalRequest = error.config;

        // 🔴 Handle 401: Unauthorized (Token Expired)
        if (error.response.status === 401) {
            console.warn("🛑 Unauthorized request. Attempting token refresh...");

            if (originalRequest._retry) {
                console.warn("🔄 Token refresh retry failed. Logging out.");
                userService.logout();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    console.log("🔄 Refreshing token...");
                    await userService.refreshToken();
                    isRefreshing = false;
                    console.log("✅ Token refreshed.");

                    onTokenRefreshed();
                } catch (refreshError) {
                    isRefreshing = false;
                    refreshSubscribers = [];

                    console.error("⛔ Token refresh failed:", {
                        status: refreshError.response?.status,
                        responseData: refreshError.response?.data,
                    });

                    userService.logout();
                    window.location.href = "/login"; // Redirect immediately
                    return Promise.reject(refreshError);
                }
            }

            return new Promise((resolve) => {
                subscribeTokenRefresh(() => {
                    resolve(API(originalRequest));
                });
            });
        }

        // 🔴 Handle 403: Forbidden (Session Expired)
        if (error.response.status === 403) {
            console.error("🚨 Session expired. Logging out.");
            userService.logout();
            window.location.href = "/login"; // Immediate redirect
            return Promise.reject(error);
        }

        // 🔴 Handle 500: Internal Server Error
        if (error.response.status === 500) {
            console.error("🚨 Server Error:", error.response.data);
        }

        return Promise.reject(error);
    }
);

export default API;

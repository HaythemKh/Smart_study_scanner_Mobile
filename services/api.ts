import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import { getToken } from "../utils/secureStorage";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.0.230:3000/api";

/**
 * Simple API Client with automatic token injection
 */
class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Add token to requests
    this.client.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!error.response) {
          throw new Error("Network error. Check your connection.");
        }

        const { status, data } = error.response;
        const message = data?.message || `Request failed (${status})`;

        console.error(`[API] Error ${status}:`, message);
        throw new Error(message);
      },
    );
  }

  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(endpoint, config);
    return response.data;
  }

  async post<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.post<T>(endpoint, data, config);
    return response.data;
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.patch<T>(endpoint, data, config);
    return response.data;
  }

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(endpoint, config);
    return response.data;
  }

  // Public endpoint (no token)
  async postPublic<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await axios.post<T>(`${API_URL}${endpoint}`, data, {
      ...config,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
        ...config?.headers,
      },
    });
    return response.data;
  }
}

export const api = new ApiClient(API_URL);

// Types
interface GoogleLoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    fullName: string | null;
    avatarUrl: string | null;
    role: string;
    level: number;
    xp: number;
    streak: number;
  };
}

interface User {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  role: string;
  level: number;
  xp: number;
  streak: number;
}

// API endpoints
export const authApi = {
  googleLogin: (googleToken: string) =>
    api.postPublic<GoogleLoginResponse>("/auth/google", { googleToken }),
};

export const userApi = {
  getProfile: () => api.get<User>("/users/me"),
  updateProfile: (data: { fullName?: string; avatarUrl?: string }) =>
    api.patch<User>("/users/me", data),
};

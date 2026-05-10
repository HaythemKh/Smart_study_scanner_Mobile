import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

import { authApi, userApi } from "../services/api";
import {
  clearAuth,
  getToken,
  storeToken,
  storeUser,
} from "../utils/secureStorage";

// Types
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

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  // Configure Google Sign-In on mount
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    });
    checkAuth();
  }, []);

  // Handle navigation based on auth state
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/sign-in");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)/chat");
    }
  }, [user, segments, isLoading, router]);

  // Check if user is already authenticated
  const checkAuth = async () => {
    try {
      const token = await getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Validate token with backend
      const userData = await userApi.getProfile();
      setUser(userData);
      await storeUser(userData);
    } catch (error) {
      console.log("[Auth] Token invalid, clearing");
      await clearAuth();
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with Google
  const signIn = async () => {
    try {
      setIsLoading(true);

      await GoogleSignin.hasPlayServices();
      const { data } = await GoogleSignin.signIn();

      const idToken = data?.idToken;
      if (!idToken) {
        throw new Error("No ID token from Google");
      }

      // Send to backend
      const response = await authApi.googleLogin(idToken);

      // Store securely
      await storeToken(response.accessToken);
      await storeUser(response.user);

      setUser(response.user);
    } catch (error: any) {
      // Handle cancellation gracefully
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setIsLoading(false);
        return;
      }

      await GoogleSignin.signOut().catch(() => {});
      await clearAuth();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.signOut();
      await clearAuth();
      setUser(null);
    } catch (error) {
      console.error("[Auth] Sign out error:", error);
      await clearAuth();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    try {
      const userData = await userApi.getProfile();
      await storeUser(userData);
      setUser(userData);
    } catch (error) {
      console.log("[Auth] Refresh failed, signing out");
      await signOut();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

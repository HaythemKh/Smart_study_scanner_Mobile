import * as SecureStore from "expo-secure-store";

/**
 * Simple Secure Storage Utility
 * Uses iOS Keychain / Android Keystore for secure token storage
 */

const KEYS = {
  ACCESS_TOKEN: "access_token",
  USER_DATA: "user_data",
} as const;

/**
 * Store access token securely
 */
export async function storeToken(token: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, token, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  } catch (error) {
    console.error("[Storage] Failed to store token:", error);
    throw error;
  }
}

/**
 * Get access token
 */
export async function getToken(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.error("[Storage] Failed to get token:", error);
    return null;
  }
}

/**
 * Store user data securely
 */
export async function storeUser(userData: any): Promise<void> {
  try {
    await SecureStore.setItemAsync(KEYS.USER_DATA, JSON.stringify(userData), {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  } catch (error) {
    console.error("[Storage] Failed to store user:", error);
    throw error;
  }
}

/**
 * Get user data
 */
export async function getUser<T = any>(): Promise<T | null> {
  try {
    const data = await SecureStore.getItemAsync(KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("[Storage] Failed to get user:", error);
    return null;
  }
}

/**
 * Clear all auth data
 */
export async function clearAuth(): Promise<void> {
  try {
    await Promise.all([
      SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN),
      SecureStore.deleteItemAsync(KEYS.USER_DATA),
    ]);
  } catch (error) {
    console.error("[Storage] Failed to clear auth:", error);
  }
}

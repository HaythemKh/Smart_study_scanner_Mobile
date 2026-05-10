import { Href, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function Index() {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    if (isAuthenticated && !inTabsGroup) {
      // User is authenticated but not in tabs → redirect to chat
      router.replace("/(tabs)/chat" as Href);
    } else if (!isAuthenticated && !inAuthGroup) {
      // User is not authenticated and not in auth flow → redirect to sign-in
      router.replace("/(auth)/sign-in" as Href);
    }
  }, [isAuthenticated, isLoading, segments]);

  return <View style={{ flex: 1, backgroundColor: "#09060F" }} />;
}

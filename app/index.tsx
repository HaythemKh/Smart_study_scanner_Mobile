import { Href, useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/(auth)/splash" as Href);
  }, [router]);

  return <View style={{ flex: 1, backgroundColor: "#09060F" }} />;
}

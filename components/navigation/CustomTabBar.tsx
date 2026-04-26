import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Clock, Library, MessageCircle, User } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const icons = {
    chat: MessageCircle,
    library: Library,
    history: Clock,
    profile: User,
  };

  const labels = {
    chat: "Chat",
    library: "Library",
    history: "History",
    profile: "Profile",
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const Icon = icons[route.name as keyof typeof icons];
          const label = labels[route.name as keyof typeof labels];

          const onPress = () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.7}
              style={styles.tab}
            >
              {isFocused ? (
                <LinearGradient
                  colors={["#6B4DE6", "#FF7A59"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.activeTab}
                >
                  <Icon
                    color="white"
                    size={24}
                    strokeWidth={2.5}
                    fill="white"
                  />
                  <Text style={styles.activeLabel}>{label}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.inactiveTab}>
                  <Icon color="#9CA3AF" size={24} strokeWidth={2.5} />
                  <Text style={styles.inactiveLabel}>{label}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "rgba(75, 54, 204, 0.15)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 10,
    width: "90%",
    maxWidth: 448,
    justifyContent: "space-around",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 999,
    gap: 2,
    shadowColor: "#6B4DE6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ scale: 1.1 }],
  },
  inactiveTab: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 2,
  },
  activeLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "white",
    fontFamily: "PlusJakartaSans_700Bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginTop: 2,
  },
  inactiveLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9CA3AF",
    fontFamily: "PlusJakartaSans_700Bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginTop: 2,
  },
});

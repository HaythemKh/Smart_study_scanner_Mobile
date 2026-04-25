import * as Haptics from "expo-haptics";
import { Tabs } from "expo-router";
import { Clock, Library, MessageCircle, User } from "lucide-react-native";
import { Platform, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const colors = {
  primary: "#6B4DE6",
  muted: "#6B6685",
  background: "#FAFAFC",
  card: "#FFFFFF",
};

function TabBarIcon({
  focused,
  Icon,
}: {
  focused: boolean;
  Icon: typeof MessageCircle;
}) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(focused ? 1.1 : 1) }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Icon
        size={24}
        color={focused ? colors.primary : colors.muted}
        strokeWidth={2.2}
      />
    </Animated.View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: "rgba(107,102,133,0.12)",
          height: Platform.OS === "ios" ? 88 : 64,
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 24 : 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          fontFamily: "PlusJakartaSans_600SemiBold",
        },
      }}
      screenListeners={{
        tabPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} Icon={MessageCircle} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} Icon={Library} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} Icon={Clock} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} Icon={User} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: "rgba(107,102,133,0.12)",
    height: Platform.OS === "ios" ? 88 : 64,
    paddingTop: 8,
  },
});

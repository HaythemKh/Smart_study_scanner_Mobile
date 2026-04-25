import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { useHaptic } from "../hooks/useHaptic";
import { radii, shadows } from "../theme/tokens";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type GradientKey = "hero" | "mint" | "sun" | "coral" | "grape";

const gradientColors: Record<GradientKey, [string, string, string?]> = {
  hero: ["#6B4DE6", "#C84DD9", "#FF7A59"],
  mint: ["#7EE8C9", "#6BC5F8"],
  sun: ["#FFD980", "#FFA94D"],
  coral: ["#FF9472", "#FF6B5C"],
  grape: ["#A36BFF", "#6B4DE6"],
};

interface GradientButtonProps {
  onPress: () => void;
  children: ReactNode;
  gradient?: GradientKey;
  disabled?: boolean;
  style?: ViewStyle;
  size?: "sm" | "md" | "lg";
}

export function GradientButton({
  onPress,
  children,
  gradient = "hero",
  disabled = false,
  style,
  size = "md",
}: GradientButtonProps) {
  const haptic = useHaptic();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 12, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  const handlePress = () => {
    haptic("medium");
    onPress();
  };

  const heights = { sm: 44, md: 52, lg: 60 };
  const fontSizes = { sm: 14, md: 16, lg: 18 };

  return (
    <AnimatedTouchable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={1}
      style={[animatedStyle, style]}
      accessibilityRole="button"
    >
      <LinearGradient
        colors={gradientColors[gradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradient,
          { height: heights[size], opacity: disabled ? 0.5 : 1 },
        ]}
      >
        {typeof children === "string" ? (
          <Text style={[styles.text, { fontSize: fontSizes[size] }]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </LinearGradient>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: radii.button,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    ...shadows.button,
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontFamily: "PlusJakartaSans_700Bold",
    letterSpacing: -0.3,
  },
});

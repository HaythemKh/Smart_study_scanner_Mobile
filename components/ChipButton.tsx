import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { useHaptic } from "../hooks/useHaptic";
import { colors, radii } from "../theme/tokens";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ChipButtonProps {
  onPress: () => void;
  children: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  variant?: "default" | "outline";
}

export function ChipButton({
  onPress,
  children,
  selected = false,
  disabled = false,
  style,
  variant = "default",
}: ChipButtonProps) {
  const haptic = useHaptic();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.92, { damping: 12, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  const handlePress = () => {
    haptic("light");
    onPress();
  };

  return (
    <AnimatedTouchable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={1}
      style={[
        animatedStyle,
        styles.chip,
        variant === "outline" && styles.chipOutline,
        selected && styles.chipSelected,
        disabled && styles.chipDisabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      {typeof children === "string" ? (
        <Text
          style={[
            styles.text,
            variant === "outline" && styles.textOutline,
            selected && styles.textSelected,
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.card,
    borderRadius: radii.button,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  chipOutline: {
    backgroundColor: "transparent",
    borderColor: colors.muted,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipDisabled: {
    opacity: 0.4,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.foreground,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  textOutline: {
    color: colors.muted,
  },
  textSelected: {
    color: "#fff",
  },
});

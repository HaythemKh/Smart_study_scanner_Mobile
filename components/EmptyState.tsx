import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../theme/tokens";
import { GradientButton } from "./GradientButton";

interface EmptyStateProps {
  emoji: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  emoji,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionLabel && onAction && (
        <GradientButton onPress={onAction} style={styles.button}>
          {actionLabel}
        </GradientButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xxl * 2,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.foreground,
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.muted,
    fontFamily: "PlusJakartaSans_500Medium",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  button: {
    minWidth: 200,
  },
});

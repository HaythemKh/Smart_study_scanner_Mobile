// Reusable Badge component
import { StyleSheet, View } from "react-native";

export function Badge() {
  return <View style={styles.badge} />;
}

const styles = StyleSheet.create({
  badge: {
    padding: 8,
  },
});

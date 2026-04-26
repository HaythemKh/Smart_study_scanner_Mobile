// Reusable Card component
import { View, StyleSheet } from "react-native";

export function Card() {
  return <View style={styles.card} />;
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
  },
});

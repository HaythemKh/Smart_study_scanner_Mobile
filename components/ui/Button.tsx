// Reusable Button component
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export function Button() {
  return (
    <TouchableOpacity style={styles.button}>
      <Text>Button</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
  },
});

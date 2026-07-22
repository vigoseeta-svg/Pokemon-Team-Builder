import { StyleSheet, Text, View } from "react-native";

export default function EmptyState({ message }: { message: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>😕</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
});

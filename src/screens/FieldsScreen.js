import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FieldsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Field</Text>

      <View style={styles.card}>
        <Text style={styles.name}>City Arena</Text>
        <Text style={styles.desc}>5v5 • 2 km away</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.name}>Downtown Pitch</Text>
        <Text style={styles.desc}>5v5 • 4 km away</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
    padding: 24,
  },

  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "900",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#111827",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },

  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  desc: {
    color: "#9CA3AF",
    marginTop: 4,
  },
});


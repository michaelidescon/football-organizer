import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function FieldsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["#050816", "#0B1630", "#0A2A3F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Fields</Text>
        <Text style={styles.subtitle}>
          Here you can list and select available football fields.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 8,
  },
  subtitle: {
    color: "#CBD5F5",
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 320,
  },
});

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
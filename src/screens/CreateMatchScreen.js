import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export default function CreateMatchScreen({ route }) {
  const field = route?.params?.field;
  const fieldName = field?.name ?? "Selected field";

  const [playersNeeded, setPlayersNeeded] = useState("10");
  const [pricePerPlayer, setPricePerPlayer] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      {/* Background Gradient */}
      <LinearGradient
        colors={["#050816", "#0B1630", "#0A2A3F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Background glow effects */}
      <LinearGradient
        colors={["rgba(34,197,94,0.25)", "rgba(34,197,94,0)"]}
        style={[styles.glow, { top: -80, left: -60 }]}
      />

      <LinearGradient
        colors={["rgba(59,130,246,0.25)", "rgba(59,130,246,0)"]}
        style={[styles.glow, { bottom: -100, right: -70 }]}
      />

      <View style={styles.container}>
        <Text style={styles.kicker}>CREATE MATCH</Text>
        <Text style={styles.fieldName}>{fieldName}</Text>

        <BlurView intensity={30} tint="dark" style={styles.cardBlur}>
          <View style={styles.section}>
            <Text style={styles.label}>Match time</Text>
            <Text style={styles.placeholder}>
              Time picker coming soon (placeholder)
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Players needed</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={playersNeeded}
              onChangeText={setPlayersNeeded}
              placeholder="10"
              placeholderTextColor="#64748B"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Price per player (€)</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={pricePerPlayer}
              onChangeText={setPricePerPlayer}
              placeholder="e.g. 8"
              placeholderTextColor="#64748B"
            />
          </View>
        </BlurView>

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => {
            // Hook up match creation later
          }}
        >
          <Text style={styles.primaryButtonText}>Create Match</Text>
        </Pressable>
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

  glow: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 260,
  },

  kicker: {
    color: "#94A3B8",
    fontSize: 12,
    letterSpacing: 1.5,
    marginBottom: 4,
  },

  fieldName: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 20,
  },

  cardBlur: {
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.2)",
    backgroundColor: "rgba(15,23,42,0.4)",
    padding: 20,
    gap: 20,
  },

  section: {
    gap: 6,
  },

  label: {
    color: "#E5E7EB",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  placeholder: {
    color: "#9CA3AF",
    fontSize: 13,
  },

  input: {
    marginTop: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.35)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#F9FAFB",
    fontSize: 14,
    backgroundColor: "rgba(15,23,42,0.8)",
  },

  primaryButton: {
    marginTop: 28,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#22C55E",
  },

  primaryButtonText: {
    color: "#0F172A",
    fontWeight: "900",
    fontSize: 15,
  },

  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
});


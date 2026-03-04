import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export default function FieldDetailsScreen({ route, navigation }) {
  const field = route?.params?.field;

  const name = field?.name ?? "Unknown field";
  const meta = field?.meta ?? "";

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
        <Text style={styles.kicker}>FIELD DETAILS</Text>

        <BlurView intensity={30} tint="dark" style={styles.cardBlur}>
          <View style={styles.fieldTextBlock}>
            <Text style={styles.fieldName}>{name}</Text>
            {!!meta && <Text style={styles.fieldMeta}>{meta}</Text>}
          </View>
        </BlurView>

        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => Alert.alert("Next: Create Match screen")}
          >
            <Text style={styles.primaryButtonText}>Create match here</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>Back</Text>
          </Pressable>
        </View>
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
    marginBottom: 16,
  },

  cardBlur: {
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.2)",
    backgroundColor: "rgba(15,23,42,0.4)",
    padding: 20,
  },

  fieldTextBlock: {
    gap: 4,
  },

  fieldName: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
  },

  fieldMeta: {
    color: "#CBD5E1",
    fontSize: 14,
  },

  actions: {
    marginTop: 32,
    gap: 12,
  },

  primaryButton: {
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

  secondaryButton: {
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15,23,42,0.8)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.4)",
  },

  secondaryButtonText: {
    color: "#E5E7EB",
    fontWeight: "700",
    fontSize: 14,
  },

  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
});


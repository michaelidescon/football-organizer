import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, StatusBar, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const FORMAT_TOTALS = {
  "5v5": 10,
  "6v6": 12,
  "7v7": 14,
  "11v11": 22,
};

export default function CreateMatchScreen({ route }) {
  const field = route?.params?.field;
  const initialFormat = route?.params?.format ?? "5v5";

  const fieldName = field?.name ?? "Selected field";

  const allowedFormatsFromField = field?.allowedFormats?.length
    ? field.allowedFormats
    : Object.keys(FORMAT_TOTALS);

  const allowedDurationsFromField = field?.allowedDurations?.length
    ? field.allowedDurations
    : [60, 90, 120];

  const safeInitialFormat = allowedFormatsFromField.includes(initialFormat)
    ? initialFormat
    : allowedFormatsFromField[0];

  const [format, setFormat] = useState(safeInitialFormat);
  const [duration, setDuration] = useState(allowedDurationsFromField[0]);

  const { totalPlayers, totalPrice, pricePerPlayer } = useMemo(() => {
    const totalPlayersComputed = FORMAT_TOTALS[format] ?? 10;
    const pricePerHour = field?.pricePerHour ?? 0;
    const totalPriceComputed = (pricePerHour * duration) / 60;
    const perPlayer =
      totalPlayersComputed > 0 ? totalPriceComputed / totalPlayersComputed : 0;

    return {
      totalPlayers: totalPlayersComputed,
      totalPrice: totalPriceComputed,
      pricePerPlayer: perPlayer,
    };
  }, [format, duration, field]);

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
          <Text style={styles.cardTitle}>Match settings</Text>

          <View style={styles.section}>
            <Text style={styles.label}>Format</Text>
            {allowedFormatsFromField.length > 1 ? (
              <View style={styles.chipsRow}>
                {allowedFormatsFromField.map((option) => {
                  const isActive = option === format;
                  return (
                    <Pressable
                      key={option}
                      style={[
                        styles.chip,
                        isActive && styles.chipActive,
                      ]}
                      onPress={() => setFormat(option)}
                    >
                      <Text
                        style={[
                          styles.chipLabel,
                          isActive && styles.chipLabelActive,
                        ]}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            ) : (
              <Text style={styles.valueText}>{format}</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Duration</Text>
            {allowedDurationsFromField.length > 1 ? (
              <View style={styles.chipsRow}>
                {allowedDurationsFromField.map((minutes) => {
                  const isActive = minutes === duration;
                  return (
                    <Pressable
                      key={minutes}
                      style={[
                        styles.chip,
                        isActive && styles.chipActive,
                      ]}
                      onPress={() => setDuration(minutes)}
                    >
                      <Text
                        style={[
                          styles.chipLabel,
                          isActive && styles.chipLabelActive,
                        ]}
                      >
                        {minutes}m
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            ) : (
              <Text style={styles.valueText}>{duration}m</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Total players</Text>
            <Text style={styles.valueText}>{totalPlayers}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Total price</Text>
            <Text style={styles.valueText}>
              € {totalPrice.toFixed(2)}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Price per player</Text>
            <Text style={styles.valueText}>
              € {pricePerPlayer.toFixed(2)}
            </Text>
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
    gap: 18,
  },

  cardTitle: {
    color: "#E5E7EB",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.8,
    marginBottom: 4,
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

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.4)",
    backgroundColor: "rgba(15,23,42,0.9)",
  },

  chipActive: {
    backgroundColor: "#22C55E",
    borderColor: "#22C55E",
  },

  chipLabel: {
    color: "#E5E7EB",
    fontSize: 13,
    fontWeight: "600",
  },

  chipLabelActive: {
    color: "#0F172A",
  },

  valueText: {
    color: "#F9FAFB",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 2,
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


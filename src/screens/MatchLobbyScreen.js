import React, { useMemo } from "react";
import { View, Text, StyleSheet, StatusBar, Pressable, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export default function MatchLobbyScreen({ route, navigation }) {
  const {
    field,
    format,
    duration,
    totalPlayers,
    totalPrice,
    pricePerPlayer,
  } = route?.params ?? {};

  const safeTotalPlayers = totalPlayers ?? 0;
  const safeTotalPrice = totalPrice ?? 0;
  const safePricePerPlayer = pricePerPlayer ?? 0;

  const players = useMemo(
    () => [
      {
        name: "Host",
        isHost: true,
      },
    ],
    []
  );

  const fieldName = field?.name ?? "Selected field";
  const fieldMeta = field?.meta ?? `${format ?? ""} • ${duration ?? 0}m`;

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
        <Text style={styles.kicker}>MATCH LOBBY</Text>
        <Text style={styles.fieldName}>{fieldName}</Text>
        <Text style={styles.fieldMeta}>{fieldMeta}</Text>

        <BlurView intensity={30} tint="dark" style={styles.cardBlur}>
          <Text style={styles.sectionTitle}>Pricing summary</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Total price</Text>
            <Text style={styles.value}>€ {safeTotalPrice.toFixed(2)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Players</Text>
            <Text style={styles.value}>{safeTotalPlayers}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Price per player</Text>
            <Text style={styles.value}>€ {safePricePerPlayer.toFixed(2)}</Text>
          </View>

          <Text style={styles.note}>Each player pays separately.</Text>
        </BlurView>

        <View style={styles.playersSection}>
          <Text style={styles.playersTitle}>
            Players ({players.length}/{safeTotalPlayers})
          </Text>

          {players.map((player, index) => (
            <View key={index.toString()} style={styles.playerRow}>
              <Text style={styles.playerName}>{player.name}</Text>
              {player.isHost ? (
                <View style={styles.hostBadge}>
                  <Text style={styles.hostBadgeText}>Host</Text>
                </View>
              ) : null}
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => Alert.alert("Invite link coming soon")}
          >
            <Text style={styles.primaryButtonText}>Invite Players</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => navigation.popToTop()}
          >
            <Text style={styles.secondaryButtonText}>Back to Home</Text>
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
    marginBottom: 4,
  },

  fieldName: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
  },

  fieldMeta: {
    color: "#CBD5F5",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 20,
  },

  cardBlur: {
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.2)",
    backgroundColor: "rgba(15,23,42,0.4)",
    padding: 20,
    gap: 10,
  },

  sectionTitle: {
    color: "#E5E7EB",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.8,
    marginBottom: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },

  label: {
    color: "#E5E7EB",
    fontSize: 13,
  },

  value: {
    color: "#F9FAFB",
    fontSize: 14,
    fontWeight: "700",
  },

  note: {
    marginTop: 10,
    color: "#9CA3AF",
    fontSize: 12,
  },

  playersSection: {
    marginTop: 28,
  },

  playersTitle: {
    color: "#E5E7EB",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },

  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15,23,42,0.9)",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },

  playerName: {
    color: "#F9FAFB",
    fontSize: 14,
    fontWeight: "600",
  },

  hostBadge: {
    marginLeft: 8,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "rgba(34,197,94,0.15)",
    borderWidth: 1,
    borderColor: "#22C55E",
  },

  hostBadgeText: {
    color: "#22C55E",
    fontSize: 11,
    fontWeight: "700",
  },

  actions: {
    marginTop: 28,
    gap: 10,
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

